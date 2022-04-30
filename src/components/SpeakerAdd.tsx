import withAuth from './WithAuth';

function SpeakerAdd({ eventYear, insertRecord, loggedInUser }) {
  if (!loggedInUser || loggedInUser.length === 0) return null;

  return (
    <a href="#" className="addSes">
      <i
        onClick={(event) => {
          event.preventDefault();
          const firstLast = window.prompt('Enter fist/last name:', '');
          const [first, last] = firstLast.split(' ');

          insertRecord({
            id: '99999', // NOTE: temp id, correct one will be set by the server
            first,
            last,
            bio: 'Bio missing',
            sessions: [
              {
                id: '88888',
                title: `New session for: ${last}`,
                room: {
                  name: 'Main ball room',
                },
                eventYear,
              },
            ],
          });
        }}
      >
        +
      </i>
    </a>
  );
}

export default withAuth(SpeakerAdd);
