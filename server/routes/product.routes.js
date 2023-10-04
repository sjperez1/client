const ProductController= require("./../controllers/product.controller")

module.exports = (app)=>{
    app.get("/api/products", ProductController.allProducts)
    app.post("/api/products", ProductController.addProduct)
    app.get("/api/products/:id", ProductController.oneProduct)
    app.put("/api/products/:id/edit", ProductController.updateProduct)
    app.delete("/api/products/:id", ProductController.deleteProduct)
}