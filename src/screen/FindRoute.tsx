import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useDataStore from "../store/useDataStore";
import Lottie from "lottie-react";
import LottieData from "../assets/lottie/loading.json";
import ParkingMark from "../assets/imgs/parking_marker.png";
import KioskMark from "../assets/imgs/kiosk_marker.png";
import { Colors } from "../utils/colors";
import { CommonProps } from "../navigation";
import { Layout } from "../assets/css/common";

const Canvas = styled.div``;

const InfoLayout = styled.div`
  position: absolute;
  width: 100%;
  top: calc(0px - 3vmin - 20px);
  text-align: center;
`;

const Information = styled.span`
  font-size: 3vmin;
  font-weight: bold;
  color: ${Colors.Black};
`;

const ParkingPositionText = styled.span`
  font-size: 3vmin;
  font-weight: bold;
  color: ${Colors.Red};
`;

const Floor = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: ${Colors.Black};
  font-size: 4vmin;
  font-weight: bold;
  z-index: 1001;
`;

const ParkingImageLayout = styled.div`
  position: absolute;
  width: 95%;
`;

const ParkingImage = styled.img`
  width: 100%;
  height: 100%;
`;

const LottieLayout = styled.div`
  position: absolute;
  width: 90%;
`;

const LottieView = styled(Lottie)`
  width: 100%;
  height: 100%;
`;

const LottieText = styled.p`
  position: absolute;
  font-weight: bold;
  font-size: 3vmin;
  color: ${Colors.Black};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
`;

const MarkerLayout = styled.div`
  display: none;
`;

const Marker = styled.img``;

interface PointProps {
  x: number;
  y: number;
};

interface FloorInfoProps {
  state: ImageState;
  floor_nm: string;
  img_path: string;
};

interface FloorNameProps {
  first_floor: string;
  second_floor: string;
};

type ImageState = "first" | "waiting" | "second" | "";

const FindRoute = ({ navigation }: CommonProps.ComponentProps) => {
  const { mobile, pathInfo, selectCar } = useDataStore();
  const [ floorInfo, setFloorInfo ] = useState<FloorInfoProps>({ state: "", floor_nm: "", img_path: "" });
  const [ width, setWidth ] = useState(0);
  const [ convPt, setConvPt ] = useState<PointProps[]>([]);
  const [ markerPosition, setMarkerPosition ] = useState<PointProps>({x: 0, y: 0});
  const [ floorName, setFloorName ] = useState<FloorNameProps>({ first_floor: "", second_floor: "" });
  const [ idx, setIdx ] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const parkingMarkerRef = useRef<HTMLImageElement>(null);
  const kioskMarkerRef = useRef<HTMLImageElement>(null);
  let raf: number;
  let i = 0;

  /**
   * 캔버스 생성 및 길찾기 정보 초기화 함수
   * 
   * setFirstFloor : 첫 번째 층 이름 (키오스크 층)
   * setSecondFloor : 두 번째 층 이름 (주차 차량 층)
   * setImageState : 첫 번째 층의 이미지를 보여주기 위해 'first'로 설정
   * convertCoordinates : 서버로 부터 받은 노드 좌표 변환 (이미지 사이즈와 캔버스 사이즈의 비율에 따라 변환)
   * setImgPath : 화면에 보여지는 주차장 이미지 세팅
   */
  const init = useCallback(() => {
    if (canvasRef.current && imgRef.current) {
      const imgWidth = imgRef.current.clientWidth;

      canvasRef.current.innerHTML += `
        <canvas 
          id="canvas"
          width=${imgWidth} 
          height=${imgWidth} 
          style="position: relative; z-index: 1000;"
        ></canvas>
      `;

      setWidth(imgWidth);
      setFloorName({ ...floorName, first_floor: pathInfo[0].flor_nm });
      setFloorInfo({ state: "first", floor_nm: pathInfo[0].flor_nm, img_path: pathInfo[0].canvas_img });
      convertCoordinates(0, imgWidth);
    }
  }, [floorInfo, floorName, width]);

  useEffect(() => {
    if (!pathInfo.length) {
      navigation("/");
    } else {
      init();
    }
  }, []);

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

    if (convPt.length > 0) {
      convPt.splice(0, convPt.length);
    }

    for (let j = 0; j < pathInfo[index].path.length; j++) {
      arr.push({
        x: Math.round(pathInfo[index].path[j].x * magnification),
        y: Math.round(pathInfo[index].path[j].y * magnification),
      });

      if (j === pathInfo[index].path.length - 1) {
        setMarkerPosition({
          x: Math.round(pathInfo[index].path[j].x * magnification - 4.5),
          y: Math.round(pathInfo[index].path[j].y * magnification - 7)
        });
      }
    }

    setConvPt(arr);
  }, [convPt]);

  /**
   * 현 위치 마커 이미지를 표시하는 함수
   * 
   * 1. pathInfo 좌표 중 마지막 좌표 값에 마커 이미지를 표시한다.
   * 2. 2초 후 다음 로직을 수행한다.
   *  - 캔버스 위에 그려진 선을 클리어한다.
   *  - 이미지 상태를 'waitting'으로 변경한다. (로티 이미지)
   *  - 화면에 표시해줄 이미지 상태를 두 번째 주차장 이미지로 변경한다.
   *  - 두 번째 층 좌표를 변환한다.
   */
  const tackLocationMarker = useCallback(() => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      const img = kioskMarkerRef.current as HTMLImageElement;
      ctx.drawImage(img, markerPosition.x, markerPosition.y);
      setIdx((prev) => prev + 1);

      const timer = setTimeout(() => {
        ctx.clearRect(0, 0, 4000, 4000);
        setFloorName({...floorName, second_floor: pathInfo[1].flor_nm });
        setFloorInfo({ ...floorInfo, state: "waiting" });
        convertCoordinates(1, width);

        clearTimeout(timer);
      }, 3000);
    }
  }, [floorInfo]);

  /**
   * 변환된 좌표 값으로 캔버스 위에 선을 그리는 함수
   * 
   * 1. 함수 호출 시 i 값이 0일 경우 첫 번째 좌표로 이동한다.
   * 2. i 값이 좌표 배열 사이즈(rePoint.length)보다 작다면 다음 좌표로 이동한 후 선을 그린다.
   * 3. i 값이 좌표 배열 사이즈보다 크거나 같다면 주차 위치 마커 이미지를 표시한다.
   */
  const drawLine = () => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      ctx.strokeStyle = Colors.Red;
      ctx.lineCap = "square";
      ctx.lineJoin = "round";

      if (mobile) {
        ctx.lineWidth = 2;
      } else {
        ctx.lineWidth = 4;
      }

      if (i < 1) {
        ctx.beginPath();
        ctx.moveTo(convPt[i].x, convPt[i].y);
      }

      if (i >= convPt.length-1) {
        cancelAnimationFrame(raf);
        let img;

        if (!mobile) {
          img = parkingMarkerRef.current as HTMLImageElement;
        } else {
          img = kioskMarkerRef.current as HTMLImageElement;
        }

        ctx.drawImage(img, markerPosition.x, markerPosition.y);
        setIdx(0);
        return;

      } else {
        ctx.lineTo(convPt[i+1].x, convPt[i+1].y);
        ctx.stroke();
        i++;
      }

      raf = requestAnimationFrame(drawLine);
    }
  };

  /**
   * 배경 이미지 로드 함수
   * 
   * 서버로부터 받아온 좌표 값의 사이즈가 1인 경우(층 간 이동 X)
   *  - drawLine() 함수를 호출한다.
   * 
   * 서버로부터 받아온 좌표 값의 사이즈가 1보다 큰 경우(층 간 이동 O)
   *  - idx 값이 0인 경우 tackLocationMarker() 함수를 호출한다.
   *  - idx 값이 0이 아닌 경우 drawLine() 함수를 호출한다.
   */
  const onLoadBackgroundImage = () => {
    if (pathInfo.length <= 1) {
      drawLine();
      return;
    }

    if (idx === 0) {
      tackLocationMarker();
      return;
    }

    drawLine();
  };

  return (
    <Layout>
      <Header title="차량 위치안내" desc="현재 위치에서 고객님의 차량 위치까지 이동경로를 안내합니다" />
      <Canvas ref={canvasRef}></Canvas>
      {floorInfo.state === "waiting" ?
        <LottieLayout>
          <LottieView
            loop={2}
            animationData={LottieData}
            onLoopComplete={() => setFloorInfo({ state: "second", floor_nm: pathInfo[1].flor_nm, img_path: pathInfo[1].canvas_img })}
          />
          <LottieText>{floorName.first_floor.replace("RF", "옥상")} → {floorName.second_floor.replace("RF", "옥상")} 이동중</LottieText>
        </LottieLayout>
          :
        <ParkingImageLayout ref={imgRef}>
          <InfoLayout>
            <Information>고객님의 차량은&nbsp;</Information>
            <ParkingPositionText>
              {`${selectCar.flor_nm.replace("RF", "옥상")}층 `}
            </ParkingPositionText>
            <Information>{`에 주차되어 있습니다.`}</Information>
          </InfoLayout>
          <Floor>{floorInfo.floor_nm.replace("RF", "옥상")}</Floor>
          <ParkingImage
            src={floorInfo.img_path}
            alt="Parking Image"
            onLoad={onLoadBackgroundImage}
          />
        </ParkingImageLayout>
      }
      <MarkerLayout>
        <Marker 
          ref={parkingMarkerRef}
          src={ParkingMark}
          alt="Parking Marker"
        />
        <Marker 
          ref={kioskMarkerRef}
          src={KioskMark}
          alt="Kiosk Marker"
        />
      </MarkerLayout>
      <Footer text="주차정보" prev="/kiosk/select" />
    </Layout>
  );
};

export default FindRoute;