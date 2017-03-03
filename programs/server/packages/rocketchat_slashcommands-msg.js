(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var check = Package.check.check;
var Match = Package.check.Match;
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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:slashcommands-msg":{"server.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rocketchat_slashcommands-msg/server.coffee.js                                                        //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*                                                                                                               //
 * Msg is a named function that will replace /msg commands                                                       //
 */var Msg;                                                                                                      //
                                                                                                                 //
Msg = function () {                                                                                              //
  function Msg(command, params, item) {                                                                          //
    var message, msgObject, rid, separator, targetUser, targetUsername, targetUsernameOrig, trimmedParams, user;
                                                                                                                 //
    if (command !== 'msg' || !Match.test(params, String)) {                                                      //
      return;                                                                                                    //
    }                                                                                                            //
                                                                                                                 //
    trimmedParams = params.trim();                                                                               //
    separator = trimmedParams.indexOf(' ');                                                                      //
    user = Meteor.users.findOne(Meteor.userId());                                                                //
                                                                                                                 //
    if (separator === -1) {                                                                                      //
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {                                          //
        _id: Random.id(),                                                                                        //
        rid: item.rid,                                                                                           //
        ts: new Date(),                                                                                          //
        msg: TAPi18n.__('Username_and_message_must_not_be_empty', null, user.language)                           //
      });                                                                                                        //
      return;                                                                                                    //
    }                                                                                                            //
                                                                                                                 //
    message = trimmedParams.slice(separator + 1);                                                                //
    targetUsernameOrig = trimmedParams.slice(0, separator);                                                      //
    targetUsername = targetUsernameOrig.replace('@', '');                                                        //
    targetUser = RocketChat.models.Users.findOneByUsername(targetUsername);                                      //
                                                                                                                 //
    if (targetUser == null) {                                                                                    //
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {                                          //
        _id: Random.id(),                                                                                        //
        rid: item.rid,                                                                                           //
        ts: new Date(),                                                                                          //
        msg: TAPi18n.__('Username_doesnt_exist', {                                                               //
          postProcess: 'sprintf',                                                                                //
          sprintf: [targetUsernameOrig]                                                                          //
        }, user.language)                                                                                        //
      });                                                                                                        //
      return;                                                                                                    //
    }                                                                                                            //
                                                                                                                 //
    rid = Meteor.call('createDirectMessage', targetUsername);                                                    //
    msgObject = {                                                                                                //
      _id: Random.id(),                                                                                          //
      rid: rid.rid,                                                                                              //
      msg: message                                                                                               //
    };                                                                                                           //
    Meteor.call('sendMessage', msgObject);                                                                       //
  }                                                                                                              //
                                                                                                                 //
  return Msg;                                                                                                    //
}();                                                                                                             //
                                                                                                                 //
RocketChat.slashCommands.add('msg', Msg);                                                                        //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:slashcommands-msg/server.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:slashcommands-msg'] = {};

})();
