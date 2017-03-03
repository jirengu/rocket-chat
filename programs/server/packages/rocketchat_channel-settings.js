(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:channel-settings":{"server":{"functions":{"saveReactWhenReadOnly.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_channel-settings/server/functions/saveReactWhenReadOnly.js                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.saveReactWhenReadOnly = function (rid, allowReact) {                                                        // 1
	if (!Match.test(rid, String)) {                                                                                       // 2
		throw new Meteor.Error('invalid-room', 'Invalid room', {                                                             // 3
			"function": 'RocketChat.saveReactWhenReadOnly'                                                                      // 3
		});                                                                                                                  // 3
	}                                                                                                                     // 4
                                                                                                                       //
	return RocketChat.models.Rooms.setAllowReactingWhenReadOnlyById(rid, allowReact);                                     // 6
};                                                                                                                     // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"saveRoomType.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_channel-settings/server/functions/saveRoomType.coffee.js                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.saveRoomType = function (rid, roomType, user, sendMessage) {                                                //
  var message, result, room;                                                                                           //
                                                                                                                       //
  if (sendMessage == null) {                                                                                           //
    sendMessage = true;                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  if (!Match.test(rid, String)) {                                                                                      //
    throw new Meteor.Error('invalid-room', 'Invalid room', {                                                           //
      "function": 'RocketChat.saveRoomType'                                                                            //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  if (roomType !== 'c' && roomType !== 'p') {                                                                          //
    throw new Meteor.Error('error-invalid-room-type', 'error-invalid-room-type', {                                     //
      "function": 'RocketChat.saveRoomType',                                                                           //
      type: roomType                                                                                                   //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  room = RocketChat.models.Rooms.findOneById(rid);                                                                     //
                                                                                                                       //
  if (room == null) {                                                                                                  //
    throw new Meteor.Error('error-invalid-room', 'error-invalid-room', {                                               //
      "function": 'RocketChat.saveRoomType',                                                                           //
      _id: rid                                                                                                         //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  if (room.t === 'd') {                                                                                                //
    throw new Meteor.Error('error-direct-room', 'Can\'t change type of direct rooms', {                                //
      "function": 'RocketChat.saveRoomType'                                                                            //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  result = RocketChat.models.Rooms.setTypeById(rid, roomType) && RocketChat.models.Subscriptions.updateTypeByRoomId(rid, roomType);
                                                                                                                       //
  if (result && sendMessage) {                                                                                         //
    if (roomType === 'c') {                                                                                            //
      message = TAPi18n.__('Channel', {                                                                                //
        lng: (user != null ? user.language : void 0) || RocketChat.settings.get('language') || 'en'                    //
      });                                                                                                              //
    } else {                                                                                                           //
      message = TAPi18n.__('Private_Group', {                                                                          //
        lng: (user != null ? user.language : void 0) || RocketChat.settings.get('language') || 'en'                    //
      });                                                                                                              //
    }                                                                                                                  //
                                                                                                                       //
    RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser('room_changed_privacy', rid, message, user);
  }                                                                                                                    //
                                                                                                                       //
  return result;                                                                                                       //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"saveRoomTopic.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_channel-settings/server/functions/saveRoomTopic.coffee.js                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.saveRoomTopic = function (rid, roomTopic, user, sendMessage) {                                              //
  var update;                                                                                                          //
                                                                                                                       //
  if (sendMessage == null) {                                                                                           //
    sendMessage = true;                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  if (!Match.test(rid, String)) {                                                                                      //
    throw new Meteor.Error('invalid-room', 'Invalid room', {                                                           //
      "function": 'RocketChat.saveRoomTopic'                                                                           //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  roomTopic = s.escapeHTML(roomTopic);                                                                                 //
  update = RocketChat.models.Rooms.setTopicById(rid, roomTopic);                                                       //
                                                                                                                       //
  if (update && sendMessage) {                                                                                         //
    RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser('room_changed_topic', rid, roomTopic, user);
  }                                                                                                                    //
                                                                                                                       //
  return update;                                                                                                       //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"saveRoomName.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_channel-settings/server/functions/saveRoomName.coffee.js                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.saveRoomName = function (rid, name, user, sendMessage) {                                                    //
  var nameValidation, ref, room, update;                                                                               //
                                                                                                                       //
  if (sendMessage == null) {                                                                                           //
    sendMessage = true;                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  room = RocketChat.models.Rooms.findOneById(rid);                                                                     //
                                                                                                                       //
  if ((ref = room.t) !== 'c' && ref !== 'p') {                                                                         //
    throw new Meteor.Error('error-not-allowed', 'Not allowed', {                                                       //
      "function": 'RocketChat.saveRoomName'                                                                            //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  try {                                                                                                                //
    nameValidation = new RegExp('^' + RocketChat.settings.get('UTF8_Names_Validation') + '$');                         //
  } catch (error) {                                                                                                    //
    nameValidation = new RegExp('^[0-9a-zA-Z-_.]+$');                                                                  //
  }                                                                                                                    //
                                                                                                                       //
  if (!nameValidation.test(name)) {                                                                                    //
    throw new Meteor.Error('error-invalid-room-name', name + ' is not a valid room name. Use only letters, numbers, hyphens and underscores', {
      "function": 'RocketChat.saveRoomName',                                                                           //
      room_name: name                                                                                                  //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  if (name === room.name) {                                                                                            //
    return;                                                                                                            //
  }                                                                                                                    //
                                                                                                                       //
  if (RocketChat.models.Rooms.findOneByName(name)) {                                                                   //
    throw new Meteor.Error('error-duplicate-channel-name', 'A channel with name \'' + name + '\' exists', {            //
      "function": 'RocketChat.saveRoomName',                                                                           //
      channel_name: name                                                                                               //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  update = RocketChat.models.Rooms.setNameById(rid, name) && RocketChat.models.Subscriptions.updateNameAndAlertByRoomId(rid, name);
                                                                                                                       //
  if (update && sendMessage) {                                                                                         //
    RocketChat.models.Messages.createRoomRenamedWithRoomIdRoomNameAndUser(rid, name, user);                            //
  }                                                                                                                    //
                                                                                                                       //
  return name;                                                                                                         //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"saveRoomReadOnly.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_channel-settings/server/functions/saveRoomReadOnly.coffee.js                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.saveRoomReadOnly = function (rid, readOnly, user) {                                                         //
  var update;                                                                                                          //
                                                                                                                       //
  if (!Match.test(rid, String)) {                                                                                      //
    throw new Meteor.Error('invalid-room', 'Invalid room', {                                                           //
      "function": 'RocketChat.saveRoomReadOnly'                                                                        //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  update = RocketChat.models.Rooms.setReadOnlyById(rid, readOnly);                                                     //
  return update;                                                                                                       //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"saveRoomDescription.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_channel-settings/server/functions/saveRoomDescription.coffee.js                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.saveRoomDescription = function (rid, roomDescription, user) {                                               //
  var update;                                                                                                          //
                                                                                                                       //
  if (!Match.test(rid, String)) {                                                                                      //
    throw new Meteor.Error('invalid-room', 'Invalid room', {                                                           //
      "function": 'RocketChat.saveRoomDescription'                                                                     //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  roomDescription = s.escapeHTML(roomDescription);                                                                     //
  update = RocketChat.models.Rooms.setDescriptionById(rid, roomDescription);                                           //
  RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser('room_changed_description', rid, roomDescription, user);
  return update;                                                                                                       //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"saveRoomSystemMessages.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_channel-settings/server/functions/saveRoomSystemMessages.coffee.js                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.saveRoomSystemMessages = function (rid, systemMessages, user) {                                             //
  var update;                                                                                                          //
                                                                                                                       //
  if (!Match.test(rid, String)) {                                                                                      //
    throw new Meteor.Error('invalid-room', 'Invalid room', {                                                           //
      "function": 'RocketChat.saveRoomSystemMessages'                                                                  //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  update = RocketChat.models.Rooms.setSystemMessagesById(rid, systemMessages);                                         //
  return update;                                                                                                       //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"methods":{"saveRoomSettings.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_channel-settings/server/methods/saveRoomSettings.coffee.js                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       //
  saveRoomSettings: function (rid, setting, value) {                                                                   //
    var name, room;                                                                                                    //
                                                                                                                       //
    if (!Meteor.userId()) {                                                                                            //
      throw new Meteor.Error('error-invalid-user', "Invalid user", {                                                   //
        "function": 'RocketChat.saveRoomName'                                                                          //
      });                                                                                                              //
    }                                                                                                                  //
                                                                                                                       //
    if (!Match.test(rid, String)) {                                                                                    //
      throw new Meteor.Error('error-invalid-room', 'Invalid room', {                                                   //
        method: 'saveRoomSettings'                                                                                     //
      });                                                                                                              //
    }                                                                                                                  //
                                                                                                                       //
    if (setting !== 'roomName' && setting !== 'roomTopic' && setting !== 'roomDescription' && setting !== 'roomType' && setting !== 'readOnly' && setting !== 'reactWhenReadOnly' && setting !== 'systemMessages' && setting !== 'default' && setting !== 'joinCode') {
      throw new Meteor.Error('error-invalid-settings', 'Invalid settings provided', {                                  //
        method: 'saveRoomSettings'                                                                                     //
      });                                                                                                              //
    }                                                                                                                  //
                                                                                                                       //
    if (!RocketChat.authz.hasPermission(Meteor.userId(), 'edit-room', rid)) {                                          //
      throw new Meteor.Error('error-action-not-allowed', 'Editing room is not allowed', {                              //
        method: 'saveRoomSettings',                                                                                    //
        action: 'Editing_room'                                                                                         //
      });                                                                                                              //
    }                                                                                                                  //
                                                                                                                       //
    if (setting === 'default' && !RocketChat.authz.hasPermission(this.userId, 'view-room-administration')) {           //
      throw new Meteor.Error('error-action-not-allowed', 'Viewing room administration is not allowed', {               //
        method: 'saveRoomSettings',                                                                                    //
        action: 'Viewing_room_administration'                                                                          //
      });                                                                                                              //
    }                                                                                                                  //
                                                                                                                       //
    room = RocketChat.models.Rooms.findOneById(rid);                                                                   //
                                                                                                                       //
    if (room != null) {                                                                                                //
      if (setting === 'roomType' && value !== room.t && value === 'c' && !RocketChat.authz.hasPermission(this.userId, 'create-c')) {
        throw new Meteor.Error('error-action-not-allowed', 'Changing a private group to a public channel is not allowed', {
          method: 'saveRoomSettings',                                                                                  //
          action: 'Change_Room_Type'                                                                                   //
        });                                                                                                            //
      }                                                                                                                //
                                                                                                                       //
      if (setting === 'roomType' && value !== room.t && value === 'p' && !RocketChat.authz.hasPermission(this.userId, 'create-p')) {
        throw new Meteor.Error('error-action-not-allowed', 'Changing a public channel to a private room is not allowed', {
          method: 'saveRoomSettings',                                                                                  //
          action: 'Change_Room_Type'                                                                                   //
        });                                                                                                            //
      }                                                                                                                //
                                                                                                                       //
      switch (setting) {                                                                                               //
        case 'roomName':                                                                                               //
          name = RocketChat.saveRoomName(rid, value, Meteor.user());                                                   //
          break;                                                                                                       //
                                                                                                                       //
        case 'roomTopic':                                                                                              //
          if (value !== room.topic) {                                                                                  //
            RocketChat.saveRoomTopic(rid, value, Meteor.user());                                                       //
          }                                                                                                            //
                                                                                                                       //
          break;                                                                                                       //
                                                                                                                       //
        case 'roomDescription':                                                                                        //
          if (value !== room.description) {                                                                            //
            RocketChat.saveRoomDescription(rid, value, Meteor.user());                                                 //
          }                                                                                                            //
                                                                                                                       //
          break;                                                                                                       //
                                                                                                                       //
        case 'roomType':                                                                                               //
          if (value !== room.t) {                                                                                      //
            RocketChat.saveRoomType(rid, value, Meteor.user());                                                        //
          }                                                                                                            //
                                                                                                                       //
          break;                                                                                                       //
                                                                                                                       //
        case 'readOnly':                                                                                               //
          if (value !== room.ro) {                                                                                     //
            RocketChat.saveRoomReadOnly(rid, value, Meteor.user());                                                    //
          }                                                                                                            //
                                                                                                                       //
          break;                                                                                                       //
                                                                                                                       //
        case 'reactWhenReadOnly':                                                                                      //
          if (value !== room.reactWhenReadOnly) {                                                                      //
            RocketChat.saveReactWhenReadOnly(rid, value, Meteor.user());                                               //
          }                                                                                                            //
                                                                                                                       //
          break;                                                                                                       //
                                                                                                                       //
        case 'systemMessages':                                                                                         //
          if (value !== room.sysMes) {                                                                                 //
            RocketChat.saveRoomSystemMessages(rid, value, Meteor.user());                                              //
          }                                                                                                            //
                                                                                                                       //
          break;                                                                                                       //
                                                                                                                       //
        case 'joinCode':                                                                                               //
          RocketChat.models.Rooms.setJoinCodeById(rid, String(value));                                                 //
          break;                                                                                                       //
                                                                                                                       //
        case 'default':                                                                                                //
          RocketChat.models.Rooms.saveDefaultById(rid, value);                                                         //
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       //
    return {                                                                                                           //
      result: true,                                                                                                    //
      rid: room._id                                                                                                    //
    };                                                                                                                 //
  }                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"models":{"Messages.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_channel-settings/server/models/Messages.coffee.js                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser = function (type, roomId, message, user, extraData) {
  return this.createWithTypeRoomIdMessageAndUser(type, roomId, message, user, extraData);                              //
};                                                                                                                     //
                                                                                                                       //
RocketChat.models.Messages.createRoomRenamedWithRoomIdRoomNameAndUser = function (roomId, roomName, user, extraData) {
  return this.createWithTypeRoomIdMessageAndUser('r', roomId, roomName, user, extraData);                              //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Rooms.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_channel-settings/server/models/Rooms.coffee.js                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.models.Rooms.setDescriptionById = function (_id, description) {                                             //
  var query, update;                                                                                                   //
  query = {                                                                                                            //
    _id: _id                                                                                                           //
  };                                                                                                                   //
  update = {                                                                                                           //
    $set: {                                                                                                            //
      description: description                                                                                         //
    }                                                                                                                  //
  };                                                                                                                   //
  return this.update(query, update);                                                                                   //
};                                                                                                                     //
                                                                                                                       //
RocketChat.models.Rooms.setReadOnlyById = function (_id, readOnly) {                                                   //
  var query, update;                                                                                                   //
  query = {                                                                                                            //
    _id: _id                                                                                                           //
  };                                                                                                                   //
  update = {                                                                                                           //
    $set: {                                                                                                            //
      ro: readOnly                                                                                                     //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       //
  if (readOnly) {                                                                                                      //
    RocketChat.models.Subscriptions.findByRoomId(_id).forEach(function (subscription) {                                //
      var user;                                                                                                        //
                                                                                                                       //
      if (subscription._user == null) {                                                                                //
        return;                                                                                                        //
      }                                                                                                                //
                                                                                                                       //
      user = subscription._user;                                                                                       //
                                                                                                                       //
      if (RocketChat.authz.hasPermission(user._id, 'post-readonly') === false) {                                       //
        if (!update.$set.muted) {                                                                                      //
          update.$set.muted = [];                                                                                      //
        }                                                                                                              //
                                                                                                                       //
        return update.$set.muted.push(user.username);                                                                  //
      }                                                                                                                //
    });                                                                                                                //
  } else {                                                                                                             //
    update.$unset = {                                                                                                  //
      muted: ""                                                                                                        //
    };                                                                                                                 //
  }                                                                                                                    //
                                                                                                                       //
  return this.update(query, update);                                                                                   //
};                                                                                                                     //
                                                                                                                       //
RocketChat.models.Rooms.setAllowReactingWhenReadOnlyById = function (_id, allowReacting) {                             //
  var query, update;                                                                                                   //
  query = {                                                                                                            //
    _id: _id                                                                                                           //
  };                                                                                                                   //
  update = {                                                                                                           //
    $set: {                                                                                                            //
      reactWhenReadOnly: allowReacting                                                                                 //
    }                                                                                                                  //
  };                                                                                                                   //
  return this.update(query, update);                                                                                   //
};                                                                                                                     //
                                                                                                                       //
RocketChat.models.Rooms.setSystemMessagesById = function (_id, systemMessages) {                                       //
  var query, update;                                                                                                   //
  query = {                                                                                                            //
    _id: _id                                                                                                           //
  };                                                                                                                   //
  update = {                                                                                                           //
    $set: {                                                                                                            //
      sysMes: systemMessages                                                                                           //
    }                                                                                                                  //
  };                                                                                                                   //
  return this.update(query, update);                                                                                   //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"startup.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_channel-settings/server/startup.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function () {                                                                                           // 1
	RocketChat.models.Permissions.upsert('post-readonly', {                                                               // 2
		$set: {                                                                                                              // 2
			roles: ['admin', 'owner', 'moderator']                                                                              // 2
		}                                                                                                                    // 2
	});                                                                                                                   // 2
	RocketChat.models.Permissions.upsert('set-readonly', {                                                                // 3
		$set: {                                                                                                              // 3
			roles: ['admin', 'owner']                                                                                           // 3
		}                                                                                                                    // 3
	});                                                                                                                   // 3
	RocketChat.models.Permissions.upsert('set-react-when-readonly', {                                                     // 4
		$set: {                                                                                                              // 4
			roles: ['admin', 'owner']                                                                                           // 4
		}                                                                                                                    // 4
	});                                                                                                                   // 4
});                                                                                                                    // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:channel-settings/server/functions/saveReactWhenReadOnly.js");
require("./node_modules/meteor/rocketchat:channel-settings/server/functions/saveRoomType.coffee.js");
require("./node_modules/meteor/rocketchat:channel-settings/server/functions/saveRoomTopic.coffee.js");
require("./node_modules/meteor/rocketchat:channel-settings/server/functions/saveRoomName.coffee.js");
require("./node_modules/meteor/rocketchat:channel-settings/server/functions/saveRoomReadOnly.coffee.js");
require("./node_modules/meteor/rocketchat:channel-settings/server/functions/saveRoomDescription.coffee.js");
require("./node_modules/meteor/rocketchat:channel-settings/server/functions/saveRoomSystemMessages.coffee.js");
require("./node_modules/meteor/rocketchat:channel-settings/server/methods/saveRoomSettings.coffee.js");
require("./node_modules/meteor/rocketchat:channel-settings/server/models/Messages.coffee.js");
require("./node_modules/meteor/rocketchat:channel-settings/server/models/Rooms.coffee.js");
require("./node_modules/meteor/rocketchat:channel-settings/server/startup.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:channel-settings'] = {};

})();

//# sourceMappingURL=rocketchat_channel-settings.js.map
