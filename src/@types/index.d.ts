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
    flor_img_path?: string;
    position_x: number;
    position_y: number;
  }

  interface PathInfo {
    canvas_img: string;
    canvas: { x: number, y: number };
    path: Path[];
  }

  interface Path {
    x: number;
    y: number;
  }
};