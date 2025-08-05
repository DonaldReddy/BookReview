import { Router } from "express";
import {querycontroller} from "../controller/querycontroller.js";

const queryrouter = Router();
queryrouter.post("/",querycontroller.createquery);

export {queryrouter};