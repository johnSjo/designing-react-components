import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import withAuth from './WithAuth';

const Header = ({ loggedInUser, setLoggedInUser }) => {
  const { theme } = useContext(ThemeContext);

  function LoggedIn({ loggedInUser, setLoggedInUser }) {
    return (
      <div>
        <span>Logged in as: {loggedInUser}</span>
        <button
          className="btn btn-secondary"
          onClick={() => setLoggedInUser(null)}
        >
          Logout
        </button>
      </div>
    );
  }

  function NotLoggedIn({ setLoggedInUser }) {
    return (
      <button
        className="btn-secondary"
        onClick={(e) => {
          e.preventDefault();
          const userName = window.prompt('Enter login name: ', '');
          setLoggedInUser(userName);
        }}
      >
        Login
      </button>
    );
  }

  return (
    <div className="padT4 padB4">
      <div className="container mobile-container">
        <div className="d-flex justify-content-between">
          <div>
            <img alt="SVCC Home Page" src="/images/SVCCLogo.png" />
          </div>
          <div className="light">
            <h4 className="header-title">Silicon Valley Code Camp</h4>
          </div>
          <div className={theme === 'light' ? '' : 'text-info'}>
            {loggedInUser ? (
              <LoggedIn
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            ) : (
              <NotLoggedIn setLoggedInUser={setLoggedInUser} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Header);
