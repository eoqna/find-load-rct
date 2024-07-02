import { Route, Routes, useNavigate } from "react-router";
import styled from "styled-components";
import InputCarNumber from "../screen/InputCarNumber";
import SelectCar from "../screen/SelectCar";
import FindRoute from "../screen/FindRoute";
import Main from "../screen/Main";
import Footer from "../components/Footer";
import { Colors } from "../utils/colors";
import useEventTimeout from "../hooks/useEventTimeout";
import KioskPosition from "../screen/KioskPosition";

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${Colors.White};
`;

const Navigations = () => {
  const navigation = useNavigate();
  
  // useEventTimeout(() => navigation('/'));

  return (
    <Layout className="main" >
      <Routes>
        <Route index element={<Main navigation={navigation} />} />
        {/* <Route path="/kiosk/floor" element={<InputKioskInfo navigation={navigation} />} /> */}
        {/* <Route path="/kiosk/info" element={<ParkingInfo navigation={navigation} />} /> */}
        <Route path="kiosk">
          <Route path="input" element={<InputCarNumber navigation={navigation} />} />
          <Route path="select" element={<SelectCar navigation={navigation} />} />
          <Route path="route" element={<FindRoute navigation={navigation} />} />
          <Route path="position" element={<KioskPosition />} />
        </Route>
        <Route path="/common/footer" element={<Footer />} />
      </Routes>
    </Layout>
  );
}

export default Navigations;