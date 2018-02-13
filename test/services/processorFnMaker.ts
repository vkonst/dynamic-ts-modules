import processor from "../../examples/modules/processorFnMaker";

if (!global["_myChecks"]) global["_myChecks"] = {};
global["_myChecks"].checkProcessorFn = "module processorFnMaker loaded";

export default processor;
