import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
	const [token, setToken] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			navigate('/');
		}
	}, [token]);

	return (
		<Routes>
			<Route
				path='/'
				element={
					token ? <Dashboard token={token} /> : <Login setToken={setToken} />
				}
			/>
			<Route path='/login' element={<Login setToken={setToken} />} />
			<Route
				path='*'
				element={
					token ? <Dashboard token={token} /> : <Login setToken={setToken} />
				}
			/>
		</Routes>
	);
}

export default App;
