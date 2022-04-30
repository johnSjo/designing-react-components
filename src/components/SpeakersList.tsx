import { useContext } from 'react';
import ReactPlaceholder from 'react-placeholder/lib';
import { SpeakerFilterContext } from '../contexts/SpeakerFilterContext';
import useRequestRest, { RequestStatus } from '../hooks/UseRequestRest';
import Speaker from './Speaker';
import SpeakerAdd from './SpeakerAdd';

const SpeakersList = () => {
  const {
    data: speakerData,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  } = useRequestRest();

  const { eventYear, searchQuery } = useContext(SpeakerFilterContext);

  if (requestStatus === RequestStatus.FAILURE) {
    return (
      <div className="text-danger">
        ERROR: <b>loading speaker data faild {error}</b>
      </div>
    );
  }

  return (
    <div className="container speakers-list">
      <ReactPlaceholder
        type="media"
        rows={15}
        className="speakerList-placeholder"
        ready={requestStatus === RequestStatus.SUCCESS}
      >
        <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
        <div className="row">
          {speakerData
            .filter(
              ({ first, last }) =>
                first.toLowerCase().includes(searchQuery) ||
                last.toLowerCase().includes(searchQuery)
            )
            .filter(
              ({ sessions }) =>
                sessions.findIndex(
                  ({ eventYear: sessionEventYear }) =>
                    sessionEventYear === eventYear
                ) > -1
            )
            .map((speaker) => {
              return (
                <Speaker
                  key={speaker.id}
                  speaker={speaker}
                  updateRecord={updateRecord}
                  insertRecord={insertRecord}
                  deleteRecord={deleteRecord}
                />
              );
            })}
        </div>
      </ReactPlaceholder>
    </div>
  );
};

export default SpeakersList;
