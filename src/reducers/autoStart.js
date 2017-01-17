const autoStart = (state = false, action) => {
  switch(action.type) {
    case 'SET_AUTO_START':
      return action.value;
    default:
      return state;
  }
}

export default autoStart;
