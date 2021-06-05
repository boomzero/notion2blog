const { ExpressOIDC } = require('@okta/oidc-middleware');

const config = require('../config');
const webServerConfig = config.webServer;

const oidc = new ExpressOIDC(Object.assign({
  issuer: webServerConfig.oidc.issuer,
  client_id: webServerConfig.oidc.clientId,
  client_secret: webServerConfig.oidc.clientSecret,
  appBaseUrl: webServerConfig.oidc.appBaseUrl,
  scope: webServerConfig.oidc.scope,
  testing: webServerConfig.oidc.testing
}))

module.exports = oidc
