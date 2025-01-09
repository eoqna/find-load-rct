import useDataStore from "../store/useDataStore";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCallback, useEffect, useState } from "react";
import { CommonProps } from "../navigation";
import Icon from "@mdi/react";
import { mdiMapMarker } from "@mdi/js";
import { Colors } from "../utils/colors";
import axiosClient from "../utils/axiosClient";
import useAppStore from "../store/useAppStore";
import { 
  Layout, ButtonText, 
  CarListLayout, CarInfoLayout,
  CarImageLayout, CarImage, CarInfo, 
  CarInfoColumn, CarNumber, Label,
  LocationInfoButtonLayout, Text, 
} from "../assets/css/selectCar";
import initCarImg from "../assets/imgs/initcar.png";

const SelectCar = ({ navigation }: CommonProps.ComponentProps) => {
  const { openModal } = useAppStore();
  const { kiosk, mobile, carList, setLocation, setPathInfo, setSelectCar } = useDataStore();
  const [ styles, setStyles ] = useState({ margin: 0, height: "" });

  /**
   * 차량 목록이 없을 경우 초기 화면으로 이동
   */
  useEffect(() => {
    if (!carList.length) {
      navigation("/");
    }
  }, [carList]);

  useEffect(() => {
    const header = document.querySelector("#header-layout") as HTMLDivElement;

    if (header) {
      const height = header.clientHeight;
      setStyles({ margin: height, height: `calc(94% - ${height}px - 40px)` })
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
        const { data } = await axiosClient.post(
          "/api/mobile/v1/parking/find-car",
          {
            car_number: item.car_num,
          },
        );

        if (data.code === "404") {
          openModal({ open: true, content: data.msg });
          return;
        }

        setLocation(data.data);
        setSelectCar(item);
        navigation("/kiosk/find-car");

      } else {
        const { data } = await axiosClient.post(
          "/api/kiosk/v1/parking/find-route",
          {
            rotate: kiosk.rotate,
            start_node: kiosk.node_id,
            end_node: item.node_id,
          },
        );

        if (data.code === "404") {
          openModal({ open: true, content: data.msg });
          return;
        }

        setPathInfo(data.list);
        setSelectCar(item);
        navigation("/kiosk/route");
      }

    } catch (err) {
      openModal({ open: true, content: kiosk.err_msg });
    }
    
  }, []);

  return (
    <Layout>
      <Header title="차량선택" desc="고객님의 차량을 선택해 주세요" />
      <CarListLayout 
        $margin={styles.margin} 
        $height={styles.height} 
        $center={carList.length < 7}
      >
        {carList.map((car) => (
          <CarInfoLayout key={car.car_num}>
            <CarImageLayout>
              <CarImage src={car.img_path} alt={car.car_num} onError={(e) => e.currentTarget.src = initCarImg} />
            </CarImageLayout>
            <CarInfo>
              <CarNumber $mobile={mobile}>{car.car_num}</CarNumber>
              <CarInfoColumn $mobile={mobile}>
                <Label $mobile={mobile}>입차시간</Label>
                <Text $mobile={mobile}>{car.in_dtm}</Text>
              </CarInfoColumn>
              <CarInfoColumn $mobile={mobile}>
                <Label $mobile={mobile}>주차위치</Label>
                <Text $mobile={mobile}>{`${car.flor_nm.replace("RF", "옥상")}`}</Text>
              </CarInfoColumn>
            </CarInfo>
            <LocationInfoButtonLayout onClick={() => onClickFindRoute(car)}>
              <Icon path={mdiMapMarker} size="5vmin" color={Colors.White} />
              <ButtonText>위치안내</ButtonText>
            </LocationInfoButtonLayout>
          </CarInfoLayout>
        ))}
      </CarListLayout>
      {!mobile && <Footer text="차량번호 입력" prev="/kiosk/input" />}
    </Layout>
  );
};

export default SelectCar;