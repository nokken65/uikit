import { Heading } from './Heading';

export const HeadingStory = () => {
  return (
    <div className='flex flex-col gap-2'>
      <Heading type='h1'>Title</Heading>
      <Heading type='h2'>Title</Heading>
      <Heading type='h3'>Title</Heading>
      <Heading type='h4'>Title</Heading>
      <Heading type='h5'>Title</Heading>
      <Heading type='h6'>Title</Heading>
      <br />

      <Heading bold={false}>Title</Heading>
      <Heading>title</Heading>
      <Heading uppercase>title</Heading>
    </div>
  );
};
HeadingStory.storyName = 'Heading';

export default {
  title: 'Heading',
};
