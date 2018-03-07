/*global __db*/
/*global __logging*/
/*global __formatError*/

const _       = require('lodash/core'),
      uuid    = require('uuid/v4'),
      moment  = require('moment'),
      db      = __db;

class BaseModel {

  constructor() {}

  async CreateDBConnection(connection) {

    await db.CreateConnection(connection);

    return;

  }

  CreateEntityFromModel(model) {

    let id = (_.isString(model.Id)?model.Id:uuid());

    delete model.Id;

    let entity = {
      _id:id,
      CreatedUtc: moment().utc().toISOString(),
      ModifiedUtc: moment().utc().toISOString(),
      ...model
    };

    return entity;

  }

  async Insert(connection, entity) {

    try {

      let error = null;
      [error] = await db.Insert(connection, entity);

      return [error, entity];

    }

    catch(e) {

      __logging.error(e);
      return __formatError('An unknown error occurred');

    }

  }

  async BulkInsert(connection, entities) {

    try {

      let error = null;
      [error] = await db.BulkInsert(connection, entities);

      return [error, entities];

    }

    catch(e) {

      __logging.error(e);
      return __formatError('An unknown error occurred');

    }

  }

  async Get(connection, query) {

    try {

      let [error, entity] = await db.Get(connection, query);
      return [error, entity];

    }

    catch(e) {

      __logging.error(e);
      return __formatError('An unknown error occurred');

    }

  }

  async Search(connection, query) {

    try {

      let [error, entities] = await db.Search(connection, query);
      return [error, entities];

    }

    catch(e) {

      __logging.error(e);
      return __formatError('An unknown error occurred');

    }

  }

  async Update(connection, query, entity) {

    try {

      entity.ModifiedUtc = moment().utc().format('YYYY-M-D HH:mm:ss');

      let [error] = await db.Update(connection, query, entity);

      return [error, entity];

    }

    catch(e) {

      __logging.error(e);
      return __formatError('An unknown error occurred');

    }

  }

  async BulkUpdate(connection, queries, entities) {

    try {

      entities = entities.map( (entity) => {

        entity.ModifiedUtc = moment().utc().format('YYYY-M-D HH:mm:ss');
        return entity;

      });

      let [error] = await db.BulkUpdate(connection, queries, entities);

      return [error, entities];

    }

    catch(e) {

      __logging.error(e);
      return __formatError('An unknown error occurred');

    }

  }

  async Delete(connection, query) {

    try {

      let [error] = await db.Delete(connection, query);
      return [error];

    }

    catch(e) {

      __logging.error(e);
      return __formatError('An unknown error occurred');

    }

  }

  async BulkDelete(connection, query) {

    try {

      let [error] = await db.BulkDelete(connection, query);
      return [error];

    }

    catch(e) {

      __logging.error(e);
      return __formatError('An unknown error occurred');

    }

  }

}

module.exports = BaseModel;
