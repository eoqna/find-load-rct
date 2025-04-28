import { useEffect } from "react";
import { NavigationProps } from "../navigation"
import useDataStore from "../stores/useDataStore";

const NotFoundPage = (props: NavigationProps) => {
  const { navigation } = props;
  const { kiosk } = useDataStore();

  // 네비게이션에 등록된 페이지가 아닐 경우 메인 페이지로 이동
  useEffect(() => {
    navigation(`/?id=${kiosk.node_id}&rotation=${kiosk.rotation}`);
  }, []);

  return (
    <div></div>
  );
}

export default NotFoundPage;