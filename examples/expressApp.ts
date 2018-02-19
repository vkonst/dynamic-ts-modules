import express = require("express");
import DynamicLoader from "../src/dynamicLoader";
import {IProcessorFnFactory} from "../src/types";

(async () => {

  const app = express();
  app.set("port", process.env.PORT || 3000);

  const dynamicallyLoadedHandler = process.env.DYNAMIC_HANDLER === "A"
    ? await DynamicLoader.loadModuleByPath("../examples/modules/handlerA")
    : await DynamicLoader.loadModuleByPath("../examples/modules/handlerB");

  app.use(dynamicallyLoadedHandler);

  const modules = {
    handlerFactory: "../examples/services/expressHandlerFactory",
    // other modules, if needed ...
  };
  const loader = new DynamicLoader({modules});

  const moduleHandlerFactory = await loader.loadModule('handlerFactory');
  const handlerFactory = new moduleHandlerFactory();

  const dynamicHandler = (req, res, next) => {
    const uniqueHandlerForEveryCall = handlerFactory.handler;
    return uniqueHandlerForEveryCall(req, res, next);
  };

  app.use(dynamicHandler);

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!')
  });


  app.get('/', (req, res, next) => {
    // handlerFactory.handler(req, res, next);
    res.send(res.body);
    next();
  });

  const server = app.listen(app.get("port"), async () => {
    console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
  });

})().catch(e => console.error(e));
