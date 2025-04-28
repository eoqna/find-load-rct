import { Colors } from "../utils/colors";

interface HeaderProps {
  title: string;
  desc: string;
};

const Header = (props: HeaderProps) => {
  const { title, desc } = props;

  return (
    <div className="flex absolute w-full items-center bg-white top-0 left-0 z-40" id="header-layout">
      <div className="flex w-full flex-col justify-center px-5 pt-5">
        <p className="text-[4vmin] font-bold m-0">{title}</p>
        <p className="text-[3vmin] font-bold mt-2" style={{ color: Colors.DarkGray }}>{desc}</p>
      </div>
    </div>
  );
};

export default Header;