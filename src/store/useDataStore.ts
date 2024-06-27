import { create } from "zustand"

interface DataState {
  platformWidth: number;
  setPlatformWidth: (data: number) => void;
  mobile: boolean;
  isMobile: (data: boolean) => void;
  kiosk: ApiResponse.KioskInfo;
  setKiosk: (data: ApiResponse.KioskInfo) => void;
  carList: ApiResponse.CarState[];
  setCarList: (data: ApiResponse.CarState[]) => void;
  selectCar: ApiResponse.CarState;
  setSelectCar: (data: ApiResponse.CarState) => void;
  pathInfo: ApiResponse.PathInfo[];
  setPathInfo: (data: ApiResponse.PathInfo[]) => void;
};

const defaultKioskState: ApiResponse.KioskInfo = {
  node_id: "",
  flor_nm: "",
  img_path: "",
};

const defaultCarState: ApiResponse.CarState = {
  flor_nm: "",
  img_path: "",
  car_num: "",
  in_dtm: "",
  node_id: "",
  column_nm: "",
};

const useDataStore = create<DataState>()((set) => ({
  platformWidth: 0,
  setPlatformWidth: (data) => set({ platformWidth: data }),
  mobile: false,
  isMobile: (data) => set({ mobile: data }),
  kiosk: defaultKioskState,
  setKiosk: (data) => set({ kiosk: data }),
  carList: [],
  setCarList: (data) => set({ carList: data }),
  selectCar: defaultCarState,
  setSelectCar: (data) => set({ selectCar: data }),
  pathInfo: [],
  setPathInfo: (data) => set({ pathInfo: data }),
}));

export default useDataStore;