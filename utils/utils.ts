import { readFileSync, promises as fsPromises } from 'fs';

// read file synchronously
export function syncReadFile(filePath: string) {
  const result = readFileSync(filePath, 'utf-8');

  return result;
}

export async function asyncReadFile(filePath: string) {
  try {
    const result = await fsPromises.readFile(filePath, 'utf-8');

    return result;
  } catch(error: any) {
    console.log(error);
    return `Something went wrong: ${error.type}: ${error.message}`;
  }
}
