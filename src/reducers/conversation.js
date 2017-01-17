const conversation = (state = {
    messages: [],
    connected: false
}, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
          let messages = state.messages.slice(0);
          messages.push(action.message);
          return Object.assign({}, state, { messages });
        case 'NEW_CONVERSATION':
          return Object.assign({}, state, {messages: [], connected: false });
        case 'SET_CONNECTED':
          return Object.assign({}, state, { connected: action.value });
        default:
          return state;
    }
}

export default conversation;
