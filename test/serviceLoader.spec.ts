/*global describe, it*/
import { expect } from 'chai';
import ServiceLoader from '../src/dynamicLoader';
import {
    IProcessorFnFactory, IProcessorFnFactoryInstance, IProcessorFnMaker, IService,
    ProcessorFn
} from "../src/types";
import * as FS from "fs-extra";

describe('DynamicLoader', () => {

    let loader: ServiceLoader;
    let processorFn: ProcessorFn;

    before(done => {
        FS.readJson("./config/services.json").then(conf => {
            loader = new ServiceLoader(conf);

            done();
        })
    });

    describe('not load services before colling "loadService" method', () => {
        it('not load any services', done => {
            expect(global["_myChecks"]).to.equal(undefined);

            done();
        });
    });

    describe('load two services if service module import other module', () => {
        before(done => {
            loader.loadService("function.service").then(serviceWithFn => {
                processorFn = serviceWithFn.processor as ProcessorFn;

                done();
            }, err => {
                console.log(err);

                done()
            });
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
            loader.loadService("function.service").then(ServiceWithFn => {
                processorFn = ServiceWithFn.processor as ProcessorFn;

                done();
            }, err => {
                console.log(err);

                done()
            });
        });

        after(done => {
            processorFn = null;

            done();
        });

        it('type of loaded service processor is "function"', done => {
            expect(typeof processorFn).to.equal("function");

            done();
        });

        it('loaded service processor return correct response', (done) => {
            processorFn({example: 'ProcessorFn'}).then(res => {
                expect(typeof res).to.equal("object");

                expect(res).to.deep.equal({comment: "processorFn response example"
                    , req: {example: 'ProcessorFn'}});

                done();
            }, err => {
                console.log(err);

                done();
            });
        });
    });

    describe('service with Maker', () => {

        let maker: IProcessorFnMaker;

        before(done => {
            loader.loadService("maker.service").then(ServiceWithMaker => {
                maker = ServiceWithMaker.processor as IProcessorFnMaker;
                processorFn = maker({comment: "more serviceWithMaker config options"}) as ProcessorFn;

                done();
            }, err => {
                console.log(err);

                done()
            });
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
            processorFn({example: 'ProcessorMaker'}).then(res => {

                expect(typeof res).to.equal("object");

                expect(res).to.deep.equal({
                    role: "example:processorFnMaker",
                    conf: { comment: 'more serviceWithMaker config options' },
                    req: { example: 'ProcessorMaker' }
                });

                done();
            }, err => {
                console.log(err);

                done();
            });
        })
    });

    describe('service with Factory', () => {

        let FnFactory: IProcessorFnFactory;
        let factory: IProcessorFnFactoryInstance;

        before(done => {
            loader.loadService("factory.service").then(serviceWithFactory => {
                FnFactory = serviceWithFactory.processor as IProcessorFnFactory;

                factory = new FnFactory(null, null);

                done();
            }, err => {
                console.log(err);

                done()
            });
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
            factory.processor({example: 'ProcessorFactory 1st call'}).then(res => {

                expect(typeof res).to.equal("object");

                expect(res).to.deep.equal({
                    comment: 'processorFnFactory example response: processor #0',
                    conf: { comment: 'more serviceWithFactory config options' },
                    resources: { comment: 'serviceWithFactory resources' },
                    req: { example: 'ProcessorFactory 1st call' }
                });

                done();
            }, err => {
                console.log(err);

                done();
            });
        });

        it('2nd call of process method return correct response', done => {
            factory.processor({example: 'ProcessorFactory 2nd call'}).then(res => {

                expect(typeof res).to.equal("object");

                expect(res).to.deep.equal({
                    comment: 'processorFnFactory example response: processor #1',
                    conf: { comment: 'more serviceWithFactory config options' },
                    resources: { comment: 'serviceWithFactory resources' },
                    req: { example: 'ProcessorFactory 2nd call' }
                });

                done();
            }, err => {
                console.log(err);

                done();
            });
        })
    })
});