import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import homeBackGround from "../assets/backgrounds/sources/rustic-pizza-restaurant-exterior.jpg";
import purchase from "../assets/buttons/purchase.png";
import withdraw from "../assets/buttons/withdraw.png";

export default function Coin() {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  return (
    <div className="w-full h-screen relative">
      <img
        src={homeBackGround}
        className="w-full h-[100vh] absolute blur-sm"
      ></img>
      <div className="w-full h-full flex">
        <dig className="m-auto z-20 flex flex-col items-center">
          <div className="flex gap-[60px] items-center">
            <Link to="/exchange">
              <img src={purchase} className="w-[300px] zoom transition"></img>
            </Link>
            <Link to="/exchange">
              <img src={withdraw} className="w-[300px] zoom transition"></img>
            </Link>
          </div>
        </dig>
      </div>
    </div>
  );
}
