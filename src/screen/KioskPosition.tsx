import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Layout } from "../assets/css/common";
import { Colors } from "../utils/colors";
let width: number;
let cvs: Element | null;

const Canvas = styled.div``;

const ParkingImage = styled.img`
  position: absolute;
  width: 90%;
`;

interface PointProps {
  x: number;
  y: number;
};

const defaultPathInfo: ApiResponse.PathInfo[] = [
  {
    canvas: {
      width: 4000,
      height: 4000,
    },
    canvas_img: "http://rnd.daontec.co.kr:8080/self/img/bg/IFC_B7_0.png",
    path: [
      {
        x: 3223,
        y: 1318,
      },
      {
        x: 642,
        y: 1329,
      },
      {
        x: 1924,
        y: 2536,
      },
      {
        x: 3424,
        y: 2534,
      },
      {
        x: 2223,
        y: 954,
      },
      {
        x: 2215,
        y: 964,
      },
      {
        x: 360,
        y: 2925,
      },
      {  
        x: 360,
        y: 2940,
      },
      {
        x: 2757,
        y: 3047,
      },
    ]
  }
];

const KioskPosition = () => {
  const [ imgPath, setImgPath ] = useState("");
  const [ pathInfo ] = useState<ApiResponse.PathInfo[]>(defaultPathInfo);
  const [ convPt, setConvPt ] = useState<PointProps[]>([]);

  /**
   * 캔버스 생성 및 길찾기 정보 초기화 함수
   */
  const init = useCallback(() => {
    cvs = document.querySelector(".canvas-layout");
    width = document.querySelector(".image")?.clientWidth as number;

    if( cvs && width ) {
      cvs.innerHTML += `
        <canvas 
          id="canvas"
          width=${width} 
          height=${width} 
          style="position: relative; z-index: 1000;"
        ></canvas>
      `;

      convertCoordinates(0, width);
      setImgPath(pathInfo[0].canvas_img);
    }
  }, [imgPath]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if( convPt.length > 0 ) {
      for(let i = 0; i < convPt.length; i++) {
        drawLine(i);
      }
    }
  }, [convPt]);

  /**
   * 서버로 부터 받은 노드 좌표 변환
   * 
   * 이미지 사이즈(4000x4000)와 캔버스 사이즈(화면 크기에 따라 변동)의 비율로 좌표 값을 변환하는 함수
   * 
   * @param index : 층 정보(pathInfo)가 여러 개인 경우 받아온 index 값을 구분해 해당 배열 index 좌표 값을 변환
   * @param wd : 생성한 캔버스 width
   */
  const convertCoordinates = useCallback((index: number, wd: number) => {
    const magnification =  Number((wd / pathInfo[0].canvas.width));
    const arr: PointProps[] = [];

    if( convPt.length > 0 ) {
      convPt.splice(0, convPt.length);
    }

    for(let j = 0; j < pathInfo[index].path.length; j++) {
      arr.push({
        x: Math.round(pathInfo[index].path[j].x * magnification),
        y: Math.round(pathInfo[index].path[j].y * magnification),
      });
    }

    setConvPt(arr);
  }, [convPt]);

  /**
   * 변환된 좌표 값으로 캔버스 위에 키오스크 위치를 표시하는 함수
   */
  const drawLine = (i: number) => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      ctx.strokeStyle = Colors.Red;
      ctx.lineCap = "square";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(convPt[i].x, convPt[i].y);
      ctx.lineTo(convPt[i].x+1, convPt[i].y);
      ctx.lineTo(convPt[i].x+1, convPt[i].y+1);
      ctx.lineTo(convPt[i].x, convPt[i].y+1);
      ctx.lineTo(convPt[i].x, convPt[i].y);
      ctx.stroke();
    }
  };

  return (
    <Layout>
      <Canvas className="canvas-layout"></Canvas>
        <ParkingImage
          id="image"
          className="image"
          src={imgPath}
          alt="Parking Image"
        />
    </Layout>
  );
};

export default KioskPosition;