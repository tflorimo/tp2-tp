import Product from './Product.js';
import Role from './Role.js';
import Supplier from './Supplier.js';
import Type from './Type.js';
import User from "./User.js";

Role.hasMany(User, {foreignKey: "role_id"});
User.belongsTo(Role, {foreignKey: "role_id"});

Supplier.hasMany(Product, {foreignKey: "supplier_id"});
Product.belongsTo(Supplier, {foreignKey: "supplier_id"});

Type.hasMany(Product, {foreignKey: "type_id"});
Product.belongsTo(Type, {foreignKey: "type_id"});

Price.hasMany(Product, {foreignKey: "product_id"});
Product.belongsTo(Price, {foreignKey: "product_id"});

Stock.hasMany(Product, {foreignKey: "product_id"});
Product.belongsTo(Stock, {foreignKey: "product_id"});

export {Role, User, Type, Product, Supplier, Price, Stock};