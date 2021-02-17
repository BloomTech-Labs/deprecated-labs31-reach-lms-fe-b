import { useEffect, useRef } from 'react';

export const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();

  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);

  const prevVisible = prevVisibleRef.current;

  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible, form, prevVisible]);
};
