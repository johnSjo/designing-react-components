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
  readonly id: string;
  [key: string]: any;
}

type GenericCallback = () => void;

export type ModifyRecordsData = (
  record: IRecord,
  doneCallback?: GenericCallback
) => void;

export default function useRequestDelay(delay: number = 1000, initData = []) {
  const [data, setData] = useState<IRecord[]>(initData);
  const [requestStatus, setRequestStatus] = useState(RequestStatus.LOADING);
  const [error, setError] = useState('');

  const updateRecords = async (
    newRecords: IRecord[],
    originalRecords: IRecord[],
    doneCallback: GenericCallback
  ) => {
    try {
      setData(newRecords);
      await promiseDelay(delay);
      if (doneCallback) doneCallback();
    } catch (error) {
      console.error(`Error while updating records`, error);
      setData(originalRecords);
    }
  };

  const updateRecord: ModifyRecordsData = (record, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = data.map((rec) => (rec.id === record.id ? record : rec));

    updateRecords(newRecords, originalRecords, doneCallback);
  };

  const insertRecord: ModifyRecordsData = (record, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = [record, ...data];

    updateRecords(newRecords, originalRecords, doneCallback);
  };

  const deleteRecord: ModifyRecordsData = (record, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = data.filter(({ id }) => id !== record.id);

    updateRecords(newRecords, originalRecords, doneCallback);
  };

  useEffect(() => {
    (async () => {
      try {
        await promiseDelay(delay);
        // throw 'Has error!!';
        setRequestStatus(RequestStatus.SUCCESS);
        setData(data);
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
