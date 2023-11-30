import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { point } from "../../utils/temp";
const width = 1000;
const height = 1000;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Canvas = styled.canvas`
  z-index: 1000;
`;

const ParkingImage = styled.img`
  position: absolute;
  width: ${width}px;
  height: ${height}px;
`;

interface PointProps {
  x: number;
  y: number;
};

const FindMyCar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let z = 0;
  let i = 0;
  const drawSpeed = 1;

  const drawLine = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      ctx.strokeStyle = "red";  // 선 색깔
      ctx.lineCap = "square";
      ctx.lineJoin = "round";	// 선 끄트머리(?)
      ctx.lineWidth = 3;		// 선 굵기

      if( i >= point.length-1 ) {
        i = 0;
        ctx.beginPath();

        setTimeout(() => {
          ctx.clearRect(0, 0, width, height);
          drawLine();
        }, 1000);
        
        return;
      }

      if( i === 0 ) {
        ctx.beginPath();
        ctx.moveTo(point[i].x, point[i].y);
      }

      if( point[i].x !== point[i+1].x && point[i].y !== point[i+1].y ) {
        ctx.lineTo(point[i+1].x, point[i+1].y);
        ctx.stroke();
        i++;
        drawLine();

      } else {
        const interval = setInterval(() => {
          if( point[i+1].x > point[i].x ) {
            const maxX = point[i+1].x - point[i].x;
            
            if( z >= maxX ) {
              z = 0;
              i++;
              clearInterval(interval);
              drawLine();
            }
  
            ctx.lineTo(point[i].x + z, point[i].y);
            ctx.stroke();
            z += 1;
  
          } else if( point[i].x > point[i+1].x ) {
            const maxX = point[i].x - point[i+1].x;
            
            if( z >= maxX ) {
              z = 0;
              i++;
              clearInterval(interval);
              drawLine();
            }
            
            ctx.lineTo(point[i].x - z, point[i].y);
            ctx.stroke();
            z += 1;
  
          } else if( point[i+1].y > point[i].y ) {
            const maxY = point[i+1].y - point[i].y;
  
            ctx.lineTo(point[i].x, point[i].y + z);
            ctx.stroke();
            
            if( z >= maxY ) {
              z = 0;
              i++;
              clearInterval(interval);
              drawLine();
            }
            
            z += 1;
  
          } else if( point[i].y > point[i+1].y) {
            const maxY = point[i].y - point[i+1].y;
  
            ctx.lineTo(point[i].x, point[i].y - z);
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

  useEffect(() => {
    drawLine();
  }, []);

  return (
    <Layout>
      <Canvas ref={canvasRef} width={width} height={height} />
      <ParkingImage
        src={require("../../assets/imgs/img_B1.png")}
      />
    </Layout>
  );
};

export default FindMyCar;