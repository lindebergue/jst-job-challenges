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

// typings for SCSS CSS modules
declare module '*.scss' {
  var content: { [className: string]: string }
  export default content
}

// typings for SVG files
declare module '*.svg' {
  var url: string
  export default url
}
