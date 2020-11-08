import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from '../../Input/Input';
import Loading from '../../Loading/Loading';
import { loginWithEmail } from '../../../redux-store/actions/auth';
import loginStyle from './login.module.scss';

const LoginUser = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const emailHandler = (e) => {
		const userEmail = e.target.value;
		setEmail(() => userEmail);
	};
	const passwordHandler = (e) => {
		const pass = e.target.value;
		setPassword(() => pass);
	};

	const onSubmitLogin = (e) => {
		e.preventDefault();
		setLoading(() => true);
		dispatch(loginWithEmail({ email, password }));
		setInterval(() => {
			setLoading(() => false);
		}, 5000);
	};

	if (loading) return <Loading />;

	return (
		<>
			<h2>Sign in</h2>
			<form onSubmit={onSubmitLogin} className={loginStyle.FormContainer}>
				<Input
					type="text"
					placeholder="Email address"
					value={email}
					onChange={emailHandler}
					required={true}
				/>
				<Input
					type="password"
					placeholder="Password"
					value={password}
					onChange={passwordHandler}
					required={true}
				/>
				<div className={loginStyle.BtnContainer}>
					<input
						type="submit"
						value="Sign in"
						className={loginStyle.SubmitBtn}
					/>
					<input
						type="button"
						value="I dont' have account"
						className={loginStyle.ChangeLink}
						onClick={() => {
							history.push('/register');
						}}
					/>
				</div>

				<div className={loginStyle.SocialBtnContainer}>
					<button>
						<img
							src="https://www.flaticon.com/svg/static/icons/svg/281/281764.svg"
							alt="google"
						/>
						Sign in
					</button>
					<button>
						<img
							src="https://www.flaticon.com/svg/static/icons/svg/733/733547.svg"
							alt="google"
						/>
						Sign in
					</button>
				</div>
			</form>
		</>
	);
};

export default LoginUser;