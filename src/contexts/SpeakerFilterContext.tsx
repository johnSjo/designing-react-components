import { createContext } from 'react';
import useSpeakerFilter from '../hooks/UseSpeakerFilter';

export const SpeakerFilterContext = createContext(null);

export function SpeakerFilterProvider({
  startShowSessions = true,
  startEventYear = '2019',
  children,
}) {
  const speakerFilterValues = useSpeakerFilter(
    startShowSessions,
    startEventYear
  );

  return (
    <SpeakerFilterContext.Provider value={speakerFilterValues}>
      {children}
    </SpeakerFilterContext.Provider>
  );
}
