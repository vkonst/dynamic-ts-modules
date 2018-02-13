import processor from "../../examples/modules/processorFn";
import dummyModuleName from "./dummyModule";

if (!global["_myChecks"]) global["_myChecks"] = {};
global["_myChecks"].checkProcessorFn = "module processorFn loaded";

export default processor;
export {dummyModuleName};
