import { useState } from "react";

import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({});

  const OnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submit = () => {
    console.log(formData);
    axios
      .post("http://localhost:7000/user/register", formData)

      // fetch("http://localhost:7000/user/", {
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     "Content-Type": "application/json",
      //     // 'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // })
      .then((response) => {
        // Handle the response from the server
        console.log(response);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.log(error);
      });
  };

  const login = () => {
    axios
      .post("http://localhost:7000/user/login", formData)
      .then((response) => {
        // Handle the response from the server
        console.log(response);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.log(error);
      });
  };

  return (
    <div>
      <span>User</span>
      <input
        onChange={OnChange}
        name="user"
        value={formData.user || ""}
      ></input>
      <br />
      <span>Password</span>
      <input
        onChange={OnChange}
        type="password"
        name="password"
        value={formData.password || ""}
      ></input>
      <br />
      <button onClick={() => submit()}>Register</button>
      <button onClick={() => login()}>Login</button>

      {/* <button>Sign Up</button> */}
    </div>
  );
}
