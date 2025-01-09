declare namespace ApiResponse {
  interface KioskInfo {
    title: string;
    node_id: string;
    rotate: number;
    err_msg: string;
  }

  interface Node {
    node_id: string;
  }

  interface CarState {
    car_num: string;
    in_dtm: string;
    img_path: string;
    node_id: string;
    flor_nm: string;
    column_nm: string;
  }

  interface CommonPathInfo {
    flor_nm: string;
    flor_tp_nm: string;
    canvas_img: string;
    canvas: { width: number, height: number };
  }

  interface LocationInfo extends CommonPathInfo {
    position: Position;
  }

  interface PathInfo extends CommonPathInfo {
    path: Path[];
  }

  interface Position {
    x: number;
    y: number;
    width: number;
    height: number;
    rotate: number;
  }

  interface Path {
    x: number;
    y: number;
  }
};