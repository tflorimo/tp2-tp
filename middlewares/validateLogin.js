import { verifyToken } from "../utils/token.js";

export const validateLogin = async (req, res, next) => {

    try {
        const { token } = req.cookies;
        if(!token) throw new Error("No se pudo validar las credenciales");
        const { payload } = verifyToken(token);
        req.user = payload,
        next();
    } catch (error) {
        res.status(401).send({success: false, message: error.message});
    }

}