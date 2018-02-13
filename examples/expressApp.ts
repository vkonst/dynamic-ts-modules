import * as express from "express";
import DynamicLoader from "../src/dynamicLoader";

(async () => {

    const app = express();
    app.set("port", process.env.PORT || 3000);

    const dynamicallyLoadedHandler = process.env.DYNAMIC_HANDLER === "A"
        ? await DynamicLoader.loadModuleByPath("./modules/handlerA")
        : await DynamicLoader.loadModuleByPath("./modules/handlerB");

    app.use(dynamicallyLoadedHandler);

    const modules = {
        handlerFactory: "./services/expressHandlerFactory",
        // other modules, if needed ...
    };
    const loader = new DynamicLoader({modules});

    const handlerFactory = await loader.loadModule("handlerFactory");
    app.use((err, req, res, next) => handlerFactory.processor(err, req, res, next));

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!')
    });

    const server = app.listen(app.get("port"), async () => {
        console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
        console.log("  Press CTRL-C to stop\n");
    });

})().catch(e => console.error(e));
