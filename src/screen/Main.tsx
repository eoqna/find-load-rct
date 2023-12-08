import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import image from "../assets/imgs/01_main.png";
import moment from "moment";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background: url(${image}) no-repeat center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled.p`
  color: #fff;
  padding: 0;
  margin: 5px 0;
  font-size: 4vw;
`;

const Title = styled.p`
  color: #fff;
  padding: 0;
  margin: 5px 0;
  font-size: 10vw;
  font-weight: bold;
`;

const TimeLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Time = styled.p`
  color: #fff;
  padding: 0;
  margin: 10vh 0;
  font-size: 20vw;
  font-weight: bold;
`;

const BottomLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bottom = styled.p`
  color: #fff;
  padding: 0;
  margin: 5px 0;
  font-size: 6vw;
  font-weight: bold;
`;

const Main = () => {
  const navigation = useNavigate();
  const [ time, setTime ] = useState(moment().format("HH:mm"));

  const now = () => {
    setTime(moment().format("HH:mm"));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      now();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Layout
      onClick={() => navigation("/input")}
    >
      <TitleLayout>
        <SubTitle>AUTO PAY STATION</SubTitle>
        <Title>주차 위치 조회</Title>
      </TitleLayout>
      <TimeLayout>
        <Time>{time}</Time>
      </TimeLayout>
      <BottomLayout>
        <Bottom>화면을 터치해 주세요.</Bottom>
      </BottomLayout>
    </Layout>
  )
}

export default Main;