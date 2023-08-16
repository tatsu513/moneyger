import AlertType from '@/types/AlertType';
import { useCallback, useState } from 'react';

const useAlert = () => {
  const [alertType, setAlertType] = useState<AlertType>('none');
  const setSuccess = useCallback(() => {
    setAlertType('success');
  }, []);
  const setError = useCallback(() => {
    setAlertType('error');
  }, []);
  const setProcessing = useCallback(() => {
    setAlertType('processing');
  }, []);
  const setNone = useCallback(() => {
    setAlertType('none');
  }, []);
  return {
    alertType,
    setSuccess,
    setError,
    setProcessing,
    setNone,
  };
};

export default useAlert;
