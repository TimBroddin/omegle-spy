const setLanguage = (language) => {
    return {
        type: 'SET_LANGUAGE',
        language,
        meta: {
            analytics: {
                type: 'Set language',
                payload: {
                    action: language
                }
            }
        }
    }
}

const changeFind = (value) => {
    return {type: 'CHANGE_FIND', value}
}

const changeReplace = (value) => {
    return {type: 'CHANGE_REPLACE', value}
}

const addReplacement = () => {
    return {type: 'ADD_REPLACEMENT'}
}

const removeReplacement = (index) => {
    return {type: 'REMOVE_REPLACEMENT', index}
}

const setAutoStart = (value) => {
    return {type: 'SET_AUTO_START', value}
}

const addMessage = (message) => {
    return {type: 'ADD_MESSAGE', message}
}

const newConversation = () => {
    return {type: 'NEW_CONVERSATION'}
}

const setConnected = (value) => {
    return {type: 'SET_CONNECTED', value}
}

export {
    setLanguage,
    changeFind,
    changeReplace,
    addReplacement,
    removeReplacement,
    setAutoStart,
    addMessage,
    newConversation,
    setConnected
}
