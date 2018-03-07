/*global __base*/
/*global __logging*/
/*global __formatError*/

const _           = require('lodash/core'),
      curl        = require(`${__base}/Common/Curl.js`),
      MotlinCore  = require(`${__base}/Common/Integrations/MotlinCore.js`);

class MoltinProducts extends MotlinCore {

  constructor() {

    super();

    this.ApiVersion = process.env.MOTLIN_PRODUCT_API_VERSION || this.ApiVersion;
    this.ProductsURI = process.env.MOTLIN_PRODUCT_URI;

  }

  CreateProductParameters(params) {

    let structured = {
      type: 'product',
      id: params.id,
      name: params.name,
      slug: params.slug,
      sku: params.sku,
      manage_stock: true,
      description: params.description,
      price: [
        {
          amount: params.price,
          currency: params.currency,
          includes_tax: params.price_includes_tax
        }
      ],
      status: (params.publish?'live':'draft')
    };

    return structured;

  }

  async Create(params) {

    let [authError, token] = await this.GetAccessToken();

    if (!_.isNull(authError)) {

      __logging.error(authError);
      return [authError];

    }

    let curlParams = {
      method: 'POST',
      uri: `${this.BaseURI}/v${this.ApiVersion}${this.ProductsURI}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: params
    };

    let [err, data] = await curl(curlParams);

    if (!_.isNull(err) || !_.isObject(data) || !_.isString(data.id)) {

      __logging.error(__formatError(err || 'Uknown format returned'));
      return ['Unable to add product to Motlin'];

    }

    return [null, data];

  }

}

module.exports = MoltinProducts;