import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 7%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  background: rgb(59, 58, 66);
  top: 0;
  left: 0;
  z-index: 100;
`;

const TextLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const Text = styled.span`
  color: #fff;
  font-size: 4vmin;
  font-weight: bold;
`;

interface HeaderProps {
  text: string;
};

const Header = (props: HeaderProps) => {
  const { text } = props;

  return (
    <Layout>
      <TextLayout>
        <Text>{text}</Text>
      </TextLayout>
    </Layout>
  );
};

export default Header;