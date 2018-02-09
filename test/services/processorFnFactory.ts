import processor from "../../examples/services/processorFnFactory";

if (!global["_myChecks"]) global["_myChecks"] = {};
global["_myChecks"].checkProcessorFn = "module processorFnFactory loaded";

export default processor;
