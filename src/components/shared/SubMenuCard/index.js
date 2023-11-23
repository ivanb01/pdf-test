import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
const SubMenuContent = ({ triggerElement, children, side, align, open, style, className }) => {
  return (
    <HoverCard.Root open={open} openDelay={0} closeDelay={0}>
      <HoverCard.Trigger asChild>{triggerElement}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          style={{ zIndex: 999999, ...style }}
          className={!children ? '' : ` text-white ${className}`}
          side={side}
          align={align}>
          {children && children}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default SubMenuContent;
