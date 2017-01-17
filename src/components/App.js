import React, {Component} from 'react';
import {connect} from 'react-redux';

import './App.css';
import Conversation from '../lib/Conversation';
import Logs from './Logs';
import Preferences from './Preferences';
import {addMessage, newConversation, setConnected} from '../actions'
import ReactGA from 'react-ga';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            connected: false
        }

        this.initial = false;
    }

    componentWillReceiveProps(props) {
        if (props.language !== this.props.language && this.props.language) {
            clearTimeout(this.initial);
            this.newConversation(props.language);
        }
        if(props.replacements !== this.props.replacements) {
          this.conversation.replacements = props.replacements;
        }

        // change to disconnect
        if(!props.conversation.connected && this.props.conversation.connected) {
            if(this.props.autoStart) {
              setTimeout(() => {
              //  this.newConversation();
              }, 1500);
            }
        }
    }

    setup(language) {
      const {replacements, addMessage, setConnected} = this.props;
      this.conversation = new Conversation(language);
      this.conversation.replacements = replacements;

      this.conversation.on('message', (msg) => {
          addMessage(msg);
      });
      this.conversation.on('connected', (val) => {
          setConnected(val);
      });

      this.initial = setTimeout(() => {
          this.conversation.start();
      }, 500);
    }

    componentDidMount() {
        const {language} = this.props;
        this.setup(language);
        this.analytics();
    }

    analytics() {
      ReactGA.pageview('/');
    }

    newConversation(l) {
        const {newConversation, language} = this.props;
        newConversation();
        this.setup(l || language);
    }

    send() {
        this.conversation.sendMessage(this.refs.as.value, this.refs.text.value);
        this.refs.text.value = '';
    }

    render() {
        const { connected} = this.props.conversation;

        return (
            <div className="App">
                <div className="header">
                    <img src={require('../assets/logo.jpg')} alt="Omegle Spy"/>

                    <p className="tagline">Spy on strangers!</p>

                </div>
                <div className="main">
                    <div className="left">
                        <div className="log">
                            <Logs startNewConversation={() => this.newConversation()} />
                        </div>
                        <div className="controls">
                            {(connected)
                                ? <button onClick={() => this.conversation.stop()}>Disconnect</button>
                                : <button onClick={() => this.newConversation()}>New conversation</button>
}
                            <div>
                                <label>Send as
                                    <select ref="as">
                                        <option value="1">Person 1</option>
                                        <option value="2">Person 2</option>
                                    </select>
                                </label>
                                <input type="text" ref="text"/>
                                <button className="right" onClick={() => this.send()}>Send</button>

                            </div>
                        </div>

                    </div>
                    <div className="right">
                        <Preferences />
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {language: state.language, replacements: state.replacements.replacements, conversation: state.conversation, autoStart: state.autoStart}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (message) => {
      dispatch(addMessage(message));
    },
    newConversation: () => {
      dispatch(newConversation());
    },
    'setConnected': (value) => {
      dispatch(setConnected(value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
