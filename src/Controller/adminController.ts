import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import md5 from "md5";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient()

export const newAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const hashedPassword = md5(password)

        const admin = await prisma.admin.create({
            data: {
                email: email,
                password: hashedPassword
            }
        })
        
        if(admin) {
            let payload = JSON.stringify(admin)
            const secret_key = process.env.JWT_SECRET_KEY
            const token = sign(payload, secret_key || "secretkey")

            return res.status(200).json({
                status: true,
                message: `Success create an admin`,
                token: token
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error on : [Admin_POST]`,
            data: error
        })
    }
}

export const getAdmin = async (req: Request, res: Response) => {
    try {
        const keywrd = req.body.keywrd

        const findAdmin = await prisma.admin.findMany({
            where: {
                name: { contains: keywrd?.toString() || "" }
            }   
        })

        return res.status(200).json({
            status: true,
            message: `Success get an admin`,
            data: findAdmin
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error on : [Admin_GET]`,
            data: error
        })
    }
}

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const findAdmin = await prisma.admin.findFirst({
            where: {
                email: email
            }
        })

        if (!findAdmin) {
            return res.status(404).json({
                status: false,
                message: `Admin not found`
            })
        }

        if (findAdmin.password !== md5(password)) {
            return res.status(404).json({
                status: false,
                message: `Password not match`
            })
        }

        let payload = JSON.stringify(findAdmin)
        const secret_key = process.env.JWT_SECRET_KEY
        const token = sign(payload, secret_key || "secretkey")

        return res.status(200).json({
            status: true,
            message: `Success login`,
            token: token
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error on : [Admin_LOGIN] ${error}`
        })
    }
}

export const updateAdmin = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const { name, email, password } = req.body
        const hashedPassword = md5(password)

        const findAdmin = await prisma.admin.findUnique({
            where: {
                id: id
            }
        })

        if (!findAdmin) {
            return res.status(404).json({
                status: false,
                message: `Admin not found`
            })
        }

        const update = await prisma.admin.update({
            where: {
                id: id
            },
            data: {
                name: name || findAdmin.name,
                email: email || findAdmin.password,
                password: hashedPassword || findAdmin.password
            }
        })
        
        return res.status(200).json({
            status: true,
            message: `Success update an admin`,
            data: update
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error on : [Admin_UPDATE] ${error}`
        })
    }
}

export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)

        const findAdmin = await prisma.admin.findUnique({
            where: {
                id : id
            }
        })

        if (!findAdmin) {
            return res.status(404).json({
                status: false,
                message: `Admin not found`
            })
        }

        const deleteAdmin = await prisma.admin.delete({
            where: {
                id: id
            }
        })

        return res.status(200).json({
            status: true,
            message: `Success delete an admin`,
            data: deleteAdmin
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error on : [Admin_DELETE]`,
            data : error
        })
    }
}

// Global auth for put and delete
export const auth = async (req: Request, res: Response) => {
    try {
        const id = req.body.id

        // find id admin
        const findAdmin = await prisma.admin.findFirst({
            where: {
                id : id
            }
        })

        if (!findAdmin) {
            return res.status(200).json({
                status: false,
                message: `Admin not found`
            })
        } else {
            // turn findAdmin to JSON Type and convert into token
            let payload = JSON.stringify(findAdmin)
            const secret_key = process.env.JWT_SECRET_KEY
            // Sign the payload to generate JWT token using the secret key
            const token = sign(payload, secret_key || "secretkey")

            return res.status(200).json({
                status: true,
                message: `Success login`,
                token: token
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error on : [Admin_AUTH]`,
            data: error
        })
    }
}