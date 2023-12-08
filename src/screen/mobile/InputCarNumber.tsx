import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useDataStore from "../../store/useDataStore";
import { kioskInfo, numbers, options } from "../../utils/temp";
import Icon from '@mdi/react';
import { mdiCloseBox } from '@mdi/js';
import Footer from "../../components/Footer";
import Header from "../../components/Header";

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
  margin: 0 0 1vh;
  padding: 0;
  font-size: 4.5vw;
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
  font-size: 1.8rem;
  color: #006eb6;
  font-weight: bold;
  margin: 0 5px;
  text-align: center;
  outline: none;
  cursor: default;
`;

const NumberPadLayout = styled.div`
  text-align: center;
  margin-top: 5px;
`;

const NumberPad = styled.button`
  width: 30%;
  margin: 5px;
  height: 8vh;
  text-align: center;
  background: #fff;
  color: rgba(0, 0, 0, 0.6);
  font-size: 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
`;

const Select = styled.select`
  width: 95%;
  padding: 8px 12px;
  margin-bottom: 10px;
  border-radius: 3px;
  font-size: 1.3rem;
  font-weight: 500;
  color: #006eb6;
`;

const Option = styled.option`
  font-size: 1rem;
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
  }, [setKiosk]);
  
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
      <Select>
        {options.map((item) => {
          return (
            <Option value={item.value} key={item.value}>{item.parking_name}</Option>
          );
        })}
      </Select>
      <InputLayout>
        <Input
          type="text"
          readOnly
          maxLength={1}
          value={first}
        />
        <Input
          type="text"
          readOnly
          maxLength={1}
          value={second}
        />
        <Input
          type="text"
          readOnly
          maxLength={1}
          value={third}
        />
        <Input
          type="text"
          readOnly
          maxLength={1}
          value={fourth}
        />
      </InputLayout>
      <NumberPadLayout>
        {numbers.map((item) => {
            if( item === 10 ) {
              return(
                <NumberPad
                  key={item}
                  onClick={onClickCancel}
                >
                  <Icon path={mdiCloseBox} size={1} color="#006eb6" />
                </NumberPad>
              );
            } else if ( item === 11 ) {
              return (
                <NumberPad 
                  key={item}
                  style={{background: "#006eb6", color: "#fff", border: 0}}
                  onClick={onSubmit}
                >
                  확인
                </NumberPad>
              );
            } else {
              return(
                <NumberPad key={item} onClick={(e) => onClickNumber(e.currentTarget.innerHTML)}>{item}</NumberPad>
              );
            }
          })}
      </NumberPadLayout>
      <Footer />
    </Layout>
  );
};

export default InputCarNumber;