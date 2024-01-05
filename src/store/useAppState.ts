import { create } from "zustand";

interface ModalState {
  open: boolean;
  content: string;
}

interface DataState {
  modal: ModalState;
  setModal: (data: ModalState) => void;
};

const defaultModalState: ModalState = {
  open: false,
  content: "",
}

const useAppStore = create<DataState>()((set) => ({
  modal: defaultModalState,
  setModal: (data) => set({ modal: data }),
}));

export default useAppStore;