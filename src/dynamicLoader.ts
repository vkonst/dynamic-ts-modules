import {IService, ISrvConf, Processor, ILoaderConf, IModule, IConfig} from "./types";
// please note: "fs-extra" imported dynamically by DynamicLoader.loadJson

export default class DynamicLoader {

    public static async loadJson(filePath: string, readOpts?: any): Promise<any> {
        if (!DynamicLoader.fsExtra) {
            DynamicLoader.fsExtra = await DynamicLoader.loadModuleByPath("fs-extra");
        }
        return await (DynamicLoader.fsExtra as any).readJSON(filePath, readOpts);
    }

    public static async loadModuleByPath(filePath?: string): Promise<IModule> {
        return await import(filePath)
            .then(module => module.default ? module.default : module);
    }

    protected static fsExtra: IModule;

    constructor (protected conf: ILoaderConf) {
    }

    public async loadService (serviceName: string): Promise<IService> {
        const loader = this;
        const config = await loader.loadConfig(serviceName);
        const moduleName: string = (config as ISrvConf).processorModule;
        const {processor, processorType} = await loader.loadProcessor(moduleName);

        return {config, processor, processorType} as IService;
    }

    public async loadConfig(serviceName: string): Promise<IConfig> {
        const loader = this;
        const configFile: string = loader.conf.configs[serviceName] || "";
        const path: string = `${this.conf.configPath || ""}${configFile}`;
        return await DynamicLoader.loadJson(path);
    }

    public async loadProcessor(
        moduleName: string, explicitProcessorType?: ProcessorTypes
    ): Promise<{processor: Processor, processorType: ProcessorTypes}> {

        const processor = await this.loadModule(moduleName) as Processor;

        let processorType = explicitProcessorType;
        if (!processorType) {
            processorType = processor.hasOwnProperty("processorType")
                ? (processor as any).processorType as ProcessorTypes
                : ProcessorTypes.fn;
        }

        return { processor, processorType };
    }

    public async loadModule(moduleName: string): Promise<IModule> {
        const moduleFile: string = this.conf.modules[moduleName] || "";
        const path: string = `${this.conf.modulePath || ""}${moduleFile}`;
        return DynamicLoader.loadModuleByPath(path);
    }

}

enum ProcessorTypes {
    fn = "fn",
    maker = "maker",
    factory = "factory",
}
export { ProcessorTypes };
