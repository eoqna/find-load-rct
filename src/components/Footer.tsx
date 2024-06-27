import styled from "styled-components";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiHome } from '@mdi/js';
import { useNavigate } from "react-router";
import { Colors } from "../utils/colors";

const Layout = styled.footer`
  display: flex;
  width: calc(100% - 20px);
  height: 7%;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  background: ${Colors.Primary};
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
  background: ${Colors.Primary};
  color: #fff;
  font-size: 3vmin;
  font-weight: bold;
  border: 0;
  padding: 0 0 0 4px;
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
          <ButtonLayout onClick={onClickPrev}>
            <Icon path={mdiChevronLeft} size={1} color="#fff" />
          </ButtonLayout>
          <ButtonLayout onClick={onClickMain}>
            <Icon path={mdiHome } size={1} color="#fff" />
          </ButtonLayout>
        </>
      }
    </Layout>
  );
};

export default Footer;