import useDataStore from "../stores/useDataStore";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCallback, useEffect, useState } from "react";
import { NavigationProps } from "../navigation";
import Icon from "@mdi/react";
import { mdiMapMarker } from "@mdi/js";
import clsx from "clsx";
import useAppStore from "../stores/useAppStore";
import EmptyCarImage from "../assets/imgs/emptyCar.png";
import { Colors } from "../utils/colors";
import axios from "axios";

const SelectCar = ({ navigation }: NavigationProps) => {
  const { openModal } = useAppStore();
  const { kiosk, mobile, carList, setLocation, setPathInfo, setSelectCar } = useDataStore();
  const [ styles, setStyles ] = useState({ margin: 0, height: "" });

  /**
   * 차량 목록이 없을 경우 초기 화면으로 이동
   */
  useEffect(() => {
    if (!carList.length) {
      navigation(`/?id=${kiosk.node_id}&rotation=${kiosk.rotation}`);
    }
  }, [carList]);

  useEffect(() => {
    const header = document.querySelector("#header-layout") as HTMLDivElement;

    if (header) {
      const height = header.clientHeight;
      setStyles({ margin: height, height: `calc(94% - ${height}px)` })
    }
  }, []);

  /**
   * 키오스크 노드 ID와 차량 위치 노드 ID로 길 찾기 로직 수행 함수
   * 
   * response data의 code가 '404'인 경우 모달창을 띄운다.
   * 
   * 아닌 경우 pathInfo에 길찾기 데이터를 넣는다.
   * 
   * 길찾기 완료 후 길 찾기 화면으로 이동한다.
   */
  const onClickFindRoute = useCallback(async (item: ApiResponse.CarState) => {
    try {
      if (mobile) {
        const { data } = await axios.post(
          "/api/mobile/v1/parking/find-car",
          {
            car_number: item.car_num,
          },
        );

        if (data.code === "404") {
          return openModal({ 
            open: true, 
            content: ["차량 위치를 찾을 수 없습니다"]
          });
        }

        setLocation(data.data);
        setSelectCar(item);
        navigation("/find-car");

      } else {
        const { data } = await axios.post(
          "/api/kiosk/v1/parking/find-route",
          {
            rotate: kiosk.rotation,
            start_node: kiosk.node_id,
            end_node: item.node_id,
          },
        );

        if (data.code === "404") {
          return openModal({ 
            open: true, 
            content: data.msg,
          });
        }

        setPathInfo(data.list);
        setSelectCar(item);
        navigation("/route");
      }

    } catch (err) {
      openModal({ 
        open: true, 
        content: ["길 찾기 중 오류가 발생했습니다", "관리자에게 문의해 주세요"], 
      });
    }
    
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Header title="차량선택" desc="고객님의 차량을 선택해 주세요" />
      <div 
        className={clsx(
          "w-full flex flex-col py-5 overflow-y-auto",
          carList.length > 7 ? "items-center" : "justify-center",
        )}
        style={{
          height: styles.height,
          marginTop: `${styles.margin}px`,
        }}
      >
        {carList.map((car) => (
          <div key={car.car_num} className="w-[calc(100% - 72px)] flex justify-between items-center p-4 m-5 mt-0 bg-white shadow-md border-0 rounded-lg last:mb-0">
            <div 
              className="w-1/4 h-full flex justify-center items-center rounded-xs border-0.5 relative"
              style={{ borderColor: Colors.LightGray }}
            >
              <img 
                className="w-full h-full absolute"
                src={car.img_path} 
                alt={car.car_num} 
                onError={(e) => e.currentTarget.src = EmptyCarImage} 
              />
            </div>
            <div className="w-[calc(55%-32px)] h-full flex flex-col justify-between mx-4 my-0">
              <p className={clsx(
                  "w-full flex items-center font-bold m-0 mb-1",
                  mobile ? "text-[4.2vmin]" : "text-[5vmin]"
                )}
                style={{ color: Colors.Primary }}
              >
                {car.car_num}
              </p>
              <div className={clsx(
                "flex justify-between items-center last:mb-0",
                mobile ? "mb-1" : "mb-2"
              )}>
                <p className={clsx(
                  "flex items-center font-bold m-0",
                  mobile ? "text-[2.4vmin]" : "text-[3vmin]"
                )}>
                  입차시간
                </p>
                <p className={clsx(
                    "w-[60%] flex items-center m-0 text-white font-bold",
                    mobile ? "px-1 py-1 border-0 rounded-sm text-[2vmin]" : "px-2 py-2 border-0 rounded-xs text-[2.8vmin]",
                  )}
                  style={{ background: Colors.Primary }}
                >
                  {car.in_dtm}
                </p>
              </div>
              <div className={clsx(
                "flex justify-between items-center last:mb-0",
                mobile ? "mb-1" : "mb-2",
              )}>
                <p className={clsx(
                  "flex items-center font-bold m-0",
                  mobile ? "text-[2.4vmin]" : "text-[3vmin]"
                )}>
                  주차위치
                </p>
                <p className={clsx(
                    "w-[60%] flex items-center m-0 text-white font-bold",
                    mobile ? "px-1 py-1 border-0 rounded-sm text-[2vmin]" : "px-2 py-2 border-0 rounded-xs text-[2.8vmin]",
                  )}
                  style={{ background: Colors.Primary }}
                >
                  {`${car.flor_nm.replace("RF", "옥상")}`}
                </p>
              </div>
            </div>
            <div 
              className="w-1/6 h-full flex flex-col justify-center items-center border-0 rounded-sm cursor-pointer"
              style={{ background: Colors.Red }}
              onClick={() => onClickFindRoute(car)}
            >
              <Icon path={mdiMapMarker} size="5vmin" color="#ffffff" style={{ marginBottom: mobile ? 4 : 8 }} />
              <p className="text-[2.4vmin] font-bold text-white m-0 mt-0">위치안내</p>
            </div>
          </div>
        ))}
      </div>
      {!mobile && <Footer text="차량번호 입력" prev="/input" />}
    </div>
  );
};

export default SelectCar;