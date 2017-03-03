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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:push-notifications":{"server":{"methods":{"saveNotificationSettings.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/server/methods/saveNotificationSettings.js                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.methods({                                                                                              // 1
	saveNotificationSettings: function (rid, field, value) {                                                     // 2
		if (!Meteor.userId()) {                                                                                     // 3
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {                                             // 4
				method: 'saveNotificationSettings'                                                                        // 4
			});                                                                                                        // 4
		}                                                                                                           // 5
                                                                                                              //
		check(rid, String);                                                                                         // 7
		check(field, String);                                                                                       // 8
		check(value, String);                                                                                       // 9
                                                                                                              //
		if (['audioNotification', 'desktopNotifications', 'mobilePushNotifications', 'emailNotifications', 'unreadAlert'].indexOf(field) === -1) {
			throw new Meteor.Error('error-invalid-settings', 'Invalid settings field', {                               // 12
				method: 'saveNotificationSettings'                                                                        // 12
			});                                                                                                        // 12
		}                                                                                                           // 13
                                                                                                              //
		if (field !== 'audioNotification' && ['all', 'mentions', 'nothing', 'default'].indexOf(value) === -1) {     // 15
			throw new Meteor.Error('error-invalid-settings', 'Invalid settings value', {                               // 16
				method: 'saveNotificationSettings'                                                                        // 16
			});                                                                                                        // 16
		}                                                                                                           // 17
                                                                                                              //
		var subscription = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(rid, Meteor.userId());          // 19
                                                                                                              //
		if (!subscription) {                                                                                        // 20
			throw new Meteor.Error('error-invalid-subscription', 'Invalid subscription', {                             // 21
				method: 'saveNotificationSettings'                                                                        // 21
			});                                                                                                        // 21
		}                                                                                                           // 22
                                                                                                              //
		switch (field) {                                                                                            // 24
			case 'audioNotification':                                                                                  // 25
				RocketChat.models.Subscriptions.updateAudioNotificationById(subscription._id, value);                     // 26
				break;                                                                                                    // 27
                                                                                                              //
			case 'desktopNotifications':                                                                               // 28
				RocketChat.models.Subscriptions.updateDesktopNotificationsById(subscription._id, value);                  // 29
				break;                                                                                                    // 30
                                                                                                              //
			case 'mobilePushNotifications':                                                                            // 31
				RocketChat.models.Subscriptions.updateMobilePushNotificationsById(subscription._id, value);               // 32
				break;                                                                                                    // 33
                                                                                                              //
			case 'emailNotifications':                                                                                 // 34
				RocketChat.models.Subscriptions.updateEmailNotificationsById(subscription._id, value);                    // 35
				break;                                                                                                    // 36
                                                                                                              //
			case 'unreadAlert':                                                                                        // 37
				RocketChat.models.Subscriptions.updateUnreadAlertById(subscription._id, value);                           // 38
				break;                                                                                                    // 39
		}                                                                                                           // 24
                                                                                                              //
		return true;                                                                                                // 42
	},                                                                                                           // 43
	saveDesktopNotificationDuration: function (rid, value) {                                                     // 45
		var subscription = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(rid, Meteor.userId());          // 46
                                                                                                              //
		if (!subscription) {                                                                                        // 47
			throw new Meteor.Error('error-invalid-subscription', 'Invalid subscription', {                             // 48
				method: 'saveDesktopNotificationDuration'                                                                 // 48
			});                                                                                                        // 48
		}                                                                                                           // 49
                                                                                                              //
		RocketChat.models.Subscriptions.updateDesktopNotificationDurationById(subscription._id, value);             // 50
		return true;                                                                                                // 51
	}                                                                                                            // 52
});                                                                                                           // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"models":{"Subscriptions.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_push-notifications/server/models/Subscriptions.js                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
RocketChat.models.Subscriptions.updateAudioNotificationById = function (_id, audioNotification) {             // 1
	var query = {                                                                                                // 2
		_id: _id                                                                                                    // 3
	};                                                                                                           // 2
	var update = {                                                                                               // 6
		$set: {                                                                                                     // 7
			audioNotification: audioNotification                                                                       // 8
		}                                                                                                           // 7
	};                                                                                                           // 6
	return this.update(query, update);                                                                           // 12
};                                                                                                            // 13
                                                                                                              //
RocketChat.models.Subscriptions.updateDesktopNotificationsById = function (_id, desktopNotifications) {       // 15
	var query = {                                                                                                // 16
		_id: _id                                                                                                    // 17
	};                                                                                                           // 16
	var update = {                                                                                               // 20
		$set: {                                                                                                     // 21
			desktopNotifications: desktopNotifications                                                                 // 22
		}                                                                                                           // 21
	};                                                                                                           // 20
	return this.update(query, update);                                                                           // 26
};                                                                                                            // 27
                                                                                                              //
RocketChat.models.Subscriptions.updateDesktopNotificationDurationById = function (_id, value) {               // 29
	var query = {                                                                                                // 30
		_id: _id                                                                                                    // 31
	};                                                                                                           // 30
	var update = {                                                                                               // 34
		$set: {                                                                                                     // 35
			desktopNotificationDuration: value - 0                                                                     // 36
		}                                                                                                           // 35
	};                                                                                                           // 34
	return this.update(query, update);                                                                           // 40
};                                                                                                            // 41
                                                                                                              //
RocketChat.models.Subscriptions.updateMobilePushNotificationsById = function (_id, mobilePushNotifications) {
	var query = {                                                                                                // 44
		_id: _id                                                                                                    // 45
	};                                                                                                           // 44
	var update = {                                                                                               // 48
		$set: {                                                                                                     // 49
			mobilePushNotifications: mobilePushNotifications                                                           // 50
		}                                                                                                           // 49
	};                                                                                                           // 48
	return this.update(query, update);                                                                           // 54
};                                                                                                            // 55
                                                                                                              //
RocketChat.models.Subscriptions.updateEmailNotificationsById = function (_id, emailNotifications) {           // 57
	var query = {                                                                                                // 58
		_id: _id                                                                                                    // 59
	};                                                                                                           // 58
	var update = {                                                                                               // 62
		$set: {                                                                                                     // 63
			emailNotifications: emailNotifications                                                                     // 64
		}                                                                                                           // 63
	};                                                                                                           // 62
	return this.update(query, update);                                                                           // 68
};                                                                                                            // 69
                                                                                                              //
RocketChat.models.Subscriptions.updateUnreadAlertById = function (_id, unreadAlert) {                         // 71
	var query = {                                                                                                // 72
		_id: _id                                                                                                    // 73
	};                                                                                                           // 72
	var update = {                                                                                               // 76
		$set: {                                                                                                     // 77
			unreadAlert: unreadAlert                                                                                   // 78
		}                                                                                                           // 77
	};                                                                                                           // 76
	return this.update(query, update);                                                                           // 82
};                                                                                                            // 83
                                                                                                              //
RocketChat.models.Subscriptions.findAlwaysNotifyDesktopUsersByRoomId = function (roomId) {                    // 85
	var query = {                                                                                                // 86
		rid: roomId,                                                                                                // 87
		desktopNotifications: 'all'                                                                                 // 88
	};                                                                                                           // 86
	return this.find(query);                                                                                     // 91
};                                                                                                            // 92
                                                                                                              //
RocketChat.models.Subscriptions.findDontNotifyDesktopUsersByRoomId = function (roomId) {                      // 94
	var query = {                                                                                                // 95
		rid: roomId,                                                                                                // 96
		desktopNotifications: 'nothing'                                                                             // 97
	};                                                                                                           // 95
	return this.find(query);                                                                                     // 100
};                                                                                                            // 101
                                                                                                              //
RocketChat.models.Subscriptions.findAlwaysNotifyMobileUsersByRoomId = function (roomId) {                     // 103
	var query = {                                                                                                // 104
		rid: roomId,                                                                                                // 105
		mobilePushNotifications: 'all'                                                                              // 106
	};                                                                                                           // 104
	return this.find(query);                                                                                     // 109
};                                                                                                            // 110
                                                                                                              //
RocketChat.models.Subscriptions.findDontNotifyMobileUsersByRoomId = function (roomId) {                       // 112
	var query = {                                                                                                // 113
		rid: roomId,                                                                                                // 114
		mobilePushNotifications: 'nothing'                                                                          // 115
	};                                                                                                           // 113
	return this.find(query);                                                                                     // 118
};                                                                                                            // 119
                                                                                                              //
RocketChat.models.Subscriptions.findNotificationPreferencesByRoom = function (roomId) {                       // 121
	var query = {                                                                                                // 122
		rid: roomId,                                                                                                // 123
		'u._id': {                                                                                                  // 124
			$exists: true                                                                                              // 124
		},                                                                                                          // 124
		$or: [{                                                                                                     // 125
			audioNotification: {                                                                                       // 126
				$exists: true                                                                                             // 126
			}                                                                                                          // 126
		}, {                                                                                                        // 126
			desktopNotifications: {                                                                                    // 127
				$exists: true                                                                                             // 127
			}                                                                                                          // 127
		}, {                                                                                                        // 127
			desktopNotificationDuration: {                                                                             // 128
				$exists: true                                                                                             // 128
			}                                                                                                          // 128
		}, {                                                                                                        // 128
			mobilePushNotifications: {                                                                                 // 129
				$exists: true                                                                                             // 129
			}                                                                                                          // 129
		}]                                                                                                          // 129
	};                                                                                                           // 122
	return this.find(query);                                                                                     // 133
};                                                                                                            // 134
                                                                                                              //
RocketChat.models.Subscriptions.findWithSendEmailByRoomId = function (roomId) {                               // 136
	var query = {                                                                                                // 137
		rid: roomId,                                                                                                // 138
		emailNotifications: {                                                                                       // 139
			$exists: true                                                                                              // 140
		}                                                                                                           // 139
	};                                                                                                           // 137
	return this.find(query, {                                                                                    // 144
		fields: {                                                                                                   // 144
			emailNotifications: 1,                                                                                     // 144
			u: 1                                                                                                       // 144
		}                                                                                                           // 144
	});                                                                                                          // 144
};                                                                                                            // 145
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/rocketchat:push-notifications/server/methods/saveNotificationSettings.js");
require("./node_modules/meteor/rocketchat:push-notifications/server/models/Subscriptions.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:push-notifications'] = {};

})();

//# sourceMappingURL=rocketchat_push-notifications.js.map
