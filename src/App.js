import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import OpenRoute from './components/auth/OpenRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import UserList from './pages/UserList';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}/>
          <Route path='/userlist' element={ <PrivateRoute><UserList/></PrivateRoute> }/>
        </Routes>
    </div>
  );
}

export default App;
