import { useEffect } from 'react';

export function useClickAway({ ref, handleClickAway }) {
  useEffect(() => {
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClickAway(event);
      }
    }

    function handleKey(event) {
      if (ref.current && event.key === 'Escape') {
        handleClickAway(event);
      }
    }

    document.addEventListener('mouseup', handleOutsideClick);
    document.addEventListener('keyup', handleKey);

    return function() {
      document.removeEventListener('mouseup', handleOutsideClick);
      document.removeEventListener('keyup', handleKey);
    };
  }, [ref, handleClickAway]);
}
