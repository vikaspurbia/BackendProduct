import { Request, Response } from 'express';
import Product from '../model/product.model';

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, description, stock } = req.body;
        const product = await Product.create({ name, price, description, stock });
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch product', error: error.message });
    }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, price, description, stock } = req.body;

        const product = await Product.findByPk(id);
        if (product) {
            product.name = name;
            product.price = price;
            product.description = description;
            product.stock = stock;
            await product.save();

            res.status(200).json({ message: 'Product updated successfully', product });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (product) {
            await product.destroy();
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};
