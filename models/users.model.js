const { DataTypes } = require('sequelize');
const { PhotoError } = require('../controllers/AplicationErrors');

module.exports = (sequelize) => {
	sequelize.define('user', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
			validate: {
				notNull: true,
				len: {
					args: [2, 60],
					msg: "The name must be at least 2 characters and not be more than 60 characters.",
				},
			}
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: {
				args: true,
				msg: "User with this email already exist"
			},
			validate: {
				notNull: true,
				isEmail: {
					args: true,
					msg: "The email must be a valid email address.",
				}
			}
		},
		phone: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: {
				args: true,
				msg: "User with this phone already exist"
			},
			validate: {
				notNull: {
					args: true,
					msg: "The phone field is required.",
				},
				is: {
					args: /^(?:\+38)?(0\d{9})$/,
					msg: "The phone entered is incorrect.",
				},
			}
		},
		position_id: {
			allowNull: false,
			foreignKey: true,
			type: DataTypes.INTEGER,
			validate: {
				notNull: true,
				isInt: {
					args: true,
					msg: "The position ID must be an integer.",
				},
				min: {
					args: 1,
					msg: "The position ID must be at least 1."
				}
			}
		},
		photo: {
			type: DataTypes.STRING,
			validate: {
				isError(value) {
					if (value instanceof PhotoError) {
						throw new Error("Image is invalid.");
					}
					if (value instanceof MulterError) {
						if(value.code === "jpg"){
							throw new Error(value.field);
						} 
						throw new Error("The photo may not be greater than 5 Mbytes.");
					}
				}
			}
		}
	});
};