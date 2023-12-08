import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useDataStore from "../store/useDataStore";
import { kioskInfo } from "../utils/temp";
import Icon from '@mdi/react';
import { mdiCloseBox } from '@mdi/js';
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(26,28, 36);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 6vh;
  padding: 0;
  font-size: 3.5vw;
  font-weight: 100;
  color: #fff;
`;

const InputLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 20%;
  height: 10vh;
  font-size: 7vw;
  color: #006eb6;
  font-weight: bold;
  margin: 0 5px;
  text-align: center;
  outline: none;
  cursor: default;
`;

const NumberPadLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const NumberPadInnerLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NumberPad = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  height: 8vh;
  text-align: center;
  background: #fff;
  font-size: 6vw;
  border-radius: 5px;
  cursor: pointer;
`;

const InputCarNumber = () => {
  const { setKiosk } = useDataStore();
  const [ first, setFirst ] = useState("");
  const [ second, setSecond ] = useState("");
  const [ third, setThird ] = useState("");
  const [ fourth, setFourth ] = useState("");
  const [ carNumber, setCarNumber ] = useState("");
  const navigation = useNavigate();
  
  useEffect(() => {
    setKiosk(kioskInfo);
  }, []);
  
  const init = () => {
    setFirst("");
    setSecond("");
    setThird("");
    setFourth("");
    setCarNumber("");
  };

  const onClickNumber = (text: string) => {
    const len = carNumber.length;

    switch (len) {
      case 0:
        setCarNumber(text);
        setFirst(text);
        return;
      case 1:
        setCarNumber(carNumber + text);
        setSecond(text);
        return;
      case 2:
        setCarNumber(carNumber + text);
        setThird(text);
        return;
      case 3:
        setCarNumber(carNumber + text);
        setFourth(text);
        return;
    }
  };

  const onClickCancel = () => {
    const len = carNumber.length;

    switch (len) {
      case 1:
        setCarNumber(carNumber.substring(0, carNumber.length - 1));
        setFirst("");
        return;
      case 2:
        setCarNumber(carNumber.substring(0, carNumber.length - 1));
        setSecond("");
        return;
      case 3:
        setCarNumber(carNumber.substring(0, carNumber.length - 1));
        setThird("");
        return;
      case 4:
        setCarNumber(carNumber.substring(0, carNumber.length - 1));
        setFourth("");
        return;
    }
  };

  const onSubmit = async () => {
    if( carNumber.length !== 4) {
      return alert("차량 번호 4자리를 입력해 주세요.");
    }

    if( carNumber !== "1234" ) {
      alert("조회된 차량이 없습니다.");
      init();
      return;
    }
    
    navigation("/select");
  }

  return (
    <Layout>
      <Header text="차량번호 입력" />
      <Title>차량번호 뒤의 4자리를 입력해 주세요.</Title>
      <InputLayout>
        <Input
          type="text"
          id="input_1"
          readOnly
          maxLength={1}
          value={first}
        />
        <Input
          type="text"
          id="input_2"
          readOnly
          maxLength={1}
          value={second}
        />
        <Input
          type="text"
          id="input_3"
          readOnly
          maxLength={1}
          value={third}
        />
        <Input
          type="text"
          id="input_4"
          readOnly
          value={fourth}
          maxLength={1}
        />
      </InputLayout>
      <NumberPadLayout>
        <NumberPadInnerLayout>
          <NumberPad
            onClick={(e) => onClickNumber(e.currentTarget.innerHTML)}
          >
            1
          </NumberPad>
          <NumberPad
            onClick={(e) => onClickNumber(e.currentTarget.innerHTML)}
          >
            2
          </NumberPad>
          <NumberPad
            onClick={(e) => onClickNumber(e.currentTarget.innerHTML)}
          >
            3
          </NumberPad>
        </NumberPadInnerLayout>
        <NumberPadInnerLayout>
          <NumberPad
            onClick={(e) => onClickNumber(e.currentTarget.innerHTML)}
          >
            4
          </NumberPad>
          <NumberPad
            onClick={(e) => onClickNumber(e.currentTarget.innerHTML)}
          >
            5
          </NumberPad>
          <NumberPad
            onClick={(e) => onClickNumber(e.currentTarget.innerHTML)}
          >
            6
          </NumberPad>
        </NumberPadInnerLayout>
        <NumberPadInnerLayout>
          <NumberPad
            onClick={(e) => onClickNumber(e.currentTarget.innerHTML)}
          >
            7
          </NumberPad>
          <NumberPad
            onClick={(e) => onClickNumber(e.currentTarget.innerHTML)}
          >
            8
          </NumberPad>
          <NumberPad
            onClick={(e) => onClickNumber(e.currentTarget.innerHTML)}
          >
            9
          </NumberPad>
        </NumberPadInnerLayout>
        <NumberPadInnerLayout>
          <NumberPad
            onClick={onClickCancel}
          >
            <Icon path={mdiCloseBox} size={1.3} />
          </NumberPad>
          <NumberPad
            onClick={(e) => onClickNumber(e.currentTarget.innerHTML)}
          >
            0
          </NumberPad>
          <NumberPad 
            style={{background: "#006eb6", color: "#fff"}}
            onClick={onSubmit}
          >
            확인
          </NumberPad>
        </NumberPadInnerLayout>
      </NumberPadLayout>
      <Footer />
    </Layout>
  );
};

export default InputCarNumber;