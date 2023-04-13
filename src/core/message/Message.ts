import IMessageHandler from './IMessageHandler';
import MessageBus from './MessageBus';

/**
 * Priority flags for a message.
 * NORMAL priority messages may be rate limited.
 * HIGH priority messages will be handled as soon as possible.
 */
export enum MessagePriority {
  NORMAL,
  HIGH,
}

/**
 * Defines the format of a Message as well as helper functions to subscribe to messsages and send messages.
 */
export default class Message {
  public code: string;

  public context: any;

  public sender: any;

  public priority: MessagePriority;

  public constructor(
    code: string,
    sender: any,
    context?: any,
    priority: MessagePriority = MessagePriority.NORMAL
  ) {
    this.code = code;
    this.sender = sender;
    this.context = context;
    this.priority = priority;
  }

  public static send(code: string, sender: any, context?: any): void {
    MessageBus.post(new Message(code, sender, context, MessagePriority.NORMAL));
  }

  public static sendPriority(code: string, sender: any, context?: any): void {
    MessageBus.post(new Message(code, sender, context, MessagePriority.HIGH));
  }

  public static subscribe(code: string, handler: IMessageHandler): void {
    MessageBus.addSubscription(code, handler);
  }
  public static unsubscribe(code: string, handler: IMessageHandler): void {
    MessageBus.removeSubscription(code, handler);
  }
}
