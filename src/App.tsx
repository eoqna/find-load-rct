import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navigation from './screen/Navigation';
import Modal from './screen/Modal';
import useAppStore from './store/useAppState';

const App = () => {
  const { modal, setModal } = useAppStore();

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
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
