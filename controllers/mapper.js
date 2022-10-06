class Mapper {
    static UserToAPI(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            position: user.position.name,
            position_id: user.position_id,
            registration_timestamp: Math.round(user.createdAt/1000),
            photo: user.photo
        } 
    }
}
module.exports = Mapper;