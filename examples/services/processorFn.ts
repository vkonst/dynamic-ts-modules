import {IRequest, IResponse, ProcessorFn} from "../../src/types";

const processor: ProcessorFn = (req: IRequest) => Promise
    .resolve({comment: "processorFn response example", req} as IResponse);

export default processor;
