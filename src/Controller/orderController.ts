import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postOrder = async (req: Request, res: Response) => {
    try {
        const { customer_name, order_type, order_date, order_detail } = req.body;

        const newOrder = await prisma.order_list.create({
            data: {
                customer_name: customer_name,
                order_type: order_type,
                order_date: new Date(order_date).toISOString(),
                order_detail: {
                    createMany: {
                        data: order_detail.map((detail: any) => ({
                            coffe_id: detail.coffe_id,
                            quantity: detail.quantity,
                            price: detail.price
                        }))
                    }
                }
            },
            include: {
                order_detail: true
            }
        });

        return res.status(200).json({
            status: true,
            message: "Success create new order",
            data: newOrder
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error on [Order_POST]",
            error: error
        });
    }
};

export const getOrder = async (req: Request, res: Response) => {
    try {

        const order = await prisma.order_list.findMany({
            include: {
                order_detail: {
                   select : {
                    quantity : true,
                    coffe_details : true
                   }
                },
            },
        });

        return res.status(200).json({
            status: true,
            message: "Success get order",
            data: order
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error on [Order_GET]",
            error: error
        });
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { customer_name, order_type, order_date, order_detail } = req.body;

        const find = await prisma.order_list.findFirst({
            where: {
                id: id
            }
        });

        if (!find) {
            return res.status(404).json({
                status: false,
                message: "Order not found"
            });
        }

        const update = await prisma.order_list.update({
            where: {
                id: id
            },
            data: {
                customer_name: customer_name || find?.customer_name,
                order_type: order_type || find?.order_type,
                order_date: new Date(order_date).toISOString() || find?.order_date,
                order_detail: {
                    updateMany: order_detail.map((detail: any) => ({
                        where: { id: detail.coffe_id },
                        data: {
                            quantity: detail.quantity,
                            price: detail.price
                        }
                    }))
                }
            },
            include: {
                order_detail: true
            }
        });

        return res.status(200).json({
            status: true,
            message: "Success update order",
            data: update
        });
        
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error on [Order_UPDATE]",
            error: error
        });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const findOrder = await prisma.order_list.findFirst({
            where: {
                id: id
            },
            include: {
                order_detail: true
            }
        });

        if (!findOrder) {
            return res.status(404).json({
                status: false,
                message: "Order not found"
            });
        }

        if(findOrder.order_detail.length) {
            await prisma.order_detail.deleteMany({
                where: {
                    order_id: id
                }
            })
        }

        const deleteOrder = await prisma.order_list.delete({
            where: {
                id: id
            }
        });

        return res.status(200).json({
            status: true,
            message: "Success delete order",
            data: {
                deleteOrder: deleteOrder,
                order_detail: findOrder.order_detail
            }
        });
        
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error on [Order_DELETE]",
            error: error
        });
    }
}