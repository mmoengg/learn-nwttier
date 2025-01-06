import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Unsubscribe } from 'firebase/auth';
import Tweet from './tweet';

export interface ITweet {
	id: string;
	tweet: string;
	userId: string;
	username: string;
	createdAt: number;
}

const Wrapper = styled.div`
	display: flex;
	gap: 10px;
	flex-direction: column;
`;

export default function Timeline() {
	const [tweets, setTweet] = useState<ITweet[]>([]);
	useEffect(() => {
		let unsubscribe: Unsubscribe | null = null;
		const fetchTweets = async () => {
			const tweetsQuery = query(collection(db, 'tweets'), orderBy('createdAt', 'desc'), limit(25));
			unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
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
				setTweet(tweets);
			});
		};
		fetchTweets();
		return () => {
			// 값을 반환할 때 실행되는 함수
			// tear down, clean up
			unsubscribe && unsubscribe();
		};
	}, []);
	return (
		<Wrapper>
			{tweets.map((tweet) => (
				<Tweet key={tweet.id} {...tweet} />
			))}
		</Wrapper>
	);
}
