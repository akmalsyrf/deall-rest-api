const User = require("../app/usecase/user/model")
const bcrypt = require("bcryptjs")

let salt
(async function saltBcrypt() {
    salt = await bcrypt.genSalt(10);
})()

const data = async () => [
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

    (async function run() {
        try {
            await User(await data())
            await User.save()
            console.log("User seeders success created");
        } catch (error) {
            console.log(error);
        }
    })()