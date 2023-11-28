import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useDataStore from "../../store/useDataStore";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 100px;
  height: 200px;
  font-size: 150px;
  padding: 10px 20px;
  margin: 0 5px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #aaa;
  border: 0;
  border-radius: 10px;
  color: #ffffff;
  font-size: 30px;
  width: 605px;
  height: 100px;
  margin-top: 20px;
  cursor: pointer;
`;

const InputCarNumber = () => {
  const { setCarNumber } = useDataStore();
  const [ first, setFirst ] = useState("");
  const [ second, setSecond ] = useState("");
  const [ third, setThird ] = useState("");
  const [ fourth, setFourth ] = useState("");
  const navigation = useNavigate();
  
  useEffect(() => {
    const value = `${first}${second}${third}${fourth}`;
    setCarNumber(value);
  }, [first, second, third, fourth]);

  return (
    <Layout>
      <InputLayout>
        <Input
          type="text"
          autoFocus={true}
          maxLength={1}
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
        <Input
          type="text"
          maxLength={1}
          value={second}
          onChange={(e) => setSecond(e.target.value)}
        />
        <Input
          type="text"
          maxLength={1}
          value={third}
          onChange={(e) => setThird(e.target.value)}
        />
        <Input
          type="text"
          value={fourth}
          maxLength={1}
          onChange={(e) => setFourth(e.target.value)}
        />
      </InputLayout>
      <Button onClick={() => navigation("/select")}>
        조회
      </Button>
    </Layout>
  );
};

export default InputCarNumber;