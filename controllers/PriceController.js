import { Price, Product } from "../models/index.js";
import DolarService from "../services/DolarService.js";

class PriceController {

    getAllPrices = async (req, res) => {
        try {
            const result = await Price.findAll({});
            res.status(200).send({success:true, message: result});
        } catch(error){
            res.status(400).send({success:false, message:error});
        }
    }

    getPriceById = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Price.findByPk(id,{
                include: {
                    model: Product,
                    attributes: ["name"]
                }
            });
            res.status(200).send({success: true, message: result});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }

    checkProductPrice = async (req, res) => {
        try {
            const {product_id} = req.params;
            const dolarService = new DolarService();
            const result = await Price.findOne({
                include: {
                    model: Product,
                    attributes: ["name", "brand"]
                },
                where: {
                    product_id
                }
            });

            const valorDolar = await dolarService.getCurrentDolarPrice("blue");
            const resultData = result.toJSON();
            resultData.precioEnDolares = parseFloat((resultData.price / valorDolar).toFixed(2));
            res.status(200).send({success: true, message: resultData});
        } catch {
            res.status(400).send({success: false, message: error});
        }
    }

    createPrice = async (req, res) => {
        try {
            const { product_id, price, profit_percentage } = req.body;
            const result = await Price.create({
                product_id,
                price,
                profit_percentage
            });
            res.status(201).send({
                sucess: true,
                message: 'Precio creado con éxito!'
            })
        } catch (error){
            res.status(400).send({
                success: false,
                message: error
            })
        }
    }


    updatePrice = async (req, res) => {
        try {
            const { id } = req.params;
            const {product_id, price, profit_percentage} = req.body;

            /**
             * @see "Role.js - updateRole"
             */

            const campos = {};

            if(product_id !== undefined) campos.product_id = product_id;
            if(price !== price) campos.price = price;
            if(profit_percentage !== profit_percentage) campos.profit_percentage = profit_percentage;
        
            if(Object.keys(campos).length === 0){
                throw new Error("No se enviaron datos para actualizar");
            }

            const result = await Price.update(campos,
                {
                    where: {
                        id,
                    },
                }
            );
            
            if(result[0]===0){
                throw new Error("No se encontró el Precio");
            } else {
                res.status(200).send({ success: true, message: "Precio modificado con exito" });   
            }


        } catch (error) {
            res.status(400).send({ success: false, message: error });
        }
    } 
    
    deletePrice = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Price.destroy({
                where: {
                    id,
                }
            });
            res.status(200).send({success: true, message: "Precio eliminado con éxito"});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }
}

// por id update delete insert guiarse por user el orden

export default PriceController;