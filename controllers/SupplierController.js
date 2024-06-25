import { Supplier } from "../models/index.js";

class SupplierController {
    getAllSuppliers = async (req, res) => {
        try {
            const result = await Supplier.findAll({});
            res.status(200).send({success:true, message: result});
        } catch(error){
            res.status(400).send({success:false, message:error});
        }
    }

    getSupplierById = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Supplier.findByPk(id, {});
            res.status(200).send({success: true, message: result});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }

    createSupplier = async (req, res) => {
        try {
            const { name, address, is_active } = req.body;
            const result = await Supplier.create({
                name,
                address,
                is_active
            });
            res.status(201).send({
                sucess: true,
                message: 'Proveedor creado con éxito!'
            })
        } catch (error){
            res.status(400).send({
                success: false,
                message: error
            })
        }
    }


    updateSupplier = async (req, res) => {
        try {
            const { id } = req.params;
            const {name, address, is_active} = req.body;

            /**
             * @see "Role.js - updateRole"
             */

            const campos = {};

            if(name !== undefined) campos.name = name;
            if(address !== undefined) campos.address = address;
            if(is_active !== undefined) campos.is_active = is_active;
        
            if(Object.keys(campos).length === 0){
                throw new Error("No se enviaron datos para actualizar");
            }

            const result = await Supplier.update(campos,
                {
                    where: {
                        id,
                    },
                }
            );
            
            if(result[0]===0){
                throw new Error("No se encontró el Proveedor");
            } else {
                res.status(200).send({ success: true, message: "Proveedor modificado con exito" });   
            }


        } catch (error) {
            res.status(400).send({ success: false, message: error });
        }
    } 
    
    deleteSupplier = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Supplier.destroy({
                where: {
                    id,
                }
            });
            res.status(200).send({success: true, message: "Proveedor eliminado con éxito"});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }
}

export default SupplierController;