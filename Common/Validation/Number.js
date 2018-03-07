let _ = require('lodash/core');

class Number {

  ValidateType(value) {

    return [_.isNumber(value), value];

  }

}

module.exports = Number;