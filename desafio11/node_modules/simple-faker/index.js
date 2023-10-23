const express = require("express");
const bodyParser = require("body-parser");

export const METHOD_POST = "post";
export const METHOD_GET = "get";
export const METHOD_DELETE = "delete";
export const METHOD_PATCH = "patch";
export const METHOD_PUT = "put";
export const METHOD_OPTIONS = "options";

class SimpleFaker {
  constructor(port) {
    this.app = express();
    this.app.use(bodyParser.json());

    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "*");
      next();
    });

    this.server = this.app.listen(port, () =>
      console.log(`Simple Faker started on port ${port}`)
    );
  }

  interceptCall(path, method, handler) {
    let resolve = null;
    const listener = new Promise(r => {
      resolve = r;
    });

    this.app[method](path, (req, res, next) => {
      resolve(req);
      handler(req, res, next);
    });

    return listener;
  }

  close() {
    return new Promise(resolve =>
      this.server.close(() => {
        console.log("Simple Faker closed");
        resolve();
      })
    );
  }
}

export default SimpleFaker;
