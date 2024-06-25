import { Op } from "sequelize";
import { Role, User } from "../models/index.js";
import { genToken, verifyToken } from "../utils/token.js";

class UserController {
    getAllUsers = async (req, res) => {
        // Validar tipo de usuario para scope
        try {
            const result = await User.scope("sudo").findAll({
                include: {
                    model: Role,
                    attributes: ["name"]
                }
            });
            res.status(200).send({success: true, message: result});
        } catch (error) {
            res.status(400).send({success : false, message: error})
        }
    }

    getUserById = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await User.scope("admin").findByPk(id,{
                include:{
                    model: Role,
                    attributes: ["name"]
                }
            });
            res.status(200).send({success: true, message: result});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }

    createUser = async (req, res) => {
        try {
            const { first_name, last_name, email, password, role_id, is_active } = req.body;
            const result = await User.create({
                first_name,
                last_name,
                email,
                password,
                role_id,
                is_active
            });
            res.status(201).send({
                sucess: true,
                message: 'Usuario creado con éxito!'
            })
        } catch (error){
            res.status(400).send({
                success: false,
                message: error
            })
        }
    }

    updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const { first_name, last_name, email, password, role_id, is_active } = req.body;

            /**
             * @see "Role.js - updateRole"
             */

            const campos = {};

            if(first_name !== undefined) campos.first_name = first_name;
            if(last_name !== undefined) campos.last_name = last_name;
            if(email !== undefined) campos.email = email;
            if(password !== undefined) campos.password = password;
            if(role_id !== undefined) campos.role_id = role_id;
            if(is_active !== undefined) campos.is_active = is_active;
        
            if(Object.keys(campos).length === 0){
                throw new Error("No se enviaron datos para actualizar");
            }

            const result = await User.update(campos,
                {
                    where: {
                        id,
                    },
                }
            );
            
            if(result[0]===0){
                throw new Error("No se encontró el usuario");
            } else {
                res.status(200).send({ success: true, message: "Usuario modificado con exito" });   
            }


        } catch (error) {
            res.status(400).send({ success: false, message: error });
        }
    } 
    
    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await User.destroy({
                where: {
                    id,
                }
            });
            res.status(200).send({success: true, message: "Usuario eliminado con éxito"});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }

    getAllAdministrators = async (req, res) => {
        try {
            const result = await User.scope("sudo").findAll({
                include: {
                    model: Role,
                    attributes: ["name"],
                    where: {
                        [Op.or] : [
                            { admin : 1 },
                            { sudo : 1 } 
                        ]
                    }
                }
            });
            res.status(200).send({success: true, message: result});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            
            if(email===undefined || password === undefined){
                throw new Error("Debe ingresar las credenciales");
            }

            const data = await User.scope("forLogin").findOne({
                where: {
                    email
                }
            });
            if(!data) throw new Error("Credenciales inválidas");

            const comparePass = await data.comparePass(password);

            if(!comparePass) throw new Error("Credenciales inválidas");

            const payload = {
                id: data.id,
                first_name: data.first_name
            };
            const token = genToken(payload);

            res.cookie("token", token);
            res.status(200).send({success: true, message: "Bienvenido, " + data.first_name});
        } catch (error) {
            res.status(400).send({success: false, message: error.message});
        }
    }

    me = async (req, res) => {
        try {
            const { user } = req;
            res.status(200).send({ success: true, message: user});
        } catch(error) {
            res.status(400).send({success: false, message: error.message});
        }
    }
}

export default UserController;