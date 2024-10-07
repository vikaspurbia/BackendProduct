import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('localdb', 'root', 'vikas@0807', {
    host: 'localhost',
    dialect: 'mysql'
});



export default sequelize;
