import processor from "../../examples/services/processorFnMaker";

if (!global["_myChecks"]) global["_myChecks"] = {};
global["_myChecks"].checkProcessorFn = "module processorFnMaker loaded";

export default processor;
