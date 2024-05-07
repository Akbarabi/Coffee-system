import { verifyToken } from './../middleware/tokenVerify';
import express from "express";
import * as order from "../Controller/orderController";
import * as verify from "../middleware/orderVerify";

const app = express();
app.use(express.json());

app.get('/',verifyToken,order.getOrder)
app.post('/',[verifyToken,verify.verifyCoffe],order.postOrder) 
app.put('/update/:id',[verifyToken,verify.verifyCoffeUpdate],order.updateOrder)
app.delete('/delete/:id', verifyToken, order.deleteOrder);

export default app
