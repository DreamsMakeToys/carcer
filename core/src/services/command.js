import { eventChannel } from 'redux-saga'

function createChannel() {
  return eventChannel(emit => {
    const postToSelf = message => emit(message)
    global._postToCore = postToSelf

    return () => {}
  })
}

export default { createChannel }
