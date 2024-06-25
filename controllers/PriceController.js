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
}

export default PriceController;