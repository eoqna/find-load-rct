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
    column_nm: string;
  }

  interface PathInfo {
    canvas_img: string;
    canvas: { width: number, height: number };
    path: Path[];
  }

  interface Path {
    x: number;
    y: number;
  }
};