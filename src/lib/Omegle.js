
class Omegle {

    constructor(lang='en') {
        this.listeners = [];
        this.isConnected = true;
        this.queueMessages = [];
        this.hasPartner = false;
        this.eventTries = 0;
        this.language = lang;
    }

    getServer() {
        this.server = 'front1.omegle.com'
    }

    start() {
        this.queueMessages = [];
        this.eventTries = 0;
        this.getServer();

        fetch(`http://${this.server}/start?firstevents=1&lang=${this.language}`, {
            method: 'POST',
            referrerPolicy: "no-referrer",
            headers: new Headers({
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            }),
        }).then((response) => {
          return response.json();
        }).then((response) => {
            if (response && response.clientID) {
                this.connected();
                this.parseEvents(response.events);
                this.clientID = response.clientID;
                this.isConnected = true;
                this.getEvents();
            } else {
                this.message('serverDown', this.server);
            }
        }).catch((err) => {
            console.log('Error: ' + err.message);
            setTimeout(() => {
              this.start();
            }, 10000);
        });
    }

    getEvents() {
        if (!this.isConnected)
            return false;

        fetch(`http://${this.server}/events`, {
            method: 'POST',
            body: `id=${encodeURIComponent(this.clientID)}`,
            headers: new Headers({
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded'

            })
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
            if (response) {
                this.parseEvents(response);
                this.getEvents();
            } else {
                this.eventTries++;
                if (this.eventTries > 5) {
                    this.disconnected();
                } else {
                    setTimeout(() => {
                        this.getEvents();
                    }, 1000);
                }
            }
        }).catch((err) => {
            this.getServer();
            //console.log(`** Failed to fetch events`.red);
            this.getEvents();
        });
    }

    disconnect() {
      fetch(`http://${this.server}/disconnect`, {
        method: 'POST',
        body: `id=${encodeURIComponent(this.clientID)}`,
        headers: new Headers({
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then((response) => {
        this.isConnected = false;
        this.message('disconnect');
      });
    }

    parseEvents(events) {
        if (!events)
            return;

        events.forEach((event) => {
            const type = event[0];
            const payload = event[1];
            switch (type) {
                case 'gotMessage':
                    this.receiveMessage(payload);
                    break;
                case 'typing':
                    this.typing();
                    break;
                case 'statusInfo':
                    this.statusInfo(payload);
                    break;
                case 'strangerDisconnected':
                    this.disconnected();
                    break;
                case 'connected':
                    this.hasPartner = true;
                    this.queueMessages.forEach((txt) => {
                        console.log('Sending message queue');
                        this.sendMessage(txt);
                    });
                    break;
                case 'serverMessage':
                    this.serverMessage(payload);
                    break;
                case 'error':
                    this.message('error', payload);
                    break;
                case 'waiting':
                    this.message('waiting');
                    break;
                case 'identDigests':
                    break;
                default:
                    this.message('unhandled', {type, payload});
            }
        });
    }

    connected() {
        this.message('connect', true);
    }

    receiveMessage(text) {
        this.message('message', text);
    }

    serverMessage(text) {
        this.message('serverMessage', text);
    }

    statusInfo(info) {}

    typing() {
        this.message('typing', true);
    }

    sendMessage(txt) {
        if (!this.hasPartner) {
            console.log('Add to queue');
            this.queueMessages.push(txt);
        }

        fetch(`http://${this.server}/send`, {
            method: 'POST',
            body: `id=${encodeURIComponent(this.clientID)}&msg=${encodeURIComponent(txt)}`,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        })
        .then((response) => {}).catch((err) => {
            this.getServer();
            //console.log(`** Failed to send message`.red);
            this.sendMessage(txt);
        });

    }

    sendTyping() {

        fetch(`http://${this.server}/typing`, {
            method: 'POST',
            body: `id=${encodeURIComponent(this.clientID)}`,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        })
        .then((response) => {}).catch((err) => {
            //console.log(`** Failed to send message`.red);
            this.getServer();
            this.sendTyping();
        });;
    }

    disconnected() {
        this.isConnected = false;
        this.message('disconnect', true);
    }

    on(type, cb) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(cb);
    }

    randId() {
      var a, b;
        for (a = "", b = 0; 8 > b; b++)
            var c = Math.floor(32 * Math.random());
            a += "23456789ABCDEFGHJKLMNPQRSTUVWXYZ".charAt(c);
        return a
    }

    message(type, payload) {
        if (this.listeners[type]) {
            this.listeners[type].forEach((cb) => {
                cb(payload);
            });
        } else {}
    }
}

export default Omegle;
