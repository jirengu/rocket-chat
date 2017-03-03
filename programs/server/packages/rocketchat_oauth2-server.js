(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var __coffeescriptShare, OAuth2Server;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_oauth2-server/model.coffee.js                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AccessTokens, AuthCodes, Clients, Model, RefreshTokens, debug;                                                    //
AccessTokens = void 0;                                                                                                //
RefreshTokens = void 0;                                                                                               //
Clients = void 0;                                                                                                     //
AuthCodes = void 0;                                                                                                   //
debug = void 0;                                                                                                       //
                                                                                                                      //
this.Model = Model = function () {                                                                                    //
  function Model(config) {                                                                                            //
    if (config == null) {                                                                                             //
      config = {};                                                                                                    //
    }                                                                                                                 //
                                                                                                                      //
    if (config.accessTokensCollectionName == null) {                                                                  //
      config.accessTokensCollectionName = 'oauth_access_tokens';                                                      //
    }                                                                                                                 //
                                                                                                                      //
    if (config.refreshTokensCollectionName == null) {                                                                 //
      config.refreshTokensCollectionName = 'oauth_refresh_tokens';                                                    //
    }                                                                                                                 //
                                                                                                                      //
    if (config.clientsCollectionName == null) {                                                                       //
      config.clientsCollectionName = 'oauth_clients';                                                                 //
    }                                                                                                                 //
                                                                                                                      //
    if (config.authCodesCollectionName == null) {                                                                     //
      config.authCodesCollectionName = 'oauth_auth_codes';                                                            //
    }                                                                                                                 //
                                                                                                                      //
    this.debug = debug = config.debug;                                                                                //
    this.AccessTokens = AccessTokens = config.accessTokensCollection || new Meteor.Collection(config.accessTokensCollectionName);
    this.RefreshTokens = RefreshTokens = config.refreshTokensCollection || new Meteor.Collection(config.refreshTokensCollectionName);
    this.Clients = Clients = config.clientsCollection || new Meteor.Collection(config.clientsCollectionName);         //
    this.AuthCodes = AuthCodes = config.authCodesCollection || new Meteor.Collection(config.authCodesCollectionName);
  }                                                                                                                   //
                                                                                                                      //
  Model.prototype.getAccessToken = Meteor.bindEnvironment(function (bearerToken, callback) {                          //
    var e, token;                                                                                                     //
                                                                                                                      //
    if (debug === true) {                                                                                             //
      console.log('[OAuth2Server]', 'in getAccessToken (bearerToken:', bearerToken, ')');                             //
    }                                                                                                                 //
                                                                                                                      //
    try {                                                                                                             //
      token = AccessTokens.findOne({                                                                                  //
        accessToken: bearerToken                                                                                      //
      });                                                                                                             //
      return callback(null, token);                                                                                   //
    } catch (error) {                                                                                                 //
      e = error;                                                                                                      //
      return callback(e);                                                                                             //
    }                                                                                                                 //
  });                                                                                                                 //
  Model.prototype.getClient = Meteor.bindEnvironment(function (clientId, clientSecret, callback) {                    //
    var client, e;                                                                                                    //
                                                                                                                      //
    if (debug === true) {                                                                                             //
      console.log('[OAuth2Server]', 'in getClient (clientId:', clientId, ', clientSecret:', clientSecret, ')');       //
    }                                                                                                                 //
                                                                                                                      //
    try {                                                                                                             //
      if (clientSecret == null) {                                                                                     //
        client = Clients.findOne({                                                                                    //
          active: true,                                                                                               //
          clientId: clientId                                                                                          //
        });                                                                                                           //
      } else {                                                                                                        //
        client = Clients.findOne({                                                                                    //
          active: true,                                                                                               //
          clientId: clientId,                                                                                         //
          clientSecret: clientSecret                                                                                  //
        });                                                                                                           //
      }                                                                                                               //
                                                                                                                      //
      return callback(null, client);                                                                                  //
    } catch (error) {                                                                                                 //
      e = error;                                                                                                      //
      return callback(e);                                                                                             //
    }                                                                                                                 //
  });                                                                                                                 //
                                                                                                                      //
  Model.prototype.grantTypeAllowed = function (clientId, grantType, callback) {                                       //
    if (debug === true) {                                                                                             //
      console.log('[OAuth2Server]', 'in grantTypeAllowed (clientId:', clientId, ', grantType:', grantType + ')');     //
    }                                                                                                                 //
                                                                                                                      //
    return callback(false, grantType === 'authorization_code' || grantType === 'refresh_token');                      //
  };                                                                                                                  //
                                                                                                                      //
  Model.prototype.saveAccessToken = Meteor.bindEnvironment(function (token, clientId, expires, user, callback) {      //
    var e, tokenId;                                                                                                   //
                                                                                                                      //
    if (debug === true) {                                                                                             //
      console.log('[OAuth2Server]', 'in saveAccessToken (token:', token, ', clientId:', clientId, ', user:', user, ', expires:', expires, ')');
    }                                                                                                                 //
                                                                                                                      //
    try {                                                                                                             //
      tokenId = AccessTokens.insert({                                                                                 //
        accessToken: token,                                                                                           //
        clientId: clientId,                                                                                           //
        userId: user.id,                                                                                              //
        expires: expires                                                                                              //
      });                                                                                                             //
      return callback(null, tokenId);                                                                                 //
    } catch (error) {                                                                                                 //
      e = error;                                                                                                      //
      return callback(e);                                                                                             //
    }                                                                                                                 //
  });                                                                                                                 //
  Model.prototype.getAuthCode = Meteor.bindEnvironment(function (authCode, callback) {                                //
    var code, e;                                                                                                      //
                                                                                                                      //
    if (debug === true) {                                                                                             //
      console.log('[OAuth2Server]', 'in getAuthCode (authCode: ' + authCode + ')');                                   //
    }                                                                                                                 //
                                                                                                                      //
    try {                                                                                                             //
      code = AuthCodes.findOne({                                                                                      //
        authCode: authCode                                                                                            //
      });                                                                                                             //
      return callback(null, code);                                                                                    //
    } catch (error) {                                                                                                 //
      e = error;                                                                                                      //
      return callback(e);                                                                                             //
    }                                                                                                                 //
  });                                                                                                                 //
  Model.prototype.saveAuthCode = Meteor.bindEnvironment(function (code, clientId, expires, user, callback) {          //
    var codeId, e;                                                                                                    //
                                                                                                                      //
    if (debug === true) {                                                                                             //
      console.log('[OAuth2Server]', 'in saveAuthCode (code:', code, ', clientId:', clientId, ', expires:', expires, ', user:', user, ')');
    }                                                                                                                 //
                                                                                                                      //
    try {                                                                                                             //
      codeId = AuthCodes.upsert({                                                                                     //
        authCode: code                                                                                                //
      }, {                                                                                                            //
        authCode: code,                                                                                               //
        clientId: clientId,                                                                                           //
        userId: user.id,                                                                                              //
        expires: expires                                                                                              //
      });                                                                                                             //
      return callback(null, codeId);                                                                                  //
    } catch (error) {                                                                                                 //
      e = error;                                                                                                      //
      return callback(e);                                                                                             //
    }                                                                                                                 //
  });                                                                                                                 //
  Model.prototype.saveRefreshToken = Meteor.bindEnvironment(function (token, clientId, expires, user, callback) {     //
    var e, tokenId;                                                                                                   //
                                                                                                                      //
    if (debug === true) {                                                                                             //
      console.log('[OAuth2Server]', 'in saveRefreshToken (token:', token, ', clientId:', clientId, ', user:', user, ', expires:', expires, ')');
    }                                                                                                                 //
                                                                                                                      //
    try {                                                                                                             //
      return tokenId = RefreshTokens.insert({                                                                         //
        refreshToken: token,                                                                                          //
        clientId: clientId,                                                                                           //
        userId: user.id,                                                                                              //
        expires: expires                                                                                              //
      }, callback(null, tokenId));                                                                                    //
    } catch (error) {                                                                                                 //
      e = error;                                                                                                      //
      return callback(e);                                                                                             //
    }                                                                                                                 //
  });                                                                                                                 //
  Model.prototype.getRefreshToken = Meteor.bindEnvironment(function (refreshToken, callback) {                        //
    var e, token;                                                                                                     //
                                                                                                                      //
    if (debug === true) {                                                                                             //
      console.log('[OAuth2Server]', 'in getRefreshToken (refreshToken: ' + refreshToken + ')');                       //
    }                                                                                                                 //
                                                                                                                      //
    try {                                                                                                             //
      token = RefreshTokens.findOne({                                                                                 //
        refreshToken: refreshToken                                                                                    //
      });                                                                                                             //
      return callback(null, token);                                                                                   //
    } catch (error) {                                                                                                 //
      e = error;                                                                                                      //
      return callback(e);                                                                                             //
    }                                                                                                                 //
  });                                                                                                                 //
  return Model;                                                                                                       //
}();                                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_oauth2-server/oauth.coffee.js                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var express, oauthserver;                                                                                             //
oauthserver = Npm.require('oauth2-server');                                                                           //
express = Npm.require('express');                                                                                     //
                                                                                                                      //
OAuth2Server = function () {                                                                                          //
  function OAuth2Server(config) {                                                                                     //
    this.config = config != null ? config : {};                                                                       //
    this.app = express();                                                                                             //
    this.routes = express();                                                                                          //
    this.model = new Model(this.config);                                                                              //
    this.oauth = oauthserver({                                                                                        //
      model: this.model,                                                                                              //
      grants: ['authorization_code', 'refresh_token'],                                                                //
      debug: this.config.debug                                                                                        //
    });                                                                                                               //
    this.publishAuhorizedClients();                                                                                   //
    this.initRoutes();                                                                                                //
    return this;                                                                                                      //
  }                                                                                                                   //
                                                                                                                      //
  OAuth2Server.prototype.publishAuhorizedClients = function () {                                                      //
    return Meteor.publish('authorizedOAuth', function () {                                                            //
      if (this.userId == null) {                                                                                      //
        return this.ready();                                                                                          //
      }                                                                                                               //
                                                                                                                      //
      return Meteor.users.find({                                                                                      //
        _id: this.userId                                                                                              //
      }, {                                                                                                            //
        fields: {                                                                                                     //
          'oauth.authorizedClients': 1                                                                                //
        }                                                                                                             //
      });                                                                                                             //
      return typeof user !== "undefined" && user !== null;                                                            //
    });                                                                                                               //
  };                                                                                                                  //
                                                                                                                      //
  OAuth2Server.prototype.initRoutes = function () {                                                                   //
    var debugMiddleware, self, transformRequestsNotUsingFormUrlencodedType;                                           //
    self = this;                                                                                                      //
                                                                                                                      //
    debugMiddleware = function (req, res, next) {                                                                     //
      if (self.config.debug === true) {                                                                               //
        console.log('[OAuth2Server]', req.method, req.url);                                                           //
      }                                                                                                               //
                                                                                                                      //
      return next();                                                                                                  //
    };                                                                                                                //
                                                                                                                      //
    transformRequestsNotUsingFormUrlencodedType = function (req, res, next) {                                         //
      if (!req.is('application/x-www-form-urlencoded') && req.method === 'POST') {                                    //
        if (self.config.debug === true) {                                                                             //
          console.log('[OAuth2Server]', 'Transforming a request to form-urlencoded with the query going to the body.');
        }                                                                                                             //
                                                                                                                      //
        req.headers['content-type'] = 'application/x-www-form-urlencoded';                                            //
        req.body = Object.assign({}, req.body, req.query);                                                            //
      }                                                                                                               //
                                                                                                                      //
      return next();                                                                                                  //
    };                                                                                                                //
                                                                                                                      //
    this.app.all('/oauth/token', debugMiddleware, transformRequestsNotUsingFormUrlencodedType, this.oauth.grant());   //
    this.app.get('/oauth/authorize', debugMiddleware, Meteor.bindEnvironment(function (req, res, next) {              //
      var client;                                                                                                     //
      client = self.model.Clients.findOne({                                                                           //
        active: true,                                                                                                 //
        clientId: req.query.client_id                                                                                 //
      });                                                                                                             //
                                                                                                                      //
      if (client == null) {                                                                                           //
        return res.redirect('/oauth/error/404');                                                                      //
      }                                                                                                               //
                                                                                                                      //
      if (client.redirectUri !== req.query.redirect_uri) {                                                            //
        return res.redirect('/oauth/error/invalid_redirect_uri');                                                     //
      }                                                                                                               //
                                                                                                                      //
      return next();                                                                                                  //
    }));                                                                                                              //
    this.app.post('/oauth/authorize', debugMiddleware, Meteor.bindEnvironment(function (req, res, next) {             //
      var user;                                                                                                       //
                                                                                                                      //
      if (req.body.token == null) {                                                                                   //
        return res.sendStatus(401).send('No token');                                                                  //
      }                                                                                                               //
                                                                                                                      //
      user = Meteor.users.findOne({                                                                                   //
        'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(req.body.token)                           //
      });                                                                                                             //
                                                                                                                      //
      if (user == null) {                                                                                             //
        return res.sendStatus(401).send('Invalid token');                                                             //
      }                                                                                                               //
                                                                                                                      //
      req.user = {                                                                                                    //
        id: user._id                                                                                                  //
      };                                                                                                              //
      return next();                                                                                                  //
    }));                                                                                                              //
    this.app.post('/oauth/authorize', debugMiddleware, this.oauth.authCodeGrant(function (req, next) {                //
      if (req.body.allow === 'yes') {                                                                                 //
        Meteor.users.update(req.user.id, {                                                                            //
          $addToSet: {                                                                                                //
            'oauth.authorizedClients': this.clientId                                                                  //
          }                                                                                                           //
        });                                                                                                           //
      }                                                                                                               //
                                                                                                                      //
      return next(null, req.body.allow === 'yes', req.user);                                                          //
    }));                                                                                                              //
    this.app.use(this.routes);                                                                                        //
    return this.app.all('/oauth/*', this.oauth.errorHandler());                                                       //
  };                                                                                                                  //
                                                                                                                      //
  return OAuth2Server;                                                                                                //
}();                                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['rocketchat:oauth2-server'] = {}, {
  OAuth2Server: OAuth2Server
});

})();
