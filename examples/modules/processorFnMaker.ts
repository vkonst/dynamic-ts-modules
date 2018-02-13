import {IRequest, IResponse, ISrvOpts, IProcessorFnMaker, ProcessorFn} from "../../src/types";
import {ProcessorTypes} from "../../src/dynamicLoader";

if (!global["_myChecks"]) global["_myChecks"] = {};
global["_myChecks"].checkProcessorMaker = "module processorMaker loaded";

const processorMaker: IProcessorFnMaker = (() => {

    const maker = (conf: ISrvOpts) => getProcessor(conf);
    (maker as IProcessorFnMaker).processorType = ProcessorTypes.maker;

    return maker as IProcessorFnMaker;

    function getProcessor(conf: ISrvOpts): ProcessorFn {
        const processorFn: ProcessorFn = (req: IRequest) => Promise
            .resolve({
                role: "example:processorFnMaker",
                conf,
                req
            } as IResponse);
        return processorFn;
    }
})();

export default processorMaker;
