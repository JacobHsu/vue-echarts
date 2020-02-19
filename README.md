# vue-echarts

`$ vue create vue-echarts`

## deploy

`yarn add gh-pages -D`

package.json

```js
"homepage": "https://jacobhsu.github.io/vue-echarts/",
  "scripts": {
    "deploy": "yarn build && gh-pages -d dist"
  },
```

vue.config.js

```js
module.exports = {
     publicPath: process.env.NODE_ENV === 'production' ? './vue-echarts' : '/',
}
```

## References

[Vue CLI](https://cli.vuejs.org/) Standard Tooling for Vue.js Development  
[vue-charts](https://ecomfe.github.io/vue-echarts/demo/) ECharts component for Vue.js.
ecomfe/[vue-echarts](https://github.com/ecomfe/vue-echarts)
`yarn add lodash resize-detector` `yarn add echarts -D`

[editor.html?c=map-polygon](https://www.echartsjs.com/examples/zh/editor.html?c=map-polygon)  

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
