## Installation
`npm install --save apilogger`

## usage instructions

To log http failure codes in localStorage, you need to replace window.fetch as written in following code.

Import apilogger constructor
```
import ApiLogger from 'apilogger';
```
Create apiLogger instance by passing error queue limit.
```
const apiLogger = new ApiLogger(limit=50);
```
replace original fetch with Apilogger fetch
```
window.fetch = apiLogger.wrappedFetch;
```

After creating instance, you can check logs in table format using following code.
```apiLogger.print();```
