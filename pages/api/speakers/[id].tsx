import fs from 'fs';
import path from 'path';
import { promiseDelay } from '../../../src/hooks/UseRequestRest';

const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export default async function (req, res) {
  const method = req?.method;
  //   const id = parseInt(req?.query.id);
  const id = req?.query.id;
  const recordFromBody = req?.body;
  const jsonFile = path.resolve('./', 'db.json');

  switch (method) {
    case 'POST':
      postMethod();
      break;
    case 'PUT':
      putMethod();
      break;
    case 'DELETE':
      deleteMethod();
      break;
    default:
      res.status(501).send(`Method ${method} not implemented.`);
      console.log(`Method ${method} not implemented.`);
  }

  async function putMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await promiseDelay(1000);
      const { speakers } = JSON.parse(readFileData);

      if (speakers) {
        const newSpeakersRecord = speakers.map((rec) =>
          rec.id === id ? recordFromBody : rec
        );

        writeFile(
          jsonFile,
          JSON.stringify({ speakers: newSpeakersRecord }, null, 2)
        );

        res.setHeader('content-type', 'application/json');
        res.status(200).send(JSON.stringify(recordFromBody, null, 2));
        console.log(`PUT api/speakers/${id} status: 200`);
      } else {
        res.status(404).send('Error: Request faild with code 404');
      }
    } catch (e) {
      res.status(500).send(`PUT api/speakers/${id} status: 500 error`);
      console.error(`api/speakers error: ${e}`);
    }
  }

  async function postMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await promiseDelay(1000);
      const { speakers } = JSON.parse(readFileData);

      if (speakers) {
        const newId =
          speakers.reduce((newId, { id }) => Math.max(id, newId), 0) + 1;
        const newRecord = { ...recordFromBody, id: newId.toString() };
        const newSpeakersRecord = [newRecord, ...speakers];

        writeFile(
          jsonFile,
          JSON.stringify({ speakers: newSpeakersRecord }, null, 2)
        );

        res.setHeader('content-type', 'application/json');
        res.status(200).send(JSON.stringify(newRecord, null, 2));
        console.log(`POST api/speakers/${id} status: 200`);
      } else {
        res.status(404).send('Error: Request faild with code 404');
      }
    } catch (e) {
      res.status(500).send(`POST api/speakers/${id} status: 500 error`);
      console.error(`api/speakers error: ${e}`);
    }
  }

  async function deleteMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await promiseDelay(1000);
      const { speakers } = JSON.parse(readFileData);

      if (speakers) {
        const newSpeakersRecord = speakers.filter((rec) => rec.id !== id);

        writeFile(
          jsonFile,
          JSON.stringify({ speakers: newSpeakersRecord }, null, 2)
        );

        res.setHeader('content-type', 'application/json');
        res.status(200).send(
          JSON.stringify(
            speakers.find((rec) => rec.id === id),
            null,
            2
          )
        );
        console.log(`DELETE api/speakers/${id} status: 200`);
      } else {
        res.status(404).send('Error: Request faild with code 404');
      }
    } catch (e) {
      res.status(500).send(`DELETE api/speakers/${id} status: 500 error`);
      console.error(`api/speakers error: ${e}`);
    }
  }
}
