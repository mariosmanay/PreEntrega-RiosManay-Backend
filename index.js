const ProductManager = require("./productManager");
const manager = new ProductManager("./data/Products.json")

const queries = async ()=>{
    try {
        console.log("Consulta Productos")
        let products = await manager.getProducts()
        console.log(products)

        console.log("Nuevo Producto")
        const producto1 = {
            title: "Taza con Logo",
            description: "Taza con logo de La Casa del Árbol",
            price:  800,
            thumbnail: "https://res.cloudinary.com/dihxvmgae/image/upload/v1665121565/arbol-app/taza_dbqvdo.jpg",
            code: 9868416115,
            stock: 8
        };
        await manager.addProduct(producto1)

        console.log("Segundo Producto")
        const producto2 = {
            title: "Gorra con Logo",
            description: "Gorra con logo de La Casa del Árbol",
            price:  1000,
            thumbnail: "https://res.cloudinary.com/dihxvmgae/image/upload/v1665121564/arbol-app/gorra_ilnn0f.jpg",
            code: 846464,
            stock: 10
        };
        await manager.addProduct(producto2);

        console.log("Consulta de Productos por ID")
        products = await manager.getProductsById(1)
        console.log(products);

        console.log("Elimino producto por ID")
        products = await manager.deleteProduct(1)

    } catch (error) {
        console.log(error)
    }
}

queries ();
