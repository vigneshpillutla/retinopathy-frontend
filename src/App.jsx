import './App.css';
import { Home, Login, Register } from 'components';
import { Route, Routes } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <LoadingScreen />
    </>
  );
}

export default App;
