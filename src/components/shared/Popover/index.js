import React from 'react';
import * as Popover from '@radix-ui/react-popover';

const PopoverComponent = ({ triggerElement, children, side, align, style }) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{triggerElement}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          arrowPadding={5}
          style={{ zIndex: 999999, ...style }}
          className="TooltipContent text-white px-4 py-2"
          side={side}
          align={align}>
          {children}
          <Popover.Arrow className="TooltipArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverComponent;
