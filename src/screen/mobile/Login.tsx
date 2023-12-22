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
  background: ${Colors.White};
  border: 0;
  border-radius: 5px;
`;

const Title = styled.p`
  margin: 10% 0;
  font-size: 7vw;
  text-align: center;
  color: ${Colors.Primary};
  font-weight: bold;
`;

const Form = styled.form`
  width: 100%;
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
`;

const Input = styled.input`
  width: 80%;
  height: 20px;
  padding: 10px;
  font-size: 3vw;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  margin-bottom: 10px;
`;

const LoginButton = styled.button`
  width: 86%;
  padding: 10px;
  font-size: 4vw;
  font-weight: bold;
  color: ${Colors.White};
  background: ${Colors.Primary};
  border: 1px solid ${Colors.Primary};
  border-radius: 4px;
  outline: none;
  margin-bottom: 10%;
`;

const Login = () => {
  const [ id, setId ] = useState("");
  const [ password, setPassword ] = useState("");

  const validation = () => {
    if( !id ) {
      alert("아이디를 입력해 주세요.");
      return false;

    } else if( !password ) {
      alert("비밀번호를 입력해 주세요.");
      return false;

    }

    return true;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(validation()) {
      console.log(id);
      console.log(password);
    }
  }

  return (
    <Layout>
      <LoginLayout>
        <Title>다온텍 주차 서비스</Title>

        <Form onSubmit={(e) => onSubmit(e)}>
          <InputLayout>
            <Input 
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디"
              autoFocus={true}
            />
          </InputLayout>

          <InputLayout>
            <Input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              style={{
                marginBottom: 30
              }}
            />
          </InputLayout>

          <LoginButton type="submit">
            로그인
          </LoginButton>
        </Form>
      </LoginLayout>
    </Layout>
  );
}

export default Login;