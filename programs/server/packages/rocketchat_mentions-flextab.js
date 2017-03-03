(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:mentions-flextab":{"server":{"publications":{"mentionedMessages.coffee.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_mentions-flextab/server/publications/mentionedMessages.coffee.js         //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('mentionedMessages', function (rid, limit) {                                     //
  var cursorHandle, publication, user;                                                          //
                                                                                                //
  if (limit == null) {                                                                          //
    limit = 50;                                                                                 //
  }                                                                                             //
                                                                                                //
  if (!this.userId) {                                                                           //
    return this.ready();                                                                        //
  }                                                                                             //
                                                                                                //
  publication = this;                                                                           //
  user = RocketChat.models.Users.findOneById(this.userId);                                      //
                                                                                                //
  if (!user) {                                                                                  //
    return this.ready();                                                                        //
  }                                                                                             //
                                                                                                //
  cursorHandle = RocketChat.models.Messages.findVisibleByMentionAndRoomId(user.username, rid, {
    sort: {                                                                                     //
      ts: -1                                                                                    //
    },                                                                                          //
    limit: limit                                                                                //
  }).observeChanges({                                                                           //
    added: function (_id, record) {                                                             //
      record.mentionedList = true;                                                              //
      return publication.added('rocketchat_mentioned_message', _id, record);                    //
    },                                                                                          //
    changed: function (_id, record) {                                                           //
      record.mentionedList = true;                                                              //
      return publication.changed('rocketchat_mentioned_message', _id, record);                  //
    },                                                                                          //
    removed: function (_id) {                                                                   //
      return publication.removed('rocketchat_mentioned_message', _id);                          //
    }                                                                                           //
  });                                                                                           //
  this.ready();                                                                                 //
  return this.onStop(function () {                                                              //
    return cursorHandle.stop();                                                                 //
  });                                                                                           //
});                                                                                             //
//////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:mentions-flextab/server/publications/mentionedMessages.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:mentions-flextab'] = {};

})();
