import styled from "styled-components";
import { Colors } from "../utils/colors";

const Layout = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  position: absolute;
  background: ${Colors.White};
  top: 0;
  left: 0;
  z-index: 1001;
`;

const TextLayout = styled.div`
  display: flex;
  width: calc(100% - 20px);
  flex-direction: column;
  justify-content: center;
  padding: 20px 20px 0;
`;

const Text = styled.p`
  color: ${Colors.Black};
  font-size: 4vmin;
  font-weight: bold;
  margin: 0;
`;

const SubText = styled.p`
  color: rgb(130, 130, 130);
  font-size: 3vmin;
  font-weight: bold;
  margin: 8px 0px 0px 0px;
`;

interface HeaderProps {
  title: string;
  desc: string;
};

const Header = (props: HeaderProps) => {
  const { title, desc } = props;

  return (
    <Layout id="header-layout">
      <TextLayout>
        <Text>{title}</Text>
        <SubText>{desc}</SubText>
      </TextLayout>
    </Layout>
  );
};

export default Header;