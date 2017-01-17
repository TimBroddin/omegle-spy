// handles most of the boring stuff
import Omegle from './Omegle';

class Conversation {
    constructor(lang = 'en', replacements = []) {
        this.language = lang;
        this.listeners = [];
        this.replacements = replacements;
    }

    restart() {
        this.c1.disconnect();
        this.c2.disconnect();
    }

    sendMessage(as, msg) {
        if (parseInt(as, 10) === 1) {
            this.c1.sendMessage(msg);
            this.message('message', {
                name: 'Person 1',
                message: msg
            });
        } else if (parseInt(as, 10) === 2) {
            this.c2.sendMessage(msg);
            this.message('message', {
                name: 'Person 2',
                message: msg
            });
        }
    }

    stop() {
        if (this.c1)
            this.c1.disconnect();
            this.c1 = null;
        if (this.c2)
            this.c2.disconnect();
            this.c2 = null;
        }

    start() {
        this.c1 = new Omegle(this.language);
        this.c2 = new Omegle(this.language);

        this.c1.on('message', (text) => {
            let original = text;
            let newText = original;
            this.replacements.forEach((replacement) => {
              console.log(new RegExp(`/${replacement.find}/ig`), replacement.replace);
                newText = newText.replace(new RegExp(replacement.find, 'ig'), replacement.replace);
            });
            console.log(newText);
            this.c2.sendMessage(newText);
            this.message('message', {
                name: 'Person 1',
                message: text,
                replacement: newText
            });
        });

        this.c2.on('message', (text) => {
            let original = text;
            let newText = original;
            this.replacements.forEach((replacement) => {
              newText = newText.replace(new RegExp(replacement.find, 'ig'), replacement.replace);
            });

            this.c1.sendMessage(newText);
            this.message('message', {
                name: 'Person 2',
                message: text,
                replacement: newText
            });
        });

        this.c1.on('typing', () => {
            this.c2.sendTyping();
        });

        this.c2.on('typing', () => {
            this.c1.sendTyping();
        });

        this.c1.on('serverMessage', (text) => {
            this.message('message', {
                name: 'Person 1',
                message: text,
                server: true
            });
        });

        this.c2.on('serverMessage', (text) => {
            this.message('message', {
                name: 'Person 2',
                message: text,
                server: true
            });
        });

        this.c1.on('connect', () => {
            this.message('connected', true);
            this.message('message', {
                name: 'Person 1',
                message: 'Connected',
                server: true
            })
        });

        this.c2.on('connect', () => {
            this.message('connected', true);
            this.message('message', {
                name: 'Person 2',
                message: 'Connected',
                server: true
            })
        });

        this.c1.on('serverDown', (server) => {
            this.message('message', {
                name: 'Person 1',
                message: 'Server down? Reconnect in 10 seconds ...',
                server: true
            })
            setTimeout(() => {
                this.c1.start();

            }, 10000);
        })

        this.c2.on('serverDown', (server) => {
            this.message('message', {
                name: 'Person 2',
                message: 'Server down? Reconnect in 10 seconds ...',
                server: true
            })
            setTimeout(() => {
                this.c2.start();

            }, 10000);
        })

        this.c1.on('disconnect', () => {
            this.message('message', {
                name: 'Person 1',
                message: 'Disconnected',
                server: true
            });
            if(this.c2.isConnected) {
              this.c2.disconnect();
            }
            this.message('connected', false);
        });

        this.c2.on('disconnect', () => {
            this.message('message', {
                name: 'Person 2',
                message: 'Disconnected',
                server: true
            });
            if(this.c1.isConnected) {
              this.c1.disconnect();
            }
            this.message('connected', false);
        });

        this.c1.on('unhandled', (props) => {
            let type = props.type;
            this.message('message', {
                name: 'Person 1',
                message: `Unhandled message ${type}`,
                server: true
            })

        });

        this.c2.on('unhandled', (props) => {
            let type = props.type;
            this.message('message', {
                name: 'Person 2',
                message: `Unhandled message ${type}`,
                server: true
            })

        });

        this.c1.on('error', (err) => {
            this.message('message', {
                name: 'Person 1',
                message: `Error ${err}`,
                server: true
            })

        });

        this.c2.on('error', (err) => {
            this.message('message', {
                name: 'Person 2',
                message: `Error ${err}`,
                server: true
            })
        });

        this.c1.start();
        this.c2.start();

    }

    on(type, cb) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(cb);
    }

    message(type, payload) {
        if (this.listeners[type]) {
            this.listeners[type].forEach((cb) => {
                cb(payload);
            });
        } else {}
    }

}

export default Conversation;
