import { useState } from 'react';

export default function useSpeakerFilter(
  startShowSessions: boolean,
  startEventYear: string
) {
  const [showSessions, setShowSessions] = useState(startShowSessions);
  const [eventYear, setEventYear] = useState(startEventYear);
  const [searchQuery, setSearchQuery] = useState('');
  const EventYears = [
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
  ];

  return {
    showSessions,
    setShowSessions,
    eventYear,
    searchQuery,
    setEventYear,
    setSearchQuery,
    EventYears,
  };
}
