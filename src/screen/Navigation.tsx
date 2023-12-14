import { Route, Routes } from "react-router";
import styled from "styled-components";
import InputCarNumber from "./InputCarNumber";
import SelectCar from "./SelectCar";
import FindLoad from "./kiosk/FindLoad";
import Main from "./Main";
import ParkingInfo from "./ParkingInfo";
import Footer from "../components/Footer";
import FindMyCar from "./mobile/FindMyCar";

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Navigation = () => {
  return (
    <Layout className="main" >
      <Routes>
        <Route index element={<Main />} />
        <Route path="/input" element={<InputCarNumber />} />
        <Route path="/select" element={<SelectCar />} />
        <Route path="/info" element={<ParkingInfo />} />
        <Route path="/load" element={<FindLoad />} />
        <Route path="/find" element={<FindMyCar />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </Layout>
  );
}

export default Navigation;