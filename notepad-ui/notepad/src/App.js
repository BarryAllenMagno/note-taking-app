import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateNotepad from './components/CreateNotepad';

function App() {
  return (
    <>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateNotepad />} />
          </Routes>
        </Router>

      </ChakraProvider>
    </>
  );
}

export default App;
