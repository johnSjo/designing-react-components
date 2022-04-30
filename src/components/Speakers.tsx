import { useState } from 'react';
import { SpeakerFilterProvider } from '../contexts/SpeakerFilterContext';
import SpeakersList from './SpeakersList';
import SpeakersToolbar from './SpeakersToolbar';

const Speakers = () => {
  return (
    <SpeakerFilterProvider startShowSessions={false}>
      <SpeakersToolbar />
      <SpeakersList />
    </SpeakerFilterProvider>
  );
};

export default Speakers;
