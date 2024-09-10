import expres from "express"
import userRoute from "../controllers/User/user.route.js"
import productRoute from "../controllers/Product/product.route.js"
import wishlistRoute from "../controllers/Wishlist/wishlist.route.js"
import cartRoute from "../controllers/Cart/cart.route.js"
import orderRoute from "../controllers/Order/order.route.js"
import reviewRoute from "../controllers/Review/review.route.js"
const app=expres();

app.use("/auth",userRoute)
app.use("/product",productRoute)
app.use("/wishlist",wishlistRoute)
app.use('/cart',cartRoute)
app.use('/order',orderRoute)
app.use('/review',reviewRoute)




export default app