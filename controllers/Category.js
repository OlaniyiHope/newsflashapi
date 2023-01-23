import Category from "../models/Category.js";
import express from "express";
export const createCategory = async (req, res, next) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET POST
export const getCategory = async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getsingleCategory = async (req, res, next) => {
  try {
    const categories = await Category.findById(req.params.id);
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
