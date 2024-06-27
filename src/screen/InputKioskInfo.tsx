import styled from "styled-components";
import { Layout, Title } from "../assets/css/common";
import { useState } from "react";
import axiosClient from "../utils/axiosClient";
import useDataStore from "../store/useDataStore";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { mdiCloseBox } from '@mdi/js';
import { InputLayout, NumberPad, NumberPadLayout } from "../assets/css/numberPad";
import Icon from "@mdi/react";
import useAppStore from "../store/useAppStore";
import { CommonProps } from "../navigation";
import { numbers } from "../contants/input";

const Input = styled.input`
  width: 100%;
  height: 10vmin;
  font-size: 7vmin;
  color: #006eb6;
  font-weight: bold;
  text-align: center;
  outline: none;
  cursor: default;
`;

const InputKioskInfo = (props: CommonProps.ComponentProps) => {
  const [ floor, setFloor ] = useState("");
  const { setModal } = useAppStore();
  const { kiosk, setKiosk } = useDataStore();

  /**
   * 
   * @param text : 사용자가 터치한 숫자
   */
  const onClickNumber = (text: string) => {
    setFloor(floor+text);
  };

  const onClickCancel = () => {
    if( floor.length !== 0 ) setFloor(floor.substring(0, floor.length - 1));
  };
  
  const onSubmit = async () => {
    if( floor.length < 1 ) {
      return setModal({ open: true, content: "키오스크 ID를 입력해 주세요" });
    }

    const { data } = await axiosClient.post("/api/kiosk/beta/parking/kiosk-list");

    if( data.list.length > 0 ) {
      for( let i=0; i<data.list.length; i++ ) {
        if( data.list[i].idx === +floor) {
          setKiosk({ node_id: data.list[i].kiosk_id, flor_nm: data.list[i].flor_nm, img_path: data.list[i].img_path_forward });
          return props.navigation("/kiosk/input");
        }
      }
    }

    if( kiosk ) {
      setFloor("");
      return setModal({ open: true, content: "조회된 키오스크가 없습니다" });
    }
  };

  return (
    <Layout>
      <Header title="키오스크 ID 입력"  desc="키오스크 ID를 입력해주세요" />
      <Title>키오스크 ID를 입력해 주세요</Title>
      <InputLayout>
        <Input type="text" readOnly value={floor} maxLength={2} minLength={1} />
      </InputLayout>
      <NumberPadLayout>
        {/* {numbers.map((item) => {
          return (
            item === 10 ?
              (
                <NumberPad
                  key={item}
                  onClick={onClickCancel}
                >
                  <Icon path={mdiCloseBox} size={1} color="#006eb6" />
                </NumberPad>
              )
                :
              ( item === 11 ?
                  (
                    <NumberPad 
                      key={item}
                      style={{background: "#006eb6", color: "#fff", border: 0}}
                      onClick={onSubmit}
                    >
                      확인
                    </NumberPad>
                  )
                :
                  <NumberPad key={item} onClick={(e) => onClickNumber(e.currentTarget.innerHTML)}>{item}</NumberPad>
              )
          );
          })} */}
      </NumberPadLayout>
      <Footer />
    </Layout>
  );
};

export default InputKioskInfo;