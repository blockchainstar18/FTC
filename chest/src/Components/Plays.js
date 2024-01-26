import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { updateBalances } from "../Actions/AuthSlice";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import balanceBarCopper from "../assets/buttons/ballancebar_copper.png";
import balanceBarSilver from "../assets/buttons/ballancebar_silver.png";
import balanceBarGold from "../assets/buttons/ballancebar_gold.png";

import backgroundPeasant from "../assets/backgrounds/sources/ai-generated-ai-generative-vintage-retro-old-antique-wooden-house-interior-warehouse-storage.jpg";
import backgroundNoble from "../assets/backgrounds/sources/ai-generated-ai-generative-old-vintag-e-antique-inside-house-interior-17-century.jpg";
import backgroundEmperor from "../assets/backgrounds/sources/there-is-room-with-lot-items-it-generative-ai.jpg";

import peasant1 from "../assets/chests/small-size_choose-page-3/peasant1.png";
import peasant2 from "../assets/chests/small-size_choose-page-3/peasant2.png";
import peasant3 from "../assets/chests/small-size_choose-page-3/peasant3.png";

import noble1 from "../assets/chests/small-size_choose-page-3/noble1.png";
import noble2 from "../assets/chests/small-size_choose-page-3/noble2.png";
import noble3 from "../assets/chests/small-size_choose-page-3/noble3.png";

import emperor1 from "../assets/chests/small-size_choose-page-3/emperor1.png";
import emperor2 from "../assets/chests/small-size_choose-page-3/emperor2.png";
import emperor3 from "../assets/chests/small-size_choose-page-3/emperor3.png";

import chestbtnPeasant1 from "../assets/buttons/chestbutton_peasant1.png";
import chestbtnPeasant5 from "../assets/buttons/chestbutton_peasant5.png";
import chestbtnPeasant15 from "../assets/buttons/chestbutton_peasant15.png";

import chestbtnNoble1 from "../assets/buttons/chestbutton_noble1.png";
import chestbtnNoble5 from "../assets/buttons/chestbutton_noble5.png";
import chestbtnNoble15 from "../assets/buttons/chestbutton_noble15.png";

import chestbtnEmperor1 from "../assets/buttons/chestbutton_emperor1.png";
import chestbtnEmperor5 from "../assets/buttons/chestbutton_emperor5.png";
import chestbtnEmperor15 from "../assets/buttons/chestbutton_emperor15.png";

export const Plays = () => {
  const chest = useSelector((state) => state.game.chest);
  const size = useSelector((state) => state.game.size);
  const account = useSelector((state) => state.account.account);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const balances = useSelector((state) => state.account.balances);
  const [loading, setLoading] = useState(false);
  const [blur, setBlur] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [fillingAnimation, setAnimation] = useState("");

  const handleClick = () => {
    setAnimation("filling");

    // Reset the animation after some time
    setTimeout(() => {
      setAnimation("");
    }, 1000);
  };

  const sendToken = async (amount) => {
    handleClick();
    const res = await axios.post("http://localhost:7000/game/play", {
      account: account,
      chest: chest,
      size: size,
      amount: amount,
    });
    if (!res.data) {
      alert("You cannot play game with current balance..");
      setLoading(false);
      setBlur("");
      return;
    }
    if (!res.data.filling) alert("You won the chest!");
    dispatch(updateBalances(res.data.player));
    setLoading(false);
    setBlur("");
  };

  if (!size) navigate("/sizes");
  if (!chest) navigate("/chests");
  if (!isAuthenticated) navigate("/login");
  return (
    <div className="w-full h-screen relative">
      <img
        src={
          chest == "copper"
            ? backgroundPeasant
            : chest == "silver"
            ? backgroundNoble
            : backgroundEmperor
        }
        className="w-full h-[100vh] absolute blur-sm"
      ></img>

      <img
        src={
          chest == "copper"
            ? balanceBarCopper
            : chest == "silver"
            ? balanceBarSilver
            : balanceBarGold
        }
        className="absolute right-[100px] top-[180px] w-[200px]"
      ></img>
      <div className="text-[#a04623] absolute top-[195px] right-[150px] font-bold">
        {chest == "copper"
          ? balances.copper
          : chest == "silver"
          ? balances.silver
          : balances.gold}
      </div>

      <div className="w-full h-full flex">
        <div className="m-auto z-20 flex flex-col items-center">
          <img
            src={
              chest == "copper"
                ? size == 10
                  ? peasant1
                  : size == 50
                  ? peasant2
                  : peasant3
                : chest == "silver"
                ? size == 10
                  ? noble1
                  : size == 50
                  ? noble2
                  : noble3
                : size == 10
                ? emperor1
                : size == 50
                ? emperor2
                : emperor3
            }
            className={`w-[300px] chest ${fillingAnimation}`}
          ></img>

          <div className="flex gap-[50px] mt-[30px]">
            <img
              src={
                chest == "copper"
                  ? chestbtnPeasant1
                  : chest == "silver"
                  ? chestbtnNoble1
                  : chestbtnEmperor1
              }
              className={`w-[70px] ${blur} toTop cursor-pointer`}
              disabled={loading}
              onClick={() => {
                setLoading(true);
                setBlur("blur-sm");
                sendToken(1);
              }}
            ></img>

            {size >= 50 ? (
              <img
                src={
                  chest == "copper"
                    ? chestbtnPeasant5
                    : chest == "silver"
                    ? chestbtnNoble5
                    : chestbtnEmperor5
                }
                className={`w-[70px] ${blur} toTop cursor-pointer`}
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  setBlur("blur-sm");
                  sendToken(5);
                }}
              ></img>
            ) : (
              <></>
            )}
            {size >= 100 ? (
              <img
                src={
                  chest == "copper"
                    ? chestbtnPeasant15
                    : chest == "silver"
                    ? chestbtnNoble15
                    : chestbtnEmperor15
                }
                className={`w-[70px] ${blur} toTop cursor-pointer`}
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  setBlur("blur-sm");
                  sendToken(10);
                }}
              ></img>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* <Button variant="contained">{size + chest}</Button>

      <Typography variant="h3" component="h3">
        {chest}balance:{balances[chest]}
      </Typography>
      <br></br>
      <Button
        disabled={loading}
        onClick={() => {
          setLoading(true);
          sendToken(1);
        }}
      >
        1{chest}
      </Button>
      {size >= 50 ? (
        <Button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            sendToken(5);
          }}
        >
          5{chest}
        </Button>
      ) : (
        <></>
      )}
      {size >= 100 ? (
        <Button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            sendToken(10);
          }}
        >
          10{chest}
        </Button>
      ) : (
        <></>
      )} */}
    </div>
  );
};
