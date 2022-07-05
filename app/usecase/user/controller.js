const User = require("./model")
const bcrypt = require("bcryptjs");

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find().select(['-password'])
        res.status(200).json({
            status: "success",
            data: { users }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ _id: id }).select(['-password'])
        res.status(200).json({
            status: `success get user by id ${id}`,
            data: { user }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

exports.updateUser = async (req, res) => {
    const { role } = req.users

    if (role !== "admin") {
        return res.status(401).json({
            status: "unauthorized",
            message: "please contact admin to update user"
        })
    }
    try {
        const { id } = req.params
        const { username, email, old_password, new_password } = req.body

        if (old_password && new_password) {
            const userExist = await User.findOne({ _id: id })
            const isValid = await bcrypt.compare(old_password, userExist.password);

            if (!isValid) {
                return res.status(400).json({
                    status: "failed",
                    message: "credential is invalid",
                });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(new_password, salt);

            await User.updateOne({ _id: id }, { username, email, password: hashedPassword })
        } else {
            await User.updateOne({ _id: id }, { username, email })
        }
        const userUpdated = await User.findOne({ _id: id }).select(['-password'])

        res.status(200).json({
            status: "success update user",
            data: { user: userUpdated }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    const { role } = req.users

    if (role !== "admin") {
        return res.status(401).json({
            status: "unauthorized",
            message: "please contact admin to delete user"
        })
    }
    try {
        const { id } = req.params
        await User.deleteOne({ _id: id })
        res.status(200).json({
            status: "success",
            message: `Delete user id ${id} success`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}