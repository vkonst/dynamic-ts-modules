/*global describe, it*/
import { expect } from 'chai';
import DynamicLoader from '../src/dynamicLoader';
import {
    IProcessorFnFactory, IProcessorFnFactoryInstance, IProcessorFnMaker, IService,
    ProcessorFn
} from "../src/types";

describe('DynamicLoader', () => {

    let loader: DynamicLoader;
    let processorFn: ProcessorFn;

    before(done => {
      (async () => {
        let conf = await DynamicLoader.loadJson('./examples/config/services.json');
        conf.configPath = './examples/config/';
        loader = new DynamicLoader(conf);

        done();
      })();
    });

    describe('not load services before colling "loadService" method', () => {
        it('not load any services', done => {
            expect(global["_myChecks"]).to.equal(undefined);

            done();
        });
    });

    describe.skip('load two services if service module import other module', () => {
        before(done => {
          (async () => {
            const serviceWithFn = await loader.loadService('function.service');
            processorFn = serviceWithFn.processor as ProcessorFn;

            done();
          })();
        });

        after(done => {
            processorFn = null;

            done();
        });

        it('service with Fn with import service with Factory', done => {
            processorFn({example: 'ProcessorFn'}).then(res => {
                expect(global["_myChecks"]).to.deep.equal({
                    checkProcessorFn: "module processorFn loaded",
                    checkProcessorFactory: "module processorFactory loaded"
                });

                done();
            }, err => {
                console.log(err);

                done();
            });
        })
    });

    describe('service with Fn', () => {

        before(done => {
          (async () => {
            const ServiceWithFn = await loader.loadService('function.service');
            processorFn = ServiceWithFn.processor as ProcessorFn;

            done();
          })();
        });

        after(done => {
            processorFn = null;

            done();
        });

        it('type of loaded service processor is "function"', done => {
            expect(typeof processorFn).to.equal("function");

            done();
        });

        it('loaded service processor return correct response', done => {
          (async () => {
            const res = await processorFn({example: 'ProcessorFn'});
            expect(typeof res).to.equal("object");

            expect(res).to.deep.equal({comment: "processorFn response example",
              req: {example: 'ProcessorFn'}});

            done();
          })();
        });
    });

    describe('service with Maker', () => {

        let maker: IProcessorFnMaker;

        before(done => {
          (async () => {
            const serviceWithFnMaker = await loader.loadService('maker.service');
            maker = serviceWithFnMaker.processor as IProcessorFnMaker;
            processorFn = maker({comment: "more serviceWithMaker config options"}) as ProcessorFn;

            done();
          })();
        });

        after(done => {
            processorFn = null;

            done();
        });

        it('type of loaded service maker is "function"', done => {
            expect(typeof maker).to.equal("function");

            done();
        });

        it('loaded service maker return processor which type is "function"', done => {
            expect(typeof processorFn).to.equal("function");

            done();
        });

        it('loaded by service maker processor return correct response', done => {
          (async () => {
            let res = await processorFn({example: 'ProcessorMaker'});
            expect(typeof res).to.equal("object");

            expect(res).to.deep.equal({
              role: "example:processorFnMaker",
              conf: { comment: 'more serviceWithMaker config options' },
              req: { example: 'ProcessorMaker' }
            });

            done();
          })();
        })
    });

    describe('service with Factory', () => {

        let FnFactory: IProcessorFnFactory;
        let factory: IProcessorFnFactoryInstance;

        before(done => {
          (async () => {
            const serviceWithFnFactory = await loader.loadService('factory.service');
            FnFactory = serviceWithFnFactory.processor as IProcessorFnFactory;
            factory = new FnFactory(null, null);

            done();
          })();
        });

        after(done => {
            processorFn = null;

            done();
        });

        it('loaded service factory type is "function"', done => {
            expect(typeof FnFactory).to.equal("function");

            done();
        });

        it('loaded service factory is class', done => {
            expect(factory instanceof FnFactory).to.equal(true);

            done();
        });

        it('object of loaded service factory has processor method', done => {
            expect(typeof factory.processor).to.equal("function");
            factory = new FnFactory(
                {comment: "more serviceWithFactory config options"},
                {comment: "serviceWithFactory resources"},
            );

            done();
        });

        it('1st call of process method return correct response', done => {
          (async () => {
            let res = await factory.processor({example: 'ProcessorFactory 1st call'});
            expect(typeof res).to.equal("object");

            expect(res).to.deep.equal({
              comment: 'processorFnFactory example response: processor #0',
              conf: { comment: 'more serviceWithFactory config options' },
              resources: { comment: 'serviceWithFactory resources' },
              req: { example: 'ProcessorFactory 1st call' }
            });

            done();
          })();
        });

        it('2nd call of process method return correct response', done => {
          (async () => {
            let res = await factory.processor({example: 'ProcessorFactory 2nd call'});
            expect(typeof res).to.equal("object");

            expect(res).to.deep.equal({
              comment: 'processorFnFactory example response: processor #1',
              conf: { comment: 'more serviceWithFactory config options' },
              resources: { comment: 'serviceWithFactory resources' },
              req: { example: 'ProcessorFactory 2nd call' }
            });

            done();
          })();
        })
    })
});