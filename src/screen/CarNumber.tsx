import { useCallback, useState } from "react";
import useDataStore from "../store/useDataStore";
import Icon from '@mdi/react';
import { mdiCloseThick } from '@mdi/js';
import Footer from "../components/Footer";
import Header from "../components/Header";
import axiosClient from "../utils/axiosClient";
import useAppStore from "../store/useAppStore";
import { Layout } from "../assets/css/common";
import { InputLayout, Input, NumberPad, NumberPadLayout, NumberPadGroupLayout } from "../assets/css/numberPad";
import { CommonProps } from "../navigation";
import { inputValue, numbers } from "../contants";

interface InputValueProps {
  first: string;
  second: string;
  third: string;
  fourth: string;
};

const defaultInputValue: InputValueProps = {
  first: "",
  second: "",
  third: "",
  fourth: "",
};

const CarNumber = ({ navigation }: CommonProps.ComponentProps) => {
  const { openModal } = useAppStore();
  const { mobile, kiosk, setCarList } = useDataStore();
  const [ inputs, setInputs ] = useState(defaultInputValue);
  const [ carNumber, setCarNumber ] = useState("");

  /**
   * 넘버 패드를 클릭(터치)하는 경우 호출되는 함수
   * 
   * 입력 받은 숫자를 차량 번호 및 inputs(차량 번호 입력 창)에 넣어준다.
   * 
   * @param text: 사용자가 터치 한 숫자
   */
  const onPressNumber = useCallback((text: string) => {
    if (carNumber.length >= 4) return;

    setCarNumber(prev => prev + text);

    switch (carNumber.length) {
      case 0:
        setInputs({...inputs, first: text});
        break;
      case 1:
        setInputs({...inputs, second: text});
        break;
      case 2:
        setInputs({...inputs, third: text});
        break;
      case 3:
        setInputs({...inputs, fourth: text});
        break;
      default:
        break;
    }
  }, [inputs, carNumber]);

  /**
   * 넘버 패드 중 cancel('X') 클릭(터치)하는 경우 호출되는 함수
   * 
   * 입력된 차량 번호의 길이에 따라 맨 뒤의 값 부터 삭제한다.
   */
  const onPressCancel = useCallback(() => {
    if (carNumber.length <= 0) return;

    setCarNumber(prev => prev.substring(0, prev.length-1));

    switch (carNumber.length) {
      case 1:
        setInputs({...inputs, first: ""});
        break;
      case 2:
        setInputs({...inputs, second: ""});
        break;
      case 3:
        setInputs({...inputs, third: ""});
        break;
      case 4:
        setInputs({...inputs, fourth: ""});
        break;
    }
  }, [inputs, carNumber]);

  /**
   * 입력받은 차량 번호를 초기화한다.
   */
  const clear = useCallback(() => {
    setInputs(defaultInputValue);
    setCarNumber("");
  }, []);

  /**
   * 받아온 차량의 입차 시간을 Date 형태로 변환한다.
   * 
   * @parameter data : 차량 번호로 검색한 차량 데이터
   */
  const convertDateFormat = useCallback((data: ApiResponse.CarState[]) => {
    for (let i = 0; i < data.length; i++) {
      const date = data[i].in_dtm;
      const year = date.substring(0, 4);
      const month = date.substring(4, 6);
      const day = date.substring(6, 8);
      const hour = date.substring(8, 10);
      const min = date.substring(10, 12);
      const sec = date.substring(12, date.length);
    
      data[i].in_dtm = year + "." + month + "." + day + " " + hour + ":" + min + ":" + sec;
    }
  }, []);

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
  const submit = useCallback(async () => {
    try {
      if (carNumber.length < 4) {
        openModal({ open: true, content: "차량번호 4자리를 입력해 주세요" });
        return;
      }

      const { data } = await axiosClient.post(
        "/api/kiosk/v1/parking/car-list",
        {
          car_num : carNumber,
        }
      );

      if (data.code === "404") {
        clear();
        openModal({ open: true, content: data.msg });
        return;
      }

      convertDateFormat(data.list);
      setCarList(data.list);
      navigation("/kiosk/select");
    } catch (err) {
      openModal({ open: true, content: kiosk.err_msg });
    }
  }, [carNumber]);

  return (
    <Layout>
      <Header title="차량번호 입력" desc="고객님의 차량번호 4자리를 입력해 주세요" />
      <InputLayout>
        {inputValue.map((item) => (
          <Input key={item.idx} type="text" readOnly maxLength={1} value={Object.values(inputs)[item.idx]} />
        ))}
      </InputLayout>
      <NumberPadLayout>
        {numbers.map((num) => (
          <NumberPadGroupLayout key={`number-pad-${num[0].text}`}>
            <NumberPad $default onClick={(e) => onPressNumber(e.currentTarget.innerHTML)}>{num[0].text}</NumberPad>
            <NumberPad $default onClick={(e) => onPressNumber(e.currentTarget.innerHTML)}>{num[1].text}</NumberPad>
            <NumberPad $default onClick={(e) => onPressNumber(e.currentTarget.innerHTML)}>{num[2].text}</NumberPad>
          </NumberPadGroupLayout>
        ))}
        <NumberPadGroupLayout>
          <NumberPad onClick={onPressCancel}><Icon path={mdiCloseThick} size="4vmin" /></NumberPad>
          <NumberPad $default onClick={(e) => onPressNumber(e.currentTarget.innerHTML)}>0</NumberPad>
          <NumberPad onClick={submit}>확인</NumberPad>
        </NumberPadGroupLayout>
      </NumberPadLayout>
      {!mobile && <Footer />}
    </Layout>
  );
};

export default CarNumber;