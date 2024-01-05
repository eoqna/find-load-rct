import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useDataStore from "../store/useDataStore";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect } from "react";
import { Layout } from "../utils/styles/Common";

const Title = styled.h2`
  margin-bottom: 6vh;
  padding: 0;
  font-size: 4.5vw;
  font-weight: 100;
  color: #fff;
`;

const CarListLayout = styled.div`
  width: 80%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  background: #fff;
  border-radius: 5px;
`;

const CarImage = styled.img`
  width: 30%;
  height: 100%;

  @media (max-width: 800px) {
    width: 40%;
  }
`;

const CarInfo = styled.div`
  width: 70%;
  height: 100%;
  margin-left: 10px;

  @media (max-width: 800px) {
    width: 60%;
  }
`;

const Label = styled.p`
  height: 25%;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 0 3px;
`;

const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25%;
  margin: 0;
  border-radius: 5px;
  color: #fff;
  background: #006eb6;
  font-weight: 500;
  font-size: 1.2rem;

  @media (max-width: 800px) {
    font-size: 1rem;
  }
`;

const SelectCar = () => {
  const navigation = useNavigate();
  const { carList, setSelectCar } = useDataStore();

  useEffect(() => {
    if( carList.length < 0 ) {
      navigation("/");
    }
  })

  const onSelectCarNumber = (item: ApiResponse.CarState) => {
    setSelectCar(item);
    navigation("/kiosk/info");
  };

  return (
    <Layout>
      <Header text="차량선택" />
      <Title>고객님의 차량을 선택해 주세요.</Title>
      {
        carList.map((item, index) => {
          return (
            <CarListLayout key={index} onClick={() => onSelectCarNumber(item)}>
              <CarImage src={item.img_path} alt="차량 이미지" />
              <CarInfo>
                <Label>차량번호</Label>
                <Text>{item.car_num}</Text>
                <Label>입차시간</Label>
                <Text>{item.in_dtm}</Text>
              </CarInfo>
            </CarListLayout>
          );
        })
      }
      <Footer text="차량번호 입력" prev="kiosk/input" />
    </Layout>
  )
};

export default SelectCar;