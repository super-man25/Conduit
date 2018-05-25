# Event Dynamic Responsive Web Application

## Setup

* Install `Watchman` [Link to Watchman](https://facebook.github.io/watchman/)
  * `brew update`
  * `brew install watchman`
* Install `yarn` [Link to Yarn](https://yarnpkg.com/en/)
* Install deps `yarn install`
* Run `yarn start`
* Test `yarn test`

## Flow

### VSCode Setup

* Install [Flow Plugin from VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)

## Prettier

### VScode Setup

* Install [Prettier Plugin from VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Snippets

```json
{
  "settings": {
    "javascript.validate.enable": false,
    "prettier.eslintIntegration": true,
    "flow.useNPMPackagedFlow": true
  }
}
```

Note: _Sample workspace settings in vscode for project_

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "src/*": ["./src/*"]
    }
  }
}
```

Note: _Sample jsconfig for absolute path imports in vscode_
