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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:slashcommands-me":{"me.coffee.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rocketchat_slashcommands-me/me.coffee.js                 //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*                                                                   //
 * Me is a named function that will replace /me commands             //
 * @param {Object} message - The message object                      //
 */var Me;                                                           //
                                                                     //
Me = function () {                                                   //
  function Me(command, params, item) {                               //
    var msg;                                                         //
                                                                     //
    if (command === "me") {                                          //
      if (_.trim(params)) {                                          //
        msg = item;                                                  //
        msg.msg = '_' + params + '_';                                //
        Meteor.call('sendMessage', msg);                             //
      }                                                              //
    }                                                                //
  }                                                                  //
                                                                     //
  return Me;                                                         //
}();                                                                 //
                                                                     //
RocketChat.slashCommands.add('me', Me, {                             //
  description: 'Displays_action_text',                               //
  params: 'your_message'                                             //
});                                                                  //
///////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:slashcommands-me/me.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:slashcommands-me'] = {};

})();
