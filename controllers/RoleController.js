import { Role, User } from "../models/index.js";

class RoleController {

    getAllRoles = async (req, res) => {
        try {
            const result = await Role.findAll({});
            res.status(200).send({success: true, message: result});
        } catch (error) {
            res.status(400).send({success : false, message: error})
        }
    };

    /**
     * Obtiene todos los usuarios para un ID de rol dado
     */
    getAllUsersByRole = async (req, res) => {
        try {
            const { role_id } = req.params;
            const result = await User.findAll({
                where: {
                    role_id
                }
            });
            res.status(200).send({success: true, message: result});
        } catch (error) {
            res.status(400).send({success : false, message: error})
        }
    }

    getRoleById = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Role.findByPk(id, {});
            res.status(200).send({success: true, message: result});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    };

    createRole = async (req, res) => {
        try {
            const { name, is_active, admin, sudo } = req.body;
            const result = await Role.create({
                name,
                is_active,
                admin,
                sudo
            });
            res.status(201).send({
                sucess: true,
                message: 'Rol creado con éxito!'
            })
        } catch (error){
            res.status(400).send({
                success: false,
                message: error
            })
        }
    };

    updateRole = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, is_active, admin, sudo } = req.body;

            // Queremos asegurarnos que los campos que se actualicen,
            // sean únicamente los recibidos. Probablemente esto
            // pueda resolverse vía frontend (con placeholders)

            const campos = {};

            if(name !== undefined) campos.name = name;
            if(is_active !== undefined) campos.is_active = is_active;
            if(admin !== undefined) campos.admin = admin;
            if(sudo !== undefined) campos.sudo = sudo;

            const result = await Role.update(campos,
                {
                    where: {
                        id,
                    },
                }
            );
            res.status(200).send({ success: true, message: "Rol modificado con exito" });   
        } catch (error) {
            res.status(400).send({ success: false, message: error });
        }
    };

    deleteRole = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Role.destroy({
                where: {
                    id,
                }
            });
            res.status(200).send({success: true, message: "Rol eliminado con éxito"});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    };

}

export default RoleController;