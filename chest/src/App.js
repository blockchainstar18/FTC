import "./App.css";
// import Login from "./Components/Login";
import Connect from "./Components/Connect";
import Home from "./Components/Home";
import { Chests } from "./Components/Chests";
import { Sizes } from "./Components/Sizes";
import { Plays } from "./Components/Plays";
import { Exchange } from "./Components/Exchange";
// const { io } = require("socket.io-client");
import { useDispatch } from "react-redux";
import { checkifAuthenticated } from "./Actions/AuthSlice";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import { Frame } from "./Components/Frame";
import Coin from "./Components/Coin";
import { Profile } from "./Components/Profile";

function App() {
  // const socket = io("http://10.10.17.47:7000");
  // // client-side
  // socket.on("connect", () => {
  //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  // });

  // socket.on("disconnect", () => {
  //   console.log(socket.id); // undefined
  // });

  // socket.on("fulfilled", (args) => {
  //   console.log(socket.id);
  //   console.log(args, "won the chest!");
  // });

  const dispatch = useDispatch();

  axios
    .post("http://localhost:7000/user/checklogin", {
      _id: localStorage.getItem("token"),
    })
    .then((res) => {
      dispatch(checkifAuthenticated(res.data));
    });

  return (
    <div>
      {/* <Login /> */}
      {/* <button
        onClick={() => {
          socket.emit("fill");
        }}
      >
        Fill
      </button> */}

      <Router>
        <Routes>
          <Route element={<Frame />}>
            <Route path="login" Component={Connect} />
            <Route path="home" Component={Home} />
            <Route path="chests" Component={Chests} />
            <Route path="sizes" Component={Sizes} />
            <Route path="plays" Component={Plays} />
            <Route path="coins" Component={Coin} />
            <Route path="exchange" Component={Exchange} />
            <Route path="profile" Component={Profile} />
            {/* <Route path="/game">
              <Route path="plays" Component={Home} />
            </Route> */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
