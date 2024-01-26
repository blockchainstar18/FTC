import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectsize } from "../Actions/GameSlice";

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

export const Sizes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const chest = useSelector((state) => state.game.chest);

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
      <div className="w-full h-full flex">
        <div className="m-auto z-20 flex flex-col items-center">
          <Link to="/plays">
            <div className="flex gap-[100px] items-center">
              {chest == "copper" ? (
                <>
                  <img
                    src={peasant1}
                    className="w-[200px] zoom transition"
                    onClick={() => dispatch(selectsize(10))}
                  ></img>
                  <img
                    src={peasant2}
                    className="w-[200px] zoom transition"
                    onClick={() => dispatch(selectsize(50))}
                  ></img>
                  <img
                    src={peasant3}
                    className="w-[200px] zoom transition"
                    onClick={() => dispatch(selectsize(100))}
                  ></img>
                </>
              ) : (
                <></>
              )}
              {chest == "silver" ? (
                <>
                  <img
                    src={noble1}
                    className="w-[200px] zoom transition"
                    onClick={() => dispatch(selectsize(10))}
                  ></img>
                  <img
                    src={noble2}
                    className="w-[200px] zoom transition"
                    onClick={() => dispatch(selectsize(50))}
                  ></img>
                  <img
                    src={noble3}
                    className="w-[200px] zoom transition"
                    onClick={() => dispatch(selectsize(100))}
                  ></img>
                </>
              ) : (
                <></>
              )}
              {chest == "gold" ? (
                <>
                  <img
                    src={emperor1}
                    className="w-[200px] zoom transition"
                    onClick={() => dispatch(selectsize(10))}
                  ></img>
                  <img
                    src={emperor2}
                    className="w-[200px] zoom transition"
                    onClick={() => dispatch(selectsize(50))}
                  ></img>
                  <img
                    src={emperor3}
                    className="w-[200px] zoom transition"
                    onClick={() => dispatch(selectsize(100))}
                  ></img>
                </>
              ) : (
                <></>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* 
        <Button onClick={() => dispatch(selectsize(10))}>Small</Button>
        <Button onClick={() => dispatch(selectsize(50))}>Medium</Button>
        <Button onClick={() => dispatch(selectsize(100))}>Big</Button>
      </Link> */}
    </div>
  );
};
