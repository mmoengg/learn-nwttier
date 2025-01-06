import styled from 'styled-components';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Button = styled.span`
	background-color: white;
	width: 420px;
	margin-top: 50px;
	font-weight: 500;
	padding: 10px 20px;
	border-radius: 50px;
	color: black;
	border: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	cursor: pointer;
`;

const Logo = styled.img`
	height: 25px;
`;

export default function GithubButton() {
	const navigator = useNavigate();
	const onClick = async () => {
		try {
			const provider = new GithubAuthProvider();
			await signInWithPopup(auth, provider);
			navigator('/');
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<Button onClick={onClick}>
			<Logo src='/github-logo.svg' alt='Github Logo' />
			Contivue with Github
		</Button>
	);
}
