class ApiLogger {
  constructor(limit) {
    const errorQueue = this.getErrorQueueFromStorage();
    if (limit && errorQueue && errorQueue.limit) {
      console.log(
        `ApiLogger has already a limit. please use changeLimit function from Logger Instance.`
      )
    }
    errorQueue.limit = errorQueue.limit || limit || 50;
    this.limit = errorQueue.limit || limit || 50;
    this.count = errorQueue.errors.length || 0;
    this.errorQueue = errorQueue;
    window.apiLogger = this;
    this.wrappedFetch = this.wrappedFetch.bind(this);
    this.originalFetch = window.fetch;
  }

  push(value) {
    if (this.count === this.limit) this.pop();
    this.errorQueue.errors.push(value);
    this.count++;
    this.updateErrorQueueInStorage();
  }

  getErrorQueueFromStorage() {
    return JSON.parse(localStorage.getItem('errorQueue')) || {limit: 0, errors: []};
  }

  updateErrorQueueInStorage() {
    localStorage.setItem('errorQueue', JSON.stringify(this.errorQueue));
  }

  pop() {
    if (this.count === 0) return
    this.errorQueue.errors.shift()
    this.count--;
  }

  wrappedFetch () {
    const store = this;
    return new Promise((resolve, reject) => {
      const [url, { method, body }] = arguments;
      this.originalFetch.apply(window, arguments)
        .then((response) => {
          if (response && response.status >= 400) {
            let reqData = null;
            if (typeof body === 'object') {
               reqData = body && this.truncateString(JSON.stringify(body), 50);
            } else if (typeof body === 'string') {
               reqData = this.truncateString(body, 50);
            }
            response.text().then((text) => {
              store.push({
                id: new Date().getTime(),
                url,
                method,
                body: reqData,
                response: this.truncateString(text, 50),
                status: response.status,
                contentType: response.headers.get("content-type")
              });
              resolve(response);
            });
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
    this.errorQueue.limit = limit;
    this.limit = limit;
    this.updateErrorQueueInStorage();
  }
}

export default ApiLogger;
