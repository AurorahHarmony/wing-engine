import IMessageHandler from './IMessageHandler';
import Message, { MessagePriority } from './Message';
import MessageSubscriptionNode from './MessageSubscriptionNode';

/**
 * Acts as a container for all messages and subscriptions, handling the processing and notification of messages.
 */
export default class MessageBus {
  private static _subscriptions: { [code: string]: IMessageHandler[] } = {};

  private static _normalQueueMessagePerUpdate = 10;
  private static _normalMessageQueue: MessageSubscriptionNode[];

  private constructor() {} // Hide constructor

  public static addSubscription(code: string, handler: IMessageHandler): void {
    if (MessageBus._subscriptions[code] === undefined) {
      MessageBus._subscriptions[code] = [];
    }

    if (MessageBus._subscriptions[code].indexOf(handler) !== -1) {
      console.warn(
        'Attempting to add a duplicate handler to code: ' + code + ', subscription not added.'
      );
    } else {
      MessageBus._subscriptions[code].push(handler);
    }
  }

  public static removeSubscription(code: string, handler: IMessageHandler): void {
    if (MessageBus._subscriptions[code] === undefined) {
      console.warn(
        'Cannot unsubscribe handler from code: ' +
          code +
          ', because that code is not subscribed to.'
      );
      return;
    }

    const nodeIndex = MessageBus._subscriptions[code].indexOf(handler);
    if (nodeIndex !== -1) {
      MessageBus._subscriptions[code].splice(nodeIndex, 1);
    }
  }

  /** Posts a message to all handlers that are listening for the same code. */
  public static post(message: Message): void {
    console.log('Message posted:', message);
    const handlers = MessageBus._subscriptions[message.code];

    if (handlers === undefined) {
      return;
    }

    for (const h of handlers) {
      // Immediately send high priority messages
      if (message.priority === MessagePriority.HIGH) {
        h.onMessage(message);
      } else {
        MessageBus._normalMessageQueue.push(new MessageSubscriptionNode(message, h));
      }
    }
  }

  /** Sends messages.
   * HIGH priorty messages will be sent immediately
   * NORMAL priority messages will be rate limited
   */
  public static update(time: number): void {
    if (MessageBus._normalMessageQueue.length === 0) {
      return;
    }

    const messageLimit = Math.min(
      MessageBus._normalQueueMessagePerUpdate,
      MessageBus._normalMessageQueue.length
    );

    for (let i = 0; i < messageLimit; i++) {
      const node = MessageBus._normalMessageQueue.pop();
      node.handler.onMessage(node.message);
    }
  }
}
