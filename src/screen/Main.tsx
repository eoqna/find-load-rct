import { useCallback, useState } from "react";
import styled from "styled-components";
import { CommonProps } from "../navigation";
import useInterval from "../hooks/useInterval";
import { images } from "../utils/temp";

const Layout = styled.div<{ $bg: string }>`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.$bg});
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  color: rgba(0, 0, 0, 0.7);
`;

const BottomLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 8vmin;
`;

const Bottom = styled.p`
  padding: 0;
  margin: 0;
  font-size: 5vmin;
  font-weight: bold;
`;

const Main = (props: CommonProps.ComponentProps) => {
  const [ activeIndex, setActiveIndex ] = useState(0);
  
  const nextSlice = useCallback(() => {
    if(activeIndex < images.length-1) setActiveIndex(activeIndex + 1);
    else setActiveIndex(0);
  }, [activeIndex]);

  useInterval(() => {
    nextSlice();
  }, 1000 * 10);

  const onClickBackground = useCallback(() => {    
    props.navigation("/kiosk/input");
  }, []);

  return (
    <Layout
      $bg={images[activeIndex]}
      onClick={onClickBackground}
    >
      <BottomLayout>
        <Bottom>화면을 터치해 주세요</Bottom>
      </BottomLayout>
    </Layout>
  );
};

export default Main;