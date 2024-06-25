import express from "express";
import routes from "./routes/routes.js";
import morgan from "morgan";
import { SERVER_PORT } from "./config/config.js";
import cookieParser from "cookie-parser";
import connection from "./connection/connection.js";

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(routes);


// await connection.sync({
//     force: true
// });


app.use((req, res) => {
    res.status(404).send({success: false, message: "No encontrado"});
})

app.listen(8080, () => {
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
})