import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './pages/Login';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
function App() {
  return (
    <BrowserRouter >
        <Routes >
          <Route path="/" element={<Chat />}>
            <Route path="/:profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
