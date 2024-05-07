import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

// Schema for POST request
const postSchema = Joi.object({
  name : Joi.string().required(),
  size : Joi.string().required(),
  price : Joi.number().required(),
  image : Joi.string().optional()
})

// Schema for PUT request
const putSchema = Joi.object({
    name : Joi.string().optional(),
    size : Joi.string().optional(),
    price : Joi.number().optional(),
    image : Joi.string().optional()
})

export const verifyCoffe = (req: Request, res: Response, next: NextFunction) => {
  // Validation in BODY POSTMAN 
  const { error } = postSchema.validate(req.body)

  // To show error message
  if (error) {
    return res.status(400).json({
      status : false,
      message : error
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