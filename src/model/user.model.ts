import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';

// Define the attributes of the User model
interface UserAttributes {
    id: number;
    username: string;
    password: string;
    role: string; // e.g. 'user' or 'admin'
}

// Define the optional attributes for creating a user
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public role!: string; // e.g. 'user' or 'admin'
}

// Initialize the User model
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure usernames are unique
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
    },
}, {
    sequelize,
    tableName: 'users',
});

export default User;
