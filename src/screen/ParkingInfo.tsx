import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useDataStore from "../store/useDataStore";
import axiosClient from "../utils/axiosClient";
import { Layout } from "../utils/styles/Common";
import useAppStore from "../store/useAppStore";
import { Colors } from "../utils/colors";
import { useEffect } from "react";
import { CommonProps } from "../navigation";
import initCarImage from "../assets/imgs/initcar.png";

const CarInfoLayout = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const CarImage = styled.img`
  width: 100%;
  height: 40%;
`;

const CarInfo = styled.div`
  width: 100%;
  height: calc(60% - 15px);
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const TextLayout = styled.div`
  display: flex;
  width: 100%;
  height: calc(25% - 10px);
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.p`
  padding: 0;
  margin: 0;
  width: 23%;
  font-weight: bold;
  font-size: 3vmin;
`;

const Text = styled.p`
  width: 75%;
  padding: 5px 0;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  background: #006eb6;
  font-weight: bold;
  font-size: 2.5vmin;
  margin: 0;
`;

const ButtonLayout = styled.div`
  display: flex;
  width: calc(80% + 20px);
  height: 10%;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.button`
  width: 48%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 4vmin;
  font-weight: bold;
  color: ${Colors.White};
  background: ${Colors.Primary};
  border: 0 solid ${Colors.Primary};
  border-radius: 10px;
`;

const ParkingInfo = (props: CommonProps.ComponentProps) => {
  const { setModal } = useAppStore();
  const { mobile, selectCar, kiosk, setPathInfo } = useDataStore();

  useEffect(() => {
    if( !selectCar.car_num ) {
      return props.navigation("/");
    }
  }, [selectCar, props]);

  const onClickFindRoute = async () => {
    const { data } = await axiosClient.post("/api/kiosk/beta/parking/find-route", {
      rotate: 0,
      start_node: kiosk.node_id,
      end_node: selectCar.node_id,
    });
    
    if( data.code === "404" ) {
      return setModal({ open: true, content: data.msg });
    }

    setPathInfo(data.list);

    props.navigation("/kiosk/route");
  };

  return (
    <Layout>
      <Header text="주차정보" />
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

      {mobile ?
        <ButtonLayout style={{justifyContent : "center"}}>
        <Button 
          style={{ width: "100%", height: "70%" }}
          onClick={onClickFindRoute}
        >
          위치안내
        </Button>
        </ButtonLayout>
          :
        <ButtonLayout style={{justifyContent : "space-between"}}>
          <Button>위치출력</Button>
          <Button onClick={onClickFindRoute}>위치안내</Button>
        </ButtonLayout>
      }
      
      <Footer text="차량선택" prev="/kiosk/select" />
    </Layout>
  );
};

export default ParkingInfo;