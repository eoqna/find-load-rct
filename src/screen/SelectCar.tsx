import useDataStore from "../store/useDataStore";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCallback, useEffect } from "react";
import { Layout } from "../assets/css/common";
import initCarImage from "../assets/imgs/initcar.png";
import { CommonProps } from "../navigation";
import { ButtonText, CarImage, CarImageLayout, CarInfo, CarInfoColumn, CarListLayout, CarNumber, Label, LocationInfoButtonLayout, Text } from "../assets/css/selectCar";
import Icon from "@mdi/react";
import { mdiMapMarker } from "@mdi/js";
import { Colors } from "../utils/colors";
import axiosClient from "../utils/axiosClient";
import useAppStore from "../store/useAppStore";

const SelectCar = (props: CommonProps.ComponentProps) => {
  const { setModal } = useAppStore();
  const { mobile, carList, pathInfo, selectCar, setPathInfo, setSelectCar } = useDataStore();

  useEffect(() => {
    if( !carList.length ) {
      props.navigation("/");
    }
  }, [carList, props]);

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
    let param: Object;
    let url = "";

    if( mobile ) {
      url = "/api/mobile/beta/parking/find-route";
      param = {
        start_node: item.node_id,
      };
    } else {
      url = "/api/kiosk/beta/parking/find-route";
      param = {
        rotate: 0,
        start_node: "K20002",
        end_node: item.node_id,
      };
    }

    const { data } = await axiosClient.post(url, param);

    if( data.code === "404" ) {
      return setModal({ open: true, content: data.msg });
    }

    setPathInfo(data.list);
    setSelectCar(item);
    props.navigation("/kiosk/route");
  }, [pathInfo, selectCar]);

  return (
    <Layout>
      <Header title="차량선택" desc="고객님의 차량을 선택해 주세요" />
      {carList.map((item, idx) => (
        <CarListLayout key={idx}>
          <CarImageLayout>
            <CarImage src={item.img_path} alt="차량 이미지" onError={(e) => {e.currentTarget.src=initCarImage}} />
          </CarImageLayout>
          <CarInfo>
            <CarNumber>{item.car_num}</CarNumber>
            <CarInfoColumn>
              <Label>입차시간</Label>
              <Text>{item.in_dtm}</Text>
            </CarInfoColumn>
            <CarInfoColumn>
              <Label>주차위치</Label>
              <Text>{`${item.flor_nm.replace("P", "B")}-${item.column_nm}`}</Text>
            </CarInfoColumn>
          </CarInfo>
          <LocationInfoButtonLayout onClick={() => onClickFindRoute(item)}>
            <Icon path={mdiMapMarker} size="5vmin" color={Colors.White} />
            <ButtonText>위치안내</ButtonText>
          </LocationInfoButtonLayout>
        </CarListLayout>
      ))}
      <Footer text="차량번호 입력" prev="/kiosk/input" />
    </Layout>
  );
};

export default SelectCar;