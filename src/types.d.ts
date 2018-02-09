interface IService {
    config: ISrvConf;
    processor: Processor;
    processorType: ProcessorTypes,
}

declare enum ProcessorTypes {
    fn = "fn",
    maker = "maker",
    factory = "factory",
}

type Processor = ProcessorFn | IProcessorFnMaker | IProcessorFnFactory;

type ProcessorFn = (req: IRequest) => Promise<IResponse>;

interface IProcessorFnMaker {
    processorType: ProcessorTypes;
    (conf: ISrvOpts, resources?: IResources): ProcessorFn;
}

interface IProcessorFnFactoryInstance {
    processorType: ProcessorTypes;
    processor: ProcessorFn;
}

interface IProcessorFnFactory {
    new (conf: ISrvOpts, resources?: IResources): IProcessorFnFactoryInstance;
}

interface ILoaderConf {
    configPath: string;
    configs: FileMap;
    modulePath: string;
    modules: FileMap;
}

interface ISrvConf {
    name: string;
    processorModule: string;
    processorType?: ProcessorTypes;
    options?: ISrvOpts;
}

interface IConfig {}

interface IModule {}

interface ISrvOpts {}

interface IRequest {}

interface IResources {}

interface IResponse {}

type FileMap = { [key: string]: string};

export {
    FileMap,
    IConfig,
    ILoaderConf,
    IModule,
    IResources,
    IRequest,
    IResponse,
    IService,
    ISrvConf,
    ISrvOpts,
    Processor,
    ProcessorFn,
    IProcessorFnFactory,
    IProcessorFnFactoryInstance,
    IProcessorFnMaker,
    ProcessorTypes,
}
