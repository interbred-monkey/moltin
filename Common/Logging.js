// To do

class Logging {

  constructor() {

    this.library = {
      log: console.log,
      warn: console.warn,
      error: console.error,
    };

  }

  CreateMessage(message, stack) {

    return JSON.stringify({
      message: message,
      stack: stack || console.trace
    }, null, 2);

  }

  log(message) {

    this.library.log(this.CreateMessage(message));

  }

  warning(message) {

    this.library.warn(this.CreateMessage(message));

  }

  error(error) {

    this.library.error(this.CreateMessage(error.message, error.stack));

  }

}

module.exports = Logging;