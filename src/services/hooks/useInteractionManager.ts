import {useState, useEffect} from 'react';
import {InteractionManager} from 'react-native';

export default function useInteractionManager() {
  const [interactionsComplete, setInteractionsComplete] = useState(false);

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      setInteractionsComplete(true);
    });

    return () => {
      interactionPromise.cancel();
    };
  }, []);

  return interactionsComplete;
}
