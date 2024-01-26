import woodenBack from "../assets/wooden-boards/wooden-board_notext-01.png";
import woodenBacktext from "../assets/wooden-boards/wooden-board_wtext-01.png";

import { useSelector } from "react-redux";

export const Profile = () => {
  const account = useSelector((state) => state.account.account);
  return (
    <div className="w-full h-screen relatve">
      <img src={woodenBack} className="w-full h-screen"></img>
      <div className="absolute w-full h-full flex top-0">
        <div className="text-[30px] m-auto flex flex-col items-center z-20 space-y-[20px]">
          <div className="text-[50px] cursor-pointer">Profile</div>
          <div className="cursor-pointer">username</div>
          <div className="cursor-pointer">{account}</div>
          <div className="cursor-pointer">Total balance in USDT</div>
          <div className="cursor-pointer">Deposit History</div>
          <div className="cursor-pointer">Withdraw History</div>
        </div>
      </div>
    </div>
  );
};
