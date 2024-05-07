import express from "express";
import adminRoute from "./route/adminRoute";
import coffeRoute from "./route/coffeRoute"
import orderRoute from "./route/orderRoute"

const app = express();
const PORT = 3000;

app.use("/admin",adminRoute)
app.use("/coffee",coffeRoute)
app.use("/order",orderRoute)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));