import Icon from '@mdi/react';
import { mdiChevronLeft, mdiHome } from '@mdi/js';
import { useNavigate } from "react-router";
import { useCallback } from "react";
import { Colors } from '../utils/colors';
import useDataStore from '../stores/useDataStore';

interface FooterProps {
  text?: string;
  prev?: string;
};

const Footer = (props: FooterProps) => {
  const { prev, text } = props;
  const { kiosk } = useDataStore();
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
    navigation(`/?id=${kiosk.node_id}&rotation=${kiosk.rotation}`);
  }, []);

  return (
    <div 
      className="w-full h-[6%] flex justify-between items-center px-2.5 py-0 absolute bottom-0 left-0 z-40"
      style={{ background: Colors.Primary }}
    >
      {text &&
        <>
          <div className="flex justify-center items-center" onClick={onPressArrow}>
            <Icon path={mdiChevronLeft} size="5vmin" color="#fff" />
          </div>
          <div className="flex justify-center items-center" onClick={onPressHome}>
            <Icon path={mdiHome } size="5vmin" color="#fff" />
          </div>
        </>
      }
    </div>
  );
};

export default Footer;