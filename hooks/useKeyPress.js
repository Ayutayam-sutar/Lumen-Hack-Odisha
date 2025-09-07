import { useEffect, useCallback } from 'react';

export const useKeyPress = (callback, keys, metaKey = false) => {
  const onKeyPress = useCallback(
    (event) => {
      const isMetaKeyPressed = metaKey ? event.metaKey || event.ctrlKey : true;
      if (isMetaKeyPressed && keys.includes(event.key)) {
        event.preventDefault();
        callback(event);
      }
    },
    [callback, keys, metaKey]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);
    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, [onKeyPress]);
};
