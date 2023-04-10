const { faker } = require("./public/Faker");

const col = faker.repeat(5, () => faker.user());
console.log(col);


