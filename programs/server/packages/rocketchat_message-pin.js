(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:message-pin":{"server":{"settings.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/rocketchat_message-pin/server/settings.coffee.js                                       //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function () {                                                                       //
  RocketChat.settings.add('Message_AllowPinning', true, {                                          //
    type: 'boolean',                                                                               //
    group: 'Message',                                                                              //
    "public": true                                                                                 //
  });                                                                                              //
  return RocketChat.models.Permissions.upsert('pin-message', {                                     //
    $setOnInsert: {                                                                                //
      roles: ['owner', 'moderator', 'admin']                                                       //
    }                                                                                              //
  });                                                                                              //
});                                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////

},"pinMessage.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/rocketchat_message-pin/server/pinMessage.coffee.js                                     //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                   //
  pinMessage: function (message, pinnedAt) {                                                       //
    var me, originalMessage, room;                                                                 //
                                                                                                   //
    if (!Meteor.userId()) {                                                                        //
      throw new Meteor.Error('error-invalid-user', "Invalid user", {                               //
        method: 'pinMessage'                                                                       //
      });                                                                                          //
    }                                                                                              //
                                                                                                   //
    if (!RocketChat.settings.get('Message_AllowPinning')) {                                        //
      throw new Meteor.Error('error-action-not-allowed', 'Message pinning not allowed', {          //
        method: 'pinMessage',                                                                      //
        action: 'Message_pinning'                                                                  //
      });                                                                                          //
    }                                                                                              //
                                                                                                   //
    room = RocketChat.models.Rooms.findOneById(message.rid);                                       //
                                                                                                   //
    if (Array.isArray(room.usernames) && room.usernames.indexOf(Meteor.user().username) === -1) {  //
      return false;                                                                                //
    }                                                                                              //
                                                                                                   //
    originalMessage = RocketChat.models.Messages.findOneById(message._id);                         //
                                                                                                   //
    if ((originalMessage != null ? originalMessage._id : void 0) == null) {                        //
      throw new Meteor.Error('error-invalid-message', 'Message you are pinning was not found', {   //
        method: 'pinMessage',                                                                      //
        action: 'Message_pinning'                                                                  //
      });                                                                                          //
    }                                                                                              //
                                                                                                   //
    if (RocketChat.settings.get('Message_KeepHistory')) {                                          //
      RocketChat.models.Messages.cloneAndSaveAsHistoryById(message._id);                           //
    }                                                                                              //
                                                                                                   //
    me = RocketChat.models.Users.findOneById(Meteor.userId());                                     //
    originalMessage.pinned = true;                                                                 //
    originalMessage.pinnedAt = pinnedAt || Date.now;                                               //
    originalMessage.pinnedBy = {                                                                   //
      _id: Meteor.userId(),                                                                        //
      username: me.username                                                                        //
    };                                                                                             //
    originalMessage = RocketChat.callbacks.run('beforeSaveMessage', originalMessage);              //
    RocketChat.models.Messages.setPinnedByIdAndUserId(originalMessage._id, originalMessage.pinnedBy, originalMessage.pinned);
    return RocketChat.models.Messages.createWithTypeRoomIdMessageAndUser('message_pinned', originalMessage.rid, '', me, {
      attachments: [{                                                                              //
        "text": originalMessage.msg,                                                               //
        "author_name": originalMessage.u.username,                                                 //
        "author_icon": getAvatarUrlFromUsername(originalMessage.u.username),                       //
        "ts": originalMessage.ts                                                                   //
      }]                                                                                           //
    });                                                                                            //
  },                                                                                               //
  unpinMessage: function (message) {                                                               //
    var me, originalMessage, room;                                                                 //
                                                                                                   //
    if (!Meteor.userId()) {                                                                        //
      throw new Meteor.Error('error-invalid-user', "Invalid user", {                               //
        method: 'unpinMessage'                                                                     //
      });                                                                                          //
    }                                                                                              //
                                                                                                   //
    if (!RocketChat.settings.get('Message_AllowPinning')) {                                        //
      throw new Meteor.Error('error-action-not-allowed', 'Message pinning not allowed', {          //
        method: 'unpinMessage',                                                                    //
        action: 'Message_pinning'                                                                  //
      });                                                                                          //
    }                                                                                              //
                                                                                                   //
    room = RocketChat.models.Rooms.findOneById(message.rid);                                       //
                                                                                                   //
    if (Array.isArray(room.usernames) && room.usernames.indexOf(Meteor.user().username) === -1) {  //
      return false;                                                                                //
    }                                                                                              //
                                                                                                   //
    originalMessage = RocketChat.models.Messages.findOneById(message._id);                         //
                                                                                                   //
    if ((originalMessage != null ? originalMessage._id : void 0) == null) {                        //
      throw new Meteor.Error('error-invalid-message', 'Message you are unpinning was not found', {
        method: 'unpinMessage',                                                                    //
        action: 'Message_pinning'                                                                  //
      });                                                                                          //
    }                                                                                              //
                                                                                                   //
    if (RocketChat.settings.get('Message_KeepHistory')) {                                          //
      RocketChat.models.Messages.cloneAndSaveAsHistoryById(originalMessage._id);                   //
    }                                                                                              //
                                                                                                   //
    me = RocketChat.models.Users.findOneById(Meteor.userId());                                     //
    originalMessage.pinned = false;                                                                //
    originalMessage.pinnedBy = {                                                                   //
      _id: Meteor.userId(),                                                                        //
      username: me.username                                                                        //
    };                                                                                             //
    originalMessage = RocketChat.callbacks.run('beforeSaveMessage', originalMessage);              //
    return RocketChat.models.Messages.setPinnedByIdAndUserId(originalMessage._id, originalMessage.pinnedBy, originalMessage.pinned);
  }                                                                                                //
});                                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////

},"publications":{"pinnedMessages.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/rocketchat_message-pin/server/publications/pinnedMessages.coffee.js                    //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('pinnedMessages', function (rid, limit) {                                           //
  var cursorHandle, publication, user;                                                             //
                                                                                                   //
  if (limit == null) {                                                                             //
    limit = 50;                                                                                    //
  }                                                                                                //
                                                                                                   //
  if (!this.userId) {                                                                              //
    return this.ready();                                                                           //
  }                                                                                                //
                                                                                                   //
  publication = this;                                                                              //
  user = RocketChat.models.Users.findOneById(this.userId);                                         //
                                                                                                   //
  if (!user) {                                                                                     //
    return this.ready();                                                                           //
  }                                                                                                //
                                                                                                   //
  cursorHandle = RocketChat.models.Messages.findPinnedByRoom(rid, {                                //
    sort: {                                                                                        //
      ts: -1                                                                                       //
    },                                                                                             //
    limit: limit                                                                                   //
  }).observeChanges({                                                                              //
    added: function (_id, record) {                                                                //
      return publication.added('rocketchat_pinned_message', _id, record);                          //
    },                                                                                             //
    changed: function (_id, record) {                                                              //
      return publication.changed('rocketchat_pinned_message', _id, record);                        //
    },                                                                                             //
    removed: function (_id) {                                                                      //
      return publication.removed('rocketchat_pinned_message', _id);                                //
    }                                                                                              //
  });                                                                                              //
  this.ready();                                                                                    //
  return this.onStop(function () {                                                                 //
    return cursorHandle.stop();                                                                    //
  });                                                                                              //
});                                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////

}},"startup":{"indexes.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/rocketchat_message-pin/server/startup/indexes.coffee.js                                //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function () {                                                                       //
  return Meteor.defer(function () {                                                                //
    return RocketChat.models.Messages.tryEnsureIndex({                                             //
      'pinnedBy._id': 1                                                                            //
    }, {                                                                                           //
      sparse: 1                                                                                    //
    });                                                                                            //
  });                                                                                              //
});                                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:message-pin/server/settings.coffee.js");
require("./node_modules/meteor/rocketchat:message-pin/server/pinMessage.coffee.js");
require("./node_modules/meteor/rocketchat:message-pin/server/publications/pinnedMessages.coffee.js");
require("./node_modules/meteor/rocketchat:message-pin/server/startup/indexes.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:message-pin'] = {};

})();
