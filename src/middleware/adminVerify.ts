import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

// Schema for POST request
const postSchema = Joi.object({
  email : Joi.string().email().required(),
  password : Joi.string().required()
})

// Schema for PUT request
const putSchema = Joi.object({
  name : Joi.string().optional(),
  email : Joi.string().email().optional(),
  password : Joi.string().optional()
})

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Validation in BODY POSTMAN 
  const { error } = postSchema.validate(req.body)

  // To show error message
  if (error) {
    return res.status(400).json({
      status : false,
      message : error.message
    })
  }
  next()
}

export const verifyAdminUpdate = (req: Request, res: Response, next: NextFunction) => {
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