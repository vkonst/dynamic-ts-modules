import processor from "../../examples/services/processorFn";
import dummyModuleName from "./dummyModule";

if (!global["_myChecks"]) global["_myChecks"] = {};
global["_myChecks"].checkProcessorFn = "module processorFn loaded";

export default processor;
export {dummyModuleName};
