import { createContext, PropsWithChildren } from 'react';
import { IRecord, ModifyRecordsData } from '../hooks/UseRequestRest';

interface ISpeakerContext {
  readonly speaker: IRecord;
  readonly updateRecord: ModifyRecordsData;
  readonly insertRecord: ModifyRecordsData;
  readonly deleteRecord: ModifyRecordsData;
}

export const SpeakerContext = createContext<ISpeakerContext | null>(null);

export function SpeakerProvider({
  children,
  ...config
}: PropsWithChildren<ISpeakerContext>) {
  return (
    <SpeakerContext.Provider value={config}>{children}</SpeakerContext.Provider>
  );
}
