import './App.css';
import Header from './components/Header.js';
import Timer from './components/Timer';
import Tasks from './components/Tasks';
import { Container } from '@chakra-ui/react';


function App() {
  return (
    <div>
      <Container bg="black"  w="100%" centerContent>
        <Header />
        <Timer />
        <Tasks />
      </Container>
    </div>
  );
}

export default App;
