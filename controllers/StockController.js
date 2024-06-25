import { Stock } from "../models/index.js";

class StockController {

    /**
     * reestockear
     * envia de stock_qty a inventory_qty.
     * si salta el limite, enviar aviso
     */

    restockProduct = async (req, res) => {
        try {

            const { product_id } = req.params;
            const {quantity} = req.body;

            if(quantity === undefined) throw new Error("Debe indicar una cantidad a reestockear");
            
            const result = await Stock.findOne({
                where: {
                    product_id
                }
            });

            const resultData = result.toJSON();
            
            if(resultData.stock_qty >= quantity){
                var newStockQty = resultData.stock_qty - quantity
                var newInventoryQty = resultData.inventory_qty + parseInt(quantity);

                const update = await Stock.update({
                    stock_qty: newStockQty,
                    inventory_qty: newInventoryQty
                },
                    {
                        where: {
                            product_id,
                        },
                    }
                );
                res.status(200).send({success: true, message: "Reestock realizado con éxito"});
            } else {
                throw new Error("No hay suficiente cantidad para restockear");
            }

        } catch(error) {
            console.log(error);
            res.status(400).send({ success: false, message: error });
        }
    }

    getAllStocks = async (req, res) => {
        try {
            const result = await Stock.findAll({});
            res.status(200).send({success:true, message: result});
        } catch(error){
            res.status(400).send({success:false, message:error});
        }
    }

    getStockById = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Stock.findByPk(id,{});
            res.status(200).send({success: true, message: result});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }

    createStock = async (req, res) => {
        try {
            const { product_id, inventory_qty, stock_qty,total_qty,restock_qty } = req.body;
            const result = await Stock.create({
                product_id,
                inventory_qty,
                stock_qty,
                total_qty,
                restock_qty
            });
            res.status(201).send({
                sucess: true,
                message: 'Stock creado con éxito!'
            })
        } catch (error){
            res.status(400).send({
                success: false,
                message: error
            })
        }
    }


    updateStock = async (req, res) => {
        try {
            const { id } = req.params;
            const {product_id, inventory_qty, stock_qty,total_qty,restock_qty} = req.body;

            /**
             * @see "Role.js - updateRole"
             */

            const campos = {};

            if(product_id !== undefined) campos.product_id = product_id;
            if(inventory_qty !== undefined) campos.inventory_qty = inventory_qty;
            if(stock_qty !== undefined) campos.stock_qty = stock_qty;
            if(total_qty !== undefined) campos.total_qty = total_qty;
            if(restock_qty !== undefined) campos.restock_qty = restock_qty;
        
            if(Object.keys(campos).length === 0){
                throw new Error("No se enviaron datos para actualizar");
            }

            const result = await Stock.update(campos,
                {
                    where: {
                        id,
                    },
                }
            );
            
            if(result[0]===0){
                throw new Error("No se encontró el Stock");
            } else {
                res.status(200).send({ success: true, message: "Stock modificado con exito" });   
            }


        } catch (error) {
            res.status(400).send({ success: false, message: error });
        }
    } 
    
    deleteStock = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Stock.destroy({
                where: {
                    id,
                }
            });
            res.status(200).send({success: true, message: "Stock eliminado con éxito"});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }
}

export default StockController;