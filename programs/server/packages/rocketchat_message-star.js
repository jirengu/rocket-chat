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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:message-star":{"server":{"settings.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rocketchat_message-star/server/settings.coffee.js                                            //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function () {                                                                             //
  return RocketChat.settings.add('Message_AllowStarring', true, {                                        //
    type: 'boolean',                                                                                     //
    group: 'Message',                                                                                    //
    "public": true                                                                                       //
  });                                                                                                    //
});                                                                                                      //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

},"starMessage.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rocketchat_message-star/server/starMessage.coffee.js                                         //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                         //
  starMessage: function (message) {                                                                      //
    var room;                                                                                            //
                                                                                                         //
    if (!Meteor.userId()) {                                                                              //
      throw new Meteor.Error('error-invalid-user', "Invalid user", {                                     //
        method: 'starMessage'                                                                            //
      });                                                                                                //
    }                                                                                                    //
                                                                                                         //
    if (!RocketChat.settings.get('Message_AllowStarring')) {                                             //
      throw new Meteor.Error('error-action-not-allowed', 'Message starring not allowed', {               //
        method: 'pinMessage',                                                                            //
        action: 'Message_starring'                                                                       //
      });                                                                                                //
    }                                                                                                    //
                                                                                                         //
    room = RocketChat.models.Rooms.findOneById(message.rid);                                             //
                                                                                                         //
    if (Array.isArray(room.usernames) && room.usernames.indexOf(Meteor.user().username) === -1) {        //
      return false;                                                                                      //
    }                                                                                                    //
                                                                                                         //
    return RocketChat.models.Messages.updateUserStarById(message._id, Meteor.userId(), message.starred);
  }                                                                                                      //
});                                                                                                      //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publications":{"starredMessages.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rocketchat_message-star/server/publications/starredMessages.coffee.js                        //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('starredMessages', function (rid, limit) {                                                //
  var cursorHandle, publication, user;                                                                   //
                                                                                                         //
  if (limit == null) {                                                                                   //
    limit = 50;                                                                                          //
  }                                                                                                      //
                                                                                                         //
  if (!this.userId) {                                                                                    //
    return this.ready();                                                                                 //
  }                                                                                                      //
                                                                                                         //
  publication = this;                                                                                    //
  user = RocketChat.models.Users.findOneById(this.userId);                                               //
                                                                                                         //
  if (!user) {                                                                                           //
    return this.ready();                                                                                 //
  }                                                                                                      //
                                                                                                         //
  cursorHandle = RocketChat.models.Messages.findStarredByUserAtRoom(this.userId, rid, {                  //
    sort: {                                                                                              //
      ts: -1                                                                                             //
    },                                                                                                   //
    limit: limit                                                                                         //
  }).observeChanges({                                                                                    //
    added: function (_id, record) {                                                                      //
      return publication.added('rocketchat_starred_message', _id, record);                               //
    },                                                                                                   //
    changed: function (_id, record) {                                                                    //
      return publication.changed('rocketchat_starred_message', _id, record);                             //
    },                                                                                                   //
    removed: function (_id) {                                                                            //
      return publication.removed('rocketchat_starred_message', _id);                                     //
    }                                                                                                    //
  });                                                                                                    //
  this.ready();                                                                                          //
  return this.onStop(function () {                                                                       //
    return cursorHandle.stop();                                                                          //
  });                                                                                                    //
});                                                                                                      //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"startup":{"indexes.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rocketchat_message-star/server/startup/indexes.coffee.js                                     //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function () {                                                                             //
  return Meteor.defer(function () {                                                                      //
    return RocketChat.models.Messages.tryEnsureIndex({                                                   //
      'starred._id': 1                                                                                   //
    }, {                                                                                                 //
      sparse: 1                                                                                          //
    });                                                                                                  //
  });                                                                                                    //
});                                                                                                      //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:message-star/server/settings.coffee.js");
require("./node_modules/meteor/rocketchat:message-star/server/starMessage.coffee.js");
require("./node_modules/meteor/rocketchat:message-star/server/publications/starredMessages.coffee.js");
require("./node_modules/meteor/rocketchat:message-star/server/startup/indexes.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:message-star'] = {};

})();
