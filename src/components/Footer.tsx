import styled from "styled-components";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiHome } from '@mdi/js';
import { useNavigate } from "react-router";
import { Colors } from "../utils/colors";
import { useCallback } from "react";

const Layout = styled.footer`
  display: flex;
  width: calc(100% - 20px);
  height: 6%;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  background: ${Colors.Primary};
  bottom: 0;
  left: 0;
  z-index: 1001;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  const onPressArrow = useCallback(() => {
    navigation(`${prev}`);
  }, []);

  /**
   * 메인 창 이동 함수
   */
  const onPressHome = useCallback(() => {
    navigation("/");
  }, []);

  return (
    <Layout>
      {text &&
        <>
          <Button onClick={onPressArrow}>
            <Icon path={mdiChevronLeft} size="5vmin" color="#fff" />
          </Button>
          <Button onClick={onPressHome}>
            <Icon path={mdiHome } size="5vmin" color="#fff" />
          </Button>
        </>
      }
    </Layout>
  );
};

export default Footer;