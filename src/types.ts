export type JsonValue = string | number | boolean | Date | Json | JsonArray;

export interface Json {
	[key: string]: JsonValue;
}

export type JsonArray = Array<JsonValue>;

export interface KeyedJson {
	[key: string]: Json;
}