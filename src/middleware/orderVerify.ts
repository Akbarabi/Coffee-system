import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

// Schema for POST request
const postSchema = Joi.object({
  customer_name : Joi.string().required(),
  order_type : Joi.string().required(),
  order_date : Joi.date().required(),
  order_detail : Joi.array().required().items({
    coffe_id : Joi.number().required(),
    quantity : Joi.number().required(),
    price : Joi.number().required()
  })
})

// Schema for PUT request
const putSchema = Joi.object({
    customer_name : Joi.string().optional(),
    order_type : Joi.string().optional(),
    order_date : Joi.date().optional(),
    order_detail : Joi.array().optional()
})

export const verifyCoffe = (req: Request, res: Response, next: NextFunction) => {
  // Validation in BODY POSTMAN 
  const { error } = postSchema.validate(req.body)

  // To show error message
  if (error) {
    return res.status(400).json({
      status : false,
      message : error.details[0].message
    })
  }
  next()
}

export const verifyCoffeUpdate = (req: Request, res: Response, next: NextFunction) => {
  // Validation in BODY POSTMAN 
  const { error } = putSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      status : false,
      message : error.message
    })
  }
  next()
}