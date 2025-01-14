import styled from "styled-components";
import { CommonProps } from "../navigation";
import { Colors } from "../utils/colors";
import { useCallback, useRef, useState } from "react";
import useDataStore from "../store/useDataStore";
import Header from "../components/Header";
import useAppStore from "../store/useAppStore";

const Layout = styled.div`
  width: calc(100% - 80px);
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const InputLayout = styled.div<{ $button?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $button }) => $button ? "row" : "column"};
  align-items: ${({ $button }) => $button ? "center" : "flex-start"};
  ${({ $button }) => $button && "justify-content: center;"}
  ${({ $button }) => $button ? "margin-top: 4px;" : "margin-bottom: 8px;"}
`;

const Label = styled.label<{ $mobile?: boolean }>`
  font-size: ${({ $mobile }) => $mobile ? "2.4vmin" : "3vmin"};
  font-weight: bold;
`;

const Input = styled.input<{ $mobile?: boolean }>`
  width: ${({ $mobile }) => $mobile ? "calc(100% - 8px)" : "calc(100% - 16px)"};
  border: 1px solid ${Colors.Black};
  font-size: ${({ $mobile }) => $mobile ? "2vmin" : "2.8vmin"};
  padding: ${({ $mobile }) => $mobile ? "4px" : "4px 8px"};
  border-radius: 4px;
  outline: none;
`;

const Select = styled.select<{ $mobile?: boolean }>`
  width: 100%;
  border: 1px solid ${Colors.Black};
  font-size: ${({ $mobile }) => $mobile ? "2vmin" : "2.8vmin"};
  padding: ${({ $mobile }) => $mobile ? "4px" : "4px 8px"};
  border-radius: 4px;
  outline: none;
`;

const Button = styled.button<{ $submit?: boolean }>`
  background: ${({ $submit }) => $submit ? Colors.Primary : Colors.Red};
  border: 0px solid ${({ $submit }) => $submit ? Colors.Primary : Colors.Red};
  border-radius: 4px;
  color: ${Colors.White};
  font-size: 2.8vmin;
  font-weight: bold;
  padding: 6px 10px;
  ${({ $submit }) => $submit ? "margin-right: 4px;" : "margin-left: 4px;"}
`;

const Option = styled.option``;

const rotates = [0, 90, 180, 270];

const Config = ({ navigation }: CommonProps.ComponentProps) => {
  const { openModal } = useAppStore();
  const { kiosk, mobile, kioskList, setKiosk } = useDataStore();
  const [ kioskConfig, setKioskConfig ] = useState<ApiResponse.KioskInfo>(kiosk);
  const titleRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLInputElement>(null);

  const submit = useCallback(() => {
    if (!kioskConfig.title) {
      openModal({ open: true, content: "메인화면 문구를 입력해 주세요" });
      titleRef.current?.focus();
      return;
    }

    if (!kioskConfig.err_msg) {
      openModal({ open: true, content: "에러 메시지를 입력해 주세요" });
      msgRef.current?.focus();
      return;
    }

    setKiosk(kioskConfig);
    navigation("/");
  }, [kioskConfig]);

  const cancel = useCallback(() => {
    navigation("/");
  }, []);

  return (
    <Layout>
      <Header title="키오스크 환경설정" desc="키오스크 정보를 설정해 주세요" />
      <InputLayout>
        <Label $mobile={mobile}>키오스크 번호</Label>
        <Select 
          $mobile={mobile} 
          value={kioskConfig?.node_id} 
          onChange={(e) => setKioskConfig({ ...kioskConfig, node_id: e.target.value})}
        >
          {kioskList.map((kiosk) => (
            <Option key={kiosk.node_id} value={kiosk.node_id}>{kiosk.node_id}</Option>
          ))}
        </Select>
      </InputLayout>
      <InputLayout>
        <Label $mobile={mobile}>맵이미지 각도</Label>
        <Select $mobile={mobile} value={kioskConfig?.rotate} onChange={(e) => setKioskConfig({ ...kioskConfig, rotate: +e.target.value})}>
          {rotates.map((rotate) => (
            <Option key={rotate} value={rotate}>{rotate}</Option>
          ))}
        </Select>
      </InputLayout>
      <InputLayout>
        <Label $mobile={mobile}>메인화면 문구</Label>
        <Input 
          ref={titleRef}
          value={kioskConfig?.title}
          onChange={(e) => setKioskConfig({ ...kioskConfig, title: e.target.value })}
        />
      </InputLayout>
      <InputLayout>
        <Label $mobile={mobile}>에러 메시지</Label>
        <Input 
          ref={msgRef}
          value={kioskConfig?.err_msg}
          onChange={(e) => setKioskConfig({ ...kioskConfig, err_msg: e.target.value })}
        />
      </InputLayout>
      <InputLayout $button>
          <Button $submit onClick={submit}>저장</Button>
          <Button onClick={cancel}>취소</Button>
      </InputLayout>
    </Layout>
  );
};

export default Config;