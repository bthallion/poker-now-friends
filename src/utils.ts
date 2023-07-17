import { fileURLToPath } from 'url';
import * as path from 'path';
import {writeFile, readFile} from 'fs/promises';
import {Json, KeyedJson, JsonValue} from '/types.js';

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(__filename), '../..');
const dataDir = path.resolve(rootDir, 'data');

export async function readData<T extends JsonValue = Json>({fileName}: {fileName: string}): Promise<T|null> {
	const filePath = path.resolve(dataDir, fileName);
	let data: string = '';
	try {
		const rawData = await readFile(filePath, {
			encoding: 'utf8',
		});
		if (!rawData) return null;
		return JSON.parse(rawData);
	} catch (err) {
		console.error(err);
		return null;
	}
}

export async function readKeyedData({fileName, key}: {fileName: string; key: string}): Promise<Json|null> {
	const data = await readData<KeyedJson>({fileName});
	if (!data) return null;
	return data[key]?? null;
}

export async function writeData({fileName, data}: {fileName: string; data: Json;}): Promise<void> {
	const filePath = path.resolve(dataDir, fileName);
	return writeFile(filePath, JSON.stringify(data, null, 4), {encoding: 'utf8'});
}

export async function writeKeyedData({fileName, key, data}: {fileName: string; key: string; data: Json;}): Promise<void> {
	const writtenData: KeyedJson = (await readData<KeyedJson>({fileName})) ?? {};
	writtenData[key] = data;
	return writeData({fileName, data: writtenData});
}

export async function getOrFetchData({fileName, key, dataFetcher}: {
	fileName: string; 
	key: string; 
	dataFetcher: () => Promise<Json>;
}): Promise<Json|null> {
	let data = await readKeyedData({fileName, key});
	if (!data) {
		try {
			data = await dataFetcher();
			if (!data) return null;
			await writeKeyedData({fileName, key, data});
			return data;
		} catch (err) {
			console.error(err);
			return null;
		}
	}
	return data;
}
