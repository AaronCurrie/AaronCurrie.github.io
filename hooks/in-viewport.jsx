import { useState, useEffect, useRef } from 'react';

const useInViewPort = (threshold) => {
  const ref = useRef();
  const [inViewPort, setInViewPort] = useState(false);
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: threshold || 0.25,
  };

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInViewPort(true);
          // eslint-disable-next-line no-use-before-define
          observer.unobserve(ref.current);
        }
      });
    };
    // eslint-disable-next-line no-undef
    const observer = new IntersectionObserver(callback, options);
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  });
  return [ref, inViewPort];
};

export default useInViewPort;
