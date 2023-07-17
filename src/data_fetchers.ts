import fetch from 'node-fetch';
import {writeFile, readFile} from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(__filename), '..');

export async function getLedger() {
}
