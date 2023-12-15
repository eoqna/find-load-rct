import { useState } from "react";
import styled from "styled-components";

const Layout = styled.div`
  width: 100%;
  height: 100%;
`;

const Join = () => {
  const [ id, setId ] = useState("");
  const [ pw, setPw ] = useState("");
  const [ pwck, setPwck ] = useState("");
  const [ carNum, setCarNum ] = useState("");

  return (
    <Layout></Layout>
  );
};

export default Join;