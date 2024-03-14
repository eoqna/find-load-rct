import styled from "styled-components";
import useDataStore from "../store/useDataStore";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect } from "react";
import { Layout, Title } from "../utils/styles/Common";
import initCarImage from "../assets/imgs/initcar.png";
import { CommonProps } from "../navigation";

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

const CarImageLayout = styled.div`
  width: 40%;
  height: 100%;
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
`;

const CarInfo = styled.div`
  width: calc(60% - 10px);
  height: 100%;
  margin-left: 10px;
`;

const Label = styled.p`
  height: calc(25% - 3px);
  display: flex;
  align-items: center;
  font-size: 3vmin;
  font-weight: bold;
  margin: 0 0 3px 0;
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
  font-size: 3vmin;
`;

const SelectCar = (props: CommonProps.ComponentProps) => {
  const { carList, setSelectCar } = useDataStore();

  useEffect(() => {
    if( !carList.length ) {
      console.log("실행");
      props.navigation("/");
    }
  }, [carList, props]);

  /**
   * 차량 목록 클릭 시 호출 함수
   * 
   * 차량 정보를 selectCar에 넣어준다.
   * 
   * 차량 선택 시 '주차 상세 정보' 페이지로 이동한다.
   * 
   * @param item : 선택한 차량 정보
   */
  const onSelectCarNumber = (item: ApiResponse.CarState) => {
    setSelectCar(item);
    props.navigation("/kiosk/info");
  };

  return (
    <Layout>
      <Header text="차량선택" />
      <Title>고객님의 차량을 선택해 주세요</Title>
      {
        carList.map((item, index) => {
          return (
            <CarListLayout key={index} onClick={() => onSelectCarNumber(item)}>
              <CarImageLayout>
                <CarImage src={item.img_path} alt="차량 이미지" onError={(e) => {e.currentTarget.src = initCarImage}} />
              </CarImageLayout>
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
      <Footer text="차량번호 입력" prev="/kiosk/input" />
    </Layout>
  );
};

export default SelectCar;