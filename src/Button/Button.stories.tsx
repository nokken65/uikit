import { Button } from './Button';

export const ButtonVariantsStory = () => {
  return (
    <div className='flex gap-2'>
      <Button>Button</Button>
      <Button rounded={false}>Button</Button>
    </div>
  );
};
ButtonVariantsStory.storyName = 'variants';

export default {
  title: 'Button',
};
