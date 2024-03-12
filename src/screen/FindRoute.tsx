import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useDataStore from "../store/useDataStore";
import { Layout } from "../utils/styles/Common";
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

const ParkingImage = styled.img`
  position: absolute;
  width: 90%;
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

type ImageState = "first" | "waitting" | "second" | "";

const FindRoute = (props: CommonProps.ComponentProps) => {
  const { pathInfo } = useDataStore();
  const [ imgPath, setImgPath ] = useState("");
  const [ rePoint, setRePoint ] = useState<PointProps[]>([]);
  const [ imgState, setImgState ] = useState<ImageState>("");
  const [ markerPosition, setMarkerPosition ] = useState<PointProps>({x: 0, y: 0});
  const [ firstFloor, setFirstFloor ] = useState("");
  const [ secondFloor, setSecondFloor ] = useState("");
  let i = 0;
  let raf: number;

  useEffect(() => {
    if( !pathInfo ) {
      props.navigation("/");
    }
  }, [pathInfo, props]);

  const init = () => {
    cvs = document.querySelector(".canvas-layout");
    width = document.querySelector(".image")?.clientWidth as number;

    if( cvs && width ) {
      cvs.innerHTML += `
        <canvas 
          id="canvas"
          width=${width} 
          height=${width} 
          style="position: relative; z-index: 1000;"></canvas>
      `;

      if (pathInfo.length > 1) {
        setSecondFloor(pathInfo[1].canvas_img.substring(pathInfo[1].canvas_img.lastIndexOf("/")).split("_")[1]);
      }

      setFirstFloor(pathInfo[0].canvas_img.substring(pathInfo[0].canvas_img.lastIndexOf("/")).split("_")[1]);
      setImgState("first");
      convertCoordinates(0, width);
      setImgPath(pathInfo[0].canvas_img);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const convertCoordinates = (index: number, wd: number) => {
    const magnification =  Number((wd / pathInfo[0].canvas.width));

    if( rePoint.length > 0 ) {
      rePoint.splice(0, rePoint.length);
    }

    for(let j=0; j < pathInfo[index].path.length; j++) {
      rePoint.push({
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
  };

  const tackLocationMarker = () => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      const img = document?.getElementById("location_img") as HTMLImageElement;
      ctx.drawImage(img, markerPosition.x, markerPosition.y);
      idx++;

      const timer = setTimeout(() => {
        ctx.clearRect(0, 0, 4000, 4000);
        setImgState("waitting");
        setImgPath(pathInfo[1].canvas_img);
        convertCoordinates(1, Number(width));

        clearTimeout(timer);
      }, 2000);
    }
  };

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
        ctx.moveTo(rePoint[i].x, rePoint[i].y);
      }

      if (i >= rePoint.length-1) {
        cancelAnimationFrame(raf);

        const img = document?.getElementById("parking_img") as HTMLImageElement;
        ctx.drawImage(img, markerPosition.x, markerPosition.y);
        idx = 0;
        return;

      } else {
        ctx.lineTo(rePoint[i+1].x, rePoint[i+1].y);
        ctx.stroke();
        i++;
      }

      raf = requestAnimationFrame(drawLine);
    }
  };

  const onLoadBackgroundImage = () => {
    if ( pathInfo.length <= 1 ) {
      drawLine();
    } else {
      if ( idx === 0 ) {
        tackLocationMarker();
      } else {
        drawLine();
      }
    }
  };

  return (
    <Layout>
      <Header text="위치안내" /> 
      <Canvas className="canvas-layout"></Canvas>
      {imgState === "waitting" ?
        <LottieLayout>
          <LottieView
            loop={2}
            animationData={LottieData}
            onLoopComplete={() => setImgState("second")}
          />
          <LottieText>{firstFloor} → {secondFloor} 이동중</LottieText>
        </LottieLayout>
          :
        <ParkingImage
          id="image"
          className="image"
          src={imgPath}
          alt="Parking Image"
          onLoad={onLoadBackgroundImage}
        />
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
      <Footer text="주차정보" prev="/kiosk/info" />
    </Layout>
  );
};

export default FindRoute;