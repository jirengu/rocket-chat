(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:mapview":{"server":{"settings.coffee.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rocketchat_mapview/server/settings.coffee.js             //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function () {                                         //
  RocketChat.settings.add('MapView_Enabled', false, {                //
    type: 'boolean',                                                 //
    group: 'Message',                                                //
    section: 'Google Maps',                                          //
    "public": true,                                                  //
    i18nLabel: 'MapView_Enabled',                                    //
    i18nDescription: 'MapView_Enabled_Description'                   //
  });                                                                //
  return RocketChat.settings.add('MapView_GMapsAPIKey', '', {        //
    type: 'string',                                                  //
    group: 'Message',                                                //
    section: 'Google Maps',                                          //
    "public": true,                                                  //
    i18nLabel: 'MapView_GMapsAPIKey',                                //
    i18nDescription: 'MapView_GMapsAPIKey_Description'               //
  });                                                                //
});                                                                  //
///////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:mapview/server/settings.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:mapview'] = {};

})();
