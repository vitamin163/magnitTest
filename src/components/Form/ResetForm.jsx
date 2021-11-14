import { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';

export const ResetForm = ({ isLoading, error }) => {
  const { resetForm } = useFormikContext();
  const firstRender = useRef(null);
  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
      return;
    }
    if (!isLoading && !error) {
      resetForm();
    }
  }, [isLoading, error, resetForm]);
  return null;
};
