import User from "../models/User.js"

const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "student" });
        return res.status(200).json({ success: true, data: users })
    } catch (error) {
        return res.status(500).json({ success: false, message: "something went wrong" })
    }
}

export { getUsers };