import styled from "styled-components";
import { Layout } from "../utils/styles/Common";
import { Colors } from "../utils/colors";
import { FormEvent, useState } from "react";
import axiosClient from "../utils/axiosClient";
import useDataStore from "../store/useDataStore";
import { useNavigate } from "react-router";

const Title = styled.h2`
  padding: 0;
  font-size: 7vw;
  font-weight: bold;
  color: #fff;
  margin-bottom: 6vh;
`;

const Form = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputFloor = styled.input`
  width: 93%;
  height: 30px;
  padding: 5px 10px;
  margin: 5px 0;
  outline: none;
  border: 1px solid #eee;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  outline: none;
  color: ${Colors.White};
  font-size: 16px;
  font-weight: bold;
  background: ${Colors.Primary};
  border: 1px solid ${Colors.Primary};
  border-radius: 5px;
`;

const InputKioskInfo = () => {
  const navation = useNavigate();
  const [ floor, setFloor ] = useState("");
  const { setKiosk } = useDataStore();
  
  const onSubmit = async () => {
    const { data } = await axiosClient.post("/api/kiosk/beta/parking/kiosk-list");

    if( data.list.length > 0 ) {
      for( let i=0; i<data.list.length; i++ ) {
        if( data.list[i].idx === +floor) {
          setKiosk({ node_id: data.list[i].kiosk_id, flor_nm: data.list[i].flor_nm, img_path: data.list[i].img_path_forward });
          return navation("/kiosk/input");
        }
      }
    }

  };

  return (
    <Layout>
      <Title>키오스크 ID 입력</Title>
      <InputFloor 
        type="text"
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
      />
      <Button onClick={onSubmit}>확인</Button>
    </Layout>
  );
};

export default InputKioskInfo;