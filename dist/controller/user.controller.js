import prisma from "../prisma.js";
export const getUserData = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const data = await prisma.data.findMany({
            where: {
                createdById: userId
            },
            orderBy: {
                recordedAt: 'desc'
            }
        });
        return res.json({
            success: true,
            message: "User data fetched successfully",
            data
        });
    }
    catch (error) {
        console.log("could not get the data of user ", error);
        return res.json({
            success: false,
            message: "Could not fetch user data",
        });
    }
};
export const createUserData = async (req, res) => {
    try {
        const { valueA, valueB, valueC } = req.body;
        const userId = req.user.id;
        const newData = await prisma.data.create({
            data: {
                valueA: valueA,
                valueB: valueB,
                valueC: valueC,
                createdById: userId,
                recordedAt: new Date()
            }
        });
        return res.json({
            success: true,
            message: "Data created successfully",
            data: newData
        });
    }
    catch (error) {
        console.log("error in creating data", error);
        return res.json({
            success: false,
            message: "Could not create data"
        });
    }
};
