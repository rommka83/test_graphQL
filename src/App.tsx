import { Navigate } from 'react-router-dom';

function App() {
  const token = localStorage.getItem('token');

  return token ? <Navigate to='/login' /> : null;
}

export default App;
