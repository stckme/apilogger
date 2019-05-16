class ApiLogger {

  constructor(limit) {
    if (window.apiLogger) {
      return window.apiLogger;
    }
    const errorQueue = this.getErrorQueueFromStorage();
    errorQueue.limit = errorQueue.limit || limit || 50;
    this.count = errorQueue.errors.length || 0;
    this.errorQueue = errorQueue;
    window.apiLogger = this;
    this.wrappedFetch = this.wrappedFetch.bind(this);
    this.originalFetch = window.fetch;
    if (errorQueue.limit !== limit) this.changeLimit(limit);
  }

  push(value) {
    if (this.count === this.errorQueue.limit) this.pop();
    this.errorQueue.errors.push(value);
    this.count++;
    this.updateErrorQueueInStorage();
  }

  getErrorQueueFromStorage() {
    return JSON.parse(localStorage.getItem('errorQueue')) || {limit: 0, errors: []};
  }

  updateErrorQueueInStorage() {
    try {
      localStorage.setItem('errorQueue', JSON.stringify(this.errorQueue));
    } catch (e){
      console.error(e);
      console.log('Error while updating localstorage.');
    }
  }

  pop() {
    if (this.count === 0) return
    this.errorQueue.errors.shift()
    this.count--;
  }

  getBody(body) {
    let newBody = null;
    try {
      newBody = JSON.parse(body);
    } catch (err) {
      newBody = body;
    }
    return newBody;
  }

  wrappedFetch () {
    const store = this;
    return new Promise((resolve, reject) => {
      let [url, options] = arguments;
      let { body, method } = options || {};

      this.originalFetch.apply(window, arguments)
        .then((response) => {
          const clonedResponse = response && response.clone();
          if (clonedResponse && clonedResponse.status >= 400) {
            body = body && this.getBody(body);
            const contentType = clonedResponse.headers.get("content-type");
            const logData = {
              id: new Date().getTime(),
              url,
              method,
              body,
              status: clonedResponse.status,
              contentType: clonedResponse.headers.get("content-type")
            }
            if (contentType && contentType.includes("application/json")) {
              return clonedResponse.clone().json().then((json) => {
                logData.response = json
                store.push(logData);
                resolve(response);
              });
            } else {
              return clonedResponse.clone().text().then((text) => {
                logData.response = text;
                store.push(logData);
                resolve(response);
              });
            }
          } else {
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        })
    });
  }

  truncateString(str, length) {
    var dots = str.length > length ? '...' : '';
    return str.substring(0, length) + dots;
  }

  print() {
    console.table(this.getErrorQueueFromStorage().errors);
  }

  changeLimit(limit) {
    if (this.errorQueue.errors.length > limit) {
      this.errorQueue.errors = this.errorQueue.errors.slice(this.errorQueue.errors.length - limit)
    }
    this.errorQueue.limit = limit;
    this.updateErrorQueueInStorage();
  }
}

export default ApiLogger;
