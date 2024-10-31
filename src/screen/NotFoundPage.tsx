import { useEffect } from "react";
import { CommonProps } from "../navigation"

const NotFoundPage = (props: CommonProps.ComponentProps) => {
  const { navigation } = props;

  // 네비게이션에 등록된 페이지가 아닐 경우 메인 페이지로 이동
  useEffect(() => {
    navigation("/");
  }, []);

  return (
    <div></div>
  );
}

export default NotFoundPage;