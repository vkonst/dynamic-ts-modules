import processor from "../../examples/modules/processorFnFactory";

if (!global["_myChecks"]) global["_myChecks"] = {};
global["_myChecks"].checkProcessorFn = "module processorFnFactory loaded";

export default processor;
