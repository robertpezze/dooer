import Playground from './Playground';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

function App() {

  return (
    <div className="app">
      <h1><FontAwesomeIcon icon={faDatabase} /> Transform JSON-objects with Jsonata</h1>
      <Playground />
    </div>
  );
}

export default App;
