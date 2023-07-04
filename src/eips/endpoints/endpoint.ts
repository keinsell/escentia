export interface Endpoint {
    type: "exchange" | "queue" | "topic";
    name: string;
}
