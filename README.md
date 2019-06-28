## Installation
`npm install --save git+https://github.com/ujjwalmishra09/apilogger.git#v1.0.1`

## usage instructions

To log http failure codes in localStorage, you need to replace window.fetch as written in following code.

Import apilogger constructor
```
import ApiLogger from 'apilogger';
```
Create apiLogger instance by passing error queue limit.
```
const limit = 100;
const apiLogger = new ApiLogger(limit);
```
replace original fetch with Apilogger fetch
```
window.fetch = apiLogger.wrappedFetch;
```

After creating instance, you can check logs in table format using following code.
```
apiLogger.print();
```

You can use native fetch reference for network request as shown in follwoing code.
```
const nativeFetch = apiLogger.originalFetch;
```
