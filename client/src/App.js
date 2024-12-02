import './App.css';
// import { Button } from '@chakra-ui/react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';

function App() {
  return (
    <div className="App">
      {/* <Button colorScheme='blue'>Button</Button> */}
      <Router>
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
      </Router>
    </div>
  );
}

export default App;
