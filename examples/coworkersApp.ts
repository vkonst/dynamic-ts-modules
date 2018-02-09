const coworkers = require('coworkers');
const FS = require('fs-extra');
const token = require('./token');

let ServiceLoader = require('./dist/serviceLoader').default;

class App extends coworkers {
    constructor(){
        super();

        FS.readJson("./config/services.json").then(conf => {
            Object.serviceLoader = new ServiceLoader(conf);
        }, err => {
            throw err;
        });
    }

    attachService(srvOpts) {
        super.queue(srvOpts.amqp.reqQueue, function * () {

            this.ack = true; // acknowledge message later, see `Context` documentation below

            (async function uploadService () {
                let serviceWithFn = await Object.serviceLoader.loadService('function.service');

                console.log(await serviceWithFn.processor({example: 'ProcessorFn'}));
            })();
        });
    }
}

let app = new App();

app.attachService({
    amqp : {reqQueue: 'someQueue'}
});

// middleware error handler
app.on('error', function (err) {
    console.error(err.stack)
});

// connect to rabbitmq and begin consuming
app.connect('amqp://pljusctb:' + token + '@black-boar.rmq.cloudamqp.com/pljusctb');
