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
    return {
        type: 'ADD_REPLACEMENT',
        meta: {
            analytics: {
                type: 'Replacement',
                payload: {
                    action: 'Add'
                }
            }
        }
    }
}

const removeReplacement = (index) => {
    return {
        type: 'REMOVE_REPLACEMENT',
        index,
        meta: {
            analytics: {
                type: 'Replacement',
                payload: {
                    action: 'Remove'
                }
            }
        }
    }
}

const setAutoStart = (value) => {
    return {type: 'SET_AUTO_START', value}
}

const addMessage = (message) => {
    return {
        type: 'ADD_MESSAGE',
        message,
        meta: {
            analytics: {
                type: 'Message',
                payload: {
                    action: 'Add'
                }
            }
        }
    }
}

const newConversation = () => {
    return {
        type: 'NEW_CONVERSATION',
        meta: {
            analytics: {
                type: 'Conversation',
                payload: {
                    action: 'New'
                }
            }
        }
    }
}

const setConnected = (value) => {
    return {
        type: 'SET_CONNECTED',
        value,
        meta: {
            analytics: {
                type: 'Connected',
                payload: {
                    action: (value)
                        ? 'Connected'
                        : 'Disconnected'
                }
            }
        }

    }
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
