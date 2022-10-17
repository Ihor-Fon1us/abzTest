const faker = require('faker');

class GenerateUser {
    createUser() {
        return {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber('+38066#######'),
            position_id: +faker.datatype.number(3) + 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
    getArrayUsers(count) {
        let array = [];
        for (let i = 0; i <= count; i++) {
            array.push(this.createUser());
        }
        return array;
    }
}

module.exports = GenerateUser;