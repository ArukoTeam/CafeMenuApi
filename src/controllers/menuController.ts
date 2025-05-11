import { Request, Response } from 'express';
import { MenuItem, IMenuItem } from '../models/MenuItem';

// Get all menu items
export const getAllMenuItems = async (req: Request, res: Response) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get a single menu item
export const getMenuItem = async (req: Request, res: Response) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Create a new menu item
export const createMenuItem = async (req: Request, res: Response) => {
    try {
        const newItem: IMenuItem = new MenuItem(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: 'Error creating menu item', error: err });
    }
};

// Update a menu item
export const updateMenuItem = async (req: Request, res: Response) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: 'Error updating menu item', error: err });
    }
};

// Delete a menu item
export const deleteMenuItem = async (req: Request, res: Response) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get menu items by category
export const getMenuItemsByCategory = async (req: Request, res: Response) => {
    try {
        const items = await MenuItem.find({ category: req.params.category });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};