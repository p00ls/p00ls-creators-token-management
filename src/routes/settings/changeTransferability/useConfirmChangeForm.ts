import {useCallback, useState} from 'react';

export function useConfirmChangeForm() {
  const [confirmed, setConfirmed] = useState(false);

  const toggleConfirmed = useCallback(() => setConfirmed((s) => !s), []);

  return {
    confirmationChecked: confirmed,
    setConfirmationChecked: setConfirmed,
    toggleConfirmationChecked: toggleConfirmed,
  };
}
