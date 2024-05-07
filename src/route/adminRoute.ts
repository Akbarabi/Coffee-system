import * as verify from './../middleware/adminVerify';
import express from "express";
import * as admin from "../Controller/adminController";
import { verifyToken } from '../middleware/tokenVerify';

const app = express();
app.use(express.json())

app.post('/register',admin.newAdmin)
app.post('/login', verify.verifyAdmin ,admin.newAdmin)
app.get('/', verifyToken ,admin.getAdmin)
app.put('/update/:id', [verifyToken, verify.verifyAdminUpdate], admin.updateAdmin)
app.delete('/delete/:id',verifyToken, admin.deleteAdmin)

export default app