import React, { useRef, useState, useEffect } from 'react';

function isNumber(n) {
  const number = parseFloat(n);
  return !isNaN(number) && isFinite(number);
}

function isPercentage(height) {
  // Percentage height
  return (
    typeof height === 'string' && height[height.length - 1] === '%' && isNumber(height.substring(0, height.length - 1))
  );
}

function hideContent(element, height, disableDisplayNone) {
  // Check for element?.style is added cause this would fail in tests (react-test-renderer)
  // Read more here: https://github.com/Stanko/react-animate-height/issues/17
  if (height === 0 && !disableDisplayNone && element?.style && element?.children.length > 0) {
    element.style.display = 'none';
  }
}

function showContent(element, height) {
  // Check for element?.style is added cause this would fail in tests (react-test-renderer)
  // Read more here: https://github.com/Stanko/react-animate-height/issues/17
  if (height === 0 && element?.style) {
    element.style.display = '';
  }
}

const ANIMATION_STATE_CLASSES = {
  animating: 'rah-animating',
  animatingUp: 'rah-animating--up',
  animatingDown: 'rah-animating--down',
  animatingToHeightZero: 'rah-animating--to-height-zero',
  animatingToHeightAuto: 'rah-animating--to-height-auto',
  animatingToHeightSpecific: 'rah-animating--to-height-specific',
  static: 'rah-static',
  staticHeightZero: 'rah-static--height-zero',
  staticHeightAuto: 'rah-static--height-auto',
  staticHeightSpecific: 'rah-static--height-specific',
};

function getStaticStateClasses(animationStateClasses, height) {
  return [
    animationStateClasses.static,
    height === 0 && animationStateClasses.staticHeightZero,
    typeof height === 'number' && height > 0 ? animationStateClasses.staticHeightSpecific : null,
    height === 'auto' && animationStateClasses.staticHeightAuto,
  ]
    .filter((v) => v)
    .join(' ');
}

// ------------------ Component

const propsToOmitFromDiv = [
  'animateOpacity',
  'animationStateClasses',
  'applyInlineTransitions',
  'children',
  'className',
  'contentClassName',
  'contentRef',
  'delay',
  'duration',
  'easing',
  'height',
  'onHeightAnimationEnd',
  'onHeightAnimationStart',
  'style',
  'disableDisplayNone',
];

// display and height are set by the component itself, therefore ignored

const AnimateHeight = React.forwardRef((componentProps, ref) => {
  // const AnimateHeight = forwardRef((componentProps: AnimateHeightProps, ref) => {
  // const AnimateHeight: React.FC<AnimateHeightProps> = (componentProps) => {
  const {
    animateOpacity = false,
    animationStateClasses = {},
    applyInlineTransitions = true,
    children,
    className = '',
    contentClassName,
    delay: userDelay = 0,
    disableDisplayNone = false,
    duration: userDuration = 500,
    easing = 'ease',
    height,
    onHeightAnimationEnd,
    onHeightAnimationStart,
    style,
    contentRef,
  } = componentProps;

  const divProps = { ...componentProps };
  propsToOmitFromDiv.forEach((propKey) => {
    delete divProps[propKey];
  });

  // ------------------ Initialization
  const prevHeight = useRef(height);
  const contentElement = useRef(null);

  const animationClassesTimeoutID = useRef();
  const timeoutID = useRef();

  const stateClasses = useRef({
    ...ANIMATION_STATE_CLASSES,
    ...animationStateClasses,
  });

  const isBrowser = typeof window !== 'undefined';

  const prefersReducedMotion = useRef(
    isBrowser && window.matchMedia ? window.matchMedia('(prefers-reduced-motion)').matches : false,
  );

  const delay = prefersReducedMotion.current ? 0 : userDelay;
  const duration = prefersReducedMotion.current ? 0 : userDuration;

  let initHeight = height;
  let initOverflow = 'visible';

  if (typeof height === 'number') {
    // Reset negative height to 0
    initHeight = height < 0 ? 0 : height;
    initOverflow = 'hidden';
  } else if (isPercentage(initHeight)) {
    // If value is string "0%" make sure we convert it to number 0
    initHeight = height === '0%' ? 0 : height;
    initOverflow = 'hidden';
  }

  const [currentHeight, setCurrentHeight] = useState(initHeight);
  const [overflow, setOverflow] = useState(initOverflow);
  const [useTransitions, setUseTransitions] = useState(false);
  const [animationStateClassNames, setAnimationStateClassNames] = useState(
    getStaticStateClasses(stateClasses.current, height),
  );

  // ------------------ Did mount
  useEffect(() => {
    // Hide content if height is 0 (to prevent tabbing into it)
    hideContent(contentElement.current, currentHeight, disableDisplayNone);

    // This should be explicitly run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ------------------ Height update
  useEffect(() => {
    if (height !== prevHeight.current && contentElement.current) {
      showContent(contentElement.current, prevHeight.current);

      // Cache content height
      contentElement.current.style.overflow = 'hidden';
      const contentHeight = contentElement.current.offsetHeight;
      contentElement.current.style.overflow = '';

      // set total animation time
      const totalDuration = duration + delay;

      let newHeight;
      let timeoutHeight;
      let timeoutOverflow = 'hidden';
      let timeoutUseTransitions;

      const isCurrentHeightAuto = prevHeight.current === 'auto';

      if (typeof height === 'number') {
        // Reset negative height to 0
        newHeight = height < 0 ? 0 : height;
        timeoutHeight = newHeight;
      } else if (isPercentage(height)) {
        // If value is string "0%" make sure we convert it to number 0
        newHeight = height === '0%' ? 0 : height;
        timeoutHeight = newHeight;
      } else {
        // If not, animate to content height
        // and then reset to auto
        newHeight = contentHeight; // TODO solve contentHeight = 0
        timeoutHeight = 'auto';
        timeoutOverflow = undefined;
      }

      if (isCurrentHeightAuto) {
        // This is the height to be animated to
        timeoutHeight = newHeight;

        // If previous height was 'auto'
        // set starting height explicitly to be able to use transition
        newHeight = contentHeight;
      }

      // Animation classes
      const newAnimationStateClassNames = [
        stateClasses.current.animating,
        (prevHeight.current === 'auto' || height < prevHeight.current) && stateClasses.current.animatingUp,
        (height === 'auto' || height > prevHeight.current) && stateClasses.current.animatingDown,
        timeoutHeight === 0 && stateClasses.current.animatingToHeightZero,
        timeoutHeight === 'auto' && stateClasses.current.animatingToHeightAuto,
        typeof timeoutHeight === 'number' && timeoutHeight > 0 ? stateClasses.current.animatingToHeightSpecific : null,
      ]
        .filter((v) => v)
        .join(' ');

      // Animation classes to be put after animation is complete
      const timeoutAnimationStateClasses = getStaticStateClasses(stateClasses.current, timeoutHeight);

      // Set starting height and animating classes
      // When animating from 'auto' we first need to set fixed height
      // that change should be animated
      setCurrentHeight(newHeight);
      setOverflow('hidden');
      setUseTransitions(!isCurrentHeightAuto);
      setAnimationStateClassNames(newAnimationStateClassNames);

      // Clear timeouts
      clearTimeout(timeoutID.current);
      clearTimeout(animationClassesTimeoutID.current);

      if (isCurrentHeightAuto) {
        // When animating from 'auto' we use a short timeout to start animation
        // after setting fixed height above
        timeoutUseTransitions = true;

        // Short timeout to allow rendering of the initial animation state first
        timeoutID.current = setTimeout(() => {
          setCurrentHeight(timeoutHeight);
          setOverflow(timeoutOverflow);
          setUseTransitions(timeoutUseTransitions);

          // ANIMATION STARTS, run a callback if it exists
          onHeightAnimationStart?.(timeoutHeight);
        }, 50);

        // Set static classes and remove transitions when animation ends
        animationClassesTimeoutID.current = setTimeout(() => {
          setUseTransitions(false);
          setAnimationStateClassNames(timeoutAnimationStateClasses);

          // ANIMATION ENDS
          // Hide content if height is 0 (to prevent tabbing into it)
          hideContent(contentElement.current, timeoutHeight, disableDisplayNone);
          // Run a callback if it exists
          onHeightAnimationEnd?.(timeoutHeight);
        }, totalDuration);
      } else {
        // ANIMATION STARTS, run a callback if it exists
        onHeightAnimationStart?.(newHeight);

        // Set end height, classes and remove transitions when animation is complete
        timeoutID.current = setTimeout(() => {
          setCurrentHeight(timeoutHeight);
          setOverflow(timeoutOverflow);
          setUseTransitions(false);
          setAnimationStateClassNames(timeoutAnimationStateClasses);

          // ANIMATION ENDS
          // If height is auto, don't hide the content
          // (case when element is empty, therefore height is 0)
          if (height !== 'auto') {
            // Hide content if height is 0 (to prevent tabbing into it)
            hideContent(contentElement.current, newHeight, disableDisplayNone); // TODO solve newHeight = 0
          }
          // Run a callback if it exists
          onHeightAnimationEnd?.(newHeight);
        }, totalDuration);
      }
    }

    prevHeight.current = height;

    return () => {
      clearTimeout(timeoutID.current);
      clearTimeout(animationClassesTimeoutID.current);
    };

    // This should be explicitly run only on height change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  // ------------------ Render

  const componentStyle = {
    ...style,
    height: currentHeight,
    overflow: overflow || style?.overflow,
  };

  if (useTransitions && applyInlineTransitions) {
    componentStyle.transition = `height ${duration}ms ${easing} ${delay}ms`;

    // Include transition passed through styles
    if (style?.transition) {
      componentStyle.transition = `${style.transition}, ${componentStyle.transition}`;
    }

    // Add webkit vendor prefix still used by opera, blackberry...
    componentStyle.WebkitTransition = componentStyle.transition;
  }

  const contentStyle = {};

  if (animateOpacity) {
    contentStyle.transition = `opacity ${duration}ms ${easing} ${delay}ms`;
    // Add webkit vendor prefix still used by opera, blackberry...
    contentStyle.WebkitTransition = contentStyle.transition;

    if (currentHeight === 0) {
      contentStyle.opacity = 0;
    }
  }

  // Check if user passed aria-hidden prop
  const hasAriaHiddenProp = typeof divProps['aria-hidden'] !== 'undefined';
  const ariaHidden = hasAriaHiddenProp ? divProps['aria-hidden'] : height === 0;

  return (
    <div
      {...divProps}
      aria-hidden={ariaHidden}
      className={`${animationStateClassNames} ${className}`}
      style={componentStyle}
      ref={ref}>
      <div
        className={contentClassName}
        style={contentStyle}
        ref={(el) => {
          contentElement.current = el;

          if (contentRef) {
            contentRef.current = el;
          }
        }}>
        {children}
      </div>
    </div>
  );
});

export default AnimateHeight;
