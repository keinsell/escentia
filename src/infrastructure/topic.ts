import * as t from 'io-ts'


interface TopicBrand {
  readonly Topic: unique symbol
}

const TopicCodec = t.brand(t.string, (s: string): s is t.Branded<string, TopicBrand> => !!s, 'Topic')

// TODO: Topic is a something in Kafka definition, this would be equvalent to Queue in RabbitMQ, do this should be based on message? Imho, software messages should not tell infrastructure what to do - or should they?
// TODO: Do this should be integrated into `Message` class and be based on Message name? In formal example UserCreated would be a user-created topic which may be useful. But in other hand, this may be a bit too much of a magic and may be a bit confusing.
export type Topic = t.TypeOf<typeof TopicCodec>

export function createTopic(topic: string): Topic {
  const validationResult = TopicCodec.decode(topic)
  if (validationResult._tag === 'Left') {
    throw new Error(`Invalid topic: ${topic}`)
  } else {
    return validationResult.right
  }
}
