const sequelize = require('../sequelize');
const { PositionsNotFoundError } = require('./error');

module.exports.getPosiions = async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const positions = await sequelize.models.position.findAll()
      if (positions === null) {
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