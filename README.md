# dynamic-ts-modules

A tiny lib that imports Typescript modules (services) dynamically.

// FIXME: update content bellow

At that moment "ImportProcessor" class just make
dynamic import for services in "./src/services" folder
by .json config file in "./config" folder.

#### How to use "ImportProcessor" class:

```typescript
import {ImportProcessor} from "../src/importProcessor"; // importing "ImportProcessor" class
import {ISrvConf, Processor} from "../src/interfaces/interfaces"; // .json config file interface and processor module interface

let importProcessor = new ImportProcessor('./config/', modules);
// './config/' - path to dir with config files, at that moment must have all slashes
// '../src/services/' - path to dir with services, at that moment must have all slashes

importProcessor.importProcessorModule('crypt_currency', 'service_name')
            .then((result) => {
                // result == {processor: Processor, confJson: ISrvConf}
                // make something with result ...
            }, (err) => {
                // error handler
            })
```

## Testing

You can test "ImportProcess" class using command:
```text
npm test
```