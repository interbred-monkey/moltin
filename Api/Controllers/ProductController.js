/*global __base*/
/*global __formatError*/

const ProductService = require(`${__base}/Services/ProductService.js`);

class ProductController {

  constructor() {}

  async postProduct(params) {

    try {

      let productService = new ProductService();
      let [error, model] = await productService.CreateProduct(params);

      return [error, model];

    }

    catch(e) {

      return __formatError('An unknown error has occured');

    }

  }

  async getProduct(params) {

    try {

      let productService = new ProductService();
      let [error, model] = await productService.getProductById(params.id);

      return [error, model];

    }

    catch(e) {

      return __formatError('An unknown error has occured');

    }

  }

}

module.exports = ProductController;