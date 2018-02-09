import {
    IProcessorFnFactoryInstance, IRequest, IResources, IResponse, ISrvConf,
    ProcessorFn
} from "../../src/types";
import {ProcessorTypes} from "../../src/dynamicLoader";

if (!global["_myChecks"]) global["_myChecks"] = {};
global["_myChecks"].checkProcessorFactory = "module processorFactory loaded";

export default class Factory implements IProcessorFnFactoryInstance {

    constructor(protected conf: ISrvConf, protected resources: IResources) {
        this.processorType = ProcessorTypes.factory;
        this.counter = 0;
    }

    public processorType: ProcessorTypes;

    public get processor(): ProcessorFn {
        return this.getProcessorFn(`processor #${this.counter++}`);
    }

    private counter: number;

    private getProcessorFn(id: string): ProcessorFn {
        const factory = this;
        return (req: IRequest) => Promise.resolve({
            comment: `processorFnFactory example response: ${id}`,
            conf: factory.conf,
            resources: factory.resources,
            req,
        } as IResponse);
    }
}
