var fetch = require('node-fetch');
var LocalStorage = require('node-localstorage').LocalStorage;
global.window = {};

window.fetch = fetch;
global.localStorage = new LocalStorage('./scratch');
