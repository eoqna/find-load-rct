import { useCallback } from "react";
import styled from "styled-components";
import { CommonProps } from "../navigation";
import { Colors } from "../utils/colors";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background: ${Colors.White};
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.7);
`;

const Description = styled.p`
  padding: 0;
  margin: 0;
  font-size: 5vmin;
  font-weight: bold;
`;

const Main = (props: CommonProps.ComponentProps) => {
  const { navigation } = props;
  
  /**
   * 광고 배너 자동 슬라이드 함수
   */
  // const [ activeIndex, setActiveIndex ] = useState(0);
  
  // const nextSlice = useCallback(() => {
  //   if (activeIndex < images.length-1) {
  //     setActiveIndex(activeIndex + 1);
  //   } else {
  //     setActiveIndex(0);
  //   }
  // }, [activeIndex]);

  /**
   * 10초 마다 자동 슬라이드
   */
  // useInterval(() => {
  //   nextSlice();
  // }, 1000 * 10);

  const onPressBackground = useCallback(() => {    
    navigation("/kiosk/input");
  }, []);

  return (
    <Layout onClick={onPressBackground}>
      <Description>화면을 터치해 주세요</Description>
    </Layout>
  );
};

export default Main;