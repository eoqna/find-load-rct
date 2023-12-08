declare namespace ApiResponse {
  interface KioskInfo {
    parking_uuid: number;
    flor: string;
    no: number;
    parking_img: string;
  }

  interface CarState {
    flor: string;
    parking_img: string;
    car_number: string;
    parking_dtm: string;
  }
};