import { verifyToken } from "../utils/token.js";
import { User } from "../models/index.js";

export const validateSudo = async (req, res, next) => {
    try {

        const { token } = req.cookies;
        if(!token) throw new Error("No se pudo validar las credenciales");

        const { payload } = verifyToken(token);
        const userId = payload.id;

        const isSudo = await User.isSudo(userId);

        if(!isSudo){
            throw new Error("Acceso denegado!");
        }

        req.user = {id: userId, isSudo: true};
        next();

    } catch(error) {
        res.status(401).send({success: false, message: error.message});
    }
}