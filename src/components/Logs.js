import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setAutoStart} from '../actions';

import './Logs.css';

class Logs extends Component {
  componentDidUpdate() {
    this.refs.logs.scrollTop = this.refs.logs.scrollHeight;
  }

  render() {
    const {messages, connected, startNewConversation} = this.props;
    return <div className="logs" ref="logs">
      {messages.map((message, k) => {
        let color;
        if(message.name === 'Person 1') {
          color = 'green';
        } else {
          color = 'blue';
        }
        if(message.server) {
        //  color = 'red';
        }

        return <div className="log-msg" key={`message-${k}`}>
          <div className={`name ${color}`}>{(message.server) ? '*SERVER*' : message.name}</div>
          <div className="message">{(message.message === message.replacement || !message.replacement) ? message.message : <div><del>{message.message}</del> <span>{message.replacement}</span></div>}</div>
        </div>
      })}

      {(!connected) ?
        <div style={{ marginTop: '20px'}}>
          <button onClick={(e) => startNewConversation() }>New conversation</button>

        </div>
        :
        null
      }

    </div>

  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.conversation.messages,
    connected: state.conversation.connected,
    autoStart: state.autoStart

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAutoStart: (value) => {
      dispatch(setAutoStart(value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
