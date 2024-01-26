import { Menu } from "@mui/material";
import { MenuItem, MenuList } from "@mui/material";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { ListItemIcon, ListItemText } from "@mui/material";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAuthenticated,
  connected,
  updateBalances,
} from "../Actions/AuthSlice";
import axios from "axios";

import homeBackGround from "../assets/backgrounds/sources/rustic-pizza-restaurant-exterior.jpg";
import fillTheChestLogo from "../assets/buttons/fill-the-chest_logo.png";
import connectWalletBtn from "../assets/buttons/connect-wallet-button.png";
import playDemo from "../assets/buttons/play-demo-button.png";

export default function Connect() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState("Select Network");
  const [walletstring, setWalStr] = useState("Connect Wallet");
  // const [chain, setChain] = useState("0x1");
  const [balance, setBalance] = useState(0);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const navigate = useNavigate();

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleSelect(e) {
    e.stopPropagation();
    setAnchorEl(null);
    setSelected(e.currentTarget.innerText);
    // setChain(e.currentTarget.id);
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: e.currentTarget.id }], // chainId must be in hexadecimal numbers
    });
  }

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }
  const connectWallet = () => {
    const { ethereum } = window;
    var accounts;

    if (!ethereum) {
      alert("Wallet not installed!");
      return;
    }

    ethereum.request({ method: "eth_requestAccounts" }).then(async (res) => {
      accounts = res;
      // console.log(accounts);
      setWalStr(accounts[0].substr(0, 4) + ".." + accounts[0].substr(-4));

      dispatch(connected(accounts[0]));

      dispatch(setAuthenticated(accounts[0]));

      const response = await axios.post("http://localhost:7000/user/account", {
        account: accounts[0],
      });

      dispatch(updateBalances(response.data));
      localStorage.setItem("token", response.data._id);

      return;
    });
  };
  window.ethereum?.on("accountsChanged", () => {
    connectWallet();
  });
  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated]);

  return (
    // <div>
    //   <Button
    //     aria-owns={anchorEl ? "chains" : undefined}
    //     aria-haspopup="true"
    //     onMouseOver={handleClick}
    //     style={{ minWidth: "220px" }}
    //   >
    //     {selected}
    //   </Button>
    //   <Menu
    //     id="chains"
    //     anchorEl={anchorEl}
    //     open={Boolean(anchorEl)}
    //     onClose={handleClose}
    //     MenuListProps={{ onMouseLeave: handleClose }}
    //   >
    //     <MenuList>
    //       <MenuItem onClick={handleSelect} id="0x38">
    //         <ListItemIcon>
    //           <img
    //             className="w-7"
    //             src="https://assets.pancakeswap.finance/web/chains/56.png"
    //           ></img>
    //         </ListItemIcon>
    //         <ListItemText>BNB Smart Chain</ListItemText>
    //       </MenuItem>
    //       <MenuItem onClick={handleSelect} id="0x1">
    //         <ListItemIcon>
    //           <img
    //             className="w-7"
    //             src="https://assets.pancakeswap.finance/web/chains/1.png"
    //           ></img>
    //         </ListItemIcon>
    //         <ListItemText>Ethereum</ListItemText>
    //       </MenuItem>
    //       <MenuItem onClick={handleSelect} id="0x89">
    //         <ListItemIcon>
    //           <img
    //             className="w-7"
    //             src="https://assets.pancakeswap.finance/web/chains/1101.png"
    //           ></img>
    //         </ListItemIcon>
    //         <ListItemText>Polygon zkEVM</ListItemText>
    //       </MenuItem>
    //     </MenuList>
    //   </Menu>
    //   <Button variant="contained" onClick={() => connectWallet()}>
    //     {walletstring}
    //   </Button>
    //   {/* <Typography variant="h3" component="h3">
    //     BALANCE:{balance}
    //   </Typography> */}
    // </div>
    <div className="w-full h-screen relative">
      <img
        src={homeBackGround}
        className="w-full h-[100vh] absolute blur-sm"
      ></img>
      <div className="w-full h-full flex">
        <dig className="m-auto z-20 flex flex-col items-center">
          <img src={fillTheChestLogo} className="w-[600px]"></img>
          <div className="flex gap-[20px] items-center">
            <img
              src={connectWalletBtn}
              className="w-[380px] h-[90px] mt-[18px]"
              onClick={() => {
                console.log("connect");
                // window.ethereum?.on("accountsChanged", () => {
                connectWallet();
                // });
              }}
            ></img>
            <img src={playDemo} className="w-[400px]"></img>
          </div>
        </dig>
      </div>
    </div>
  );
}
