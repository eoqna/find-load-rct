import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigations from './navigation/Navigations';
import Modal from './components/Modal';
import useAppStore from './stores/useAppStore';
import useDataStore from './stores/useDataStore';

const App = () => {
  const { modal, openModal } = useAppStore();
  const { isMobile } = useDataStore();

  useEffect(() => {
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (mobile) {
      isMobile(true);
    } else {
      isMobile(false);
    }
  }, []);

  useEffect(() => {
    if (modal.open) {
      const timeout = setTimeout(() => {
        openModal({ 
          open: false, 
          content: [],
        });
      }, 5000);

      return () => {
        clearTimeout(timeout);
      }
    }
  }, [modal]);

  return (
    <BrowserRouter>
      {/* <Modal /> */}
      {modal.open && <Modal />}
      <Navigations />
    </BrowserRouter>
  );
}

export default App;
