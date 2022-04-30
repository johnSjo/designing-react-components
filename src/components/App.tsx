import { AuthProvider } from '../contexts/AuthContext';
import Header from './Header';
import Layout from './Layout';
import Speakers from './Speakers';

const App = () => {
  return (
    <AuthProvider initialLoggedInUser="Ronald">
      <Layout startTheme="light">
        <div>
          <Header />
          <Speakers />
        </div>
      </Layout>
    </AuthProvider>
  );
};

export default App;
