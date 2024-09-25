import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Blogs, Signin, Signup } from './pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Blogs />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
    </Routes>
  );
}

export default App;
