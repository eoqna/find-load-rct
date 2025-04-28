import { Route, Routes, useLocation, useNavigate } from "react-router";
import useEventTimeout from "../hooks/useEventTimeout";
import CarNumber from "../pages/CarNumber";
import SelectCar from "../pages/SelectCar";
import FindRoute from "../pages/FindRoute";
import Footer from "../components/Footer";
import NotFoundPage from "../pages/NotFoundPage";
import FindMyCar from "../pages/FindMyCar";
import useDataStore from "../stores/useDataStore";
import { useEffect } from "react";

const Navigations = () => {
  const { kiosk, setKiosk } = useDataStore();
  const navigation = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (!kiosk.node_id) {
      const id = queryParams.get("id") as string;
      const rotation = +(queryParams.get("rotation") as string);

      setKiosk({ ...kiosk, node_id: id, rotation: rotation });
    }
  }, [kiosk]);
  
  // 1분 동안 움직임이 없으면 메인 화면으로 이동
  useEventTimeout(() => {
    if (kiosk.node_id) {
      navigation(`/?id=${kiosk.node_id}&rotation=${kiosk.rotation}`);
    }
  });

  return (
    <div className="w-full h-full bg-white">
      <Routes>
        <Route index element={<CarNumber navigation={navigation} />} />
        <Route path="select" element={<SelectCar navigation={navigation} />} />
        <Route path="route" element={<FindRoute navigation={navigation} />} />
        <Route path="find-car" element={<FindMyCar navigation={navigation} />} />
        <Route path="/common/footer" element={<Footer />} />
        <Route path="/*" element={<NotFoundPage navigation={navigation} />} />
      </Routes>
    </div>
  );
}

export default Navigations;