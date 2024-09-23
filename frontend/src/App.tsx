import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Blog, Signin, Signup } from './pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Blog />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
    </Routes>
  );
}

export default App;
