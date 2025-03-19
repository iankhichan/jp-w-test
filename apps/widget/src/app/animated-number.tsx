import { useSpring, animated } from '@react-spring/web';
export const AnimatedNumber = ({ value }: { value: number }) => {
  const props = useSpring({
    number: value,
    from: { number: 0 },
    config: { tension: 250, friction: 500 },
  });

  // TODO: animating from zero to big number is unnecessary. Consider doing animation only when increament is substantially small
  return (
    <animated.div className={'min-w-[15ch]'}>
      {props.number.to((n) =>
        n.toLocaleString('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      )}
    </animated.div>
  );
};
