const bcrypt = require("bcryptjs")
const User = require("../app/usecase/user/model")

require("dotenv").config()
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    //   useFindAndModify: true,
    //   useCreateIndex: true,
});

mongoose.connection;

(async function seedData() {
    const salt = await bcrypt.genSalt(10);
    let data = [
        {
            email: "admin@email.com",
            password: await bcrypt.hash("password", salt),
            username: "admin",
            role: "admin"
        },
        {
            email: "user@email.com",
            password: await bcrypt.hash("password", salt),
            username: "user",
            role: "user"
        }
    ]
    User.create(data)
        .then(() => {
            console.log(`Success seed`)
            mongoose.disconnect()
        })
        .catch((err) => {
            console.log(err.message)
            mongoose.disconnect()
        })
})()
