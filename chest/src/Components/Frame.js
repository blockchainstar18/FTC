import back from "../assets/buttons/back.png";
import volume_full from "../assets/buttons/volume_full.png";
import volume_mute from "../assets/buttons/volume_mute.png";
import info from "../assets/buttons/info.png";
import coins from "../assets/buttons/coins.png";
import profile from "../assets/buttons/profile.png";
import home from "../assets/buttons/home.png";
import fullscreen from "../assets/buttons/fullscreen.png";

import frame from "../assets/frame/frame_bun copy.png";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export const Frame = () => {
  const navigate = useNavigate();
  const elementRef = useRef(null);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    try {
      if (!isFullScreen) {
        if (elementRef.current) {
          elementRef.current.requestFullscreen();
          setIsFullScreen(true);
        }
      } else {
        document?.exitFullscreen();
        setIsFullScreen(false);
      }
    } catch (error) {}
  };

  return (
    <div ref={elementRef}>
      <div>
        <img src={frame} className="absolute w-full h-[100vh] z-10"></img>

        <div className="absolute z-10 left-[100px] right-[100px] flex justify-between top-[100px]">
          <img
            src={back}
            className="w-[50px] h-[50px] cursor-pointer zoom"
            onClick={() => navigate(-1)}
          ></img>

          <div className="flex gap-[10px]">
            <img src={volume_full} className="w-[50px] h-[50px]"></img>
            <img src={info} className="w-[50px] h-[50px]"></img>
            <Link to="/coins">
              <img src={coins} className="w-[50px] h-[50px] zoom"></img>
            </Link>
            <Link to="/profile">
              <img src={profile} className="w-[50px] h-[50px] zoom"></img>
            </Link>
            <Link to="/home">
              <img src={home} className="w-[50px] h-[50px] zoom"></img>
            </Link>
          </div>
        </div>

        <img
          src={fullscreen}
          className="w-[50px] h-[50px] absolute z-10 bottom-[100px] right-[100px] zoom"
          onClick={toggleFullScreen}
        ></img>
      </div>
      <Outlet />
    </div>
  );
};
