import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import { BASE_URL } from "../global";
import fs from "fs/promises";

const prisma = new PrismaClient()

export const newCoffe = async (req: Request, res: Response) => {
    try {
        const { name, size, price } = req.body

        let filename = ""
        if (req.file) filename = req.file.filename

        const newImage = await prisma.coffee.create({
            data: {
                name: name,
                size: size,
                price: Number(price),
                image: filename
            }
        })

        return res.json({
            status: true,
            data: newImage,
            message: `New menu has created`
        }).status(200)

    } catch (error) {
        return res
            .json({
                status: false,
                message: `Error on [Coffe_POST]`
            })
            .status(400)
    }
}

export const getCoffe = async (req: Request, res: Response) => {
    try {
        const keywrd = req.body.keywrd

        const coffe = await prisma.coffee.findMany({
            where: {
                name: { contains: keywrd || "" }
            },
            orderBy: {
                name: "asc"
            }
        })

        return res.status(200).json({
            status: true,
            message: `Success get coffee`,
            data: coffe
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error on [Coffe_GET]`
        })
    }
}

export const updateCoffee = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name, size, price } = req.body;

        // Find the coffee to update
        const findCoffee = await prisma.coffee.findUnique({
            where: { id },
        });

        if (!findCoffee) {
            return res.status(404).json({
                status: false,
                message: "Coffee not found",
            });
        }

        let imageFilename = "";

        if (req.file) {
            imageFilename = req.file.filename;

            if (findCoffee.image) {
                const imagePath = `${BASE_URL}/public/save/${findCoffee.image}`;
                try {
                    await fs.unlink(imagePath); // Provide both arguments
                } catch (err) {
                    console.error("Error deleting image:", err);
                }
            }
        } else {
            imageFilename = findCoffee.image || ""; // Fallback to existing image
        }

        const update = await prisma.coffee.update({
            where: { id },
            data: {
                name: name || findCoffee.name,
                size: size || findCoffee.size,
                price: Number(price) || findCoffee.price,
                image: imageFilename,
            },
        });

        return res.status(200).json({
            status: true,
            message: "Coffee update successful",
            data: update,
        });
    } catch (error) {
        console.error("Error updating coffee:", error);
        return res.status(500).json({
            status: false,
            message: "Error updating coffee",
        });
    }
};

export const deleteCoffe = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        // Find the coffee to delete and retrieve its image filename (if any)
        const findCoffee = await prisma.coffee.findUnique({
            where: { id },
            select: { image: true }, // Only select the "image" field
        });

        if (!findCoffee) {
            return res.status(404).json({
                status: false,
                message: "Coffee not found",
            });
        }

        // Delete coffee from database
        const deletedCoffe = await prisma.coffee.delete({
            where: { id },
        });

        if (findCoffee.image) {
            const imagePath = `${BASE_URL}/public/save/${findCoffee.image}`;
            try {
                await fs.unlink(imagePath); // Use fs/promises for cleaner async/await
            } catch (err) {
                console.error("Error deleting image:", err);
                // Handle deletion error gracefully (e.g., log error and proceed)
            }
        }

        return res.status(200).json({
            status: true,
            message: "Coffee deleted successfully",
            data: deletedCoffe,
        });
    } catch (error) {
        console.error("Error deleting coffee:", error);
        return res.status(500).json({
            status: false,
            message: "Error deleting coffee",
            error: error,
        });
    }
};