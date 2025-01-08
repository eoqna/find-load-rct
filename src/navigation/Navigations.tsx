import { Route, Routes, useNavigate } from "react-router";
import styled from "styled-components";
import useEventTimeout from "../hooks/useEventTimeout";
import CarNumber from "../screen/CarNumber";
import SelectCar from "../screen/SelectCar";
import FindRoute from "../screen/FindRoute";
import Main from "../screen/Main";
import Footer from "../components/Footer";
import { Colors } from "../utils/colors";
import NotFoundPage from "../screen/NotFoundPage";
import FindMyCar from "../screen/FindMyCar";
import Config from "../screen/Config";

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${Colors.White};
`;

const Navigations = () => {
  const navigation = useNavigate();
  
  // 1분 동안 움직임이 없으면 메인 화면으로 이동
  useEventTimeout(() => navigation('/'));

  return (
    <Layout className="main" >
      <Routes>
        <Route index element={<Main navigation={navigation} />} />
        <Route path="/config" element={<Config navigation={navigation} />} />
        <Route path="kiosk">
          <Route path="input" element={<CarNumber navigation={navigation} />} />
          <Route path="select" element={<SelectCar navigation={navigation} />} />
          <Route path="route" element={<FindRoute navigation={navigation} />} />
          <Route path="find-car" element={<FindMyCar navigation={navigation} />} />
        </Route>
        <Route path="/common/footer" element={<Footer />} />
        <Route path="/*" element={<NotFoundPage navigation={navigation} />} />
      </Routes>
    </Layout>
  );
}

export default Navigations;