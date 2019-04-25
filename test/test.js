import assert from 'assert';
import ApiLogger from '../dist/main.js';

var apiLogger = new ApiLogger(4);

window.fetch = apiLogger.wrappedFetch;

describe('Http Failures', function() {
  describe('#400', function() {
    beforeEach(function() {
      global.localStorage.clear();
    });
    it('should store 400 response', function(done) {
      apiLogger.wrappedFetch('http://httpbin.org/status/400').then(() => {
        let errorQueue = JSON.parse(global.localStorage.getItem('errorQueue'));
        if (errorQueue && errorQueue.errors[0].status === 400) done();
        else done({ message: 'Did not log in localstoarge'});
      }).catch((err) => console.log(err))
    });
    it('should store any response data in text format with turncated value', function(done) {
      apiLogger.wrappedFetch('http://httpbin.org/html/status/401', { method: 'get' }).then(() => {
        const errorQueue = JSON.parse(global.localStorage.getItem('errorQueue'));
        const error = errorQueue.errors[1];
        if (
          errorQueue &&
          error.status === 404 &&
          error.response.indexOf(`<!DOCTYPE HTML PUBLIC`) === 0
        ) done();
        else done({ message: 'Did not log in localstoarge'});
      });
    })
  });
});
