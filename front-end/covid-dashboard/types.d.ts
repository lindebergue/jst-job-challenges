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
