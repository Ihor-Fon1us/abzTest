module.exports = {
    type: "object",
    properties: {
      id: {type: "integer"},
      name: {type: "string"},
      email: {type: "email"},
      phone: {type: "UA_Phone"},
      position_id: {type: "string"},
    },
    required: ["id", "name", "email", "phone", "position_id"],
  }
