import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        // to create request in headers auth(Beare Token in Auth POSTMAN)
        const authHeader = req.headers.authorization
        // to split token from header
        const token = authHeader?.split(' ')[1] || ""
        // to define secret key in .env
        const secretKey = process.env.JWT_SECRET_KEY || "secretKey"
        
        // to verify token with secret key and correct token that we get from auth req in controller
        verify(token, secretKey, (error) => {
            if(error) {
                return res.status(401).json({
                    status : false,
                    message : `Unauthorized`
                })
            }
                next();
        });
        
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : `Error on : [Token_VERIFY] ${error}`
        })
    }
}