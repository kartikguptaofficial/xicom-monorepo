import UserModel from "../models/user.model";

const userController = async (req: any, res: any) => {
    const payload = req.body;

    const userData = UserModel.create({
        first_name: payload?.firstName,
        last_name: payload?.lastName,
        dob: payload?.dob,
        email: payload?.email,
        address: {
            street_1: payload?.street1,
            street_2: payload?.street2,
        },
        residential_address: {
            street_1: payload?.resStreet1,
            street_2: payload?.resStreet2,
        },
        documents: payload?.inputFields
    })

    res.status(200).json({
        success: true,
        status: "ok",
        message: "Form Submitted Successfully!",
        data: userData
    })
}

export {
    userController
}