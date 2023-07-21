const { dateTimeOf, DateTime } = require("./public/DateTime");

const date = new DateTime("07-21-2023").minus(new DateTime("07-21-2022"));
console.log(date);
