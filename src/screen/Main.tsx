import { Route, Routes } from "react-router";
import styled from "styled-components";
import InputCarNumber from "./find/InputCarNumber";
import SelectCar from "./find/SelectCar";
import FindMyCar from "./find/FindMyCar";

const Layout = styled.div`
  height: 100%;
  width: 100%;
`;

const Main = () => {
  return (
    <Layout className="main">
      <Routes>
        <Route index element={<InputCarNumber />} />
        <Route path="/select" element={<SelectCar />} />
        <Route path="/find" element={<FindMyCar />} />
      </Routes>
    </Layout>
  );
}

export default Main;