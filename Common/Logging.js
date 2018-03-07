// To do

class Logging {

  constructor() {

    this.library = {
      log: process.stdout.write,
      warn: process.stdout.write,
      error: process.stderr.write,
    };

  }

  CreateMessage(message, stack) {

    return {
      message: message,
      stack: stack || console.trace
    };

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