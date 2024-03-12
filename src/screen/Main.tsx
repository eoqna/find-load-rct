import { useEffect, useState } from "react";
import styled from "styled-components";
import image from "../assets/imgs/background.png";
import moment from "moment";
import useDataStore from "../store/useDataStore";
import { CommonProps } from "../navigation";

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
  font-size: 5vmin;
`;

const Title = styled.p`
  color: #fff;
  padding: 0;
  margin: 5px 0;
  font-size: 10vmin;
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
  margin: 10vmin 0;
  font-size: 25vmin;
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
  font-size: 7vmin;
  font-weight: bold;
`;

const Main = (props: CommonProps.ComponentProps) => {
  const { mobile } = useDataStore();
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

  const onClickBackground = () => {
    if( mobile ) {
      return props.navigation("/kiosk/floor");
    }
    
    props.navigation("/kiosk/input");
  }

  return (
    <Layout
      onClick={onClickBackground}
    >
        {mobile ?
          <TitleLayout>
            <SubTitle>DAONTEC PARKING SERVICE</SubTitle>
            <Title>주차 안내 서비스</Title>
          </TitleLayout>
            :
          <TitleLayout>
            <SubTitle>AUTO PAY STATION</SubTitle>
            <Title>주차 위치 조회</Title>
          </TitleLayout>
        }
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