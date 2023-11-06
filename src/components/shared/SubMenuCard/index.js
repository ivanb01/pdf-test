import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

const SubMenuContent = ({ triggerElement, children, side, align, open, style, className }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root open={open} delayDuration={0}>
        <Tooltip.Trigger asChild>{triggerElement}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            style={{ zIndex: 999999, ...style }}
            className={!children ? '' : `TooltipContent text-white  ${className}`}
            side={side}
            align={align}>
            {children}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default SubMenuContent;
