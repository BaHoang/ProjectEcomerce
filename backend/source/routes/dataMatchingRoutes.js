import express from "express";
import {  dataMatching } from '../controllers/dataMatchingController.js'

const router = express.Router()

router.get('/:id', dataMatching)


export default router