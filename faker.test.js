const { faker } = require("./public/Faker");

const result = faker.repeat(5, () => faker.user());
console.log(result);


