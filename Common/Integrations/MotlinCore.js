/*global __base*/
/*global __logging*/
/*global __formatError*/

const _    = require('lodash/core'),
      curl = require(`${__base}/Common/Curl.js`);

class MoltinCore {

  constructor() {

    this.ClientId = process.env.MOTLIN_CLIENT_ID;
    this.ClientSecret = process.env.MOTLIN_CLIENT_SECRET;
    this.BaseURI = process.env.MOTLIN_BASE_URI;
    this.ApiVersion = process.env.MOTLIN_API_VERSION;
    this.AuthURI = process.env.MOTLIN_AUTH_URI;
    this.ProductsURI = process.env.MOTLIN_PRODUCT_URI;
    this.GrantType = process.env.MOTLIN_GRANT_TYPE;

  }

  async GetAccessToken() {

    let curlParams = {
      method: 'POST',
      uri: `${this.BaseURI}${this.AuthURI}`,
      body: {
        client_id: this.ClientId,
        client_secret: this.ClientSecret,
        grant_type: this.GrantType
      }
    };

    let [err, data] = await curl(curlParams);

    if (!_.isNull(err) || !_.isObject(data) || !_.isString(data.access_token)) {

      __logging.error(__formatError(err));
      return ['Unable to authenticate with Motlin'];

    }

    return [null, data.access_token];

  }

}

module.exports = MoltinCore;