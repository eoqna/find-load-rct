import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigations from './navigation/Navigations';
import Modal from './screen/Modal';
import useAppStore from './store/useAppStore';

const App = () => {
  const { modal, setModal } = useAppStore();

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
  });

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
