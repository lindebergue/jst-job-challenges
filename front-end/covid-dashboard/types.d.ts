// typings for the webpack hot-module replacement API
// https://webpack.js.org/api/hot-module-replacement/
declare namespace NodeJS {
  interface WebpackHMRApi {
    accept(
      dependencies: string | string[],
      callback: () => void
    ): void
  }

  interface Module {
    hot?: WebpackHMRApi
  }
}

// typings for `import`able WebWorkers
// https://github.com/webpack-contrib/worker-loader
declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor()
  }

  export default WebpackWorker
}

// typings for SCSS CSS modules
declare module '*.scss' {
  var content: { [className: string]: string }
  export default content
}
