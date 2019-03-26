## Installation
`npm install --save apilogger`

## usage instructions

To log http failures codes in localstorage you need to do replace the fetch function with wrappedFetch function as written bellow.
```
import ApiLogger from 'apilogger';
const apiLogger = new ApiLogger(limit=50); # pass limit in ApiLogger
window.fetch = apiLogger.wrappedFetch.bind(apiLogger); # replace original fetch
window.apiLogger = apiLogger; # make apilogger available globlay
```

To check print the log use following code
```
apiLogger.print();
```
