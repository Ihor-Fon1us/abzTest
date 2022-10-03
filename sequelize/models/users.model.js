const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('user', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			type: DataTypes.STRING,
		},
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
        },
        position_id: {
            type: DataTypes.STRING,
        },
		photo: {
			type: DataTypes.BLOB
		}
	});
};