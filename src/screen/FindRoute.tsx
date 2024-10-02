import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useDataStore from "../store/useDataStore";
import { Layout } from "../assets/css/common";
import Lottie from "lottie-react";
import LottieData from "../assets/lottie/loading.json";
import ParkingMark from "../assets/imgs/parking_marker.png";
import LocationMark from "../assets/imgs/location_marker.png";
import { Colors } from "../utils/colors";
import { CommonProps } from "../navigation";
let width: number;
let cvs: Element | null;
let idx = 0;

const Canvas = styled.div``;

const InfoLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  z-index: 1001;
`;

const Infomation = styled.span`
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
  left: 8vw;
  top: 30%;
  font-size: 4vmin;
  font-weight: bold;
  z-index: 1001;
`;

const ParkingImage = styled.img`
  position: absolute;
  width: 95%;
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
  font-size: 4.5vmin;
  color: ${Colors.White};
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding-bottom: 5px;
`;

interface PointProps {
  x: number;
  y: number;
};

type ImageState = "first" | "waiting" | "second" | "";

const FindRoute = (props: CommonProps.ComponentProps) => {
  const { mobile, pathInfo, selectCar } = useDataStore();
  const [ imgPath, setImgPath ] = useState("");
  const [ convPt, setConvPt ] = useState<PointProps[]>([]);
  const [ imgState, setImgState ] = useState<ImageState>("");
  const [ markerPosition, setMarkerPosition ] = useState<PointProps>({x: 0, y: 0});
  const [ firstFloor, setFirstFloor ] = useState("");
  const [ secondFloor, setSecondFloor ] = useState("");
  const [ floor, setFloor ] = useState("");
  const [ title, setTitle ] = useState("");
  const [ desc, setDesc ] = useState("");
  let i = 0;
  let raf: number;

  useEffect(() => {
    if( !pathInfo.length ) props.navigation("/");
  }, [pathInfo]);

  useEffect(() => {
    if( mobile ) {
      setTitle("키오스크 위치안내");
      setDesc("현재 위치에서 가장 가까운 키오스크까지 이동경로를 안내합니다");
      return;
    }

    setTitle("차량 위치안내");
    setDesc("현재 위치에서 고객님의 차량 위치까지 이동경로를 안내합니다");
  }, []);

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
    cvs = document.querySelector(".canvas-layout");
    width = document.querySelector(".image")?.clientWidth as number;
    const infoLayout = document.querySelector(".info-layout") as HTMLElement;

    if( cvs && width ) {
      infoLayout.style.top = `calc(50% - ${width / 2 + 30}px)`;

      cvs.innerHTML += `
        <canvas 
          id="canvas"
          width=${width} 
          height=${width} 
          style="position: relative; z-index: 1000;"
        ></canvas>
      `;

      /**
       * 층 간 이동이 발생하는 경우(키오스크층과 주차층이 다른 경우)에 층 이동 화면에 사용할 층 정보를 넣어준다.
       */
      if (pathInfo.length > 1) {
        setSecondFloor(pathInfo[1].canvas_img.substring(pathInfo[1].canvas_img.lastIndexOf("/")).split("_")[1]);
      }

      setFirstFloor(pathInfo[0].canvas_img.substring(pathInfo[0].canvas_img.lastIndexOf("/")).split("_")[1]);
      setFloor(pathInfo[0].canvas_img.substring(pathInfo[0].canvas_img.lastIndexOf("/")).split("_")[1]);
      setImgState("first");
      convertCoordinates(0, width);
      setImgPath(pathInfo[0].canvas_img);
    }
  }, [firstFloor, floor, imgState, imgPath]);

  useEffect(() => {
    init();
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

    if( convPt.length > 0 ) {
      convPt.splice(0, convPt.length);
    }

    for(let j = 0; j < pathInfo[index].path.length; j++) {
      arr.push({
        x: Math.round(pathInfo[index].path[j].x * magnification),
        y: Math.round(pathInfo[index].path[j].y * magnification),
      });

      if( j === pathInfo[index].path.length-1 ) {
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
      const img = document?.getElementById("location_img") as HTMLImageElement;
      ctx.drawImage(img, markerPosition.x, markerPosition.y);
      idx++;

      const timer = setTimeout(() => {
        ctx.clearRect(0, 0, 4000, 4000);
        setImgState("waiting");
        setImgPath(pathInfo[1].canvas_img);
        setFloor(pathInfo[1].canvas_img.substring(pathInfo[1].canvas_img.lastIndexOf("/")).split("_")[1]);
        convertCoordinates(1, Number(width));

        clearTimeout(timer);
      }, 2000);
    }
  }, [imgState, imgPath, floor]);

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
      ctx.lineWidth = 2;

      if (i < 1) {
        ctx.beginPath();
        ctx.moveTo(convPt[i].x, convPt[i].y);
      }

      if (i >= convPt.length-1) {
        cancelAnimationFrame(raf);
        let img;

        if( !mobile ) {
          img = document?.getElementById("parking_img") as HTMLImageElement;
        } else {
          img = document?.getElementById("location_img") as HTMLImageElement;
        }

        ctx.drawImage(img, markerPosition.x, markerPosition.y);
        idx = 0;
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
    if ( pathInfo.length <= 1 ) {
      drawLine();
      return;
    }

    if ( idx === 0 ) {
      tackLocationMarker();
      return;
    }

    drawLine();
  };

  return (
    <Layout>
      <Header title={title} desc={desc} />
      <InfoLayout className="info-layout">
        <Infomation>고객님의 차량은&nbsp;</Infomation>
        <ParkingPositionText>{`${selectCar.flor_nm.replace("P", "B")}층 '${selectCar.column_nm}' 기둥사이`}</ParkingPositionText>
        <Infomation>{`\n에 주차되어 있습니다.`}</Infomation>
      </InfoLayout>
      <Canvas className="canvas-layout"></Canvas>
      {imgState === "waiting" ?
        <LottieLayout>
          <LottieView
            loop={2}
            animationData={LottieData}
            onLoopComplete={() => setImgState("second")}
          />
          <LottieText>{firstFloor} → {secondFloor} 이동중</LottieText>
        </LottieLayout>
          :
        <>
          <Floor>{floor}</Floor>
          <ParkingImage
            id="image"
            className="image"
            src={imgPath}
            alt="Parking Image"
            onLoad={onLoadBackgroundImage}
          />
        </>
      }
      <div style={{display: "none"}}>
        <img 
          id="parking_img" 
          src={ParkingMark}
          alt="Parking Marker"
        />
        <img 
          id="location_img" 
          src={LocationMark}
          alt="Location Marker"
        />
      </div>
      <Footer text="주차정보" prev="/kiosk/select" />
    </Layout>
  );
};

export default FindRoute;