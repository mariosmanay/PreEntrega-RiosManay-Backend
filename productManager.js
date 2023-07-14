const fs = require("fs/promises");
const {existsSync} = require("fs");

class ProductManager {
    constructor (path) {
        this.path = path
    }
    async readFile(){
        return await fs.readFile(this.path,"utf-8")
    }

    async writeFile(string){
        return await fs.writeFile(this.path, string, "utf-8")
    }

    async getProducts(){
        try {
            if(existsSync(this.path)){
                const productsStrings = await this.readFile()
                const products = await JSON.parse(productsStrings);
                return products
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error.mesage)
        }
    }

    async addProduct(product){
        try {
            const productsArray = await this.getProducts()
            const newProduct = {id: productsArray.length+1, ...product}
            productsArray.push(newProduct);
            const productsString = JSON.stringify(productsArray, null, "\t")

            await this.writeFile(productsString)
            console.log("Product loaded succesfully")
        
        } catch (error) {
            console.log(error)
        }
    }


    async getProductsById(id){
        try {
            const products = await this.getProducts()
            const foundProduct = products.find(prod=>prod.id===id);

            if(!foundProduct){
                throw new Error("The product does not exist");
            }
            return foundProduct;
        } catch (error) {
            console.log(error)
        }    
    }

    async updateProduct(id, newInfo) {
        try {
            const products = await this.getProducts()
            const foundProduct = await this.getProductsById(id)

            const productUpdated = {...foundProduct, ...newInfo}

            const updatedList = products.map(prod=>{
            if(prod.id===productUpdated.id){
                return productUpdated
            } else {
                return prod
            }
        })
            const stringProductList = await JSON.stringify(updatedList, null, "\t")

            await this.writeFile(stringProductList)
    
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts()
            const foundProduct = await this.getProductsById(id)
            const updatedList = products.filter(prod=>prod.id !== foundProduct.id);
            console.log(updatedList)
            const stringProductList = await JSON.stringify(updatedList, null, "\t")
    
            await this.writeFile(stringProductList)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductManager;








