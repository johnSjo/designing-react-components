import axios from 'axios';
import { useEffect, useState } from 'react';

export enum RequestStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export function promiseDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface IRecord {
  [key: string]: any;
  readonly id: string;
  readonly first: string;
  readonly last: string;
  readonly company: string;
  readonly bio: string;
  readonly twitterHandle: string;
  readonly favorite: boolean;
}

type GenericCallback = () => void;

export type ModifyRecordsData = (
  record: IRecord,
  doneCallback?: GenericCallback
) => void;

const restUrl = 'api/speakers';

export default function useRequestRest() {
  const [data, setData] = useState<IRecord[]>([]);
  const [requestStatus, setRequestStatus] = useState(RequestStatus.LOADING);
  const [error, setError] = useState('');

  const updateRecord: ModifyRecordsData = (record, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = data.map((rec) => (rec.id === record.id ? record : rec));

    (async () => {
      try {
        setData(newRecords);
        await axios.put(`${restUrl}/${record.id}`, record);
        if (doneCallback) doneCallback();
      } catch (error) {
        console.error(`Error while updating records`, error);
        setData(originalRecords);
      }
    })();
  };

  const insertRecord: ModifyRecordsData = (record, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = [record, ...data];

    (async () => {
      try {
        setData(newRecords);
        const { data: newRecord } = await axios.post(
          `${restUrl}/99999`,
          record
        );
        setData([newRecord, ...originalRecords]);
        if (doneCallback) doneCallback();
      } catch (error) {
        console.error(`Error while updating records`, error);
        setData(originalRecords);
      }
    })();
  };

  const deleteRecord: ModifyRecordsData = (record, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = data.filter(({ id }) => id !== record.id);

    (async () => {
      try {
        setData(newRecords);
        await axios.delete(`${restUrl}/${record.id}`, { data: record });
        if (doneCallback) doneCallback();
      } catch (error) {
        console.error(`Error while updating records`, error);
        setData(originalRecords);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(restUrl);
        // throw 'Has error!!';
        setRequestStatus(RequestStatus.SUCCESS);
        setData(result.data);
      } catch (error) {
        setRequestStatus(RequestStatus.FAILURE);
        setError(error);
      }
    })();
  }, []);

  return {
    data,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  };
}
