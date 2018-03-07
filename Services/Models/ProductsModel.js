/*global __base*/
/*global __logging*/
/*global __formatError*/

const _         = require('lodash/core'),
      BaseModel = require(`${__base}/Services/Models/BaseModel.js`);

class ProductsModel extends BaseModel {

  constructor() {

    super();

    this.CreateDBConnection('moltin');

  }

  CreateModel(params) {

    return {
      Id: params.id || null,
      Name: params.name,
      Description: params.description,
      Price:params.price,
      Currency:params.currency,
      PriceIncludesTax: params.price_includes_tax,
      Tax: params.tax,
      State: (params.publish?'Active':'Provisional')
    };

  }

  CreateModelFromEntity(entity) {

    if (!_.isObject(entity)) {

      return {};

    }

    return {
      Id: entity._id,
      Name: entity.Name,
      Description: entity.Description,
      Price:entity.Price,
      Currency:entity.Currency,
      PriceIncludesTax: entity.PriceIncludesTax,
      Tax: entity.Tax,
      State: entity.State
    };

  }

  ApplyPatchToEntity(entity, patch) {

    (_.isString(patch.name)?entity.Name = patch.name:'');
    (_.isString(patch.description)?entity.Description = patch.description:'');
    (_.isString(patch.price)?entity.Price = patch.price:'');
    (_.isString(patch.currency)?entity.Currency = patch.currency:'');
    (_.isString(patch.publish)?entity.State = (patch.publish?'Active':'Provisional'):'');

    return entity;

  }

  async Create(params = {}) {

    try {

      let error           = null,
          model           = this.CreateModel(params),
          entity          = this.CreateEntityFromModel(model);

      [error, entity] = await this.Insert('products', entity);
      model = this.CreateModelFromEntity(entity);

      return [error, model];

    }

    catch(e) {

      __logging.error(e);
      return __formatError('An unknown error occurred');

    }

  }

  async GetById(entityId) {

    if (!_.isString(entityId)) {

      return __formatError('Invalid id provided');

    }

    let query = {
      _id: entityId
    };

    try {

      let [error, entity] = await this.Get('products', query);
      let model = this.CreateModelFromEntity(entity);

      return [error, model];

    }

    catch(e) {

      __logging.error(e);
      return __formatError('An unknown error occurred');

    }

  }

  async PatchById(entityId, patch = null) {

    if (!_.isString(entityId)) {

      return __formatError('Invalid entityId format provided');

    }

    if (!_.isObject(patch)) {

      return __formatError('Invalid patch format provided');

    }

    let entity      = null,
        getError    = null,
        updateError = null,
        query = {
          _id: entityId
        };

    try {

      [getError, entity] = await this.Get('products', query);

      if (!_.isNull(getError)) {

        return [getError];

      }

      entity = this.ApplyPatchToEntity(entity, patch);
      [updateError, entity] = await this.Update('products', query, entity);

      if (!_.isNull(updateError)) {

        return [updateError];

      }

      let model = this.CreateModelFromEntity(entity);
      return [null, model];

    }

    catch(e) {

      __logging.error(e);
      return __formatError('An unknown error occurred');

    }

  }

  async DeleteById(entityId) {

    let query = {
      _id: entityId
    };

    try {

      let [error] = await this.Delete('products', query);
      return [error];

    }

    catch(e) {

      __logging.error(e);
      return __formatError('An unknown error occurred');

    }

  }

}

module.exports = ProductsModel;