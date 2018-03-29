import { h, Text, Component } from 'ink'

const Prompt = ({ width, title, message }) => {
  const messageWidth = width - title.length
  const massagedMessage = massage(messageWidth, message)
  return (
    <span>
      <Text bold>{title}: </Text>
      <Text>{massagedMessage}</Text>
    </span>
  )
}

const massage = (width, message) => {
  const messageLength = message.length
  return messageLength >= width
    ? '...' + message.slice(messageLength - width + 3)
    : message + ' '.repeat(width - messageLength)
}

export default Prompt
