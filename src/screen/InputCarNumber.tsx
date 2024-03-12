import { useEffect, useState } from "react";
import styled from "styled-components";
import useDataStore from "../store/useDataStore";
import { numbers } from "../utils/temp";
import Icon from '@mdi/react';
import { mdiCloseBox } from '@mdi/js';
import Footer from "../components/Footer";
import Header from "../components/Header";
import axiosClient from "../utils/axiosClient";
import useAppStore from "../store/useAppStore";
import { Layout, Title } from "../utils/styles/Common";
import { InputLayout, NumberPad, NumberPadLayout } from "../utils/styles/NumberPad";
import { Colors } from "../utils/colors";
import { CommonProps } from "../navigation";

const Input = styled.input`
  width: calc(25% - 10px);
  height: 10vh;
  font-size: 1.8rem;
  color: #006eb6;
  font-weight: bold;
  margin: 0 5px;
  text-align: center;
  outline: none;
  cursor: default;
`;

interface InputValue {
  first: string;
  second: string;
  third: string;
  fourth: string;
};

const InputCarNumber = (props: CommonProps.ComponentProps) => {
  const [ inputs, setInputs ] = useState<InputValue>({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });
  const [ carNumber, setCarNumber ] = useState("");
  const { setModal } = useAppStore();
  const { kiosk, mobile, setCarList } = useDataStore();

  useEffect(() => {
    if( mobile && !kiosk.node_id ) {
      return props.navigation("/");
    }

    kiosk.node_id = "K20002";
    kiosk.flor_nm = "P6";
    kiosk.img_path = "http://localhost:8080/self/img/bg/IFC_B6_0.png";
  }, [mobile, kiosk, props]);
  
  const init = () => {
    setInputs({ first: "", second: "", third: "", fourth: ""});
    setCarNumber("");
  };

  const onClickNumber = (text: string) => {
    const len = carNumber.length;

    switch (len) {
      case 0:
        setCarNumber(carNumber + text);
        setInputs({...inputs, first: text});
        break;
      case 1:
        setCarNumber(carNumber + text);
        setInputs({...inputs, second: text});
        break;
      case 2:
        setCarNumber(carNumber + text);
        setInputs({...inputs, third: text});
        break;
      case 3:
        setCarNumber(carNumber + text);
        setInputs({...inputs, fourth: text});
        break;
      default:
        break;
    }
  };

  const onClickCancel = () => {
    const len = carNumber.length;

    switch (len) {
      case 1:
        setCarNumber(carNumber.substring(0, carNumber.length - 1));
        setInputs({...inputs, first: ""});
        break;
      case 2:
        setCarNumber(carNumber.substring(0, carNumber.length - 1));
        setInputs({...inputs, second: ""});
        break;
      case 3:
        setCarNumber(carNumber.substring(0, carNumber.length - 1));
        setInputs({...inputs, third: ""});
        break;
      case 4:
        setCarNumber(carNumber.substring(0, carNumber.length - 1));
        setInputs({...inputs, fourth: ""});
        break;
    }
  };

  const parseStringToDate = (data: ApiResponse.CarState[]) => {
    for( let i=0; i<data.length; i++) {
      const year = data[i].in_dtm.substring(0, 4);
      const month = data[i].in_dtm.substring(4, 6);
      const day = data[i].in_dtm.substring(6, 8);
      const hour = data[i].in_dtm.substring(8, 10);
      const min = data[i].in_dtm.substring(10, 12);
      const sec = data[i].in_dtm.substring(12, data[i].in_dtm.length);
    
      data[i].in_dtm = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
    }
  };

  const onSubmit = async () => {
    if( carNumber.length !== 4) {
      return setModal({ open: true, content: "차량번호 4자리를 입력해 주세요" });
    }

    const { data } = await axiosClient.post("/api/kiosk/beta/parking/car-list", {
      car_num : carNumber,
    });

    if( data.code === "404" ) {
      init();
      return setModal({ open: true, content: data.msg });
    }
    
    parseStringToDate(data.list);

    setCarList(data.list);

    props.navigation("/kiosk/select");
  };

  return (
    <Layout>
      <Header text="차량번호 입력" />
      <Title>차량번호 뒤 4자리를 입력해 주세요</Title>
      <InputLayout>
        <Input type="text" readOnly maxLength={1} value={inputs.first} style={{marginLeft: 0}} />
        <Input type="text" readOnly maxLength={1} value={inputs.second} />
        <Input type="text" readOnly maxLength={1} value={inputs.third} />
        <Input type="text" readOnly maxLength={1} value={inputs.fourth} style={{marginRight: 0}} />
      </InputLayout>
      <NumberPadLayout>
        {numbers.map((item) => {
          return (
            item === 10 ?
              <NumberPad key={item} onClick={onClickCancel}>
                <Icon path={mdiCloseBox} size={1} color="#006eb6" />
              </NumberPad>
                :
              ( item === 11 ?
                  (
                    <NumberPad 
                      key={item}
                      style={{background: Colors.Primary, color: Colors.White, border: 0}}
                      onClick={onSubmit}
                    >
                      확인
                    </NumberPad>
                  )
                    :
                  <NumberPad key={item} onClick={(e) => onClickNumber(e.currentTarget.innerHTML)}>{item}</NumberPad>
              )
          );
          })}
      </NumberPadLayout>
      {mobile ?
        <Footer text="키오스크 선택" prev="/kiosk/floor"/>
          :
        <Footer />
      }
    </Layout>
  );
};

export default InputCarNumber;