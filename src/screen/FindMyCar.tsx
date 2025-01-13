import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Colors } from "../utils/colors";
import { CommonProps } from "../navigation";
import useDataStore from "../store/useDataStore";
import Header from "../components/Header";
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

const PositionText = styled.span`
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

const FindMyCar = ({ navigation }: CommonProps.ComponentProps) => {
  const { location, selectCar, setLocation } = useDataStore();
  const canvasRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

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

      convertCoordinates(imgWidth);
    }
  }, []);

  useEffect(() => {
      if (!location.position.x || !location.position.y) {
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
   * @param wd : 생성한 캔버스 width
   */
  const convertCoordinates = useCallback((wd: number) => {
    const magnification =  Number((wd / location.canvas.width));

    const x = Math.round(location.position.x * magnification);
    const y = Math.round(location.position.y * magnification);
    const width = Math.round(location.position.width * magnification);
    const height = Math.round(location.position.height * magnification);

    setLocation({...location, position: {x, y, width, height, rotate: location.position.rotate }})
  }, [location]);

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

    if (location.flor_nm === "RF") return;

    if (ctx) {
      const radian = location.position.rotate * Math.PI / 180;

      ctx.translate(location.position.x, location.position.y);
      ctx.rotate(radian);

      ctx.fillStyle = Colors.Red;
      ctx.fillRect(-location.position.width / 2, -location.position.height / 2, location.position.width, location.position.height);
    }
  };

  return (
    <Layout>
      <Header title="차량 위치안내" desc="고객님의 차량 주차 위치를 안내합니다" />
      <Canvas ref={canvasRef}></Canvas>
      <ParkingImageLayout ref={imgRef}>
        <InfoLayout>
          <Information>고객님의 차량은&nbsp;</Information>
          <PositionText>{`${selectCar.flor_nm.replace("RF", "옥상")}층 `}</PositionText>
          <Information>{`에 주차되어 있습니다.`}</Information>
        </InfoLayout>
        <Floor>{selectCar.flor_nm.replace("RF", "옥상")}</Floor>
        <ParkingImage
          src={location.canvas_img}
          alt="Parking Image"
          onLoad={drawLine}
        />
      </ParkingImageLayout>
    </Layout>
  );
};

export default  FindMyCar;