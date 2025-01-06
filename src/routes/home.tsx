import styled from 'styled-components';
import PostTweetForm from '../components/post-tweet-form';
import Timeline from '../components/timeline';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 50px;
`;

export default function Home() {
	return (
		<Wrapper>
			<PostTweetForm />
			<Timeline />
		</Wrapper>
	);
}
