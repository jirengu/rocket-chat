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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:slashcommands-mute":{"server":{"mute.coffee.js":function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/rocketchat_slashcommands-mute/server/mute.coffee.js         //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*                                                                      //
 * Mute is a named function that will replace /mute commands            //
 */var Mute,                                                            //
    indexOf = [].indexOf || function (item) {                           //
  for (var i = 0, l = this.length; i < l; i++) {                        //
    if (i in this && this[i] === item) return i;                        //
  }                                                                     //
                                                                        //
  return -1;                                                            //
};                                                                      //
                                                                        //
Mute = function () {                                                    //
  function Mute(command, params, item) {                                //
    var mutedUser, room, user, username;                                //
                                                                        //
    if (command !== 'mute' || !Match.test(params, String)) {            //
      return;                                                           //
    }                                                                   //
                                                                        //
    username = params.trim();                                           //
                                                                        //
    if (username === '') {                                              //
      return;                                                           //
    }                                                                   //
                                                                        //
    username = username.replace('@', '');                               //
    user = Meteor.users.findOne(Meteor.userId());                       //
    mutedUser = RocketChat.models.Users.findOneByUsername(username);    //
    room = RocketChat.models.Rooms.findOneById(item.rid);               //
                                                                        //
    if (mutedUser == null) {                                            //
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {
        _id: Random.id(),                                               //
        rid: item.rid,                                                  //
        ts: new Date(),                                                 //
        msg: TAPi18n.__('Username_doesnt_exist', {                      //
          postProcess: 'sprintf',                                       //
          sprintf: [username]                                           //
        }, user.language)                                               //
      });                                                               //
      return;                                                           //
    }                                                                   //
                                                                        //
    if (indexOf.call(room.usernames || [], username) < 0) {             //
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {
        _id: Random.id(),                                               //
        rid: item.rid,                                                  //
        ts: new Date(),                                                 //
        msg: TAPi18n.__('Username_is_not_in_this_room', {               //
          postProcess: 'sprintf',                                       //
          sprintf: [username]                                           //
        }, user.language)                                               //
      });                                                               //
      return;                                                           //
    }                                                                   //
                                                                        //
    Meteor.call('muteUserInRoom', {                                     //
      rid: item.rid,                                                    //
      username: username                                                //
    });                                                                 //
  }                                                                     //
                                                                        //
  return Mute;                                                          //
}();                                                                    //
                                                                        //
RocketChat.slashCommands.add('mute', Mute);                             //
//////////////////////////////////////////////////////////////////////////

},"unmute.coffee.js":function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/rocketchat_slashcommands-mute/server/unmute.coffee.js       //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*                                                                      //
 * Unmute is a named function that will replace /unmute commands        //
 */var Unmute,                                                          //
    indexOf = [].indexOf || function (item) {                           //
  for (var i = 0, l = this.length; i < l; i++) {                        //
    if (i in this && this[i] === item) return i;                        //
  }                                                                     //
                                                                        //
  return -1;                                                            //
};                                                                      //
                                                                        //
Unmute = function () {                                                  //
  function Unmute(command, params, item) {                              //
    var room, unmutedUser, user, username;                              //
                                                                        //
    if (command !== 'unmute' || !Match.test(params, String)) {          //
      return;                                                           //
    }                                                                   //
                                                                        //
    username = params.trim();                                           //
                                                                        //
    if (username === '') {                                              //
      return;                                                           //
    }                                                                   //
                                                                        //
    username = username.replace('@', '');                               //
    user = Meteor.users.findOne(Meteor.userId());                       //
    unmutedUser = RocketChat.models.Users.findOneByUsername(username);  //
    room = RocketChat.models.Rooms.findOneById(item.rid);               //
                                                                        //
    if (unmutedUser == null) {                                          //
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {
        _id: Random.id(),                                               //
        rid: item.rid,                                                  //
        ts: new Date(),                                                 //
        msg: TAPi18n.__('Username_doesnt_exist', {                      //
          postProcess: 'sprintf',                                       //
          sprintf: [username]                                           //
        }, user.language)                                               //
      });                                                               //
      return;                                                           //
    }                                                                   //
                                                                        //
    if (indexOf.call(room.usernames || [], username) < 0) {             //
      RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {
        _id: Random.id(),                                               //
        rid: item.rid,                                                  //
        ts: new Date(),                                                 //
        msg: TAPi18n.__('Username_is_not_in_this_room', {               //
          postProcess: 'sprintf',                                       //
          sprintf: [username]                                           //
        }, user.language)                                               //
      });                                                               //
      return;                                                           //
    }                                                                   //
                                                                        //
    Meteor.call('unmuteUserInRoom', {                                   //
      rid: item.rid,                                                    //
      username: username                                                //
    });                                                                 //
  }                                                                     //
                                                                        //
  return Unmute;                                                        //
}();                                                                    //
                                                                        //
RocketChat.slashCommands.add('unmute', Unmute);                         //
//////////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:slashcommands-mute/server/mute.coffee.js");
require("./node_modules/meteor/rocketchat:slashcommands-mute/server/unmute.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:slashcommands-mute'] = {};

})();
