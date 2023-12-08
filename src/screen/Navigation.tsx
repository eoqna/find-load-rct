import { Route, Routes } from "react-router";
import styled from "styled-components";
import InputCarNumber from "./InputCarNumber";
import SelectCar from "./SelectCar";
import FindLoad from "./kiosk/FindLoad";
import Main from "./Main";
import ParkingInfo from "./ParkingInfo";
import Footer from "../components/Footer";

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
        <Route path="/find" element={<FindLoad />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </Layout>
  );
}

export default Navigation;