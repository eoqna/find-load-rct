import { create } from "zustand"

interface DataState {
  kiosk: ApiResponse.KioskInfo;
  setKiosk: (data: ApiResponse.KioskInfo) => void;
  selectCar: ApiResponse.CarState;
  setSelectCar: (data: ApiResponse.CarState) => void;
  platformWidth: number;
  setPlatformWidth: (data: number) => void;
  mobile: boolean;
  isMobile: (data: boolean) => void;
};

const defaultKioskState: ApiResponse.KioskInfo = {
  parking_uuid: 0,
  flor: "",
  no: 0,
  parking_img: "",
};

const defaultCarState: ApiResponse.CarState = {
  flor: "",
  parking_img: "",
  car_number: "",
  parking_dtm: "",
};

const useDataStore = create<DataState>()((set) => ({
  kiosk: defaultKioskState,
  setKiosk: (data) => set({ kiosk: data }),
  selectCar: defaultCarState,
  setSelectCar: (data) => set({ selectCar: data }),
  platformWidth: 0,
  setPlatformWidth: (data) => set({ platformWidth: data }),
  mobile: false,
  isMobile: (data) => set({ mobile: data }),
}));

export default useDataStore;