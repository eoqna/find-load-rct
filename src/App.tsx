import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigations from './navigation/Navigations';
import Modal from './screen/Modal';
import useAppStore from './store/useAppStore';
import useDataStore from './store/useDataStore';

const App = () => {
  const { modal, setModal } = useAppStore();
  const { setPlatformWidth, isMobile } = useDataStore();

  const setInnerWidth = () => {
    setPlatformWidth(window.innerWidth);

    console.log(window.innerWidth);

    if(window.innerWidth < 800) {
      isMobile(true);
    } else {
      isMobile(false);
    }
  };

  useEffect(() => {
    setInnerWidth();

    window.addEventListener("resize", setInnerWidth);
  }, []);

  useEffect(() => {
    if( modal.open ) {
      const timeout = setTimeout(() => {
        setModal({ open: false, content: "" });
      }, 5000);

      return () => {
        clearTimeout(timeout);
      }
    }
  }, [modal, setModal]);

  return (
    <BrowserRouter>
      { modal.open && <Modal /> }
      <Navigations />
    </BrowserRouter>
  );
}

export default App;
