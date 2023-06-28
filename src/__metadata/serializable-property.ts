import "reflect-metadata"

export const SerializablePropertyKey = Symbol("Serializable")

export function Serializable() {
	return function (target: any, propertyKey: string) {
		let existingSerializableProperties: string[] = Reflect.getMetadata(
			SerializablePropertyKey,
			target
		)

		if (existingSerializableProperties) {
			existingSerializableProperties.push(propertyKey)
		} else {
			existingSerializableProperties = [propertyKey]
		}

		Reflect.defineMetadata(
			SerializablePropertyKey,
			existingSerializableProperties,
			target
		)
	}
}
