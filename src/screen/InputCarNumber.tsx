import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useDataStore from "../store/useDataStore";
import { numbers } from "../utils/temp";
import Icon from '@mdi/react';
import { mdiCloseBox } from '@mdi/js';
import Footer from "../components/Footer";
import Header from "../components/Header";
import axiosClient from "../utils/axiosClient";
import useAppStore from "../store/useAppState";
import { Layout } from "../utils/styles/Common";

const Title = styled.h2`
  padding: 0;
  font-size: 4.5vw;
  font-weight: 100;
  color: #fff;
  margin-bottom: 6vh;
`;

const InputLayout = styled.div`
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  width: 21.5%;
  height: 10vh;
  font-size: 1.8rem;
  color: #006eb6;
  font-weight: bold;
  margin: 0 5px;
  text-align: center;
  outline: none;
  cursor: default;
  
  @media (max-width: 800px) {
    width: 14%;
  }

  @media (max-width: 360px) {
    width: 20%;
  }
`;

const NumberPadLayout = styled.div`
  width: 100%;
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
  font-weight: bold;
  border: 0 solid #fff;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
`;

const InputCarNumber = () => {
  const [ first, setFirst ] = useState("");
  const [ second, setSecond ] = useState("");
  const [ third, setThird ] = useState("");
  const [ fourth, setFourth ] = useState("");
  const [ carNumber, setCarNumber ] = useState("");
  const { setModal } = useAppStore();
  const { mobile, setCarList } = useDataStore();
  const navigation = useNavigate();

  useEffect(() => {
    if( mobile ) return navigation("/kiosk/floor");
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
      return alert("차량 번호 4자리를 입력해 주세요.");
    }

    const { data } = await axiosClient.post("/api/kiosk/beta/parking/car-list", {
      car_num : carNumber,
    });

    if( data.code === "404" ) {
      init();
      return setModal({ open: true, content: data.msg })
    }

    parseStringToDate(data.list);

    setCarList(data.list);

    navigation("/kiosk/select");
  }

  return (
    <Layout>
      <Header text="차량번호 입력" />
      <Title>차량번호 뒤의 4자리를 입력해 주세요.</Title>
      <InputLayout>
        <Input type="text" readOnly maxLength={1} value={first} />
        <Input type="text" readOnly maxLength={1} value={second} />
        <Input type="text" readOnly maxLength={1} value={third} />
        <Input type="text" readOnly maxLength={1} value={fourth} />
      </InputLayout>
      <NumberPadLayout>
        {numbers.map((item) => {
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
          })}
      </NumberPadLayout>
      <Footer />
    </Layout>
  );
};

export default InputCarNumber;