import express from "express";
import * as coffee from "../Controller/coffeController";
import uploadFile from "../middleware/imageVerify";
import * as verify from "../middleware/coffeVerify";
import * as verifyToken from "../middleware/tokenVerify";

const app = express();
app.use(express.json());

app.post('/create', [uploadFile.single('image'), verify.verifyCoffe, verifyToken.verifyToken], coffee.newCoffe);
app.get('/', coffee.getCoffe);
app.put('/update/:id', [uploadFile.single('image'), verify.verifyCoffeUpdate, verifyToken.verifyToken], coffee.updateCoffee);
app.delete('/delete/:id', verifyToken.verifyToken, coffee.deleteCoffe);

export default app
