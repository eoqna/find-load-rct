import { create } from "zustand"

interface DataState {
  url: string;
  setUrl: (data: string) => void;
  mobile: boolean;
  isMobile: (data: boolean) => void;
  kiosk: ApiResponse.KioskInfo;
  setKiosk: (data: ApiResponse.KioskInfo) => void;
  kioskList: ApiResponse.Node[];
  setKioskList: (data: ApiResponse.Node[]) => void;
  carList: ApiResponse.CarState[];
  setCarList: (data: ApiResponse.CarState[]) => void;
  selectCar: ApiResponse.CarState;
  setSelectCar: (data: ApiResponse.CarState) => void;
  location: ApiResponse.LocationInfo;
  setLocation: (data: ApiResponse.LocationInfo) => void;
  pathInfo: ApiResponse.PathInfo[];
  setPathInfo: (data: ApiResponse.PathInfo[]) => void;
};

export const defaultKioskState: ApiResponse.KioskInfo = {
  title: "",
  node_id: "",
  rotate: 0,
  err_msg: "",
};

const defaultCarState: ApiResponse.CarState = {
  flor_nm: "",
  img_path: "",
  car_num: "",
  in_dtm: "",
  node_id: "",
  column_nm: "",
};

const defaultLocationState: ApiResponse.LocationInfo = {
  flor_nm: "",
  flor_tp_nm: "",
  canvas_img: "",
  canvas: { width: 0, height: 0 },
  position: { x: 0, y: 0, width: 0, height: 0, rotate: 0 },
};

const useDataStore = create<DataState>()((set) => ({
  url: "",
  setUrl: (data) => set({ url: data }),
  mobile: false,
  isMobile: (data) => set({ mobile: data }),
  kiosk: defaultKioskState,
  setKiosk: (data) => set({ kiosk: data }),
  kioskList: [],
  setKioskList: (data) => set({ kioskList: data }),
  carList: [],
  setCarList: (data) => set({ carList: data }),
  selectCar: defaultCarState,
  setSelectCar: (data) => set({ selectCar: data }),
  location: defaultLocationState,
  setLocation: (data) => set({ location: data }),
  pathInfo: [],
  setPathInfo: (data) => set({ pathInfo: data }),
}));

export default useDataStore;