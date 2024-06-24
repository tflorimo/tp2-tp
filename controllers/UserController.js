import { Op } from "sequelize";
import { Role, User } from "../models/index.js";

class UserController {
    getAllUsers = async (req, res) => {

        // Validar tipo de usuario para scope

        try {
            // para usuario tipo "admin"
            const result = await User.scope("admin").findAll({
            // para usuario tipo "superadmin"
            // const result = await User.scope("sudo").findAll({
            // por defecto
            // const result = await User.findAll({
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
        
        // Validar tipo de usuario para scope

        try {
            const { id } = req.params;
            // para usuario tipo "admin"
            // const result = await User.scope("admin").findByPk(id,{});
            //para usuario tipo "superadmin"
            const result = await User.scope("sudo").findByPk(id,{
                include:{
                    model: Role,
                    attributes: ["name"]
                }
            });
            // por defecto
            // const result = await User.findByPk(id, {});
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
            const { first_name, last_name, email, password, role_id, is_active} = req.body;

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
        

            const result = await User.update(campos,
                {
                    where: {
                        id,
                    },
                }
            );
            res.status(200).send({ success: true, message: "Usuario modificado con exito" });   
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

    /**
     * Este endpoint es solo para administradores, por lo que
     * el findAll incluirá el scope "sudo"
     */
    getAllAdministrators = async (req, res) => {
        // Validar administrador
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
}

export default UserController;