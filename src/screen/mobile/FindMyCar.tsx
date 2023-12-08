import React, { useEffect } from "react";
import styled from "styled-components";
import { point } from "../../utils/temp";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
let width: number | undefined;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(26,28, 36);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Canvas = styled.div``;

const ParkingImage = styled.img`
  position: absolute;
  width: 90%;
`;

interface PointProps {
  x: number;
  y: number;
};

const FindMyCar = () => {
  const rePoint: PointProps[] = [];

  const drawLine = () => {
    const canvas: HTMLCanvasElement | null = document.querySelector("#canvas");
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      ctx.strokeStyle = "red";  // 선 색깔
      ctx.lineCap = "square";
      ctx.lineJoin = "round";	// 선 끄트머리(?)
      ctx.lineWidth = 3;		// 선 굵기

      for(let i = 0; i<rePoint.length; i++) {
        if( i >= rePoint.length-1 ) {
          ctx.beginPath();
          return;
        }

        if( i === 0) {
          ctx.beginPath();
          ctx.moveTo(rePoint[i].x, rePoint[i].y);
        } else {
          ctx.lineTo(rePoint[i+1].x, rePoint[i+1].y);
          ctx.stroke();
        }
      }
    }
  };

  useEffect(() => {
    const canvas = document.querySelector(".canvas-layout");
    width = document.querySelector(".image")?.clientWidth;

    if( width && canvas ) {
      canvas.innerHTML += `
        <canvas 
          id="canvas"
          width=${width} 
          height=${width} 
          style="
          position: relative; z-index: 1000;
          max-width: 1000px;
          max-height: 1000px;
        ">
        </canvas>
      `;

      if( width < 1000 ) {
        console.log((width / 1000).toFixed(2));
        console.log(Math.round(width / 1000));

        const magnification = Number((width / 1000).toFixed(2));


        for(let i=0; i<point.length; i++) {
          rePoint.push({
            x: Math.round(point[i].x * magnification),
            y: Math.round(point[i].y * magnification),
          });
        }
      }

      drawLine();
    }
  }, [drawLine]);

  return (
    <Layout>
      <Header text="위치안내" />
      <Canvas className="canvas-layout"></Canvas>
      {/* <ProgressiveImage 
        src={require("../assets/imgs/img_B1.png")}
        placeholder={require("../assets/imgs/move_floor.png")}
        delay={2}
      /> */}
      <ParkingImage
        className="image"
        src={require("../../assets/imgs/img_B1.png")}
      />
      <Footer text="주차정보" prev="info" />
    </Layout>
  );
};

export default FindMyCar;