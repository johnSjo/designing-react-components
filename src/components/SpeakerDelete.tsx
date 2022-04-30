import { useContext } from 'react';
import { SpeakerContext } from '../contexts/SpeakerContext';

export default function SpeakerDelete() {
  const { speaker, deleteRecord } = useContext(SpeakerContext);

  return (
    <span className="session w-100">
      <a href="#" className="remSes">
        <i
          onClick={(event) => {
            event.preventDefault();
            if (
              window.confirm(
                `Are you sure you wish to delete speaker: ${speaker.first} ${speaker.last}`
              )
            ) {
              deleteRecord(speaker);
            }
          }}
        >
          +
        </i>
      </a>
      <span className="padL2">Delete speaker</span>
    </span>
  );
}
