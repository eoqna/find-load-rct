import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { point } from "../../utils/temp";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useDataStore from "../../store/useDataStore";
let width: number | undefined;

const Layout = styled.div`
  width: 100%;
  height: 100%;
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

const FindMyCar = () => {
  const { myCarInfo } = useDataStore();

  const drawLine = (positionX: number, positionY: number) => {
    const canvas: HTMLCanvasElement | null = document.querySelector("#canvas");
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      // ctx.strokeStyle = "red";
      // ctx.lineCap = "square";
      // ctx.lineJoin = "round";	// 선 끄트머리(?)
      // ctx.lineWidth = 2;

      // ctx.beginPath();
      // ctx.moveTo(positionX, positionY);
      // ctx.lineTo(positionX + 2, positionY + 2);
      // ctx.stroke();

      // ctx.strokeStyle = "red";
      // ctx.strokeRect(positionX, positionY, 2, 2);

      ctx.fillStyle = "red";
      ctx.fillRect(positionX, positionY, 5, 5);
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
            position: relative; 
            z-index: 1000;
            max-width: 1000px;
            max-height: 1000px;
        "></canvas>
      `;

      if( width < 1000 ) {
        const magnification = Number((width / 4000));
        const positionX = myCarInfo.position_x * magnification;
        const positionY = myCarInfo.position_y * magnification;

        drawLine(positionX, positionY);
      }
    }
  }, []);

  return (
    <Layout>
      <Header text="다온빌딩 B3" />
      <Canvas className="canvas-layout"></Canvas>
      <ParkingImage
        className="image"
        src={myCarInfo.flor_img_path}
      />
      <Footer text="주차정보" prev="/kiosk/info" />
    </Layout>
  );
};

export default FindMyCar;