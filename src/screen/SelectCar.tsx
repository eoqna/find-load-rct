import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useDataStore from "../store/useDataStore";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
  width: 50%;
  height: 100%;
`;

const CarInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Label = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1rem;
`;

const Text = styled.p`
  width: 100%;
  padding: 0;
  margin: 5px 0 10px;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  background: #006eb6;
  font-weight: 500;
  font-size: 1.2rem;
`;

const SelectCar = () => {
  const navigation = useNavigate();
  const { carList, setSelectCar } = useDataStore();

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
            <CarListLayout
              key={index}
              onClick={() => onSelectCarNumber(item)}
            >
              <CarImage
                src={require("../assets/imgs/testcar.jpg")}
                alt="차량 이미지"
              />
              <CarInfo>
                <Label>
                  차량번호
                </Label>
                <Text>
                  {item.car_num}
                </Text>
                <Label>
                  입차시간
                </Label>
                <Text>
                  {item.in_dtm}
                </Text>
              </CarInfo>
            </CarListLayout>
          );
        })
      }
      <Footer text="차량번호 입력" prev="input" />
    </Layout>
  )
};

export default SelectCar;