import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

const TooltipComponent = ({ triggerElement, children, side, align, open, arrowPadding }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root open={open} delayDuration={0}>
        <Tooltip.Trigger asChild>{triggerElement}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            arrowPadding={arrowPadding ?? 8}
            style={{ zIndex: 999999 }}
            className="TooltipContent text-white px-4 py-2"
            sideOffset={5}
            side={side}
            align={align}>
            {children}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipComponent;
