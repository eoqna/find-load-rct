import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useDataStore from "../../store/useDataStore";
import { Layout } from "../../utils/styles/Common";
import { useNavigate } from "react-router";
import moment from "moment";
let width: number | undefined;
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

const FindRoute = () => {
  const { pathInfo } = useDataStore();
  const navigation = useNavigate();
  const [ imgPath, setImgPath ] = useState("");
  let z = 0;
  let i = 0;
  const drawSpeed = 1;
  const rePoint: PointProps[] = [];

  useEffect(() => {
    if( pathInfo.length < 1 ) {
      navigation("/");
    }
  }, [pathInfo, navigation]);

  const initCanvas = () => {
    cvs = document.querySelector(".canvas-layout");
    width = document.querySelector(".image")?.clientWidth;

    if( cvs && width ) {
      const magnification =  Number((width / 4000));

      cvs.innerHTML += `
        <canvas 
          id="canvas"
          width=${width} 
          height=${width} 
          style="
            position: relative;
            z-index: 1000;
            max-width: 1000px;
            max-height: 1000px;
        "></canvas>
      `;

      setImgPath(pathInfo[1].canvas_img);

      console.log(pathInfo[1].path);
    
      for(let i=0; i<pathInfo[1].path.length; i++) {
        rePoint.push({
          x: Math.round(pathInfo[1].path[i].x * magnification),
          y: Math.round(pathInfo[1].path[i].y * magnification),
        });
      }

      drawLine();
    }
  };

  useEffect(() => {
    initCanvas();
  }, []);

  const drawLine = () => {
    const canvas: HTMLCanvasElement | null = document.querySelector("#canvas");
    const ctx = canvas?.getContext("2d");;

    if( ctx ) {
      ctx.strokeStyle = "red";
      ctx.lineCap = "square";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;

      if( i >= rePoint.length-1 ) {
        ctx.beginPath();
        return;
      }

      if( i === 0 ) {
        ctx.beginPath();
        ctx.moveTo(rePoint[i].x, rePoint[i].y);
      }

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
  
            ctx.lineTo(rePoint[i].x, rePoint[i].y + z);
            ctx.stroke();
            
            if( z >= maxY ) {
              z = 0;
              i++;
              clearInterval(interval);
              drawLine();
            }
            
            z += 1;
  
          } else if( rePoint[i].y > rePoint[i+1].y) {
            const maxY = rePoint[i].y - rePoint[i+1].y;
  
            ctx.lineTo(rePoint[i].x, rePoint[i].y - z);
            ctx.stroke();
            
            if( z >= maxY ) {
              z = 0;
              i++;
              clearInterval(interval);
              drawLine();
            }
            
            z += 1;
          }
        }, drawSpeed);
      }
    }
  };

  return (
    <Layout>
      <Header text="위치안내" />
      <Canvas className="canvas-layout"></Canvas>
      <ParkingImage
        id="image"
        className="image"
        src={imgPath}
      />
      <Footer text="주차정보" prev="kiosk/info" />
    </Layout>
  );
};

export default FindRoute;