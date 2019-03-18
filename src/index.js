function truncateString(str, length) {
  var dots = str.length > length ? '...' : '';
  return str.substring(0, length) + dots;
}

class ApiLogStore {
  constructor(limit) {
    const errorQueue = this.getErrorQueueFromStorage();
    this.limit = limit || 50;
    this.count = errorQueue.length;
    this.errorQueue = errorQueue;
    window.apiLogStore = this;
  }

  push(value) {
    if (this.count === this.limit) this.pop();
    this.errorQueue.push(value);
    this.count++;
    this.updateErrorQueueInStorage();
  }

  getErrorQueueFromStorage() {
    return JSON.parse(localStorage.getItem('errorQueue')) || [];
  }

  updateErrorQueueInStorage() {
    localStorage.setItem('errorQueue', JSON.stringify(this.errorQueue));
  }

  pop() {
    if (this.count === 0) return
    this.errorQueue.shift()
    this.count--;
  }
}

const apiLogStore = new ApiLogStore(50);

const wrappedFetch = function() {
  return new Promise((resolve, reject) => {
    const [url, { method, body }] = arguments;

    fetch.apply(this, arguments)
      .then((response) => {
        if (response && response.status >= 400) {
          response.json().then((json) => {
            apiLogStore.push({
              id: new Date().getTime(),
              url,
              method,
              body: body && truncateString(JSON.stringify(body), 50),
              response: truncateString(JSON.stringify(json), 50),
              status: response.status
            });
          });
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
  });
}

window.fetch = wrappedFetch;
