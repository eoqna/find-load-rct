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
  const { setCarList, setKiosk } = useDataStore();

  
  /**
   * 입력받은 차량 번호를 초기화한다.
   */
  const init = () => {
    setInputs({ first: "", second: "", third: "", fourth: ""});
    setCarNumber("");
  };

  /**
   * 키오스크 정보를 초기화 한다. (모바일 X)
   * 
   * 나중에 키오스크 정보를 어떻게 받아와야할 지 생각해봐야함
   */
  const initKioskInfo = () => {
    setKiosk({
      node_id: "K20002",
      flor_nm: "P6",
      img_path: "http://localhost:8080/self/img/bg/IFC_B6_0.png"
    });
  };

  /**
   * mobile이고 kiosk 정보가 없을 경우 메인 화면으로 이동한다.
   * 
   * 모바일이 아닌 경우 initKioskInfo() 함수를 호출한다.
   * initKioskInfo : 키오스크 정보 초기화 함수
   */
  useEffect(() => {
    initKioskInfo();
  }, []);

  /**
   * 넘버 패드를 클릭(터치)하는 경우 호출되는 함수
   * 
   * 입력 받은 숫자를 차량 번호 및 inputs(차량 번호 입력 창)에 넣어준다.
   * 
   * @param text : 사용자가 터치 한 숫자
   */
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

  /**
   * 넘버 패드 중 cancel('X') 클릭(터치)하는 경우 호출되는 함수
   * 
   * 입력된 차량 번호의 길이에 따라 맨 뒤의 값 부터 삭제한다.
   */
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

  /**
   * 받아온 차량의 입차 시간을 Date 형태로 변환한다.
   * 
   * @parameter data : 차량 번호로 검색한 차량 데이터
   */
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

  /**
   * 입력 받은 차량 번호를 서버로 전송해서 차량 데이터를 받아오는 함수
   * 
   * 받아온 입차 시간을 Date 형식으로 파싱하고 데이터를 state에 넣어준다.
   * 
   * 차량 데이터가 있는 경우 차량 선택 화면으로 이동한다.
   * 
   * * Error
   *  - 차량 번호가 4자리 미만인 경우 모달창을 띄운다.
   *  - 조회된 데이터가 없는 경우 모달창을 띄운다.
   * 
   * @returns 
   */
  const onSubmit = async () => {
    if( carNumber.length < 4) {
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
      <Footer />
    </Layout>
  );
};

export default InputCarNumber;