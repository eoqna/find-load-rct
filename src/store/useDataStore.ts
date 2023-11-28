import { create } from "zustand"

interface DataState {
  carNumber: string;
  setCarNumber: (data: string) => void;
}

const useDataStore = create<DataState>()((set) => ({
  carNumber: "",
  setCarNumber: (data) => set({carNumber: data}),
}));

export default useDataStore;