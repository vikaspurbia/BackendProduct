import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Product extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public description!: string;
    public stock!: number;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,  // Set default stock value to 0
    }
}, {
    sequelize,
    tableName: 'products'
});

export default Product;
