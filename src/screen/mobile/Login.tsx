import { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../utils/colors";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginLayout = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${Colors.White};
  border: 0;
  border-radius: 5px;
`;

const Title = styled.p`
  margin: 10% 0;
  font-size: 8vw;
  color: ${Colors.Primary};
  font-weight: bold;
`;

const InputLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Input = styled.input`
  width: 80%;
  height: 20px;
  padding: 10px;
  font-size: 2vw;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Login = () => {
  const [ id, setId ] = useState("");
  const [ password, setPassword ] = useState("");

  return (
    <Layout>
      <LoginLayout>
        <Title>다온텍</Title>

        <InputLayout>
          <Input 
            type="text"
            value=""
          />
        </InputLayout>
      </LoginLayout>
    </Layout>
  );
}

export default Login;