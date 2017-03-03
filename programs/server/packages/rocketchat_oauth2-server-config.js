(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var ECMAScript = Package.ecmascript.ECMAScript;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var OAuth2Server = Package['rocketchat:oauth2-server'].OAuth2Server;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:oauth2-server-config":{"server":{"models":{"OAuthApps.coffee.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/rocketchat_oauth2-server-config/server/models/OAuthApps.coffee.js                           //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function (child, parent) {                                                                 //
  for (var key in meteorBabelHelpers.sanitizeForInObject(parent)) {                                     //
    if (hasProp.call(parent, key)) child[key] = parent[key];                                            //
  }                                                                                                     //
                                                                                                        //
  function ctor() {                                                                                     //
    this.constructor = child;                                                                           //
  }                                                                                                     //
                                                                                                        //
  ctor.prototype = parent.prototype;                                                                    //
  child.prototype = new ctor();                                                                         //
  child.__super__ = parent.prototype;                                                                   //
  return child;                                                                                         //
},                                                                                                      //
    hasProp = {}.hasOwnProperty;                                                                        //
                                                                                                        //
RocketChat.models.OAuthApps = new (function (superClass) {                                              //
  extend(_Class, superClass);                                                                           //
                                                                                                        //
  function _Class() {                                                                                   //
    _Class.__super__.constructor.call(this, 'oauth_apps');                                              //
  }                                                                                                     //
                                                                                                        //
  return _Class;                                                                                        //
}(RocketChat.models._Base))();                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"oauth":{"server":{"oauth2-server.coffee.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/rocketchat_oauth2-server-config/oauth/server/oauth2-server.coffee.js                        //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var oauth2server;                                                                                       //
oauth2server = new OAuth2Server({                                                                       //
  accessTokensCollectionName: 'rocketchat_oauth_access_tokens',                                         //
  refreshTokensCollectionName: 'rocketchat_oauth_refresh_tokens',                                       //
  authCodesCollectionName: 'rocketchat_oauth_auth_codes',                                               //
  clientsCollection: RocketChat.models.OAuthApps.model,                                                 //
  debug: true                                                                                           //
});                                                                                                     //
WebApp.connectHandlers.use(oauth2server.app);                                                           //
Meteor.publish('oauthClient', function (clientId) {                                                     //
  if (!this.userId) {                                                                                   //
    return this.ready();                                                                                //
  }                                                                                                     //
                                                                                                        //
  return RocketChat.models.OAuthApps.find({                                                             //
    clientId: clientId,                                                                                 //
    active: true                                                                                        //
  }, {                                                                                                  //
    fields: {                                                                                           //
      name: 1                                                                                           //
    }                                                                                                   //
  });                                                                                                   //
});                                                                                                     //
RocketChat.API.v1.addAuthMethod(function () {                                                           //
  var accessToken, bearerToken, getAccessToken, getToken, headerToken, matches, user;                   //
  headerToken = this.request.headers['authorization'];                                                  //
  getToken = this.request.query.access_token;                                                           //
                                                                                                        //
  if (headerToken != null) {                                                                            //
    if (matches = headerToken.match(/Bearer\s(\S+)/)) {                                                 //
      headerToken = matches[1];                                                                         //
    } else {                                                                                            //
      headerToken = void 0;                                                                             //
    }                                                                                                   //
  }                                                                                                     //
                                                                                                        //
  bearerToken = headerToken || getToken;                                                                //
                                                                                                        //
  if (bearerToken == null) {                                                                            //
    return;                                                                                             //
  }                                                                                                     //
                                                                                                        //
  getAccessToken = Meteor.wrapAsync(oauth2server.oauth.model.getAccessToken, oauth2server.oauth.model);
  accessToken = getAccessToken(bearerToken);                                                            //
                                                                                                        //
  if (accessToken == null) {                                                                            //
    return;                                                                                             //
  }                                                                                                     //
                                                                                                        //
  if (accessToken.expires != null && accessToken.expires !== 0 && accessToken.expires < new Date()) {   //
    return;                                                                                             //
  }                                                                                                     //
                                                                                                        //
  user = RocketChat.models.Users.findOne(accessToken.userId);                                           //
                                                                                                        //
  if (user == null) {                                                                                   //
    return;                                                                                             //
  }                                                                                                     //
                                                                                                        //
  return {                                                                                              //
    user: _.omit(user, '$loki')                                                                         //
  };                                                                                                    //
});                                                                                                     //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"default-services.coffee.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/rocketchat_oauth2-server-config/oauth/server/default-services.coffee.js                     //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (!RocketChat.models.OAuthApps.findOne('zapier')) {                                                   //
  RocketChat.models.OAuthApps.insert({                                                                  //
    _id: 'zapier',                                                                                      //
    name: 'Zapier',                                                                                     //
    active: true,                                                                                       //
    clientId: 'zapier',                                                                                 //
    clientSecret: 'RTK6TlndaCIolhQhZ7_KHIGOKj41RnlaOq_o-7JKwLr',                                        //
    redirectUri: 'https://zapier.com/dashboard/auth/oauth/return/App32270API/',                         //
    _createdAt: new Date(),                                                                             //
    _createdBy: {                                                                                       //
      _id: 'system',                                                                                    //
      username: 'system'                                                                                //
    }                                                                                                   //
  });                                                                                                   //
}                                                                                                       //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"admin":{"server":{"publications":{"oauthApps.coffee.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/rocketchat_oauth2-server-config/admin/server/publications/oauthApps.coffee.js               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('oauthApps', function () {                                                               //
  if (!this.userId) {                                                                                   //
    return this.ready();                                                                                //
  }                                                                                                     //
                                                                                                        //
  if (!RocketChat.authz.hasPermission(this.userId, 'manage-oauth-apps')) {                              //
    this.error(Meteor.Error("error-not-allowed", "Not allowed", {                                       //
      publish: 'oauthApps'                                                                              //
    }));                                                                                                //
  }                                                                                                     //
                                                                                                        //
  return RocketChat.models.OAuthApps.find();                                                            //
});                                                                                                     //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"methods":{"addOAuthApp.coffee.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/rocketchat_oauth2-server-config/admin/server/methods/addOAuthApp.coffee.js                  //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                        //
  addOAuthApp: function (application) {                                                                 //
    if (!RocketChat.authz.hasPermission(this.userId, 'manage-oauth-apps')) {                            //
      throw new Meteor.Error('error-not-allowed', 'Not allowed', {                                      //
        method: 'addOAuthApp'                                                                           //
      });                                                                                               //
    }                                                                                                   //
                                                                                                        //
    if (!_.isString(application.name) || application.name.trim() === '') {                              //
      throw new Meteor.Error('error-invalid-name', 'Invalid name', {                                    //
        method: 'addOAuthApp'                                                                           //
      });                                                                                               //
    }                                                                                                   //
                                                                                                        //
    if (!_.isString(application.redirectUri) || application.redirectUri.trim() === '') {                //
      throw new Meteor.Error('error-invalid-redirectUri', 'Invalid redirectUri', {                      //
        method: 'addOAuthApp'                                                                           //
      });                                                                                               //
    }                                                                                                   //
                                                                                                        //
    if (!_.isBoolean(application.active)) {                                                             //
      throw new Meteor.Error('error-invalid-arguments', 'Invalid arguments', {                          //
        method: 'addOAuthApp'                                                                           //
      });                                                                                               //
    }                                                                                                   //
                                                                                                        //
    application.clientId = Random.id();                                                                 //
    application.clientSecret = Random.secret();                                                         //
    application._createdAt = new Date();                                                                //
    application._createdBy = RocketChat.models.Users.findOne(this.userId, {                             //
      fields: {                                                                                         //
        username: 1                                                                                     //
      }                                                                                                 //
    });                                                                                                 //
    application._id = RocketChat.models.OAuthApps.insert(application);                                  //
    return application;                                                                                 //
  }                                                                                                     //
});                                                                                                     //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"updateOAuthApp.coffee.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/rocketchat_oauth2-server-config/admin/server/methods/updateOAuthApp.coffee.js               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                        //
  updateOAuthApp: function (applicationId, application) {                                               //
    var currentApplication;                                                                             //
                                                                                                        //
    if (!RocketChat.authz.hasPermission(this.userId, 'manage-oauth-apps')) {                            //
      throw new Meteor.Error('error-not-allowed', 'Not allowed', {                                      //
        method: 'updateOAuthApp'                                                                        //
      });                                                                                               //
    }                                                                                                   //
                                                                                                        //
    if (!_.isString(application.name) || application.name.trim() === '') {                              //
      throw new Meteor.Error('error-invalid-name', 'Invalid name', {                                    //
        method: 'updateOAuthApp'                                                                        //
      });                                                                                               //
    }                                                                                                   //
                                                                                                        //
    if (!_.isString(application.redirectUri) || application.redirectUri.trim() === '') {                //
      throw new Meteor.Error('error-invalid-redirectUri', 'Invalid redirectUri', {                      //
        method: 'updateOAuthApp'                                                                        //
      });                                                                                               //
    }                                                                                                   //
                                                                                                        //
    if (!_.isBoolean(application.active)) {                                                             //
      throw new Meteor.Error('error-invalid-arguments', 'Invalid arguments', {                          //
        method: 'updateOAuthApp'                                                                        //
      });                                                                                               //
    }                                                                                                   //
                                                                                                        //
    currentApplication = RocketChat.models.OAuthApps.findOne(applicationId);                            //
                                                                                                        //
    if (currentApplication == null) {                                                                   //
      throw new Meteor.Error('error-application-not-found', 'Application not found', {                  //
        method: 'updateOAuthApp'                                                                        //
      });                                                                                               //
    }                                                                                                   //
                                                                                                        //
    RocketChat.models.OAuthApps.update(applicationId, {                                                 //
      $set: {                                                                                           //
        name: application.name,                                                                         //
        active: application.active,                                                                     //
        redirectUri: application.redirectUri,                                                           //
        _updatedAt: new Date(),                                                                         //
        _updatedBy: RocketChat.models.Users.findOne(this.userId, {                                      //
          fields: {                                                                                     //
            username: 1                                                                                 //
          }                                                                                             //
        })                                                                                              //
      }                                                                                                 //
    });                                                                                                 //
    return RocketChat.models.OAuthApps.findOne(applicationId);                                          //
  }                                                                                                     //
});                                                                                                     //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"deleteOAuthApp.coffee.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/rocketchat_oauth2-server-config/admin/server/methods/deleteOAuthApp.coffee.js               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                        //
  deleteOAuthApp: function (applicationId) {                                                            //
    var application;                                                                                    //
                                                                                                        //
    if (!RocketChat.authz.hasPermission(this.userId, 'manage-oauth-apps')) {                            //
      throw new Meteor.Error('error-not-allowed', 'Not allowed', {                                      //
        method: 'deleteOAuthApp'                                                                        //
      });                                                                                               //
    }                                                                                                   //
                                                                                                        //
    application = RocketChat.models.OAuthApps.findOne(applicationId);                                   //
                                                                                                        //
    if (application == null) {                                                                          //
      throw new Meteor.Error('error-application-not-found', 'Application not found', {                  //
        method: 'deleteOAuthApp'                                                                        //
      });                                                                                               //
    }                                                                                                   //
                                                                                                        //
    RocketChat.models.OAuthApps.remove({                                                                //
      _id: applicationId                                                                                //
    });                                                                                                 //
    return true;                                                                                        //
  }                                                                                                     //
});                                                                                                     //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:oauth2-server-config/server/models/OAuthApps.coffee.js");
require("./node_modules/meteor/rocketchat:oauth2-server-config/oauth/server/oauth2-server.coffee.js");
require("./node_modules/meteor/rocketchat:oauth2-server-config/oauth/server/default-services.coffee.js");
require("./node_modules/meteor/rocketchat:oauth2-server-config/admin/server/publications/oauthApps.coffee.js");
require("./node_modules/meteor/rocketchat:oauth2-server-config/admin/server/methods/addOAuthApp.coffee.js");
require("./node_modules/meteor/rocketchat:oauth2-server-config/admin/server/methods/updateOAuthApp.coffee.js");
require("./node_modules/meteor/rocketchat:oauth2-server-config/admin/server/methods/deleteOAuthApp.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:oauth2-server-config'] = {};

})();
