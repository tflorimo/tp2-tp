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
            resultData.precioEnDolares = resultData.price * valorDolar;
            console.log(resultData);

            res.status(200).send({success: true, message: resultData});
        } catch {
            res.status(400).send({success: false, message: error});
        }
    }
}

export default PriceController;