class HashRouter {

}

class HistoryRouter {
  constructor(router) {
    this.router = router
  }
}

class Router {
  constructor(options) {
    this.mode = options.mode //hash、 history、 abstract
    this.history = new HashRouter(this)
  }

  push() {

  }

  replace() {

  }

  go() {

  }
}