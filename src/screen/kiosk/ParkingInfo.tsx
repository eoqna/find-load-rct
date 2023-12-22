import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useDataStore from "../../store/useDataStore";
import { useNavigate } from "react-router";
import axiosClient from "../../utils/axiosClient";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CarInfoLayout = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const CarImage = styled.img`
  width: 100%;
  height: 40%;
`;

const CarInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const TextLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.p`
  padding: 0;
  margin: 0;
  width: 20%;
  font-weight: bold;
  font-size: 1rem;
`;

const Text = styled.p`
  width: 70%;
  padding: 5px 0;
  margin: 5px 0 10px;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  background: #006eb6;
  font-weight: 500;
  font-size: 1.2rem;
`;

const ButtonLayout = styled.div`
  display: flex;
  width: 85%;
  height: 15%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 46%;
`;

const ParkingInfo = () => {
  const { mobile, selectCar, setRoute } = useDataStore();
  const navigation = useNavigate();

  const onClickFindRoute = async () => {
    if( mobile ) {
      return navigation("/mobile/find");
    }

    const { data } = await axiosClient.post("/api/kiosk/beta/parking/find-route", {
      start_node_id: "K10001",
      end_node_id: "E10209",
    });

    setRoute(data.list);

    navigation("/kiosk/route");
  }

  return (
    <Layout>
      <Header text="주차정보" />
      <CarInfoLayout>
        <CarImage
          src={require("../../assets/imgs/testcar.jpg")}
          alt="차량 이미지"
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

      <ButtonLayout>
        <Image
          src={require("../../assets/imgs/위치출력.png")}
          alt="위치출력"
        />
        <Image
          src={require("../../assets/imgs/위치안내.png")}
          alt="위치안내"
          onClick={onClickFindRoute}
        />
      </ButtonLayout>
      <Footer text="차량선택" prev="select" />
    </Layout>
  );
};

export default ParkingInfo;