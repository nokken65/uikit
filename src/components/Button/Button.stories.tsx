import { Story } from '@ladle/react';

import { Button, BUTTON_TYPES, ButtonProps } from './Button';

export const ButtonVariantsStory = () => {
  return (
    <div className='flex w-fit flex-col gap-2'>
      <Button>Button</Button>
      <Button rounded={false}>Button</Button>
      <Button type='ghost'>Button</Button>
      <Button rounded={false} type='ghost'>
        Button
      </Button>
    </div>
  );
};
ButtonVariantsStory.storyName = 'Variants';

type ControlsProps = Pick<ButtonProps, 'type' | 'bold' | 'rounded' | 'ripple'>;

export const Controls: Story<ControlsProps> = (props) => (
  <Button {...props}>button</Button>
);

Controls.args = {
  bold: true,
  rounded: true,
  ripple: true,
};

Controls.argTypes = {
  type: {
    name: 'type',
    control: { type: 'select' },
    options: BUTTON_TYPES,
  },
};

Controls.storyName = 'Button';

export default {
  title: 'Button',
};
