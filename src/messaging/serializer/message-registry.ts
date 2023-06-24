import "reflect-metadata";
import {Message, MessagePayload} from "src/messages/message";
import {Command} from "../../messages/command";
import {Event} from "../../messages/event";
import {kebabSpace} from "../../utilities/kebab-space";
import {DomainEvent, DomainEventPayload} from "../../domain-modeling/domain-event";
import {AggregateRoot} from "../../domain-modeling/aggregate-root";
import {UniqueIdentifier} from "../../identifiers/unique-identifier";

export type MessageConstructor<T = unknown> = new (properties: MessagePayload<T>) => Message<T>;
export type EventConstructor<T = unknown> = new (properties: MessagePayload<T>) => Event<T>;
export type CommandConstructor<T = unknown> = new (properties: MessagePayload<T>) => Command<T>;
export type QueryConstructor = new (properties: any) => any;
export type DomainEventConstructor<T extends AggregateRoot<UniqueIdentifier, unknown> = AggregateRoot<UniqueIdentifier, unknown>> = new (properties: DomainEventPayload<T>) => DomainEvent<T>;

export const MessageRegistry = new Map<string | symbol, MessageConstructor<unknown> | EventConstructor | CommandConstructor | QueryConstructor | DomainEventConstructor>();

export function RegisterMessage(message?: string) {
  return function(constructor: MessageConstructor | EventConstructor | CommandConstructor | QueryConstructor | DomainEventConstructor) {
    const name = message ?? kebabSpace(constructor.name);

    if (MessageRegistry.has(name)) {
      throw new Error(`${name} "${name}" is already registered.`);
    }

    MessageRegistry.set(name, constructor);

    console.log(`Registered message "${name}"`);
  };
}
