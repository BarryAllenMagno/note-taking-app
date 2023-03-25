import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>

      </ChakraProvider>
    </>
  );
}

export default App;
