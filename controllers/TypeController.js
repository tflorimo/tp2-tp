import { Type } from "../models/index.js";

class TypeController {
     getAllTypes= async (req, res) => {
        try {
            const result = await Type.findAll({});
            res.status(200).send({success:true, message: result});
        } catch(error){
            res.status(400).send({success:false, message:error});
        }
    }

    getTypeById = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Type.findByPk(id, {});
            res.status(200).send({success: true, message: result});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }

    createType = async (req, res) => {
        try {
            const { name } = req.body;
            const result = await Type.create({
                name
            });
            res.status(201).send({
                sucess: true,
                message: 'Tipo creado con éxito!'
            })
        } catch (error){
            res.status(400).send({
                success: false,
                message: error
            })
        }
    }


    updateType = async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            /**
             * @see "Role.js - updateRole"
             */

            const campos = {};

            if(name !== undefined) campos.name = name;
        
            if(Object.keys(campos).length === 0){
                throw new Error("No se enviaron datos para actualizar");
            }

            const result = await Type.update(campos,
                {
                    where: {
                        id,
                    },
                }
            );
            
            if(result[0]===0){
                throw new Error("No se encontró el Tipo");
            } else {
                res.status(200).send({ success: true, message: "Tipo modificado con exito" });   
            }


        } catch (error) {
            res.status(400).send({ success: false, message: error });
        }
    } 
    
    deleteType = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Type.destroy({
                where: {
                    id,
                }
            });
            res.status(200).send({success: true, message: "Tipo eliminado con éxito"});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }
}

export default TypeController;