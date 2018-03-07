/*global __base*/

const _               = require('lodash/core'),
      uuid            = require('uuid/v4'),
      randomString    = require('random-string'),
      ProductsModel   = require(`${__base}/Services/Models/ProductsModel.js`),
      ProductsLibrary = require(`${__base}/Common/Integrations/MoltinProducts.js`),
      productsModel   = new ProductsModel(),
      productsLibrary = new ProductsLibrary();

class ProductsService {

  constructor() {}

  GenerateSKU(name) {

    const exclusionList = ['!','$','%','^','&','*','(',')','_','+','|','~','=','`','{','}','[',']',':',';','<','>','?',',','.','/'];

    let sku = name.slice(0, 5).trim().replace(/\s/g, '-');
    let postfix = randomString({
      length: 8,
      numeric: true,
      letters: true,
      special: true,
      exclude: exclusionList
    });

    return `${sku}-${postfix}`;

  }

  GenerateSlug(name) {

    return `${name.replace(/\s/g, '-')}`;

  }

  async CreateProduct(params) {

    params.slug = this.GenerateSlug(params.name);
    params.sku = this.GenerateSKU(params.name);

    let productParams = productsLibrary.CreateProductParameters(params);

    let [libraryError, res] = await productsLibrary.Create(productParams);

    if (!_.isNull(libraryError)) {

      return [libraryError];

    }

    if (!_.isObject(res.data) || !_.isString(res.data.id)) {

      return ['Unable to create product, invalid external reference'];

    }

    params.externalId = res.data.id;

    let [error, model] = await productsModel.Create(params);

    return [error, model];

  }

  async GetProductById(params) {

    let [error, model] = await productsModel.Create(params);

    return [error, model];

  }

}

module.exports = ProductsService;