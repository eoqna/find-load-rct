import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useDataStore from "../store/useDataStore";
import { Layout } from "../utils/styles/Common";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import LottieData from "../assets/lottie/loading.json";
import marker from "../assets/imgs/parking_mark.png";
let width: number | undefined;
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
  font-size: 2vh;
  color: rgb(90, 90, 90);
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

type ImageState = "first" | "waitting" | "second" | "end" | "";

const FindRoute = () => {
  const { pathInfo } = useDataStore();
  const navigation = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [ imgPath, setImgPath ] = useState("");
  const [ rePoint, setRePoint ] = useState<PointProps[]>([]);
  const [ imgState, setImgState ] = useState<ImageState>("");
  const [ markerPosition, setMarkerPosition ] = useState<PointProps>({x: 0, y: 0});
  let z = 0;
  let i = 0;
  const drawSpeed = 10;

  useEffect(() => {
    if( pathInfo.length < 1 ) {
      navigation("/");
    }
  }, [pathInfo, navigation]);

  const initCanvas = () => {
    cvs = document.querySelector(".canvas-layout");
    width = document.querySelector(".image")?.clientWidth;

    if( cvs && width ) {
      cvs.innerHTML += `
        <canvas 
          id="canvas"
          width=${width} 
          height=${width} 
          style="position: relative; z-index: 1000;"></canvas>
      `;
      
      console.log(pathInfo);

      console.log(pathInfo[0].canvas_img.substring(pathInfo[0].canvas_img.lastIndexOf("/")).split("_")[1]);

      setImgState("first");
      settingPoint(idx, width);
      setImgPath(pathInfo[idx].canvas_img);
    }
  };

  useEffect(() => {
    initCanvas();
  }, []);

  const settingPoint = (index: number, wd: number) => {
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

  const drawLine = () => {
    const canvas: HTMLCanvasElement | null = document.querySelector("#canvas");
    const ctx = canvas?.getContext("2d");

    if( ctx ) {
      ctx.strokeStyle = "red";
      ctx.lineCap = "square";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;

      if( i === 0 ) {
        ctx.beginPath();
        ctx.moveTo(rePoint[i].x, rePoint[i].y);
      }

      if( i >= rePoint.length-1 ) {
        ctx.beginPath();
        idx += 1;

        if( idx === pathInfo.length ) {
          const img: any = document?.getElementById("img");
          
          ctx.drawImage(img, markerPosition.x, markerPosition.y, 10, 10);

          idx = 0;
          return;
        }

        if( idx < pathInfo.length ) {
          i = 0;
          
          const timer = setTimeout(() => {
            setImgState("waitting");
            ctx.clearRect(0, 0, 4000, 4000);

            setImgPath(pathInfo[idx].canvas_img);
            settingPoint(idx, Number(width));
            
            clearTimeout(timer);
          }, 2000);
        }
      } else {
        if( rePoint[i].x !== rePoint[i+1].x && rePoint[i].y !== rePoint[i+1].y ) {
          ctx.lineTo(rePoint[i+1].x, rePoint[i+1].y);
          ctx.stroke();
          i++;
          drawLine();
  
        } else {
          const interval = setInterval(() => {
            if( rePoint[i+1].x > rePoint[i].x ) {
              const maxX = rePoint[i+1].x - rePoint[i].x;
              
              if( z >= maxX ) {
                z = 0;
                i++;
                clearInterval(interval);
                drawLine();
              }
    
              ctx.lineTo(rePoint[i].x + z, rePoint[i].y);
              ctx.stroke();
              z += 1;
    
            } else if( rePoint[i].x > rePoint[i+1].x ) {
              const maxX = rePoint[i].x - rePoint[i+1].x;
              
              if( z >= maxX ) {
                z = 0;
                i++;
                clearInterval(interval);
                drawLine();
              }
              
              ctx.lineTo(rePoint[i].x - z, rePoint[i].y);
              ctx.stroke();
              z += 1;
    
            } else if( rePoint[i+1].y > rePoint[i].y ) {
              const maxY = rePoint[i+1].y - rePoint[i].y;
    
              if( z >= maxY ) {
                z = 0;
                i++;
                clearInterval(interval);
                drawLine();
              }
  
              ctx.lineTo(rePoint[i].x, rePoint[i].y + z);
              ctx.stroke();
              
              z += 1;
    
            } else if( rePoint[i].y > rePoint[i+1].y ) {
              const maxY = rePoint[i].y - rePoint[i+1].y;
    
              if( z >= maxY ) {
                z = 0;
                i++;
                clearInterval(interval);
                drawLine();
              }
  
              ctx.lineTo(rePoint[i].x, rePoint[i].y - z);
              ctx.stroke();
              
              z += 1;
            }
          }, drawSpeed);
        }
      }
    }
  };

  const onLoadBackgroundImage = () => {
    if ( rePoint ) {
      drawLine();
    } else {
      settingPoint(idx, Number(width));
    }
  }

  return (
    <Layout>
      <Header text="위치안내" /> 
      <Canvas className="canvas-layout"></Canvas>
      {imgState === "waitting" ?
        <LottieLayout>
          <LottieView
            ref={ref}
            loop={1}
            animationData={LottieData}
            onLoopComplete={() => setImgState("second")}
          />
          <LottieText>층 이동중입니다</LottieText>
        </LottieLayout>
          :
        <ParkingImage
          id="image"
          className="image"
          src={imgPath}
          onLoad={onLoadBackgroundImage}
        />
      }
      <div style={{display: "none"}}>
        <img 
          id="img" 
          src={marker} 
          width="10" 
          height="10" 
        />
      </div>
      <Footer text="주차정보" prev="/kiosk/info" />
    </Layout>
  );
};

export default FindRoute;