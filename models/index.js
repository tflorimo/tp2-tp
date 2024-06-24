import Product from './Product.js';
import Role from './Role.js';
import Supplier from './Supplier.js';
import Type from './Type.js';
import User from "./User.js";
import Price from "./Price.js";
import Stock from "./Stock.js";

Role.hasMany(User, {foreignKey: "role_id"});
User.belongsTo(Role, {foreignKey: "role_id"});

Supplier.hasMany(Product, {foreignKey: "supplier_id"});
Product.belongsTo(Supplier, {foreignKey: "supplier_id"});

Type.hasMany(Product, {foreignKey: "type_id"});
Product.belongsTo(Type, {foreignKey: "type_id"});

Product.hasOne(Price, {foreignKey: "product_id"});
Price.belongsTo(Product, {foreignKey: "product_id"});

Product.hasOne(Stock, {foreignKey: "product_id"});
Stock.belongsTo(Product, {foreignKey: "product_id"});

export {Role, User, Type, Product, Supplier, Price, Stock};