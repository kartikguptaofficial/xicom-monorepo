import UserModel from "../models/user.model";
import { GenerateEmailLoginOtp, VerifyEmailLoginOtp, generateJsonWebToken } from "../utils/auth.util"


const authLoginController = async (req: any, res: any) => {
  const reqBody = req.body;
  const { email, password } = req.body;
  console.log({ email, password })
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Invalid credentials received",
      message: "Please provide all the required fields",

    });
  }

  const userDetails: any = await UserModel.findOne({ email });
  if (userDetails) {
    if (userDetails?.password != password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password!",
        data: null,
      })
    }

    userDetails.last_loggedin_at = Math.ceil(new Date().getTime() / 1000);
    const token = generateJsonWebToken(userDetails?.email, userDetails?._id);
    await userDetails.save();
    return res.status(200).json({
      success: true,
      status: "ok",
      message: "Already registered! Login successful",
      data: userDetails,
      oauth: {
        access_token: token,
      }
    })
  } else {
    return res.status(401).json({
      success: false,
      message: "Email not found! Please try to register",
      data: null,
    })
  }
}

const authRegisterController = async (req: any, res: any) => {
  const reqBody = req.body;
  const { email, password, name, phone } = req.body;
  console.log({ email, password, name, phone })

  if (!email || !password || !name || !phone) {
    return res.status(400).json({
      success: false,
      error: "Invalid credentials received",
      message: "Please provide all the required fields",

    });
  }

  let userDetails: any = await UserModel.findOne({ email });
  if (userDetails) {
    return res.status(200).json({
      success: false,
      message: "Email already registered! Please try to login",
      data: null,
    })
  } else {
    userDetails = await UserModel.create({
      email: email,
      name: name,
      phone: phone,
      password: password
    })

    const token = generateJsonWebToken(userDetails?.email, userDetails?._id);

    return res.status(200).json({
      success: true,
      status: "ok",
      message: "New User Registered!",
      data: userDetails,
      oauth: {
        access_token: token,
      }
    })
  }
}

const sendAuthOTPController = async (req: any, res: any) => {
  const phoneNo: any = req.body?.phone;

  if (!phoneNo) return res.status(400).json({
    success: false,
    message: "Invalid phone number received"
  })

  const otp = GenerateEmailLoginOtp(`${phoneNo}`);
  return res.status(200).json({
    success: true,
    status: "ok",
    message: "OTP sent successfully",
    data: otp
  })
}

const verifyAuthOTPController = async (req: any, res: any) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({
    success: false,
    message: "Invalid phone number or OTP received"
  })

  const isValid = VerifyEmailLoginOtp(`${phone}`, otp);
  if (!isValid) return res.status(400).json({
    success: false,
    message: "Invalid OTP received"
  })

  return res.status(200).json({
    success: true,
    status: "ok",
    message: "OTP verified successfully"
  })
}

export {
  authLoginController,
  authRegisterController,
  sendAuthOTPController,
  verifyAuthOTPController
}