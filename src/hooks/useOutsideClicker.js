import { useEffect, useCallback } from "react";

const useOutsideClicker = (modalRef, closeHandler) => {
  const handleMouseDownOutside = useCallback(e => {
    if (!modalRef.current?.contains(e.target)) {
      closeHandler();
    }
  }, [modalRef, closeHandler]);
  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDownOutside);
    return () =>
      window.removeEventListener("mousedown", handleMouseDownOutside);
  }, [handleMouseDownOutside]);
};

export default useOutsideClicker;
