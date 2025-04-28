import { useCallback, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useDataStore from "../stores/useDataStore";
import Lottie from "lottie-react";
import LottieData from "../assets/lottie/loading.json";
import Marker from "../assets/imgs/marker.png";
import EmptyMap from "../assets/imgs/emptyMap.png";
import { NavigationProps } from "../navigation";
import { fullLayout } from "../utils/component";
import paper from "paper";
import { Colors } from "../utils/colors";
import clsx from "clsx";

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

const FindRoute = ({ navigation }: NavigationProps) => {
  const { mobile, pathInfo, selectCar, kiosk } = useDataStore();
  const [ floorInfo, setFloorInfo ] = useState<FloorInfoProps>({ state: "", floor_nm: "", img_path: "" });
  const [ idx, setIdx ] = useState(0);
  const [ width, setWidth ] = useState(0);
  const [ convPt, setConvPt ] = useState<PointProps[]>([]);
  const [ markerPosition, setMarkerPosition ] = useState<PointProps>({ x: 0, y: 0 });
  const [ floorName, setFloorName ] = useState<FloorNameProps>({ first_floor: "", second_floor: "" });
  const canvasRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLImageElement>(null);

  /**
   * 캔버스 생성 및 길찾기 정보 초기화 함수
   * 
   * setFirstFloor : 첫 번째 층 이름 (키오스크 층)
   * setSecondFloor : 두 번째 층 이름 (주차 차량 층)
   * setImageState : 첫 번째 층의 이미지를 보여주기 위해 'first'로 설정
   * convertCoordinates : 서버로 부터 받은 노드 좌표 변환 (이미지 사이즈와 캔버스 사이즈의 비율에 따라 변환)
   * setImgPath : 화면에 보여지는 주차장 이미지 세팅
   */
  const initialize = useCallback(() => {
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
      navigation(`/?id=${kiosk.node_id}&rotation=${kiosk.rotation}`);
    } else {
      initialize();
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
  const convertCoordinates = useCallback(( index: number, wd: number ) => {
    const magnification =  Number((wd / pathInfo[0].canvas.width));

    if (convPt.length > 0) {
      convPt.splice(0, convPt.length);
    }

    for (let j = 0; j < pathInfo[index].path.length; j++) {
      setConvPt(pt => [ 
        ...pt, 
        { 
          x: Math.round(pathInfo[index].path[j].x * magnification), 
          y: Math.round(pathInfo[index].path[j].y * magnification) 
        },
      ]);

      if (j === pathInfo[index].path.length - 1) {
        setMarkerPosition({
          x: Math.round(pathInfo[index].path[j].x * magnification - 4.5),
          y: Math.round(pathInfo[index].path[j].y * magnification - 7)
        });
      }
    }
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
      const img = markerRef.current as HTMLImageElement;
      ctx.drawImage(img, markerPosition.x - 15, markerPosition.y - 20, 30, 40);
      setIdx((prev) => prev + 1);

      const timer = setTimeout(() => {
        ctx.clearRect(0, 0, 4000, 4000);
        setFloorName({ ...floorName, second_floor: pathInfo[1].flor_nm });
        setFloorInfo({ ...floorInfo, state: "waiting" });
        convertCoordinates(1, width);

        clearTimeout(timer);
      }, 3000);
    }
  }, [floorInfo]);

  /**
   * 변환된 좌표 값으로 캔버스 위에 선을 그리는 함수
   * 
   */
  const animatedPath = () => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

    if (canvas || convPt.length > 0) {
      // Paper.js 초기화
      paper.setup(canvas);

      const pathPoints = convPt.map(pt => new paper.Point(pt.x, pt.y));
      const fullPath = new paper.Path(pathPoints);
      fullPath.strokeColor = new paper.Color(0, 0, 0, 0); // 숨김
      const speed = 4;

      // Path 설정
      const path = new paper.Path({
        strokeColor: new paper.Color(Colors.Red),
        strokeWidth: mobile ? 2 : 8,
        strokeCap: "rounded",
        strokeJoin: "rounded",
      });

      const totalLength = fullPath.length;
      let progress = 0;
  
      paper.view.onFrame = () => {
        if (progress > totalLength) {
          paper.view.onFrame = null;
  
          const ctx = paper.view.element.getContext("2d");

          if (ctx) {
            const img = markerRef.current as HTMLImageElement;

            ctx.drawImage(img, markerPosition.x - 10, markerPosition.y - 35, 30, 40);
            setIdx(0);
          }

          return;
        }

        const point = fullPath.getPointAt(progress);

        if (point) {
          path.add(point);
          path.smooth();
        }

        progress += speed;
      }
    }

    return () => {
      paper.view.onFrame = null;
      paper.project.clear();
    };
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
    if (pathInfo.length > 1 && idx === 0) {
      return tackLocationMarker();
    }

    animatedPath();
  };

  return (
    <div className={fullLayout}>
      <Header title="차량 위치안내" desc="현재 위치에서 고객님의 차량 위치까지 이동경로를 안내합니다" />
      <div ref={canvasRef}></div>
      {floorInfo.state === "waiting" ?
        <div className="w-9/10 absolute">
          <Lottie
            style={{ width: "100%", height: "100%", }}
            loop={2}
            animationData={LottieData}
            onLoopComplete={() => setFloorInfo({ state: "second", floor_nm: pathInfo[1].flor_nm, img_path: pathInfo[1].canvas_img })}
          />
          <p className="absolute top-1/2 left-1/2 m-0 font-bold text-[3vmin]" style={{ transform: "translate(-50%, -50%)"}}>
            {floorName.first_floor.replace("RF", "옥상")} → {floorName.second_floor.replace("RF", "옥상")} 이동중
          </p>
        </div>
          :
        <div className="absolute w-[95%]" ref={imgRef}>
          {!mobile && (
            <div className={clsx(
              "w-full absolute text-center",
              mobile ? "top-[-100px]" : "top-[calc(-20px-3vmin)]"
            )}>
              <p className="inline-block text-[3vmin] font-bold">고객님의 차량은&nbsp;</p>
              <p className="inline-block text-[3vmin] font-bold" style={{ color: Colors.Red }}>
                {`${selectCar.flor_nm.replace("RF", "옥상")}층 `}
              </p>
              <p className="inline-block text-[3vmin] font-bold">에 주차되어 있습니다.</p>
            </div>
          )}
          <div className="absolute top-2.5 left-2.5 text-[4vmin] font-bold z-40">{floorInfo.floor_nm.replace("RF", "옥상")}</div>
          <img
            className="w-full h-full"
            src={floorInfo.img_path ? floorInfo.img_path : EmptyMap}
            alt="Parking Image"
            onLoad={onLoadBackgroundImage}
          />
        </div>
      }
      <div className="hidden">
        <img 
          ref={markerRef}
          src={Marker}
          alt="Parking Marker"
        />
      </div>
      <Footer text="주차정보" prev="/select" />
    </div>
  );
};

export default FindRoute;
