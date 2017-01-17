const language = (state = "en", action) => {
  switch(action.type) {
    case 'SET_LANGUAGE':
      return action.language;
    default:
      return state;
  }
}

export default language;
