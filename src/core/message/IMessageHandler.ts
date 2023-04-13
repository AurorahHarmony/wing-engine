import Message from './Message';

export default interface IMessageHandler {
  /** Defines what this IMessageHandler should do when it recieves a message. */
  onMessage(message: Message): void;
}
