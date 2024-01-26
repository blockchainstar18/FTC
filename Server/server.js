const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./db");

const userRoutes = require("./routes/user");
const gameRoutes = require("./routes/game");

const corsOptions = {
  origin: "http://localhost:3000",
  // credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/user", userRoutes);
app.use("/game", gameRoutes);

connectDB();

const server = require("http").createServer(app);

const io = require("socket.io")(server);

const PORT = 7000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// const CHEST_SIZE = 5;
// const UNIT = 1;
// let chest = 0;

// // server-side
// io.on("connection", (socket) => {
//   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
//   socket.on("fill", () => {
//     console.log("filling..");

//     // if(chest<CHEST_SIZE)
//     chest += UNIT;
//     if (chest >= CHEST_SIZE) {
//       console.log(socket.id, "won the chest!");
//       socket.emit("fulfilled", socket.id);
//       chest = 0;
//     }
//   });
// });

// httpServer.listen(7000, () => {
//   console.log("Server running..");
// });
