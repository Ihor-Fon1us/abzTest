const sequelize = require('../sequelize');
const { PositionsNotFoundError } = require('./APIErrors');

module.exports.getPosiions = async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const positions = await sequelize.models.position.findAll()
      if (positions.length === 0) {
        return next(new PositionsNotFoundError());
      }
      res.status(200).json({
        success: true,
        positions: positions.map((x) => ({ id: x.id, name: x.name }))
      })
    } catch (error) {
      next(new PositionsNotFoundError());
    } 
  }