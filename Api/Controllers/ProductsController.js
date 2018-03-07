/*global __base*/
/*global __formatError*/

const ProductsService = require(`${__base}/Services/ProductsService.js`);

class ProductsController {

  constructor() {}

  async postProduct(params) {

    try {

      let productsService = new ProductsService();
      let [error, model] = await productsService.CreateProduct(params);

      return [error, model];

    }

    catch(e) {

      return __formatError('An unknown error has occured');

    }

  }

  async getProductById(params) {

    try {

      let productsService = new ProductsService();
      let [error, model] = await productsService.getProductById(params.id);

      return [error, model];

    }

    catch(e) {

      return __formatError('An unknown error has occured');

    }

  }

}

module.exports = ProductsController;