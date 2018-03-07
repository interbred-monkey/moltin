/*global __base*/

const _               = require('lodash/core'),
      uuid            = require('uuid/v4'),
      randomString    = require('random-string'),
      ProductsModel   = require(`${__base}/Services/Models/ProductsModel.js`),
      ProductsLibrary = require(`${__base}/Common/Integrations/Moltin.js`),
      productsModel   = new ProductsModel(),
      productsLibrary = new ProductsLibrary();

class ProductsService {

  constructor() {}

  GenerateId() {

    return uuid();

  }

  GenerateSKU(name) {

    const exclusionList = ['!','$','%','^','&','*','(',')','_','+','|','~','=','`','{','}','[',']',':',';','<','>','?',',','.','/'];

    let sku = name.replace(' ', '-').slice(5).trim();
    let postfix = randomString({
      length: 8,
      numeric: true,
      letters: true,
      special: true,
      exclude: exclusionList
    });

    return `${sku}${postfix}`;

  }

  GenerateSlug(name) {

    return `${name.replace(' ', '-')}`;

  }

  async CreateProducts(params) {

    params.id = this.GenerateProductId();
    params.slug = this.GenerateSlug(params.name);
    params.sku = this.GenerateSKU(params.name);

    let productParams = productsLibrary.CreateProductParameters(params);

    let [libraryError, res] = await productsLibrary.Create(productParams);

    if (!_.isNull(libraryError)) {

      return [libraryError];

    }

    console.log(res);

    let [error, model] = await productsModel.Create(params);

    return [error, model];

  }

  async GetProductsById(params) {

    let [error, model] = await productsModel.Create(params);

    return [error, model];

  }

}

module.exports = ProductsService;