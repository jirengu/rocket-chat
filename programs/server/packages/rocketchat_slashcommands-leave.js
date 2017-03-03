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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:slashcommands-leave":{"leave.coffee.js":function(){

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// packages/rocketchat_slashcommands-leave/leave.coffee.js                  //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*                                                                          //
 * Leave is a named function that will replace /leave commands              //
 * @param {Object} message - The message object                             //
 */var Leave;                                                               //
                                                                            //
if (Meteor.isClient) {                                                      //
  RocketChat.slashCommands.add('leave', void 0, {                           //
    description: 'Leave_the_current_channel'                                //
  });                                                                       //
  RocketChat.slashCommands.add('part', void 0, {                            //
    description: 'Leave_the_current_channel'                                //
  });                                                                       //
} else {                                                                    //
  Leave = function () {                                                     //
    function Leave(command, params, item) {                                 //
      var err;                                                              //
                                                                            //
      if (command === "leave" || command === "part") {                      //
        try {                                                               //
          Meteor.call('leaveRoom', item.rid);                               //
        } catch (error) {                                                   //
          err = error;                                                      //
          RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {
            _id: Random.id(),                                               //
            rid: item.rid,                                                  //
            ts: new Date(),                                                 //
            msg: TAPi18n.__(err.error, null, Meteor.user().language)        //
          });                                                               //
        }                                                                   //
      }                                                                     //
    }                                                                       //
                                                                            //
    return Leave;                                                           //
  }();                                                                      //
                                                                            //
  RocketChat.slashCommands.add('leave', Leave);                             //
  RocketChat.slashCommands.add('part', Leave);                              //
}                                                                           //
//////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:slashcommands-leave/leave.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:slashcommands-leave'] = {};

})();
