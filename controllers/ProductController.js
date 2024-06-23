import { Product, Stock } from "../models/index.js";

class ProductController {

    buyProduct = async (req, res) => {
        // agarrar stock para producto
        // ver stock en mostrador
        /**
         * agarro el stock del producto id
         * Si no hay stock, enviar mensaje con status 200, pero no afectar nada
         * 
         * si hay stock de mostrador, vendo.
         * al vender, retorno el valor que se debe pagar en pesos y usd
         * resto 1 al stock.
         * 
         * 
         * si stock después de vender == 0. envio mensaje tambien de q debo actualizar
         */
        try {
            const { id } = req.params;
            const stock = await Stock.findOne({
                include: {
                    model: Product,
                    where:{
                        product_id: id
                    }
                }
            });
            if(stock.inventory_qty>0){
                /**
                 * retorno valor en ars y usd.
                 * resto 1 al stock
                 * hago validacion de cuanto queda, si queda 0 mando mensaje
                 */
            } else {
                res.status(200).send({success:false, message: "No hay stock para el producto con ID " + id});
            }
        } catch (error) {
            res.status(400).send({success: false, message: error})
        }
    }

}

export default ProductController;