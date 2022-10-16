const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
const { ValidationError } = require('../controllers/APIErrors');

const schema = {
    type: "object",
    required: ["count", "page"],
    properties: {
        count: { type: "integer", minimum: 0 },
        page: { type: "integer", minimum: 1 },
        
    },
    optionalProperties: {
        offset: { type: "integer", minimum: 0 },
    },
    errorMessage: {
        properties: {
            count: "The count must be an integer.",
            page: "The page must be at least 1."
        },
    },
}
module.exports = (req, res, next) => {

    const validate = ajv.compile(schema);
    const valid = validate({
        count: +req.query.count,
        page: +req.query.page,
        offset: +req.query.offset
    });
    if (valid) next();
    else {
        next(new ValidationError(validate.errors));
    }
}