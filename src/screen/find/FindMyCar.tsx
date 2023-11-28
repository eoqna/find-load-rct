import { useEffect, useRef } from "react";
import styled from "styled-components";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Canvas = styled.canvas`
  width: 600px;
  height: 600px;
  z-index: 1000;
`;

const ParkingImage = styled.img`
  position: absolute;
  width: 600px;
  height: 600px;
`;

interface PointProps {
  x: number;
  y: number;
};

const point: PointProps[] = [
  {
    x: 82,
    y: 65,
  },
  {
    x: 105,
    y: 65,
  },
  {
    x: 105,
    y: 97,
  },
  {
    x: 221,
    y: 97,
  },
  {
    x: 221,
    y: 120,
  },
];

const FindMyCar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let z = 0;
  let i = 0;

  const drawLine = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context) {
      context.strokeStyle = "red";  // 선 색깔
      context.lineCap = "square";
      context.lineJoin = "round";	// 선 끄트머리(?)
      context.lineWidth = 2;		// 선 굵기
      
      if( i >= point.length-1 ) {
        i = 0;

        setTimeout(() => {
          context.clearRect(0, 0, 600, 600);
          drawLine();
        }, 1000);
        
        return;
      }

      context.beginPath();
      context.moveTo(point[i].x, point[i].y);

      const interval = setInterval(() => {
        if( point[i].x !== point[i+1].x ) {
          const maxX = point[i+1].x - point[i].x;
          
          if( z >= maxX ) {
            z = 0;
            i++;
            clearInterval(interval);
            drawLine();
          }

          context.lineTo(point[i].x + z, point[i].y);
          context.stroke();
          z += 2;
        } else if( point[i].y !== point[i+1].y ) {
          const maxY = point[i+1].y - point[i].y;

          context.lineTo(point[i].x, point[i].y + z);
          context.stroke();
          
          if( z >= maxY ) {
            z = 0;
            i++;
            clearInterval(interval);
            drawLine();
          }
          
          z += 2;
        }
      }, 40);
    }
  };

  useEffect(() => {
    drawLine();
  }, []);

  return (
    <Layout>
      <Canvas ref={canvasRef} />
      <ParkingImage
        src={require("../../assets/imgs/img_1000_B1.jpg")}
      />
    </Layout>
  );
};

export default FindMyCar;