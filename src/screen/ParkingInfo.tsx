import Header from "../components/Header";
import Footer from "../components/Footer";
import useDataStore from "../store/useDataStore";
import axiosClient from "../utils/axiosClient";
import { Layout } from "../assets/css/common";
import useAppStore from "../store/useAppStore";
import { useCallback, useEffect } from "react";
import { CommonProps } from "../navigation";
import initCarImage from "../assets/imgs/initcar.png";
import { Button, ButtonLayout, CarImage, CarInfo, CarInfoLayout, Label, Text, TextLayout } from "../assets/css/parkingInfo";

const ParkingInfo = (props: CommonProps.ComponentProps) => {
  const { navigation } = props;
  const { setModal } = useAppStore();
  const { mobile, selectCar, setPathInfo } = useDataStore();

  useEffect(() => {
    if (!selectCar.car_num) {
      navigation("/");
      return;
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
  const onPressFindRoute = useCallback(async () => {
    let param = {};
    let url = "";

    if (mobile) {
      url = "/api/mobile/v1/parking/find-route";
      param = {
        start_node: selectCar.node_id,
      };
    } else {
      url = "/api/kiosk/v1/parking/find-route";
      param = {
        rotate: 90,
        start_node: "K20002",
        end_node: selectCar.node_id,
      };
    }

    const { data } = await axiosClient.post(url, param);

    if (data.code === "404") {
      setModal({ open: true, content: data.msg });
      return;
    }

    setPathInfo(data.list);

    navigation("/kiosk/route");
  }, []);

  return (
    <Layout>
      <Header title="주차정보" desc="주차 정보를 확인해 주세요" />
      <CarInfoLayout>
        <CarImage
          src={selectCar.img_path}
          alt="차량 이미지"
          onError={(e) => {e.currentTarget.src = initCarImage}}
        />
        <CarInfo>
          <TextLayout>
            <Label>주차장</Label>
            <Text>다온빌딩</Text>
          </TextLayout>
          <TextLayout>
            <Label>차량번호</Label>
            <Text>{selectCar.car_num}</Text>
          </TextLayout>
          <TextLayout>
            <Label>층</Label>
            <Text>{selectCar.flor_nm}</Text>
          </TextLayout>
          <TextLayout>
            <Label>입차시간</Label>
            <Text>{selectCar.in_dtm}</Text>
          </TextLayout>
        </CarInfo>
      </CarInfoLayout>
      {mobile ? (
        <ButtonLayout>
          <Button $mobile onClick={onPressFindRoute}>위치안내</Button>
        </ButtonLayout>
      ) : (
        <ButtonLayout>
          <Button>위치출력</Button>
          <Button onClick={onPressFindRoute}>위치안내</Button>
        </ButtonLayout>
      )}
      <Footer text="차량선택" prev="/kiosk/select" />
    </Layout>
  );
};

export default ParkingInfo;