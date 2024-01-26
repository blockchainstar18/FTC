import { Button, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import coinBackGround from "../assets/backgrounds/sources/stalls-street-market-streets-city-selling-products.jpg";
import amountBtnCopper from "../assets/buttons/amountbutton-copper.png";
import amountBtnSilver from "../assets/buttons/amountbutton-silver.png";
import amountBtnGold from "../assets/buttons/amountbutton-gold.png";
import amountForm from "../assets/buttons/amount.png";

import selectCrypto from "../assets/buttons/select-crypto.png";
import selectWalletForm from "../assets/buttons/wallet-of-recipient.png";
import purchase from "../assets/buttons/purchase.png";

export const Exchange = () => {
  const balances = useSelector((state) => state.account.balances);
  const [currencylist, setCurrencyList] = useState([]);
  const [filterdList, setFilterdList] = useState([]);
  const [amount, setAmount] = useState({
    copper: 0,
    silver: 0,
    gold: 0,
  });
  const [USD, setUSD] = useState(0);
  const [coin, setCoin] = useState({
    currency: "",
    network: "",
  });
  const [depositAm, setDepositAm] = useState(0);

  const updateAmount = (e) => {
    setAmount((prevAmount) => ({
      ...prevAmount,
      [e.target.id]: e.target.value,
    }));
  };

  const filterList = (e) => {
    setCoin((prevCoin) => ({
      ...prevCoin,
      currency: e.target.value,
    }));
    if (e.target.value != "") {
      const temp = [...currencylist].filter((item) => {
        return (
          item.code.toUpperCase().indexOf(e.target.value.toUpperCase()) >= 0
        );
      });
      setFilterdList(temp);
    } else setFilterdList([]);
  };

  const getCurrencies = async () => {
    const r = await fetch("https://api.swapspace.co/api/v2/currencies", {
      headers: {
        Authorization:
          "5b19789b2633a0ca0c44344436666212afea73955206dcec1256093e6ce6027ad44bea02ff87e1c5aa",
        Accept: "application/json",
      },
    });

    const res = await r.json();

    setCurrencyList(res);
  };

  const getOffers = async () => {
    if (depositAm && coin.currency != "" && coin.network != "") {
      const r = await fetch(
        `https://api.swapspace.co/api/v2/amounts?amount=${depositAm}&fromCurrency=${coin.currency}&toCurrency=usdt&fromNetwork=${coin.network}&toNetwork=bep20`,
        {
          headers: {
            Authorization:
              "5b19789b2633a0ca0c44344436666212afea73955206dcec1256093e6ce6027ad44bea02ff87e1c5aa",
            Accept: "application/json",
            //   ContentType: 'application/json'
          },
        }
      );
      const res = await r.json();
      console.log(res);
    }
  };

  useEffect(() => {
    setUSD(0.1 * amount.copper + 5 * amount.silver + 100 * amount.gold);
  }, [amount]);

  useEffect(() => {
    getCurrencies();
  }, []);
  //   alert(1);

  return (
    // <div>
    //   <Button>Buy</Button>

    //   <Typography variant="h3" component="h3">
    //     Copper Balance:{balances.copper}
    //   </Typography>
    //   <TextField id="copper" key="copper" onChange={updateAmount}></TextField>
    //   <Typography variant="h3" component="h3">
    //     Silver Balance:{balances.silver}
    //   </Typography>
    //   <TextField id="silver" key="silver" onChange={updateAmount}></TextField>

    //   <Typography variant="h3" component="h3">
    //     Gold Balance:{balances.gold}
    //   </Typography>
    //   <TextField id="gold" key="gold" onChange={updateAmount}></TextField>

    //   <Typography>Amount to send(USD):{USD}</Typography>

    //   <TextField onChange={filterList} value={coin.currency}></TextField>

    //   <div>
    //     {filterdList.map((it, i) => {
    //       return (
    //         <div
    //           className="flex items-center cursor-pointer"
    //           onClick={() => {
    //             setCoin({
    //               currency: it.code,
    //               network: it.network,
    //             });
    //             setFilterdList([]);
    //           }}
    //         >
    //           <img
    //             className="w-[20px] h-[20px] mr-2"
    //             src={"https://storage.swapspace.co" + it.icon}
    //           ></img>
    //           <div>{it.code.toUpperCase() + "(" + it.network + ")"}</div>
    //         </div>
    //       );
    //     })}
    //   </div>

    //   <TextField
    //     onChange={(e) => setDepositAm(e.target.value)}
    //     value={depositAm}
    //   ></TextField>

    //   <Button onClick={() => getOffers()}>View Deposit Offers</Button>
    // </div>

    <div className="w-full h-screen relative">
      <img
        src={coinBackGround}
        className="w-full h-[100vh] absolute blur-sm"
      ></img>
      <div className="w-full h-full flex">
        <dig className="m-auto z-20 flex flex-col items-center">
          <div className="flex gap-[60px] items-center">
            <div className="relative">
              <img src={amountBtnCopper} className="w-[150px]"></img>
              <img src={amountForm} className="w-[150px] mt-[20px]"></img>
              <div className="absolute w-full text-center mt-[-50px] text-[#a04623]">
                {balances.copper}
              </div>
            </div>
            <div className="relative">
              <img src={amountBtnSilver} className="w-[150px]"></img>
              <img src={amountForm} className="w-[150px] mt-[20px]"></img>
              <div className="absolute w-full text-center mt-[-50px] text-[#a04623]">
                {balances.silver}
              </div>
            </div>
            <div className="relative">
              <img src={amountBtnGold} className="w-[150px]"></img>
              <img src={amountForm} className="w-[150px] mt-[20px]"></img>
              <div className="absolute w-full text-center mt-[-50px] text-[#a04623]">
                {balances.gold}
              </div>
            </div>
          </div>
          <img src={selectCrypto} className="w-[250px] mt-[50px]"></img>
          <img src={purchase} className="w-[200px] mt-[20px]"></img>
        </dig>
      </div>
    </div>
  );
};
