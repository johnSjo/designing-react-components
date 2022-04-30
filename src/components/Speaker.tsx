import { memo, useContext, useState } from 'react';
import { SpeakerContext, SpeakerProvider } from '../contexts/SpeakerContext';
import { SpeakerFilterContext } from '../contexts/SpeakerFilterContext';
import { IRecord, ModifyRecordsData } from '../hooks/UseRequestRest';
import ErrorBoundary from './ErrorBoundary';
import SpeakerDelete from './SpeakerDelete';

const Session = ({ title, room }) => {
  return (
    <span className="session w-100">
      {title} <strong>Room: {room.name}</strong>
    </span>
  );
};

const Sessions = () => {
  const {
    speaker: { sessions },
  } = useContext(SpeakerContext);
  const { eventYear } = useContext(SpeakerFilterContext);

  return (
    <div className="sessionBox card h-250">
      {sessions
        .filter(
          ({ eventYear: sessionEventYear }) => sessionEventYear === eventYear
        )
        .map((session) => (
          <div className="session w-100" key={session.id}>
            <Session {...session} />
          </div>
        ))}
    </div>
  );
};

function ImageWithFallback({ src, ...props }) {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const onError = () => {
    if (!error) {
      setImgSrc('/images/speaker-99999.jpg');
      setError(true);
    }
  };

  return <img src={imgSrc} {...props} onError={onError}></img>;
}

const SpeakerImage = () => {
  const {
    speaker: { id, first, last },
  } = useContext(SpeakerContext);

  return (
    <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
      <ImageWithFallback
        className="contain-fit"
        src={`/images/speaker-${id}.jpg`}
        width="300"
        alt={`${first} ${last}`}
      />
    </div>
  );
};

const SpeakerFavorite = () => {
  const { speaker, updateRecord } = useContext(SpeakerContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const doneCallback = () => {
    setIsUpdating(false);
    console.log('onFavoriteToggle');
  };

  return (
    <div className="action padB1">
      <span
        onClick={() => {
          setIsUpdating(true);
          updateRecord(
            { ...speaker, favorite: !speaker.favorite },
            doneCallback
          );
        }}
      >
        <i
          className={
            speaker.favorite ? 'fa fa-star orange' : 'fa fa-star-o orange'
          }
        />{' '}
        Favorite{' '}
        {isUpdating ? <span className="fas fa-circle-notch fa-spin" /> : null}
      </span>
    </div>
  );
};

const SpeakerDemographics = () => {
  const {
    speaker: { first, last, bio, company, twitterHandle },
  } = useContext(SpeakerContext);

  return (
    <div className="speaker-info">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="text-truncate w-200">
          {first} {last}
        </h3>
      </div>
      <div>
        <p className="card-desscription">{bio.substring(0, 70)}</p>
        <SpeakerFavorite />
        <div className="social d-flex flex-row mt-4">
          <div className="company">
            <h5>Company</h5>
            <h6>{company}</h6>
          </div>
          <div className="twitter">
            <h5>Twitter</h5>
            <h6>{twitterHandle}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ISpeakerConfig {
  readonly speaker: IRecord;
  readonly updateRecord: ModifyRecordsData;
  readonly insertRecord: ModifyRecordsData;
  readonly deleteRecord: ModifyRecordsData;
  readonly showErrorCard: boolean;
}

const SpeakerNoErrorBoundary = memo(function Speaker({
  showErrorCard,
  ...config
}: ISpeakerConfig) {
  const { showSessions } = useContext(SpeakerFilterContext);

  if (showErrorCard) {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
        <div className="card card-height p-4 mt-4">
          <img src="/images/speaker-99999.jpg" />
          <div>
            <b>Error showing speaker</b>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SpeakerProvider {...config}>
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
        <div className="card card-height p-4 mt-4">
          <SpeakerImage />
          <SpeakerDemographics />
          {showSessions ? <Sessions /> : null}
          <SpeakerDelete />
        </div>
      </div>
    </SpeakerProvider>
  );
},
isEqualSpeakerPredicate);

function isEqualSpeakerPredicate(
  { speaker: { favorite: previuseFavorite } }: ISpeakerConfig,
  { speaker: { favorite: nextFavorite } }: ISpeakerConfig
) {
  return previuseFavorite === nextFavorite;
}

function Speaker(props) {
  return (
    <ErrorBoundary
      errorUI={
        <SpeakerNoErrorBoundary
          {...props}
          showErrorCard={true}
        ></SpeakerNoErrorBoundary>
      }
    >
      <SpeakerNoErrorBoundary {...props}></SpeakerNoErrorBoundary>
    </ErrorBoundary>
  );
}

export default Speaker;
