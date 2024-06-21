import express from "express";
import { SERVER_PORT } from "./Config/config.js";
import connection from "./Connection/connection.js";
const app = express();

app.use((req, res) => {
    res.status(404).send({ success: false, message: "not found" });
  });
  
await connection.sync({ force: false });
  
  app.listen(SERVER_PORT, () => {
    console.log(`server ok http://localhost:${SERVER_PORT}`);
  });
  