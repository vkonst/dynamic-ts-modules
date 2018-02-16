# dynamic-ts-modules

A tiny lib that imports Typescript modules (services) dynamically with minimal external
dependencies(fs-extra).

At that moment "DynamicLoader" class dynamic import modules. <br />
Examples of usage can see in folder "./examples".

## How to use "DynamicLoader" class:

### General 

#### loadJson

```typescript
import {DynamicLoader} from "./src/dynamicLoader";

(async () => {
  const someJson = await DynamicLoader.loadJson('./path/to/some.json');
  // do something with loaded json
})().catch(err => {
  // error handler
})
```

#### loadModuleByPath

```typescript
import {DynamicLoader} from "./src/dynamicLoader";

(async () => {
  const someModule= await DynamicLoader.loadModuleByPath('./path/to/some/module');
  // do something with dynamic imported module
})().catch(err => {
  // error handler
})
```

### Examples of using

#### 1. Example of using DynamicLoader with "Coworkers" lib

In folder "./examples" You can see "coworkersApp.ts" source code. <br />
For testing this example You must have working AMQP server or use some services in the internet
which support this protocol. <br />

Include Your token for AMQP server in "./examples/token.ts" file and run command:
```text
npm run example:coworkers
```

After this You can publish a massage for "processorFnQueue", "processorFnMakerQueue" 
or "processorFnFactoryQueue" in AMQP manager.

Result You will see in console when was running "npm run example:coworkers" command

#### 2. Example of using DynamicLoader with "Node.js Express" framework

In folder "./examples" You can see "expressApp.ts" source code. <br />
For testing this example just run command:

```text
npm run example:express
```

After this You can visit "http://localhost:3000" URL or send GET request to this URL by any 
HTTP Request manager

Result You will see in console when was running "npm run example:express" command

#### 3. Example of using DynamicLoader with config file and example of service

##### Loading service

```typescript
import {DynamicLoader} from "./src/dynamicLoader"; // importing "DynamicLoader" class
import {ISrvConf, Processor, ProcessorTypes} from "./src/types"; // .json config file interface and processor module interface

(async () => {
  const conf = await DynamicLoader.loadJson('./examples/config/services.json');
  
  let dynamicLoader = new DynamicLoader(conf);
  // './examples/config/' - path to dir with config files, at that moment must have all slashes
  
  let service = await dynamicLoader.loadService('service_name'); // service == {config: ISrvConf; processor: Processor; processorType: ProcessorTypes}
})().catch(err => {
  // error handler
})
```

#### 4. Example of using DynamicLoader with config file and examples of function service, function maker service and function factory service

In folder "./examples" You can see file "processorTypesDemo.ts", just run command:

```text
npm run examples:procs
```

After that You can see result of work function service, function maker service and function factory service
in console where command was running.

#### Specialized loaders

##### loadConfig

Using for load config.json file which implements "IConfig" interface.<br />
Used in example #3.

```typescript
import {DynamicLoader} from "./src/dynamicLoader";

(async () => {
  const conf = await DynamicLoader.loadJson('./examples/config/services.json');
  const loader = new DynamicLoader(conf);
  const processorFnServiceJson = await loader.loadConfig('function.service');
})().catch(err => {
  // error handler
})
```

##### loadModules

Using for loading modules. <br />
Example of using can see in "expressApp.ts" in dynamic loading "handlerFactory".

##### loadProcessor

Using for loading service's processor in loadService method which used in example #3. <br />

### Testing

You can test "DynamicLoader" class using command:
```text
npm test
```