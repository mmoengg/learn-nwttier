import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { ITweet } from '../components/timeline';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import Tweet from '../components/tweet';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 20px;
`;

const Tweets = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	gap: 10px;
`;

const Name = styled.span`
	font-size: 22px;
`;

export default function Profile() {
	const user = auth.currentUser;
	const [tweets, setTweets] = useState<ITweet[]>([]);

	const fetchTweets = async () => {
		const tweetQuery = query(collection(db, 'tweets'), where('userId', '==', user?.uid), orderBy('createdAt', 'desc'), limit(25));
		const snapshot = await getDocs(tweetQuery);
		const tweets = snapshot.docs.map((doc) => {
			const { tweet, createdAt, userId, username, photo } = doc.data();
			return {
				tweet,
				createdAt,
				userId,
				username,
				photo,
				id: doc.id,
			};
		});
		setTweets(tweets);
	};
	useEffect(() => {
		fetchTweets();
	}, []);
	return (
		<Wrapper>
			<Name>{user?.displayName ?? 'Anonymous'}</Name>
			<Tweets>
				{tweets.map((tweet) => (
					<Tweet key={tweet.id} {...tweet} />
				))}
			</Tweets>
		</Wrapper>
	);
}
