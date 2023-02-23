import { useState, useEffect } from 'react';
import translate from '../../Translation';
import logo from '../../../assets/logo.png';

import './style.css';
import { handleInputChange, handleSubmit } from './handlers';

const t = translate;
const username = 'username';
const password = 'password';

const Login = ({ setToken }) => {
	const [inputs, setInputs] = useState({ email: '', password: '' });
	const [error, setError] = useState('');

	useEffect(() => {
		if (error) {
			setInterval(() => setError(''), 5000);
		}
	}, [error]);

	return (
		<div className='login'>
			{error && <h2>{error}</h2>}
			<img className='login__logo' src={logo} />
			<form className='login__form'>
				<label className='login__username-label' htmlFor={username}>
					{t('USERNAME')}
				</label>
				<input
					value={inputs.username}
					onChange={handleInputChange('email', setInputs)}
					className='login__username-input'
					type='text'
					id={username}
					name={username}
				/>
				<label className='login__password-label' htmlFor={password}>
					{t('PASSWORD')}
				</label>
				<input
					value={inputs.password}
					onChange={handleInputChange('password', setInputs)}
					className='login__password-input'
					type='password'
					id={password}
					name={password}
				/>
			</form>
			<button
				disabled={error}
				onClick={handleSubmit.bind(null, inputs, setError, setToken)}
				className='login__submit'>
				{t('LOGIN')}
			</button>
		</div>
	);
};

export default Login;
