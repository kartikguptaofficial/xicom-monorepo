import { Request, Response } from "express";
import ProductModel from "../models/product.model"

const addProductController = async (req: any, res: any) => {
  const payload = req.body;
  // const { name, description, price, currency, sizes }: any = payload;
  const name = payload?.name;
  const description = payload?.description;
  const price = payload?.price

  if (!name || !description || !price) {
    return res.status(400).send({
      success: false,
      message: "Invalid payload received"
    })
  }

  const product = await ProductModel.create({
    name,
    description,
    price,
  }).catch((err) => {
    console.error(`Error while creating product: ${err}`)
    return res.status(500).send({
      success: false,
      message: "Internal server error"
    })
  })
  return res.status(200).json({
    status: "ok",
    success: true,
    message: "Product created successfully",
    data: product
  })
}

const getAllProductsContoller = async (req: any, res: any) => {
  const allProductsData = await ProductModel.find().catch((err) => {
    console.error(`Error while fetching all products: ${err}`);
    return res.status(500).send({
      success: false,
      message: "Internal server error"
    })
  })

  return res.status(200).json({
    status: "ok",
    success: true,
    message: "Products fetched successfully",
    data: allProductsData
  })
}

export {
  addProductController,
  getAllProductsContoller
}