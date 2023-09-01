import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

const MyTooltip = ({ triggerElement, children, side, align, open }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root open={open} delayDuration={0}>
        <Tooltip.Trigger asChild>{triggerElement}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            arrowPadding={8}
            className="TooltipContent text-white p-4 z-10"
            sideOffset={5}
            side={side}
            align={align}
          >
            {children}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default MyTooltip;
