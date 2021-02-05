import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import { Box, Container } from '@chakra-ui/react';
import Timer from './components/Timer';

function App() {
  return (
    <Box width="100vw" height="100vh" bg="pink">
      <Container centerContent>
        <Header />
        <Timer />
        <Tasks />
      </Container>
    </Box>
  );
}

export default App;
