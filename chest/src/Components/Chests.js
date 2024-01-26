import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectchest } from "../Actions/GameSlice";

import bg from "../assets/backgrounds/sources/beautiful-illustration-traditional-german-city-street.jpg";

import peasant from "../assets/characters/peasant.svg";
import noble from "../assets/characters/noble.svg";
import emperor from "../assets/characters/emperor.svg";

export const Chests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  if (!isAuthenticated) navigate("/login");

  return (
    <div>
      <img src={bg} className="w-full h-[100vh] absolute blur-sm"></img>
      <Link to="/sizes">
        <div className="absolute flex bottom-[20vh] w-full justify-center">
          <img
            src={peasant}
            className="z-20 w-[400px] zoom transition"
            onClick={() => dispatch(selectchest("copper"))}
          ></img>
          <img
            src={noble}
            className="z-20 w-[400px] zoom transition"
            onClick={() => dispatch(selectchest("silver"))}
          ></img>
          <img
            src={emperor}
            className="z-20 w-[400px] zoom transition"
            onClick={() => dispatch(selectchest("gold"))}
          ></img>
        </div>
      </Link>
      {/* <Button >Peasant</Button>
        <Button >Noble</Button>
        <Button >Emperor</Button> */}
    </div>
  );
};
