import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Form, Error, Input, Switcher, Title, Wrapper } from '../components/auth-components';
import GithubButton from '../components/github-btn';

export default function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name, value },
		} = e;
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		if (isLoading || email == '' || password == '') return;
		try {
			setIsLoading(true);
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/');
		} catch (e) {
			if (e instanceof FirebaseError) {
				console.log(e.code, e.message);
				setError(e.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Wrapper>
			<Title>Login 😊</Title>
			<Form onSubmit={onSubmit}>
				<Input onChange={onChange} name='email' value={email} placeholder='Email' type='email' required />
				<Input onChange={onChange} name='password' value={password} placeholder='Password' type='password' required />
				<Input type='submit' value={isLoading ? 'Loading...' : 'Log in'} />
			</Form>
			{error !== '' ? <Error>{error}</Error> : null}
			<Switcher>
				Don't have an account? <Link to='/create-account'>Create one &rarr;</Link>
			</Switcher>
			<GithubButton />
		</Wrapper>
	);
}
