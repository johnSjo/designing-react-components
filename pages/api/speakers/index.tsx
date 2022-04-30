import path from 'path';
import fs from 'fs';
import { promiseDelay } from '../../../src/hooks/UseRequestRest';

const { promisify } = require('util');
const readFile = promisify(fs.readFile);

export default async function (req, res) {
  const jsonFile = path.resolve('./', 'db.json');
  try {
    const readFileData = await readFile(jsonFile);
    await promiseDelay(1000);
    const { speakers } = JSON.parse(readFileData);
    if (speakers) {
      res.setHeader('content-type', 'application/json');
      res.status(200).send(JSON.stringify(speakers, null, 2));
      console.log('GET api/speakers status: 200');
    }
  } catch (e) {
    console.error(`api/speakers error: ${e}`);
    res.status(404).send('File not found on server');
  }
}
