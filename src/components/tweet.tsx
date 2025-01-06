import styled from 'styled-components';
import { ITweet } from './timeline';
import { auth, db } from '../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

const Wrapper = styled.div`
	padding: 20px;
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;
const Username = styled.span`
	font-weight: 600;
	font-size: 15px;
`;
const Payload = styled.p`
	font-size: 18px;
`;

const DeleteButton = styled.button`
	width: 80px;
	background-color: #f95757;
	color: white;
	font-weight: 600;
	border: 0;
	font-size: 12px;
	padding: 5px 10px;
	text-transform: uppercase;
	border-radius: 5px;
	cursor: pointer;
`;

const EditButton = styled.button`
	width: 80px;
	background-color: #15b475;
	color: white;
	font-weight: 600;
	border: 0;
	font-size: 12px;
	padding: 5px 10px;
	text-transform: uppercase;
	border-radius: 5px;
	cursor: pointer;
`;

export default function Tweet({ username, tweet, userId, id }: ITweet) {
	const user = auth.currentUser;
	const onDelete = async () => {
		console.log('id', id);
		const ok = confirm('Are you sure you want to delete this tweet?');
		if (!ok || user?.uid !== userId) return;
		try {
			await deleteDoc(doc(db, 'tweets', id));
		} catch (e) {
			console.error(e);
		} finally {
		}
	};
	const onEdit = async () => {
		const editedTweet: string | null = prompt('트윗 내용 수정하기', tweet);
		if (editedTweet === null) return;
		await updateDoc(doc(db, `tweets/${id}`), { tweet: editedTweet });
	};
	return (
		<Wrapper>
			<Username>{username}</Username>
			<Payload>{tweet}</Payload>
			{user?.uid === userId && <EditButton onClick={onEdit}>Edit</EditButton>}
			{user?.uid === userId && <DeleteButton onClick={onDelete}>Delete</DeleteButton>}
		</Wrapper>
	);
}
