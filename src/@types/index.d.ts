declare namespace ApiResponse {
  interface KioskInfo {
    node_id: string;
    flor_nm: string;
    img_path: string;
  }

  interface CarState {
    car_num: string;
    in_dtm: string;
    img_path: string;
    node_id: string;
    flor_nm: string;
  }

  interface Route {
    node_id: string;
    position_x: number;
    position_y: number;
    flor_nm: string;
    rotate: number;
  }
};