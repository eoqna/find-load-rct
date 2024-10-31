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
  CarImageLayout, CarInfo, 
  CarInfoColumn, CarNumber, Label,
  LocationInfoButtonLayout, Text, 
} from "../assets/css/selectCar";

interface RequestProps {
  start_node: string;
  end_node?: string;
  rotate?: number;
};

const SelectCar = (props: CommonProps.ComponentProps) => {
  const { navigation } = props;
  const { setModal } = useAppStore();
  const { mobile, carList, setPathInfo, setSelectCar } = useDataStore();
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
    let param: RequestProps;
    let url = "";

    if (mobile) {
      url = "/api/mobile/v1/parking/find-route";
      param = {
        start_node: item.node_id,
      };
    } else {
      url = "/api/kiosk/v1/parking/find-route";
      param = {
        rotate: 0,
        start_node: "K20002",
        end_node: item.node_id,
      };
    }

    const { data } = await axiosClient.post(url, param);

    if (data.code === "404") {
      setModal({ open: true, content: data.msg });
      return;
    }

    setPathInfo(data.list);
    setSelectCar(item);
    navigation("/kiosk/route");
  }, []);

  return (
    <Layout>
      <Header title="차량선택" desc="고객님의 차량을 선택해 주세요" />
      <CarListLayout 
        $margin={styles.margin} 
        $height={styles.height} 
        $center={carList.length < 7 ? true : false}
      >
        {carList.map((car) => (
          <CarInfoLayout key={car.car_num}>
            <CarImageLayout $url={car.img_path} />
            <CarInfo>
              <CarNumber>{car.car_num}</CarNumber>
              <CarInfoColumn>
                <Label>입차시간</Label>
                <Text>{car.in_dtm}</Text>
              </CarInfoColumn>
              <CarInfoColumn>
                <Label>주차위치</Label>
                <Text>{`${car.flor_nm}, ${car.column_nm}`}</Text>
              </CarInfoColumn>
            </CarInfo>
            <LocationInfoButtonLayout onClick={() => onClickFindRoute(car)}>
              <Icon path={mdiMapMarker} size="5vmin" color={Colors.White} />
              <ButtonText>위치안내</ButtonText>
            </LocationInfoButtonLayout>
          </CarInfoLayout>
        ))}
      </CarListLayout>
      <Footer text="차량번호 입력" prev="/kiosk/input" />
    </Layout>
  );
};

export default SelectCar;