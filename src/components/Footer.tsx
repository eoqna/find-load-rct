import styled from "styled-components";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiHome } from '@mdi/js';
import { useNavigate } from "react-router";

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 7%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  background: rgb(59, 58, 66);
  bottom: 0;
  left: 0;
  z-index: 100;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background: rgb(59, 58, 66);
  color: #fff;
  font-size: 3vmin;
  border: 0;
  padding: 0;
  cursor: pointer;
`;

interface FooterProps {
  text?: string;
  prev?: string;
};

const Footer = (props: FooterProps) => {
  const { prev, text } = props;
  const navigation = useNavigate();

  /**
   * 이전 창 이동 함수
   */
  const onClickPrev = () => {
    navigation(`${prev}`);
  };

  /**
   * 메인 창 이동 함수
   */
  const onClickMain = () => {
    navigation("/");
  };

  return (
    <Layout>
      {text &&
        <>
          <ButtonLayout>
            <Icon path={mdiChevronLeft} size={1} color="#fff" />
            <Button
              onClick={onClickPrev}
            >
              {text}
            </Button>
          </ButtonLayout>
          <ButtonLayout>
            <Icon path={mdiHome } size={1} color="#fff" />
            <Button
              onClick={onClickMain}
              style={{ padding: "0 10px 0 5px" }}
            >
              처음으로
            </Button>
          </ButtonLayout>
        </>
      }
    </Layout>
  );
};

export default Footer;