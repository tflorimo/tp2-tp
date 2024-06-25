import { Product, Stock, Price, Type, Supplier } from "../models/index.js";
import DolarService from "../services/DolarService.js";

class ProductController {

    buyProduct = async (req, res) => {
        try {
            const { id } = req.params;
            var { quantity } = req.body;
            const stock = await Stock.findOne({
                include: {
                    model: Product,
                    where:{
                        id: id
                    }
                }
            });
            const stockData = stock.toJSON();

            if(quantity===undefined) quantity = 1;

            if(stockData.inventory_qty>0){
                const inventory_qty = stockData.inventory_qty - quantity;
                
                if(inventory_qty<0) inventory_qty = 0;

                const update = await Stock.update({inventory_qty}, {
                    where: {
                        id: stockData.id
                    }
                });

                const price = await Price.findOne({
                    where: {
                        product_id: id
                    }
                });

                var debeRestockear = false;
                debeRestockear = inventory_qty <= stock.restock_qty;

                /**
                 * Funcion de reestockear
                 * Concatena un mensaje al message de la response si debe restockear
                 * if debeRestockear
                 */

                // if(inventory_qty==0){
                //     Lo mismo que arriba, debe enviar/concatenar algun mensaje
                //     throw new Error("No hay más stock de ese producto. Para continuar vendiendo, debe restockear.");
                // }
                
                const priceData = price.toJSON();
                const dolarService = new DolarService();
                priceData.precioDolar = await dolarService.getCurrentDolarPrice("blue");
                res.status(200).send({success: true, message: "Venta realizada con exito. ARS: " + priceData.price + " | USD: " + priceData.precioDolar});
            } else if (stockData.inventory_qty < quantity) {
                throw new Error("No hay suficiente stock para ese producto");
            } else {
                throw new Error("No hay stock para ese producto");
            }
        } catch (error) {
            console.error(error);
            res.status(400).send({success: false, message: error})
        }
    }

    createProduct = async(req, res) => {
        try {
            const { name, brand, type_id, supplier_id } = req.body;
            const result = await Product.create({
                name,
                brand,
                type_id,
                supplier_id
            });
            res.status(201).send({
                sucess: true,
                message: 'Producto creado con éxito!'
            })
        } catch (error){
            res.status(400).send({
                success: false,
                message: error
            })
        }
    }

    deleteProduct = async(req, res) => {
        try {
            const { id } = req.params;
            const result = await Product.destroy({
                where: {
                    id,
                }
            });
            res.status(200).send({success: true, message: "Producto eliminado con éxito"});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }

    getAllProducts = async(req, res) => {
        try {
            const result = await Product.findAll();
            res.status(200).send({success: true, message: result});
        } catch (error) {
            res.status(400).send({success : false, message: error})
        }
    }

    getProductById = async(req, res) => {
        try {
            const { id } = req.params;
            const result = await Product.findByPk(id,{
                include: {
                    model: Supplier,
                    attributes: ["name"]
                }
            });
            res.status(200).send({success: true, message: result});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }

    updateProduct = async(req, res) => {
        try {
            const { id } = req.params;
            const { name, brand, type_id, supplier_id } = req.body;

            /**
             * @see "Role.js - updateRole"
             */

            const campos = {};

            if(name !== undefined) campos.name = name;
            if(brand !== undefined) campos.brand = brand;
            if(type_id !== undefined) campos.type_id = type_id;
            if(supplier_id !== undefined) campos.supplier_id = supplier_id;
        
            if(Object.keys(campos).length === 0){
                throw new Error("No se enviaron datos para actualizar");
            }

            const result = await Product.update(campos,
                {
                    where: {
                        id,
                    },
                }
            );
            
            if(result[0]===0){
                throw new Error("No se encontró el producto");
            } else {
                res.status(200).send({ success: true, message: "Producto modificado con exito" });   
            }


        } catch (error) {
            res.status(400).send({ success: false, message: error });
        }
    }

}

export default ProductController;