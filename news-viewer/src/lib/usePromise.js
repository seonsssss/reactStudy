import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let canceled = false;
    const process = async () => {
      setLoading(true);
      try {
        const result = await promiseCreator();
        if (!canceled) {
          setResolved(result);
        }
      } catch (e) {
        if (!canceled) {
          setError(e);
        }
      }
      if (!canceled) {
        setLoading(false);
      }
    };
    process();
    return () => {
      canceled = true;
    };
  }, [promiseCreator, ...deps]);

  return [loading, resolved, error];
}
