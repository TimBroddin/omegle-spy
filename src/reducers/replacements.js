const replacements = (state = {
    replacements: [],
    find: '',
    replace: ''
}, action) => {
    switch (action.type) {
        case 'CHANGE_FIND':
            return Object.assign({}, state, {find: action.value});
        case 'CHANGE_REPLACE':
            return Object.assign({}, state, {replace: action.value});
        case 'ADD_REPLACEMENT':
            let replacements = state.replacements.slice(0);
            replacements.push({
              find: state.find,
              replace: state.replace
            });
            return Object.assign({}, state, {
              replacements,
              find: '',
              replace: ''
            });
          case 'REMOVE_REPLACEMENT':
            let newReplacements = [];
            state.replacements.forEach((replacement, k) => {
              if(k !== action.index) {
                newReplacements.push(replacement);
              }
            });
            return Object.assign({}, state, {
              replacements: newReplacements,
            });
        default:
          return state;
    }
}

export default replacements;
