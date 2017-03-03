(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Accounts = Package['accounts-base'].Accounts;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var Push = Package['raix:push'].Push;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:ui":{"lib":{"getAvatarUrlFromUsername.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/rocketchat_ui/lib/getAvatarUrlFromUsername.coffee.js                                   //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.getAvatarUrlFromUsername = function (username) {                                              //
  var cdnPrefix, key, path, pathPrefix, random;                                                    //
  key = "avatar_random_" + username;                                                               //
  random = (typeof Session !== "undefined" && Session !== null ? Session.keys[key] : void 0) || 0;
                                                                                                   //
  if (username == null) {                                                                          //
    return;                                                                                        //
  }                                                                                                //
                                                                                                   //
  cdnPrefix = (RocketChat.settings.get('CDN_PREFIX') || '').trim().replace(/\/$/, '');             //
  pathPrefix = (__meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '').trim().replace(/\/$/, '');   //
                                                                                                   //
  if (cdnPrefix) {                                                                                 //
    path = cdnPrefix + pathPrefix;                                                                 //
  } else if (Meteor.isCordova) {                                                                   //
    path = Meteor.absoluteUrl().replace(/\/$/, '');                                                //
  } else {                                                                                         //
    path = pathPrefix;                                                                             //
  }                                                                                                //
                                                                                                   //
  return path + "/avatar/" + encodeURIComponent(username) + "?_dc=" + random;                      //
};                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:ui/lib/getAvatarUrlFromUsername.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:ui'] = {};

})();
