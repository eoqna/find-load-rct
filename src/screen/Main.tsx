import {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import { CommonProps } from "../navigation";
import { Colors } from "../utils/colors";
import useDataStore from "../store/useDataStore";
import axiosClient from "../utils/axiosClient";
import useAppStore from "../store/useAppStore";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.7);
  background: ${Colors.White};
`;

const Description = styled.p`
  display: block;
  padding: 0;
  margin: 0 0 20px;
  font-size: 5vmin;
  font-weight: bold;

  &:last-child {
    margin: 0;
  }
`;

const Br = styled.p`
  margin: 4% 0;
`;

const Main = ({ navigation }: CommonProps.ComponentProps) => {
  const { openModal } = useAppStore();
  const { mobile, kiosk, setKiosk, setKioskList } = useDataStore();
  const [ title, setTitle ] = useState<string[]>([]);

  const getKioskList = useCallback(async () => {
    const { data } = await axiosClient.post("/api/kiosk/v1/parking/kiosk-list");

    if (data.code === "404") {
      openModal({ open: true, content: data.msg });
      return;
    }

    setKiosk({ ...kiosk, node_id: data.list[0].node_id });
    setKioskList(data.list);
  }, []);

  useEffect(() => {
    if (mobile) {
      setTitle(["모바일", "내 차 찾기 서비스"]);
      return;
    }

    if (kiosk.title) {
      setTitle(kiosk.title.split('\n'));
      return;
    }

    getKioskList();
    navigation("/config");
  }, [mobile, kiosk]);

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
      {title.map((line) => {
        if (!line) {
          return <Br />;
        } else {
          return <Description>{line}</Description>
        }
      })}
    </Layout>
  );
};

export default Main;