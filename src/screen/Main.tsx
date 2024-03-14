import { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import useDataStore from "../store/useDataStore";
import { CommonProps } from "../navigation";
import useInterval from "../hooks/useInterval";
import { images } from "../utils/temp";

const Layout = styled.div<{ bg: string }>`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.7);
`;

const TimeLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5vmin;
`;

const Time = styled.p`
  padding: 0;
  margin: 0;
  font-size: 8vmin;
  font-weight: bold;
`;

const BottomLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10vmin;
`;

const Bottom = styled.p`
  padding: 0;
  margin: 0;
  font-size: 7vmin;
  font-weight: bold;
`;

const Main = (props: CommonProps.ComponentProps) => {
  const { mobile } = useDataStore();
  const [ time, setTime ] = useState(moment().format("HH:mm"));
  const [ activeIndex, setActiveIndex ] = useState(0);

  // const now = () => {
  //   setTime(moment().format("HH:mm"));
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     now();
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const nextSlice = () => {
    if(activeIndex < images.length-1) setActiveIndex(activeIndex + 1);
    else setActiveIndex(0);
  };

  useInterval(() => {
    nextSlice();
  }, 1000 * 10);

  const onClickBackground = () => {
    if( mobile ) {
      return props.navigation("/kiosk/floor");
    }
    
    props.navigation("/kiosk/input");
  };

  return (
    <Layout
      bg={images[activeIndex]}
      onClick={onClickBackground}
    >
      <BottomLayout>
        <Bottom>화면을 터치해 주세요</Bottom>
      </BottomLayout>
    </Layout>
  );
};

export default Main;