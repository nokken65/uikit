import { Heading } from './Heading';

export const HeadingStory = () => {
  return (
    <div className='flex gap-4'>
      <Heading>Title</Heading>
    </div>
  );
};
HeadingStory.storyName = 'Heading';

export default {
  title: 'Heading',
};
