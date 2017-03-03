(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var ECMAScript = Package.ecmascript.ECMAScript;
var Babel = Package['babel-compiler'].Babel;
var BabelCompiler = Package['babel-compiler'].BabelCompiler;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var Logger = Package['rocketchat:logger'].Logger;
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
var logger, __coffeescriptShare;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:integrations":{"lib":{"rocketchat.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/lib/rocketchat.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.integrations = {                                                                                            // 1
	outgoingEvents: {                                                                                                     // 2
		sendMessage: {                                                                                                       // 3
			label: 'Integrations_Outgoing_Type_SendMessage',                                                                    // 4
			value: 'sendMessage',                                                                                               // 5
			use: {                                                                                                              // 6
				channel: true,                                                                                                     // 7
				triggerWords: true,                                                                                                // 8
				targetRoom: false                                                                                                  // 9
			}                                                                                                                   // 6
		},                                                                                                                   // 3
		fileUploaded: {                                                                                                      // 12
			label: 'Integrations_Outgoing_Type_FileUploaded',                                                                   // 13
			value: 'fileUploaded',                                                                                              // 14
			use: {                                                                                                              // 15
				channel: true,                                                                                                     // 16
				triggerWords: false,                                                                                               // 17
				targetRoom: false                                                                                                  // 18
			}                                                                                                                   // 15
		},                                                                                                                   // 12
		roomArchived: {                                                                                                      // 21
			label: 'Integrations_Outgoing_Type_RoomArchived',                                                                   // 22
			value: 'roomArchived',                                                                                              // 23
			use: {                                                                                                              // 24
				channel: false,                                                                                                    // 25
				triggerWords: false,                                                                                               // 26
				targetRoom: false                                                                                                  // 27
			}                                                                                                                   // 24
		},                                                                                                                   // 21
		roomCreated: {                                                                                                       // 30
			label: 'Integrations_Outgoing_Type_RoomCreated',                                                                    // 31
			value: 'roomCreated',                                                                                               // 32
			use: {                                                                                                              // 33
				channel: false,                                                                                                    // 34
				triggerWords: false,                                                                                               // 35
				targetRoom: false                                                                                                  // 36
			}                                                                                                                   // 33
		},                                                                                                                   // 30
		roomJoined: {                                                                                                        // 39
			label: 'Integrations_Outgoing_Type_RoomJoined',                                                                     // 40
			value: 'roomJoined',                                                                                                // 41
			use: {                                                                                                              // 42
				channel: true,                                                                                                     // 43
				triggerWords: false,                                                                                               // 44
				targetRoom: false                                                                                                  // 45
			}                                                                                                                   // 42
		},                                                                                                                   // 39
		roomLeft: {                                                                                                          // 48
			label: 'Integrations_Outgoing_Type_RoomLeft',                                                                       // 49
			value: 'roomLeft',                                                                                                  // 50
			use: {                                                                                                              // 51
				channel: true,                                                                                                     // 52
				triggerWords: false,                                                                                               // 53
				targetRoom: false                                                                                                  // 54
			}                                                                                                                   // 51
		},                                                                                                                   // 48
		userCreated: {                                                                                                       // 57
			label: 'Integrations_Outgoing_Type_UserCreated',                                                                    // 58
			value: 'userCreated',                                                                                               // 59
			use: {                                                                                                              // 60
				channel: false,                                                                                                    // 61
				triggerWords: false,                                                                                               // 62
				targetRoom: true                                                                                                   // 63
			}                                                                                                                   // 60
		}                                                                                                                    // 57
	}                                                                                                                     // 2
};                                                                                                                     // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"logger.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/logger.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals logger:true */ /* exported logger */logger = new Logger('Integrations', {                                   // 1
	sections: {                                                                                                           // 5
		incoming: 'Incoming WebHook',                                                                                        // 6
		outgoing: 'Outgoing WebHook'                                                                                         // 7
	}                                                                                                                     // 5
});                                                                                                                    // 4
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"validation.js":["babel-runtime/helpers/slicedToArray",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/lib/validation.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");                                                  //
                                                                                                                       //
var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);                                                         //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
/* global Babel */var scopedChannels = ['all_public_channels', 'all_private_groups', 'all_direct_messages'];           // 1
var validChannelChars = ['@', '#'];                                                                                    // 3
                                                                                                                       //
function _verifyRequiredFields(integration) {                                                                          // 5
	if (!integration.event || !Match.test(integration.event, String) || integration.event.trim() === '' || !RocketChat.integrations.outgoingEvents[integration.event]) {
		throw new Meteor.Error('error-invalid-event-type', 'Invalid event type', {                                           // 7
			"function": 'validateOutgoing._verifyRequiredFields'                                                                // 7
		});                                                                                                                  // 7
	}                                                                                                                     // 8
                                                                                                                       //
	if (!integration.username || !Match.test(integration.username, String) || integration.username.trim() === '') {       // 10
		throw new Meteor.Error('error-invalid-username', 'Invalid username', {                                               // 11
			"function": 'validateOutgoing._verifyRequiredFields'                                                                // 11
		});                                                                                                                  // 11
	}                                                                                                                     // 12
                                                                                                                       //
	if (RocketChat.integrations.outgoingEvents[integration.event].use.targetRoom && !integration.targetRoom) {            // 14
		throw new Meteor.Error('error-invalid-targetRoom', 'Invalid Target Room', {                                          // 15
			"function": 'validateOutgoing._verifyRequiredFields'                                                                // 15
		});                                                                                                                  // 15
	}                                                                                                                     // 16
                                                                                                                       //
	if (!Match.test(integration.urls, [String])) {                                                                        // 18
		throw new Meteor.Error('error-invalid-urls', 'Invalid URLs', {                                                       // 19
			"function": 'validateOutgoing._verifyRequiredFields'                                                                // 19
		});                                                                                                                  // 19
	}                                                                                                                     // 20
                                                                                                                       //
	for (var _iterator = integration.urls.entries(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		var _ref3;                                                                                                           // 22
                                                                                                                       //
		if (_isArray) {                                                                                                      // 22
			if (_i >= _iterator.length) break;                                                                                  // 22
			_ref3 = _iterator[_i++];                                                                                            // 22
		} else {                                                                                                             // 22
			_i = _iterator.next();                                                                                              // 22
			if (_i.done) break;                                                                                                 // 22
			_ref3 = _i.value;                                                                                                   // 22
		}                                                                                                                    // 22
                                                                                                                       //
		var _ref = _ref3;                                                                                                    // 22
                                                                                                                       //
		var _ref2 = (0, _slicedToArray3.default)(_ref, 2);                                                                   // 22
                                                                                                                       //
		var index = _ref2[0];                                                                                                // 22
		var url = _ref2[1];                                                                                                  // 22
                                                                                                                       //
		if (url.trim() === '') {                                                                                             // 23
			delete integration.urls[index];                                                                                     // 24
		}                                                                                                                    // 25
	}                                                                                                                     // 26
                                                                                                                       //
	integration.urls = _.without(integration.urls, [undefined]);                                                          // 28
                                                                                                                       //
	if (integration.urls.length === 0) {                                                                                  // 30
		throw new Meteor.Error('error-invalid-urls', 'Invalid URLs', {                                                       // 31
			"function": 'validateOutgoing._verifyRequiredFields'                                                                // 31
		});                                                                                                                  // 31
	}                                                                                                                     // 32
}                                                                                                                      // 33
                                                                                                                       //
function _verifyUserHasPermissionForChannels(integration, userId, channels) {                                          // 35
	for (var _iterator2 = channels, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
		var _ref4;                                                                                                           // 36
                                                                                                                       //
		if (_isArray2) {                                                                                                     // 36
			if (_i2 >= _iterator2.length) break;                                                                                // 36
			_ref4 = _iterator2[_i2++];                                                                                          // 36
		} else {                                                                                                             // 36
			_i2 = _iterator2.next();                                                                                            // 36
			if (_i2.done) break;                                                                                                // 36
			_ref4 = _i2.value;                                                                                                  // 36
		}                                                                                                                    // 36
                                                                                                                       //
		var channel = _ref4;                                                                                                 // 36
                                                                                                                       //
		if (scopedChannels.includes(channel)) {                                                                              // 37
			if (channel === 'all_public_channels') {// No special permissions needed to add integration to public channels      // 38
			} else if (!RocketChat.authz.hasPermission(userId, 'manage-integrations')) {                                        // 40
				throw new Meteor.Error('error-invalid-channel', 'Invalid Channel', {                                               // 41
					"function": 'validateOutgoing._verifyUserHasPermissionForChannels'                                                // 41
				});                                                                                                                // 41
			}                                                                                                                   // 42
		} else {                                                                                                             // 43
			var record = void 0;                                                                                                // 44
			var channelType = channel[0];                                                                                       // 45
			channel = channel.substr(1);                                                                                        // 46
                                                                                                                       //
			switch (channelType) {                                                                                              // 48
				case '#':                                                                                                          // 49
					record = RocketChat.models.Rooms.findOne({                                                                        // 50
						$or: [{                                                                                                          // 51
							_id: channel                                                                                                    // 52
						}, {                                                                                                             // 52
							name: channel                                                                                                   // 53
						}]                                                                                                               // 53
					});                                                                                                               // 50
					break;                                                                                                            // 56
                                                                                                                       //
				case '@':                                                                                                          // 57
					record = RocketChat.models.Users.findOne({                                                                        // 58
						$or: [{                                                                                                          // 59
							_id: channel                                                                                                    // 60
						}, {                                                                                                             // 60
							username: channel                                                                                               // 61
						}]                                                                                                               // 61
					});                                                                                                               // 58
					break;                                                                                                            // 64
			}                                                                                                                   // 48
                                                                                                                       //
			if (!record) {                                                                                                      // 67
				throw new Meteor.Error('error-invalid-room', 'Invalid room', {                                                     // 68
					"function": 'validateOutgoing._verifyUserHasPermissionForChannels'                                                // 68
				});                                                                                                                // 68
			}                                                                                                                   // 69
                                                                                                                       //
			if (record.usernames && !RocketChat.authz.hasPermission(userId, 'manage-integrations') && RocketChat.authz.hasPermission(userId, 'manage-own-integrations') && !record.usernames.includes(Meteor.user().username)) {
				throw new Meteor.Error('error-invalid-channel', 'Invalid Channel', {                                               // 72
					"function": 'validateOutgoing._verifyUserHasPermissionForChannels'                                                // 72
				});                                                                                                                // 72
			}                                                                                                                   // 73
		}                                                                                                                    // 74
	}                                                                                                                     // 75
}                                                                                                                      // 76
                                                                                                                       //
function _verifyRetryInformation(integration) {                                                                        // 78
	if (!integration.retryFailedCalls) {                                                                                  // 79
		return;                                                                                                              // 80
	} // Don't allow negative retry counts                                                                                // 81
                                                                                                                       //
                                                                                                                       //
	integration.retryCount = integration.retryCount && parseInt(integration.retryCount) > 0 ? parseInt(integration.retryCount) : 4;
	integration.retryDelay = !integration.retryDelay || !integration.retryDelay.trim() ? 'powers-of-ten' : integration.retryDelay.toLowerCase();
}                                                                                                                      // 86
                                                                                                                       //
RocketChat.integrations.validateOutgoing = function () {                                                               // 88
	function _validateOutgoing(integration, userId) {                                                                     // 88
		if (integration.channel && Match.test(integration.channel, String) && integration.channel.trim() === '') {           // 89
			delete integration.channel;                                                                                         // 90
		} //Moved to it's own function to statisfy the complexity rule                                                       // 91
                                                                                                                       //
                                                                                                                       //
		_verifyRequiredFields(integration);                                                                                  // 94
                                                                                                                       //
		var channels = [];                                                                                                   // 96
                                                                                                                       //
		if (RocketChat.integrations.outgoingEvents[integration.event].use.channel) {                                         // 97
			if (!Match.test(integration.channel, String)) {                                                                     // 98
				throw new Meteor.Error('error-invalid-channel', 'Invalid Channel', {                                               // 99
					"function": 'validateOutgoing'                                                                                    // 99
				});                                                                                                                // 99
			} else {                                                                                                            // 100
				channels = _.map(integration.channel.split(','), function (channel) {                                              // 101
					return s.trim(channel);                                                                                           // 101
				});                                                                                                                // 101
                                                                                                                       //
				for (var _iterator3 = channels, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
					var _ref5;                                                                                                        // 103
                                                                                                                       //
					if (_isArray3) {                                                                                                  // 103
						if (_i3 >= _iterator3.length) break;                                                                             // 103
						_ref5 = _iterator3[_i3++];                                                                                       // 103
					} else {                                                                                                          // 103
						_i3 = _iterator3.next();                                                                                         // 103
						if (_i3.done) break;                                                                                             // 103
						_ref5 = _i3.value;                                                                                               // 103
					}                                                                                                                 // 103
                                                                                                                       //
					var channel = _ref5;                                                                                              // 103
                                                                                                                       //
					if (!validChannelChars.includes(channel[0]) && !scopedChannels.includes(channel.toLowerCase())) {                 // 104
						throw new Meteor.Error('error-invalid-channel-start-with-chars', 'Invalid channel. Start with @ or #', {         // 105
							"function": 'validateOutgoing'                                                                                  // 105
						});                                                                                                              // 105
					}                                                                                                                 // 106
				}                                                                                                                  // 107
			}                                                                                                                   // 108
		} else if (!RocketChat.authz.hasPermission(userId, 'manage-integrations')) {                                         // 109
			throw new Meteor.Error('error-invalid-permissions', 'Invalid permission for required Integration creation.', {      // 110
				"function": 'validateOutgoing'                                                                                     // 110
			});                                                                                                                 // 110
		}                                                                                                                    // 111
                                                                                                                       //
		if (RocketChat.integrations.outgoingEvents[integration.event].use.triggerWords && integration.triggerWords) {        // 113
			if (!Match.test(integration.triggerWords, [String])) {                                                              // 114
				throw new Meteor.Error('error-invalid-triggerWords', 'Invalid triggerWords', {                                     // 115
					"function": 'validateOutgoing'                                                                                    // 115
				});                                                                                                                // 115
			}                                                                                                                   // 116
                                                                                                                       //
			for (var _iterator4 = integration.triggerWords, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
				var _ref8;                                                                                                         // 118
                                                                                                                       //
				if (_isArray4) {                                                                                                   // 118
					if (_i4 >= _iterator4.length) break;                                                                              // 118
					_ref8 = _iterator4[_i4++];                                                                                        // 118
				} else {                                                                                                           // 118
					_i4 = _iterator4.next();                                                                                          // 118
					if (_i4.done) break;                                                                                              // 118
					_ref8 = _i4.value;                                                                                                // 118
				}                                                                                                                  // 118
                                                                                                                       //
				var _ref6 = _ref8;                                                                                                 // 118
                                                                                                                       //
				var _ref7 = (0, _slicedToArray3.default)(_ref6, 2);                                                                // 118
                                                                                                                       //
				var index = _ref7[0];                                                                                              // 118
				var triggerWord = _ref7[1];                                                                                        // 118
                                                                                                                       //
				if (triggerWord.trim() === '') {                                                                                   // 119
					delete integration.triggerWords[index];                                                                           // 120
				}                                                                                                                  // 121
			}                                                                                                                   // 122
                                                                                                                       //
			integration.triggerWords = _.without(integration.triggerWords, [undefined]);                                        // 124
		} else {                                                                                                             // 125
			delete integration.triggerWords;                                                                                    // 126
		}                                                                                                                    // 127
                                                                                                                       //
		if (integration.scriptEnabled === true && integration.script && integration.script.trim() !== '') {                  // 129
			try {                                                                                                               // 130
				var babelOptions = Object.assign(Babel.getDefaultOptions({                                                         // 131
					runtime: false                                                                                                    // 131
				}), {                                                                                                              // 131
					compact: true,                                                                                                    // 131
					minified: true,                                                                                                   // 131
					comments: false                                                                                                   // 131
				});                                                                                                                // 131
				integration.scriptCompiled = Babel.compile(integration.script, babelOptions).code;                                 // 133
				integration.scriptError = undefined;                                                                               // 134
			} catch (e) {                                                                                                       // 135
				integration.scriptCompiled = undefined;                                                                            // 136
				integration.scriptError = _.pick(e, 'name', 'message', 'stack');                                                   // 137
			}                                                                                                                   // 138
		}                                                                                                                    // 139
                                                                                                                       //
		_verifyUserHasPermissionForChannels(integration, userId, channels);                                                  // 141
                                                                                                                       //
		_verifyRetryInformation(integration);                                                                                // 142
                                                                                                                       //
		var user = RocketChat.models.Users.findOne({                                                                         // 144
			username: integration.username                                                                                      // 144
		});                                                                                                                  // 144
                                                                                                                       //
		if (!user) {                                                                                                         // 146
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {                                                      // 147
				"function": 'validateOutgoing'                                                                                     // 147
			});                                                                                                                 // 147
		}                                                                                                                    // 148
                                                                                                                       //
		integration.type = 'webhook-outgoing';                                                                               // 150
		integration.userId = user._id;                                                                                       // 151
		integration.channel = channels;                                                                                      // 152
		return integration;                                                                                                  // 154
	}                                                                                                                     // 155
                                                                                                                       //
	return _validateOutgoing;                                                                                             // 88
}();                                                                                                                   // 88
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"triggerHandler.js":["babel-runtime/helpers/typeof","babel-runtime/helpers/classCallCheck","moment",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/lib/triggerHandler.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                                //
                                                                                                                       //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                       //
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
var moment = void 0;                                                                                                   // 1
module.import('moment', {                                                                                              // 1
	"default": function (v) {                                                                                             // 1
		moment = v;                                                                                                          // 1
	}                                                                                                                     // 1
}, 0);                                                                                                                 // 1
RocketChat.integrations.triggerHandler = new (function () {                                                            // 4
	function RocketChatIntegrationHandler() {                                                                             // 5
		var _this = this;                                                                                                    // 5
                                                                                                                       //
		(0, _classCallCheck3.default)(this, RocketChatIntegrationHandler);                                                   // 5
		this.vm = Npm.require('vm');                                                                                         // 6
		this.successResults = [200, 201, 202];                                                                               // 7
		this.compiledScripts = {};                                                                                           // 8
		this.triggers = {};                                                                                                  // 9
		RocketChat.models.Integrations.find({                                                                                // 11
			type: 'webhook-outgoing'                                                                                            // 11
		}).observe({                                                                                                         // 11
			added: function (record) {                                                                                          // 12
				_this.addIntegration(record);                                                                                      // 13
			},                                                                                                                  // 14
			changed: function (record) {                                                                                        // 16
				_this.removeIntegration(record);                                                                                   // 17
                                                                                                                       //
				_this.addIntegration(record);                                                                                      // 18
			},                                                                                                                  // 19
			removed: function (record) {                                                                                        // 21
				_this.removeIntegration(record);                                                                                   // 22
			}                                                                                                                   // 23
		});                                                                                                                  // 11
	}                                                                                                                     // 25
                                                                                                                       //
	RocketChatIntegrationHandler.prototype.addIntegration = function () {                                                 // 4
		function addIntegration(record) {                                                                                    // 4
			logger.outgoing.debug("Adding the integration " + record.name + " of the event " + record.event + "!");             // 28
			var channels = void 0;                                                                                              // 29
                                                                                                                       //
			if (record.event && !RocketChat.integrations.outgoingEvents[record.event].use.channel) {                            // 30
				logger.outgoing.debug('The integration doesnt rely on channels.'); //We don't use any channels, so it's special ;)
                                                                                                                       //
				channels = ['__any'];                                                                                              // 33
			} else if (_.isEmpty(record.channel)) {                                                                             // 34
				logger.outgoing.debug('The integration had an empty channel property, so it is going on all the public channels.');
				channels = ['all_public_channels'];                                                                                // 36
			} else {                                                                                                            // 37
				logger.outgoing.debug('The integration is going on these channels:', record.channel);                              // 38
				channels = [].concat(record.channel);                                                                              // 39
			}                                                                                                                   // 40
                                                                                                                       //
			for (var _iterator = channels, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
				var _ref;                                                                                                          // 42
                                                                                                                       //
				if (_isArray) {                                                                                                    // 42
					if (_i >= _iterator.length) break;                                                                                // 42
					_ref = _iterator[_i++];                                                                                           // 42
				} else {                                                                                                           // 42
					_i = _iterator.next();                                                                                            // 42
					if (_i.done) break;                                                                                               // 42
					_ref = _i.value;                                                                                                  // 42
				}                                                                                                                  // 42
                                                                                                                       //
				var channel = _ref;                                                                                                // 42
                                                                                                                       //
				if (!this.triggers[channel]) {                                                                                     // 43
					this.triggers[channel] = {};                                                                                      // 44
				}                                                                                                                  // 45
                                                                                                                       //
				this.triggers[channel][record._id] = record;                                                                       // 47
			}                                                                                                                   // 48
		}                                                                                                                    // 49
                                                                                                                       //
		return addIntegration;                                                                                               // 4
	}();                                                                                                                  // 4
                                                                                                                       //
	RocketChatIntegrationHandler.prototype.removeIntegration = function () {                                              // 4
		function removeIntegration(record) {                                                                                 // 4
			for (var _iterator2 = Object.values(this.triggers), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
				var _ref2;                                                                                                         // 52
                                                                                                                       //
				if (_isArray2) {                                                                                                   // 52
					if (_i2 >= _iterator2.length) break;                                                                              // 52
					_ref2 = _iterator2[_i2++];                                                                                        // 52
				} else {                                                                                                           // 52
					_i2 = _iterator2.next();                                                                                          // 52
					if (_i2.done) break;                                                                                              // 52
					_ref2 = _i2.value;                                                                                                // 52
				}                                                                                                                  // 52
                                                                                                                       //
				var trigger = _ref2;                                                                                               // 52
				delete trigger[record._id];                                                                                        // 53
			}                                                                                                                   // 54
		}                                                                                                                    // 55
                                                                                                                       //
		return removeIntegration;                                                                                            // 4
	}();                                                                                                                  // 4
                                                                                                                       //
	RocketChatIntegrationHandler.prototype.updateHistory = function () {                                                  // 4
		function updateHistory(_ref3) {                                                                                      // 4
			var historyId = _ref3.historyId,                                                                                    // 57
			    step = _ref3.step,                                                                                              // 57
			    integration = _ref3.integration,                                                                                // 57
			    event = _ref3.event,                                                                                            // 57
			    data = _ref3.data,                                                                                              // 57
			    triggerWord = _ref3.triggerWord,                                                                                // 57
			    ranPrepareScript = _ref3.ranPrepareScript,                                                                      // 57
			    prepareSentMessage = _ref3.prepareSentMessage,                                                                  // 57
			    processSentMessage = _ref3.processSentMessage,                                                                  // 57
			    resultMessage = _ref3.resultMessage,                                                                            // 57
			    finished = _ref3.finished,                                                                                      // 57
			    url = _ref3.url,                                                                                                // 57
			    httpCallData = _ref3.httpCallData,                                                                              // 57
			    httpError = _ref3.httpError,                                                                                    // 57
			    httpResult = _ref3.httpResult,                                                                                  // 57
			    error = _ref3.error,                                                                                            // 57
			    errorStack = _ref3.errorStack;                                                                                  // 57
			var history = {                                                                                                     // 58
				type: 'outgoing-webhook',                                                                                          // 59
				step: step                                                                                                         // 60
			}; // Usually is only added on initial insert                                                                       // 58
                                                                                                                       //
			if (integration) {                                                                                                  // 64
				history.integration = integration;                                                                                 // 65
			} // Usually is only added on initial insert                                                                        // 66
                                                                                                                       //
                                                                                                                       //
			if (event) {                                                                                                        // 69
				history.event = event;                                                                                             // 70
			}                                                                                                                   // 71
                                                                                                                       //
			if (data) {                                                                                                         // 73
				history.data = data;                                                                                               // 74
                                                                                                                       //
				if (data.user) {                                                                                                   // 76
					history.data.user = _.omit(data.user, ['meta', '$loki', 'services']);                                             // 77
				}                                                                                                                  // 78
                                                                                                                       //
				if (data.room) {                                                                                                   // 80
					history.data.room = _.omit(data.room, ['meta', '$loki', 'usernames']);                                            // 81
					history.data.room.usernames = ['this_will_be_filled_in_with_usernames_when_replayed'];                            // 82
				}                                                                                                                  // 83
			}                                                                                                                   // 84
                                                                                                                       //
			if (triggerWord) {                                                                                                  // 86
				history.triggerWord = triggerWord;                                                                                 // 87
			}                                                                                                                   // 88
                                                                                                                       //
			if (typeof ranPrepareScript !== 'undefined') {                                                                      // 90
				history.ranPrepareScript = ranPrepareScript;                                                                       // 91
			}                                                                                                                   // 92
                                                                                                                       //
			if (prepareSentMessage) {                                                                                           // 94
				history.prepareSentMessage = prepareSentMessage;                                                                   // 95
			}                                                                                                                   // 96
                                                                                                                       //
			if (processSentMessage) {                                                                                           // 98
				history.processSentMessage = processSentMessage;                                                                   // 99
			}                                                                                                                   // 100
                                                                                                                       //
			if (resultMessage) {                                                                                                // 102
				history.resultMessage = resultMessage;                                                                             // 103
			}                                                                                                                   // 104
                                                                                                                       //
			if (typeof finished !== 'undefined') {                                                                              // 106
				history.finished = finished;                                                                                       // 107
			}                                                                                                                   // 108
                                                                                                                       //
			if (url) {                                                                                                          // 110
				history.url = url;                                                                                                 // 111
			}                                                                                                                   // 112
                                                                                                                       //
			if (typeof httpCallData !== 'undefined') {                                                                          // 114
				history.httpCallData = httpCallData;                                                                               // 115
			}                                                                                                                   // 116
                                                                                                                       //
			if (httpError) {                                                                                                    // 118
				history.httpError = httpError;                                                                                     // 119
			}                                                                                                                   // 120
                                                                                                                       //
			if (typeof httpResult !== 'undefined') {                                                                            // 122
				history.httpResult = httpResult;                                                                                   // 123
			}                                                                                                                   // 124
                                                                                                                       //
			if (typeof error !== 'undefined') {                                                                                 // 126
				history.error = error;                                                                                             // 127
			}                                                                                                                   // 128
                                                                                                                       //
			if (typeof errorStack !== 'undefined') {                                                                            // 130
				history.errorStack = errorStack;                                                                                   // 131
			}                                                                                                                   // 132
                                                                                                                       //
			if (historyId) {                                                                                                    // 134
				RocketChat.models.IntegrationHistory.update({                                                                      // 135
					_id: historyId                                                                                                    // 135
				}, {                                                                                                               // 135
					$set: history                                                                                                     // 135
				});                                                                                                                // 135
				return historyId;                                                                                                  // 136
			} else {                                                                                                            // 137
				history._createdAt = new Date();                                                                                   // 138
				return RocketChat.models.IntegrationHistory.insert(Object.assign({                                                 // 139
					_id: Random.id()                                                                                                  // 139
				}, history));                                                                                                      // 139
			}                                                                                                                   // 140
		}                                                                                                                    // 141
                                                                                                                       //
		return updateHistory;                                                                                                // 4
	}(); //Trigger is the trigger, nameOrId is a string which is used to try and find a room, room is a room, message is a message, and data contains "user_name" if trigger.impersonateUser is truthful.
                                                                                                                       //
                                                                                                                       //
	RocketChatIntegrationHandler.prototype.sendMessage = function () {                                                    // 4
		function sendMessage(_ref4) {                                                                                        // 4
			var trigger = _ref4.trigger,                                                                                        // 144
			    _ref4$nameOrId = _ref4.nameOrId,                                                                                // 144
			    nameOrId = _ref4$nameOrId === undefined ? '' : _ref4$nameOrId,                                                  // 144
			    room = _ref4.room,                                                                                              // 144
			    message = _ref4.message,                                                                                        // 144
			    data = _ref4.data;                                                                                              // 144
			var user = void 0; //Try to find the user who we are impersonating                                                  // 145
                                                                                                                       //
			if (trigger.impersonateUser) {                                                                                      // 147
				user = RocketChat.models.Users.findOneByUsername(data.user_name);                                                  // 148
			} //If they don't exist (aka the trigger didn't contain a user) then we set the user based upon the                 // 149
			//configured username for the integration since this is required at all times.                                      // 152
                                                                                                                       //
                                                                                                                       //
			if (!user) {                                                                                                        // 153
				user = RocketChat.models.Users.findOneByUsername(trigger.username);                                                // 154
			}                                                                                                                   // 155
                                                                                                                       //
			var tmpRoom = void 0;                                                                                               // 157
                                                                                                                       //
			if (nameOrId || trigger.targetRoom) {                                                                               // 158
				tmpRoom = RocketChat.getRoomByNameOrIdWithOptionToJoin({                                                           // 159
					currentUserId: user._id,                                                                                          // 159
					nameOrId: nameOrId || trigger.targetRoom,                                                                         // 159
					errorOnEmpty: false                                                                                               // 159
				}) || room;                                                                                                        // 159
			} else {                                                                                                            // 160
				tmpRoom = room;                                                                                                    // 161
			} //If no room could be found, we won't be sending any messages but we'll warn in the logs                          // 162
                                                                                                                       //
                                                                                                                       //
			if (!tmpRoom) {                                                                                                     // 165
				logger.outgoing.warn("The Integration \"" + trigger.name + "\" doesn't have a room configured nor did it provide a room to send the message to.");
				return;                                                                                                            // 167
			}                                                                                                                   // 168
                                                                                                                       //
			logger.outgoing.debug("Found a room for " + trigger.name + " which is: " + tmpRoom.name + " with a type of " + tmpRoom.t);
			message.bot = {                                                                                                     // 172
				i: trigger._id                                                                                                     // 172
			};                                                                                                                  // 172
			var defaultValues = {                                                                                               // 174
				alias: trigger.alias,                                                                                              // 175
				avatar: trigger.avatar,                                                                                            // 176
				emoji: trigger.emoji                                                                                               // 177
			};                                                                                                                  // 174
                                                                                                                       //
			if (tmpRoom.t === 'd') {                                                                                            // 180
				message.channel = '@' + tmpRoom._id;                                                                               // 181
			} else {                                                                                                            // 182
				message.channel = '#' + tmpRoom._id;                                                                               // 183
			}                                                                                                                   // 184
                                                                                                                       //
			message = processWebhookMessage(message, user, defaultValues);                                                      // 186
			return message;                                                                                                     // 187
		}                                                                                                                    // 188
                                                                                                                       //
		return sendMessage;                                                                                                  // 4
	}();                                                                                                                  // 4
                                                                                                                       //
	RocketChatIntegrationHandler.prototype.getIntegrationScript = function () {                                           // 4
		function getIntegrationScript(integration) {                                                                         // 4
			var compiledScript = this.compiledScripts[integration._id];                                                         // 191
                                                                                                                       //
			if (compiledScript && +compiledScript._updatedAt === +integration._updatedAt) {                                     // 192
				return compiledScript.script;                                                                                      // 193
			}                                                                                                                   // 194
                                                                                                                       //
			var script = integration.scriptCompiled;                                                                            // 196
			var store = {};                                                                                                     // 197
			var sandbox = {                                                                                                     // 198
				_: _,                                                                                                              // 199
				s: s,                                                                                                              // 199
				console: console,                                                                                                  // 199
				moment: moment,                                                                                                    // 199
				Store: {                                                                                                           // 200
					set: function (key, val) {                                                                                        // 201
						return store[key] = val;                                                                                         // 201
					},                                                                                                                // 201
					get: function (key) {                                                                                             // 202
						return store[key];                                                                                               // 202
					}                                                                                                                 // 202
				},                                                                                                                 // 200
				HTTP: function (method, url, options) {                                                                            // 204
					try {                                                                                                             // 205
						return {                                                                                                         // 206
							result: HTTP.call(method, url, options)                                                                         // 207
						};                                                                                                               // 206
					} catch (error) {                                                                                                 // 209
						return {                                                                                                         // 210
							error: error                                                                                                    // 210
						};                                                                                                               // 210
					}                                                                                                                 // 211
				}                                                                                                                  // 212
			};                                                                                                                  // 198
			var vmScript = void 0;                                                                                              // 215
                                                                                                                       //
			try {                                                                                                               // 216
				logger.outgoing.info('Will evaluate script of Trigger', integration.name);                                         // 217
				logger.outgoing.debug(script);                                                                                     // 218
				vmScript = this.vm.createScript(script, 'script.js');                                                              // 220
				vmScript.runInNewContext(sandbox);                                                                                 // 222
                                                                                                                       //
				if (sandbox.Script) {                                                                                              // 224
					this.compiledScripts[integration._id] = {                                                                         // 225
						script: new sandbox.Script(),                                                                                    // 226
						store: store,                                                                                                    // 227
						_updatedAt: integration._updatedAt                                                                               // 228
					};                                                                                                                // 225
					return this.compiledScripts[integration._id].script;                                                              // 231
				}                                                                                                                  // 232
			} catch (e) {                                                                                                       // 233
				logger.outgoing.error("Error evaluating Script in Trigger " + integration.name + ":");                             // 234
				logger.outgoing.error(script.replace(/^/gm, '  '));                                                                // 235
				logger.outgoing.error('Stack Trace:');                                                                             // 236
				logger.outgoing.error(e.stack.replace(/^/gm, '  '));                                                               // 237
				throw new Meteor.Error('error-evaluating-script');                                                                 // 238
			}                                                                                                                   // 239
                                                                                                                       //
			if (!sandbox.Script) {                                                                                              // 241
				logger.outgoing.error("Class \"Script\" not in Trigger " + integration.name + ":");                                // 242
				throw new Meteor.Error('class-script-not-found');                                                                  // 243
			}                                                                                                                   // 244
		}                                                                                                                    // 245
                                                                                                                       //
		return getIntegrationScript;                                                                                         // 4
	}();                                                                                                                  // 4
                                                                                                                       //
	RocketChatIntegrationHandler.prototype.hasScriptAndMethod = function () {                                             // 4
		function hasScriptAndMethod(integration, method) {                                                                   // 4
			if (integration.scriptEnabled !== true || !integration.scriptCompiled || integration.scriptCompiled.trim() === '') {
				return false;                                                                                                      // 249
			}                                                                                                                   // 250
                                                                                                                       //
			var script = void 0;                                                                                                // 252
                                                                                                                       //
			try {                                                                                                               // 253
				script = this.getIntegrationScript(integration);                                                                   // 254
			} catch (e) {                                                                                                       // 255
				return false;                                                                                                      // 256
			}                                                                                                                   // 257
                                                                                                                       //
			return typeof script[method] !== 'undefined';                                                                       // 259
		}                                                                                                                    // 260
                                                                                                                       //
		return hasScriptAndMethod;                                                                                           // 4
	}();                                                                                                                  // 4
                                                                                                                       //
	RocketChatIntegrationHandler.prototype.executeScript = function () {                                                  // 4
		function executeScript(integration, method, params, historyId) {                                                     // 4
			var _this2 = this;                                                                                                  // 262
                                                                                                                       //
			var script = void 0;                                                                                                // 263
                                                                                                                       //
			try {                                                                                                               // 264
				script = this.getIntegrationScript(integration);                                                                   // 265
			} catch (e) {                                                                                                       // 266
				this.updateHistory({                                                                                               // 267
					historyId: historyId,                                                                                             // 267
					step: 'execute-script-getting-script',                                                                            // 267
					error: true,                                                                                                      // 267
					errorStack: e                                                                                                     // 267
				});                                                                                                                // 267
				return;                                                                                                            // 268
			}                                                                                                                   // 269
                                                                                                                       //
			if (!script[method]) {                                                                                              // 271
				logger.outgoing.error("Method \"" + method + "\" no found in the Integration \"" + integration.name + "\"");       // 272
				this.updateHistory({                                                                                               // 273
					historyId: historyId,                                                                                             // 273
					step: "execute-script-no-method-" + method                                                                        // 273
				});                                                                                                                // 273
				return;                                                                                                            // 274
			}                                                                                                                   // 275
                                                                                                                       //
			try {                                                                                                               // 277
				var _ret = function () {                                                                                           // 277
					var store = _this2.compiledScripts[integration._id].store;                                                        // 278
					var sandbox = {                                                                                                   // 279
						_: _,                                                                                                            // 280
						s: s,                                                                                                            // 280
						console: console,                                                                                                // 280
						moment: moment,                                                                                                  // 280
						Store: {                                                                                                         // 281
							set: function (key, val) {                                                                                      // 282
								return store[key] = val;                                                                                       // 282
							},                                                                                                              // 282
							get: function (key) {                                                                                           // 283
								return store[key];                                                                                             // 283
							}                                                                                                               // 283
						},                                                                                                               // 281
						HTTP: function (method, url, options) {                                                                          // 285
							try {                                                                                                           // 286
								return {                                                                                                       // 287
									result: HTTP.call(method, url, options)                                                                       // 288
								};                                                                                                             // 287
							} catch (error) {                                                                                               // 290
								return {                                                                                                       // 291
									error: error                                                                                                  // 291
								};                                                                                                             // 291
							}                                                                                                               // 292
						},                                                                                                               // 293
						script: script,                                                                                                  // 294
						method: method,                                                                                                  // 295
						params: params                                                                                                   // 296
					};                                                                                                                // 279
                                                                                                                       //
					_this2.updateHistory({                                                                                            // 299
						historyId: historyId,                                                                                            // 299
						step: "execute-script-before-running-" + method                                                                  // 299
					});                                                                                                               // 299
                                                                                                                       //
					var result = _this2.vm.runInNewContext('script[method](params)', sandbox, {                                       // 300
						timeout: 3000                                                                                                    // 300
					});                                                                                                               // 300
                                                                                                                       //
					logger.outgoing.debug("Script method \"" + method + "\" result of the Integration \"" + integration.name + "\" is:");
					logger.outgoing.debug(result);                                                                                    // 303
					return {                                                                                                          // 305
						v: result                                                                                                        // 305
					};                                                                                                                // 305
				}();                                                                                                               // 277
                                                                                                                       //
				if ((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object") return _ret.v;         // 277
			} catch (e) {                                                                                                       // 306
				this.updateHistory({                                                                                               // 307
					historyId: historyId,                                                                                             // 307
					step: "execute-script-error-running-" + method,                                                                   // 307
					error: true,                                                                                                      // 307
					errorStack: e.stack.replace(/^/gm, '  ')                                                                          // 307
				});                                                                                                                // 307
				logger.outgoing.error("Error running Script in the Integration " + integration.name + ":");                        // 308
				logger.outgoing.debug(integration.scriptCompiled.replace(/^/gm, '  ')); // Only output the compiled script if debugging is enabled, so the logs don't get spammed.
                                                                                                                       //
				logger.outgoing.error('Stack:');                                                                                   // 310
				logger.outgoing.error(e.stack.replace(/^/gm, '  '));                                                               // 311
				return;                                                                                                            // 312
			}                                                                                                                   // 313
		}                                                                                                                    // 314
                                                                                                                       //
		return executeScript;                                                                                                // 4
	}();                                                                                                                  // 4
                                                                                                                       //
	RocketChatIntegrationHandler.prototype.eventNameArgumentsToObject = function () {                                     // 4
		function eventNameArgumentsToObject() {                                                                              // 4
			var argObject = {                                                                                                   // 317
				event: arguments[0]                                                                                                // 318
			};                                                                                                                  // 317
                                                                                                                       //
			switch (argObject.event) {                                                                                          // 321
				case 'sendMessage':                                                                                                // 322
					if (arguments.length >= 3) {                                                                                      // 323
						argObject.message = arguments[1];                                                                                // 324
						argObject.room = arguments[2];                                                                                   // 325
					}                                                                                                                 // 326
                                                                                                                       //
					break;                                                                                                            // 327
                                                                                                                       //
				case 'fileUploaded':                                                                                               // 328
					if (arguments.length >= 2) {                                                                                      // 329
						var arghhh = arguments[1];                                                                                       // 330
						argObject.user = arghhh.user;                                                                                    // 331
						argObject.room = arghhh.room;                                                                                    // 332
						argObject.message = arghhh.message;                                                                              // 333
					}                                                                                                                 // 334
                                                                                                                       //
					break;                                                                                                            // 335
                                                                                                                       //
				case 'roomArchived':                                                                                               // 336
					if (arguments.length >= 3) {                                                                                      // 337
						argObject.room = arguments[1];                                                                                   // 338
						argObject.user = arguments[2];                                                                                   // 339
					}                                                                                                                 // 340
                                                                                                                       //
					break;                                                                                                            // 341
                                                                                                                       //
				case 'roomCreated':                                                                                                // 342
					if (arguments.length >= 3) {                                                                                      // 343
						argObject.owner = arguments[1];                                                                                  // 344
						argObject.room = arguments[2];                                                                                   // 345
					}                                                                                                                 // 346
                                                                                                                       //
					break;                                                                                                            // 347
                                                                                                                       //
				case 'roomJoined':                                                                                                 // 348
				case 'roomLeft':                                                                                                   // 349
					if (arguments.length >= 3) {                                                                                      // 350
						argObject.user = arguments[1];                                                                                   // 351
						argObject.room = arguments[2];                                                                                   // 352
					}                                                                                                                 // 353
                                                                                                                       //
					break;                                                                                                            // 354
                                                                                                                       //
				case 'userCreated':                                                                                                // 355
					if (arguments.length >= 2) {                                                                                      // 356
						argObject.user = arguments[1];                                                                                   // 357
					}                                                                                                                 // 358
                                                                                                                       //
					break;                                                                                                            // 359
                                                                                                                       //
				default:                                                                                                           // 360
					logger.outgoing.warn("An Unhandled Trigger Event was called: " + argObject.event);                                // 361
					argObject.event = undefined;                                                                                      // 362
					break;                                                                                                            // 363
			}                                                                                                                   // 321
                                                                                                                       //
			logger.outgoing.debug("Got the event arguments for the event: " + argObject.event, argObject);                      // 366
			return argObject;                                                                                                   // 368
		}                                                                                                                    // 369
                                                                                                                       //
		return eventNameArgumentsToObject;                                                                                   // 4
	}();                                                                                                                  // 4
                                                                                                                       //
	RocketChatIntegrationHandler.prototype.mapEventArgsToData = function () {                                             // 4
		function mapEventArgsToData(data, _ref5) {                                                                           // 4
			var event = _ref5.event,                                                                                            // 371
			    message = _ref5.message,                                                                                        // 371
			    room = _ref5.room,                                                                                              // 371
			    owner = _ref5.owner,                                                                                            // 371
			    user = _ref5.user;                                                                                              // 371
                                                                                                                       //
			switch (event) {                                                                                                    // 372
				case 'sendMessage':                                                                                                // 373
					data.channel_id = room._id;                                                                                       // 374
					data.channel_name = room.name;                                                                                    // 375
					data.message_id = message._id;                                                                                    // 376
					data.timestamp = message.ts;                                                                                      // 377
					data.user_id = message.u._id;                                                                                     // 378
					data.user_name = message.u.username;                                                                              // 379
					data.text = message.msg;                                                                                          // 380
                                                                                                                       //
					if (message.alias) {                                                                                              // 382
						data.alias = message.alias;                                                                                      // 383
					}                                                                                                                 // 384
                                                                                                                       //
					if (message.bot) {                                                                                                // 386
						data.bot = message.bot;                                                                                          // 387
					}                                                                                                                 // 388
                                                                                                                       //
					break;                                                                                                            // 389
                                                                                                                       //
				case 'fileUploaded':                                                                                               // 390
					data.channel_id = room._id;                                                                                       // 391
					data.channel_name = room.name;                                                                                    // 392
					data.message_id = message._id;                                                                                    // 393
					data.timestamp = message.ts;                                                                                      // 394
					data.user_id = message.u._id;                                                                                     // 395
					data.user_name = message.u.username;                                                                              // 396
					data.text = message.msg;                                                                                          // 397
					data.user = user;                                                                                                 // 398
					data.room = room;                                                                                                 // 399
					data.message = message;                                                                                           // 400
                                                                                                                       //
					if (message.alias) {                                                                                              // 402
						data.alias = message.alias;                                                                                      // 403
					}                                                                                                                 // 404
                                                                                                                       //
					if (message.bot) {                                                                                                // 406
						data.bot = message.bot;                                                                                          // 407
					}                                                                                                                 // 408
                                                                                                                       //
					break;                                                                                                            // 409
                                                                                                                       //
				case 'roomCreated':                                                                                                // 410
					data.channel_id = room._id;                                                                                       // 411
					data.channel_name = room.name;                                                                                    // 412
					data.timestamp = room.ts;                                                                                         // 413
					data.user_id = owner._id;                                                                                         // 414
					data.user_name = owner.username;                                                                                  // 415
					data.owner = owner;                                                                                               // 416
					data.room = room;                                                                                                 // 417
					break;                                                                                                            // 418
                                                                                                                       //
				case 'roomArchived':                                                                                               // 419
				case 'roomJoined':                                                                                                 // 420
				case 'roomLeft':                                                                                                   // 421
					data.timestamp = new Date();                                                                                      // 422
					data.channel_id = room._id;                                                                                       // 423
					data.channel_name = room.name;                                                                                    // 424
					data.user_id = user._id;                                                                                          // 425
					data.user_name = user.username;                                                                                   // 426
					data.user = user;                                                                                                 // 427
					data.room = room;                                                                                                 // 428
                                                                                                                       //
					if (user.type === 'bot') {                                                                                        // 430
						data.bot = true;                                                                                                 // 431
					}                                                                                                                 // 432
                                                                                                                       //
					break;                                                                                                            // 433
                                                                                                                       //
				case 'userCreated':                                                                                                // 434
					data.timestamp = user.createdAt;                                                                                  // 435
					data.user_id = user._id;                                                                                          // 436
					data.user_name = user.username;                                                                                   // 437
					data.user = user;                                                                                                 // 438
                                                                                                                       //
					if (user.type === 'bot') {                                                                                        // 440
						data.bot = true;                                                                                                 // 441
					}                                                                                                                 // 442
                                                                                                                       //
					break;                                                                                                            // 443
                                                                                                                       //
				default:                                                                                                           // 444
					break;                                                                                                            // 445
			}                                                                                                                   // 372
		}                                                                                                                    // 447
                                                                                                                       //
		return mapEventArgsToData;                                                                                           // 4
	}();                                                                                                                  // 4
                                                                                                                       //
	RocketChatIntegrationHandler.prototype.executeTriggers = function () {                                                // 4
		function executeTriggers() {                                                                                         // 4
			logger.outgoing.debug('Execute Trigger:', arguments[0]);                                                            // 450
			var argObject = this.eventNameArgumentsToObject.apply(this, arguments);                                             // 452
			var event = argObject.event,                                                                                        // 449
			    message = argObject.message,                                                                                    // 449
			    room = argObject.room; //Each type of event should have an event and a room attached, otherwise we              // 449
			//wouldn't know how to handle the trigger nor would we have anywhere to send the                                    // 456
			//result of the integration                                                                                         // 457
                                                                                                                       //
			if (!event) {                                                                                                       // 458
				return;                                                                                                            // 459
			}                                                                                                                   // 460
                                                                                                                       //
			var triggersToExecute = [];                                                                                         // 462
			logger.outgoing.debug('Starting search for triggers for the room:', room ? room._id : '__any');                     // 464
                                                                                                                       //
			if (room) {                                                                                                         // 465
				switch (room.t) {                                                                                                  // 466
					case 'd':                                                                                                         // 467
						var id = room._id.replace(message.u._id, '');                                                                    // 468
                                                                                                                       //
						var username = _.without(room.usernames, message.u.username)[0];                                                 // 469
                                                                                                                       //
						if (this.triggers['@' + id]) {                                                                                   // 471
							for (var _iterator3 = Object.values(this.triggers['@' + id]), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
								var _ref6;                                                                                                     // 472
                                                                                                                       //
								if (_isArray3) {                                                                                               // 472
									if (_i3 >= _iterator3.length) break;                                                                          // 472
									_ref6 = _iterator3[_i3++];                                                                                    // 472
								} else {                                                                                                       // 472
									_i3 = _iterator3.next();                                                                                      // 472
									if (_i3.done) break;                                                                                          // 472
									_ref6 = _i3.value;                                                                                            // 472
								}                                                                                                              // 472
                                                                                                                       //
								var trigger = _ref6;                                                                                           // 472
								triggersToExecute.push(trigger);                                                                               // 473
							}                                                                                                               // 474
						}                                                                                                                // 475
                                                                                                                       //
						if (this.triggers.all_direct_messages) {                                                                         // 477
							for (var _iterator4 = Object.values(this.triggers.all_direct_messages), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
								var _ref7;                                                                                                     // 478
                                                                                                                       //
								if (_isArray4) {                                                                                               // 478
									if (_i4 >= _iterator4.length) break;                                                                          // 478
									_ref7 = _iterator4[_i4++];                                                                                    // 478
								} else {                                                                                                       // 478
									_i4 = _iterator4.next();                                                                                      // 478
									if (_i4.done) break;                                                                                          // 478
									_ref7 = _i4.value;                                                                                            // 478
								}                                                                                                              // 478
                                                                                                                       //
								var _trigger = _ref7;                                                                                          // 478
								triggersToExecute.push(_trigger);                                                                              // 479
							}                                                                                                               // 480
						}                                                                                                                // 481
                                                                                                                       //
						if (id !== username && this.triggers['@' + username]) {                                                          // 483
							for (var _iterator5 = Object.values(this.triggers['@' + username]), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
								var _ref8;                                                                                                     // 484
                                                                                                                       //
								if (_isArray5) {                                                                                               // 484
									if (_i5 >= _iterator5.length) break;                                                                          // 484
									_ref8 = _iterator5[_i5++];                                                                                    // 484
								} else {                                                                                                       // 484
									_i5 = _iterator5.next();                                                                                      // 484
									if (_i5.done) break;                                                                                          // 484
									_ref8 = _i5.value;                                                                                            // 484
								}                                                                                                              // 484
                                                                                                                       //
								var _trigger2 = _ref8;                                                                                         // 484
								triggersToExecute.push(_trigger2);                                                                             // 485
							}                                                                                                               // 486
						}                                                                                                                // 487
                                                                                                                       //
						break;                                                                                                           // 488
                                                                                                                       //
					case 'c':                                                                                                         // 490
						if (this.triggers.all_public_channels) {                                                                         // 491
							for (var _iterator6 = Object.values(this.triggers.all_public_channels), _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
								var _ref9;                                                                                                     // 492
                                                                                                                       //
								if (_isArray6) {                                                                                               // 492
									if (_i6 >= _iterator6.length) break;                                                                          // 492
									_ref9 = _iterator6[_i6++];                                                                                    // 492
								} else {                                                                                                       // 492
									_i6 = _iterator6.next();                                                                                      // 492
									if (_i6.done) break;                                                                                          // 492
									_ref9 = _i6.value;                                                                                            // 492
								}                                                                                                              // 492
                                                                                                                       //
								var _trigger3 = _ref9;                                                                                         // 492
								triggersToExecute.push(_trigger3);                                                                             // 493
							}                                                                                                               // 494
						}                                                                                                                // 495
                                                                                                                       //
						if (this.triggers['#' + room._id]) {                                                                             // 497
							for (var _iterator7 = Object.values(this.triggers['#' + room._id]), _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
								var _ref10;                                                                                                    // 498
                                                                                                                       //
								if (_isArray7) {                                                                                               // 498
									if (_i7 >= _iterator7.length) break;                                                                          // 498
									_ref10 = _iterator7[_i7++];                                                                                   // 498
								} else {                                                                                                       // 498
									_i7 = _iterator7.next();                                                                                      // 498
									if (_i7.done) break;                                                                                          // 498
									_ref10 = _i7.value;                                                                                           // 498
								}                                                                                                              // 498
                                                                                                                       //
								var _trigger4 = _ref10;                                                                                        // 498
								triggersToExecute.push(_trigger4);                                                                             // 499
							}                                                                                                               // 500
						}                                                                                                                // 501
                                                                                                                       //
						if (room._id !== room.name && this.triggers['#' + room.name]) {                                                  // 503
							for (var _iterator8 = Object.values(this.triggers['#' + room.name]), _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
								var _ref11;                                                                                                    // 504
                                                                                                                       //
								if (_isArray8) {                                                                                               // 504
									if (_i8 >= _iterator8.length) break;                                                                          // 504
									_ref11 = _iterator8[_i8++];                                                                                   // 504
								} else {                                                                                                       // 504
									_i8 = _iterator8.next();                                                                                      // 504
									if (_i8.done) break;                                                                                          // 504
									_ref11 = _i8.value;                                                                                           // 504
								}                                                                                                              // 504
                                                                                                                       //
								var _trigger5 = _ref11;                                                                                        // 504
								triggersToExecute.push(_trigger5);                                                                             // 505
							}                                                                                                               // 506
						}                                                                                                                // 507
                                                                                                                       //
						break;                                                                                                           // 508
                                                                                                                       //
					default:                                                                                                          // 510
						if (this.triggers.all_private_groups) {                                                                          // 511
							for (var _iterator9 = Object.values(this.triggers.all_private_groups), _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
								var _ref12;                                                                                                    // 512
                                                                                                                       //
								if (_isArray9) {                                                                                               // 512
									if (_i9 >= _iterator9.length) break;                                                                          // 512
									_ref12 = _iterator9[_i9++];                                                                                   // 512
								} else {                                                                                                       // 512
									_i9 = _iterator9.next();                                                                                      // 512
									if (_i9.done) break;                                                                                          // 512
									_ref12 = _i9.value;                                                                                           // 512
								}                                                                                                              // 512
                                                                                                                       //
								var _trigger6 = _ref12;                                                                                        // 512
								triggersToExecute.push(_trigger6);                                                                             // 513
							}                                                                                                               // 514
						}                                                                                                                // 515
                                                                                                                       //
						if (this.triggers['#' + room._id]) {                                                                             // 517
							for (var _iterator10 = Object.values(this.triggers['#' + room._id]), _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
								var _ref13;                                                                                                    // 518
                                                                                                                       //
								if (_isArray10) {                                                                                              // 518
									if (_i10 >= _iterator10.length) break;                                                                        // 518
									_ref13 = _iterator10[_i10++];                                                                                 // 518
								} else {                                                                                                       // 518
									_i10 = _iterator10.next();                                                                                    // 518
									if (_i10.done) break;                                                                                         // 518
									_ref13 = _i10.value;                                                                                          // 518
								}                                                                                                              // 518
                                                                                                                       //
								var _trigger7 = _ref13;                                                                                        // 518
								triggersToExecute.push(_trigger7);                                                                             // 519
							}                                                                                                               // 520
						}                                                                                                                // 521
                                                                                                                       //
						if (room._id !== room.name && this.triggers['#' + room.name]) {                                                  // 523
							for (var _iterator11 = Object.values(this.triggers['#' + room.name]), _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
								var _ref14;                                                                                                    // 524
                                                                                                                       //
								if (_isArray11) {                                                                                              // 524
									if (_i11 >= _iterator11.length) break;                                                                        // 524
									_ref14 = _iterator11[_i11++];                                                                                 // 524
								} else {                                                                                                       // 524
									_i11 = _iterator11.next();                                                                                    // 524
									if (_i11.done) break;                                                                                         // 524
									_ref14 = _i11.value;                                                                                          // 524
								}                                                                                                              // 524
                                                                                                                       //
								var _trigger8 = _ref14;                                                                                        // 524
								triggersToExecute.push(_trigger8);                                                                             // 525
							}                                                                                                               // 526
						}                                                                                                                // 527
                                                                                                                       //
						break;                                                                                                           // 528
				}                                                                                                                  // 466
			} else if (this.triggers.__any) {                                                                                   // 530
				//For outgoing integration which don't rely on rooms.                                                              // 531
				for (var _iterator12 = Object.values(this.triggers.__any), _isArray12 = Array.isArray(_iterator12), _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
					var _ref15;                                                                                                       // 532
                                                                                                                       //
					if (_isArray12) {                                                                                                 // 532
						if (_i12 >= _iterator12.length) break;                                                                           // 532
						_ref15 = _iterator12[_i12++];                                                                                    // 532
					} else {                                                                                                          // 532
						_i12 = _iterator12.next();                                                                                       // 532
						if (_i12.done) break;                                                                                            // 532
						_ref15 = _i12.value;                                                                                             // 532
					}                                                                                                                 // 532
                                                                                                                       //
					var _trigger9 = _ref15;                                                                                           // 532
					triggersToExecute.push(_trigger9);                                                                                // 533
				}                                                                                                                  // 534
			}                                                                                                                   // 535
                                                                                                                       //
			logger.outgoing.debug("Found " + triggersToExecute.length + " to iterate over and see if the match the event.");    // 537
                                                                                                                       //
			for (var _iterator13 = triggersToExecute, _isArray13 = Array.isArray(_iterator13), _i13 = 0, _iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();;) {
				var _ref16;                                                                                                        // 539
                                                                                                                       //
				if (_isArray13) {                                                                                                  // 539
					if (_i13 >= _iterator13.length) break;                                                                            // 539
					_ref16 = _iterator13[_i13++];                                                                                     // 539
				} else {                                                                                                           // 539
					_i13 = _iterator13.next();                                                                                        // 539
					if (_i13.done) break;                                                                                             // 539
					_ref16 = _i13.value;                                                                                              // 539
				}                                                                                                                  // 539
                                                                                                                       //
				var triggerToExecute = _ref16;                                                                                     // 539
				logger.outgoing.debug("Is " + triggerToExecute.name + " enabled, " + triggerToExecute.enabled + ", and what is the event? " + triggerToExecute.event);
                                                                                                                       //
				if (triggerToExecute.enabled === true && triggerToExecute.event === event) {                                       // 541
					this.executeTrigger(triggerToExecute, argObject);                                                                 // 542
				}                                                                                                                  // 543
			}                                                                                                                   // 544
		}                                                                                                                    // 545
                                                                                                                       //
		return executeTriggers;                                                                                              // 4
	}();                                                                                                                  // 4
                                                                                                                       //
	RocketChatIntegrationHandler.prototype.executeTrigger = function () {                                                 // 4
		function executeTrigger(trigger, argObject) {                                                                        // 4
			for (var _iterator14 = trigger.urls, _isArray14 = Array.isArray(_iterator14), _i14 = 0, _iterator14 = _isArray14 ? _iterator14 : _iterator14[Symbol.iterator]();;) {
				var _ref17;                                                                                                        // 548
                                                                                                                       //
				if (_isArray14) {                                                                                                  // 548
					if (_i14 >= _iterator14.length) break;                                                                            // 548
					_ref17 = _iterator14[_i14++];                                                                                     // 548
				} else {                                                                                                           // 548
					_i14 = _iterator14.next();                                                                                        // 548
					if (_i14.done) break;                                                                                             // 548
					_ref17 = _i14.value;                                                                                              // 548
				}                                                                                                                  // 548
                                                                                                                       //
				var url = _ref17;                                                                                                  // 548
				this.executeTriggerUrl(url, trigger, argObject, 0);                                                                // 549
			}                                                                                                                   // 550
		}                                                                                                                    // 551
                                                                                                                       //
		return executeTrigger;                                                                                               // 4
	}();                                                                                                                  // 4
                                                                                                                       //
	RocketChatIntegrationHandler.prototype.executeTriggerUrl = function () {                                              // 4
		function executeTriggerUrl(url, trigger, _ref18, theHistoryId) {                                                     // 4
			var event = _ref18.event,                                                                                           // 553
			    message = _ref18.message,                                                                                       // 553
			    room = _ref18.room,                                                                                             // 553
			    owner = _ref18.owner,                                                                                           // 553
			    user = _ref18.user;                                                                                             // 553
                                                                                                                       //
			var _this3 = this;                                                                                                  // 553
                                                                                                                       //
			var tries = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;                                  // 553
			logger.outgoing.debug("Starting to execute trigger: " + trigger.name + " (" + trigger._id + ")");                   // 554
			var word = void 0; //Not all triggers/events support triggerWords                                                   // 556
                                                                                                                       //
			if (RocketChat.integrations.outgoingEvents[event].use.triggerWords) {                                               // 558
				if (trigger.triggerWords && trigger.triggerWords.length > 0) {                                                     // 559
					for (var _iterator15 = trigger.triggerWords, _isArray15 = Array.isArray(_iterator15), _i15 = 0, _iterator15 = _isArray15 ? _iterator15 : _iterator15[Symbol.iterator]();;) {
						var _ref19;                                                                                                      // 560
                                                                                                                       //
						if (_isArray15) {                                                                                                // 560
							if (_i15 >= _iterator15.length) break;                                                                          // 560
							_ref19 = _iterator15[_i15++];                                                                                   // 560
						} else {                                                                                                         // 560
							_i15 = _iterator15.next();                                                                                      // 560
							if (_i15.done) break;                                                                                           // 560
							_ref19 = _i15.value;                                                                                            // 560
						}                                                                                                                // 560
                                                                                                                       //
						var triggerWord = _ref19;                                                                                        // 560
                                                                                                                       //
						if (!trigger.triggerWordAnywhere && message.msg.indexOf(triggerWord) === 0) {                                    // 561
							word = triggerWord;                                                                                             // 562
							break;                                                                                                          // 563
						} else if (trigger.triggerWordAnywhere && message.msg.includes(triggerWord)) {                                   // 564
							word = triggerWord;                                                                                             // 565
							break;                                                                                                          // 566
						}                                                                                                                // 567
					} // Stop if there are triggerWords but none match                                                                // 568
                                                                                                                       //
                                                                                                                       //
					if (!word) {                                                                                                      // 571
						return;                                                                                                          // 572
					}                                                                                                                 // 573
				}                                                                                                                  // 574
			}                                                                                                                   // 575
                                                                                                                       //
			var historyId = this.updateHistory({                                                                                // 577
				step: 'start-execute-trigger-url',                                                                                 // 577
				integration: trigger,                                                                                              // 577
				event: event                                                                                                       // 577
			});                                                                                                                 // 577
			var data = {                                                                                                        // 579
				token: trigger.token,                                                                                              // 580
				bot: false                                                                                                         // 581
			};                                                                                                                  // 579
                                                                                                                       //
			if (word) {                                                                                                         // 584
				data.trigger_word = word;                                                                                          // 585
			}                                                                                                                   // 586
                                                                                                                       //
			this.mapEventArgsToData(data, {                                                                                     // 588
				trigger: trigger,                                                                                                  // 588
				event: event,                                                                                                      // 588
				message: message,                                                                                                  // 588
				room: room,                                                                                                        // 588
				owner: owner,                                                                                                      // 588
				user: user                                                                                                         // 588
			});                                                                                                                 // 588
			this.updateHistory({                                                                                                // 589
				historyId: historyId,                                                                                              // 589
				step: 'mapped-args-to-data',                                                                                       // 589
				data: data,                                                                                                        // 589
				triggerWord: word                                                                                                  // 589
			});                                                                                                                 // 589
			logger.outgoing.info("Will be executing the Integration \"" + trigger.name + "\" to the url: " + url);              // 591
			logger.outgoing.debug(data);                                                                                        // 592
			var opts = {                                                                                                        // 594
				params: {},                                                                                                        // 595
				method: 'POST',                                                                                                    // 596
				url: url,                                                                                                          // 597
				data: data,                                                                                                        // 598
				auth: undefined,                                                                                                   // 599
				npmRequestOptions: {                                                                                               // 600
					rejectUnauthorized: !RocketChat.settings.get('Allow_Invalid_SelfSigned_Certs'),                                   // 601
					strictSSL: !RocketChat.settings.get('Allow_Invalid_SelfSigned_Certs')                                             // 602
				},                                                                                                                 // 600
				headers: {                                                                                                         // 604
					'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36'
				}                                                                                                                  // 604
			};                                                                                                                  // 594
                                                                                                                       //
			if (this.hasScriptAndMethod(trigger, 'prepare_outgoing_request')) {                                                 // 609
				opts = this.executeScript(trigger, 'prepare_outgoing_request', {                                                   // 610
					request: opts                                                                                                     // 610
				}, historyId);                                                                                                     // 610
			}                                                                                                                   // 611
                                                                                                                       //
			this.updateHistory({                                                                                                // 613
				historyId: historyId,                                                                                              // 613
				step: 'after-maybe-ran-prepare',                                                                                   // 613
				ranPrepareScript: true                                                                                             // 613
			});                                                                                                                 // 613
                                                                                                                       //
			if (!opts) {                                                                                                        // 615
				this.updateHistory({                                                                                               // 616
					historyId: historyId,                                                                                             // 616
					step: 'after-prepare-no-opts',                                                                                    // 616
					finished: true                                                                                                    // 616
				});                                                                                                                // 616
				return;                                                                                                            // 617
			}                                                                                                                   // 618
                                                                                                                       //
			if (opts.message) {                                                                                                 // 620
				var prepareMessage = this.sendMessage({                                                                            // 621
					trigger: trigger,                                                                                                 // 621
					room: room,                                                                                                       // 621
					message: opts.message,                                                                                            // 621
					data: data                                                                                                        // 621
				});                                                                                                                // 621
				this.updateHistory({                                                                                               // 622
					historyId: historyId,                                                                                             // 622
					step: 'after-prepare-send-message',                                                                               // 622
					prepareSentMessage: prepareMessage                                                                                // 622
				});                                                                                                                // 622
			}                                                                                                                   // 623
                                                                                                                       //
			if (!opts.url || !opts.method) {                                                                                    // 625
				this.updateHistory({                                                                                               // 626
					historyId: historyId,                                                                                             // 626
					step: 'after-prepare-no-url_or_method',                                                                           // 626
					finished: true                                                                                                    // 626
				});                                                                                                                // 626
				return;                                                                                                            // 627
			}                                                                                                                   // 628
                                                                                                                       //
			this.updateHistory({                                                                                                // 630
				historyId: historyId,                                                                                              // 630
				step: 'pre-http-call',                                                                                             // 630
				url: opts.url,                                                                                                     // 630
				httpCallData: opts.data                                                                                            // 630
			});                                                                                                                 // 630
			HTTP.call(opts.method, opts.url, opts, function (error, result) {                                                   // 631
				if (!result) {                                                                                                     // 632
					logger.outgoing.warn("Result for the Integration " + trigger.name + " to " + url + " is empty");                  // 633
				} else {                                                                                                           // 634
					logger.outgoing.info("Status code for the Integration " + trigger.name + " to " + url + " is " + result.statusCode);
				}                                                                                                                  // 636
                                                                                                                       //
				_this3.updateHistory({                                                                                             // 638
					historyId: historyId,                                                                                             // 638
					step: 'after-http-call',                                                                                          // 638
					httpError: error,                                                                                                 // 638
					httpResult: result                                                                                                // 638
				});                                                                                                                // 638
                                                                                                                       //
				if (_this3.hasScriptAndMethod(trigger, 'process_outgoing_response')) {                                             // 640
					var sandbox = {                                                                                                   // 641
						request: opts,                                                                                                   // 642
						response: {                                                                                                      // 643
							error: error,                                                                                                   // 644
							status_code: result ? result.statusCode : undefined,                                                            // 645
							//These values will be undefined to close issues #4175, #5762, and #5896                                        // 645
							content: result ? result.data : undefined,                                                                      // 646
							content_raw: result ? result.content : undefined,                                                               // 647
							headers: result ? result.headers : {}                                                                           // 648
						}                                                                                                                // 643
					};                                                                                                                // 641
                                                                                                                       //
					var scriptResult = _this3.executeScript(trigger, 'process_outgoing_response', sandbox, historyId);                // 652
                                                                                                                       //
					if (scriptResult && scriptResult.content) {                                                                       // 654
						var resultMessage = _this3.sendMessage({                                                                         // 655
							trigger: trigger,                                                                                               // 655
							room: room,                                                                                                     // 655
							message: scriptResult.content,                                                                                  // 655
							data: data                                                                                                      // 655
						});                                                                                                              // 655
                                                                                                                       //
						_this3.updateHistory({                                                                                           // 656
							historyId: historyId,                                                                                           // 656
							step: 'after-process-send-message',                                                                             // 656
							processSentMessage: resultMessage,                                                                              // 656
							finished: true                                                                                                  // 656
						});                                                                                                              // 656
                                                                                                                       //
						return;                                                                                                          // 657
					}                                                                                                                 // 658
                                                                                                                       //
					if (scriptResult === false) {                                                                                     // 660
						_this3.updateHistory({                                                                                           // 661
							historyId: historyId,                                                                                           // 661
							step: 'after-process-false-result',                                                                             // 661
							finished: true                                                                                                  // 661
						});                                                                                                              // 661
                                                                                                                       //
						return;                                                                                                          // 662
					}                                                                                                                 // 663
				} // if the result contained nothing or wasn't a successful statusCode                                             // 664
                                                                                                                       //
                                                                                                                       //
				if (!result || !_this3.successResults.includes(result.statusCode)) {                                               // 667
					if (error) {                                                                                                      // 668
						logger.outgoing.error("Error for the Integration \"" + trigger.name + "\" to " + url + " is:");                  // 669
						logger.outgoing.error(error);                                                                                    // 670
					}                                                                                                                 // 671
                                                                                                                       //
					if (result) {                                                                                                     // 673
						logger.outgoing.error("Error for the Integration \"" + trigger.name + "\" to " + url + " is:");                  // 674
						logger.outgoing.error(result);                                                                                   // 675
                                                                                                                       //
						if (result.statusCode === 410) {                                                                                 // 677
							_this3.updateHistory({                                                                                          // 678
								historyId: historyId,                                                                                          // 678
								step: 'after-process-http-status-410',                                                                         // 678
								error: true                                                                                                    // 678
							});                                                                                                             // 678
                                                                                                                       //
							logger.outgoing.error("Disabling the Integration \"" + trigger.name + "\" because the status code was 401 (Gone).");
							RocketChat.models.Integrations.update({                                                                         // 680
								_id: trigger._id                                                                                               // 680
							}, {                                                                                                            // 680
								$set: {                                                                                                        // 680
									enabled: false                                                                                                // 680
								}                                                                                                              // 680
							});                                                                                                             // 680
							return;                                                                                                         // 681
						}                                                                                                                // 682
                                                                                                                       //
						if (result.statusCode === 500) {                                                                                 // 684
							_this3.updateHistory({                                                                                          // 685
								historyId: historyId,                                                                                          // 685
								step: 'after-process-http-status-500',                                                                         // 685
								error: true                                                                                                    // 685
							});                                                                                                             // 685
                                                                                                                       //
							logger.outgoing.error("Error \"500\" for the Integration \"" + trigger.name + "\" to " + url + ".");            // 686
							logger.outgoing.error(result.content);                                                                          // 687
							return;                                                                                                         // 688
						}                                                                                                                // 689
					}                                                                                                                 // 690
                                                                                                                       //
					if (trigger.retryFailedCalls) {                                                                                   // 692
						if (tries < trigger.retryCount && trigger.retryDelay) {                                                          // 693
							_this3.updateHistory({                                                                                          // 694
								historyId: historyId,                                                                                          // 694
								error: true,                                                                                                   // 694
								step: "going-to-retry-" + (tries + 1)                                                                          // 694
							});                                                                                                             // 694
                                                                                                                       //
							var waitTime = void 0;                                                                                          // 696
                                                                                                                       //
							switch (trigger.retryDelay) {                                                                                   // 698
								case 'powers-of-ten':                                                                                          // 699
									// Try again in 0.1s, 1s, 10s, 1m40s, 16m40s, 2h46m40s, 27h46m40s, etc                                        // 700
									waitTime = Math.pow(10, tries + 2);                                                                           // 701
									break;                                                                                                        // 702
                                                                                                                       //
								case 'powers-of-two':                                                                                          // 703
									// 2 seconds, 4 seconds, 8 seconds                                                                            // 704
									waitTime = Math.pow(2, tries + 1) * 1000;                                                                     // 705
									break;                                                                                                        // 706
                                                                                                                       //
								case 'increments-of-two':                                                                                      // 707
									// 2 second, 4 seconds, 6 seconds, etc                                                                        // 708
									waitTime = (tries + 1) * 2 * 1000;                                                                            // 709
									break;                                                                                                        // 710
                                                                                                                       //
								default:                                                                                                       // 711
									var er = new Error('The integration\'s retryDelay setting is invalid.');                                      // 712
                                                                                                                       //
									_this3.updateHistory({                                                                                        // 713
										historyId: historyId,                                                                                        // 713
										step: 'failed-and-retry-delay-is-invalid',                                                                   // 713
										error: true,                                                                                                 // 713
										errorStack: er.stack                                                                                         // 713
									});                                                                                                           // 713
                                                                                                                       //
									return;                                                                                                       // 714
							}                                                                                                               // 698
                                                                                                                       //
							logger.outgoing.info("Trying the Integration " + trigger.name + " to " + url + " again in " + waitTime + " milliseconds.");
							Meteor.setTimeout(function () {                                                                                 // 718
								_this3.executeTriggerUrl(url, trigger, {                                                                       // 719
									event: event,                                                                                                 // 719
									message: message,                                                                                             // 719
									room: room,                                                                                                   // 719
									owner: owner,                                                                                                 // 719
									user: user                                                                                                    // 719
								}, historyId, tries + 1);                                                                                      // 719
							}, waitTime);                                                                                                   // 720
						} else {                                                                                                         // 721
							_this3.updateHistory({                                                                                          // 722
								historyId: historyId,                                                                                          // 722
								step: 'too-many-retries',                                                                                      // 722
								error: true                                                                                                    // 722
							});                                                                                                             // 722
						}                                                                                                                // 723
					} else {                                                                                                          // 724
						_this3.updateHistory({                                                                                           // 725
							historyId: historyId,                                                                                           // 725
							step: 'failed-and-not-configured-to-retry',                                                                     // 725
							error: true                                                                                                     // 725
						});                                                                                                              // 725
					}                                                                                                                 // 726
                                                                                                                       //
					return;                                                                                                           // 728
				} //process outgoing webhook response as a new message                                                             // 729
                                                                                                                       //
                                                                                                                       //
				if (result && _this3.successResults.includes(result.statusCode)) {                                                 // 732
					if (result && result.data && (result.data.text || result.data.attachments)) {                                     // 733
						var resultMsg = _this3.sendMessage({                                                                             // 734
							trigger: trigger,                                                                                               // 734
							room: room,                                                                                                     // 734
							message: result.data,                                                                                           // 734
							data: data                                                                                                      // 734
						});                                                                                                              // 734
                                                                                                                       //
						_this3.updateHistory({                                                                                           // 735
							historyId: historyId,                                                                                           // 735
							step: 'url-response-sent-message',                                                                              // 735
							resultMessage: resultMsg,                                                                                       // 735
							finished: true                                                                                                  // 735
						});                                                                                                              // 735
					}                                                                                                                 // 736
				}                                                                                                                  // 737
			});                                                                                                                 // 738
		}                                                                                                                    // 739
                                                                                                                       //
		return executeTriggerUrl;                                                                                            // 4
	}();                                                                                                                  // 4
                                                                                                                       //
	RocketChatIntegrationHandler.prototype.replay = function () {                                                         // 4
		function replay(integration, history) {                                                                              // 4
			if (!integration || integration.type !== 'webhook-outgoing') {                                                      // 742
				throw new Meteor.Error('integration-type-must-be-outgoing', 'The integration type to replay must be an outgoing webhook.');
			}                                                                                                                   // 744
                                                                                                                       //
			if (!history || !history.data) {                                                                                    // 746
				throw new Meteor.Error('history-data-must-be-defined', 'The history data must be defined to replay an integration.');
			}                                                                                                                   // 748
                                                                                                                       //
			var event = history.event;                                                                                          // 750
			var message = RocketChat.models.Messages.findOneById(history.data.message_id);                                      // 751
			var room = RocketChat.models.Rooms.findOneById(history.data.channel_id);                                            // 752
			var user = RocketChat.models.Users.findOneById(history.data.user_id);                                               // 753
			var owner = void 0;                                                                                                 // 754
                                                                                                                       //
			if (history.data.owner && history.data.owner._id) {                                                                 // 756
				owner = RocketChat.models.Users.findOneById(history.data.owner._id);                                               // 757
			}                                                                                                                   // 758
                                                                                                                       //
			this.executeTriggerUrl(history.url, integration, {                                                                  // 760
				event: event,                                                                                                      // 760
				message: message,                                                                                                  // 760
				room: room,                                                                                                        // 760
				owner: owner,                                                                                                      // 760
				user: user                                                                                                         // 760
			});                                                                                                                 // 760
		}                                                                                                                    // 761
                                                                                                                       //
		return replay;                                                                                                       // 4
	}();                                                                                                                  // 4
                                                                                                                       //
	return RocketChatIntegrationHandler;                                                                                  // 4
}())();                                                                                                                // 4
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"models":{"Integrations.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/models/Integrations.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                          //
                                                                                                                       //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                                 //
                                                                                                                       //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                            //
                                                                                                                       //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                   //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
RocketChat.models.Integrations = new (function (_RocketChat$models$_B) {                                               // 1
	(0, _inherits3.default)(Integrations, _RocketChat$models$_B);                                                         // 1
                                                                                                                       //
	function Integrations() {                                                                                             // 2
		(0, _classCallCheck3.default)(this, Integrations);                                                                   // 2
		return (0, _possibleConstructorReturn3.default)(this, _RocketChat$models$_B.call(this, 'integrations'));             // 2
	}                                                                                                                     // 4
                                                                                                                       //
	Integrations.prototype.findByType = function () {                                                                     // 1
		function findByType(type, options) {                                                                                 // 1
			if (type !== 'webhook-incoming' && type !== 'webhook-outgoing') {                                                   // 7
				throw new Meteor.Error('invalid-type-to-find');                                                                    // 8
			}                                                                                                                   // 9
                                                                                                                       //
			return this.find({                                                                                                  // 11
				type: type                                                                                                         // 11
			}, options);                                                                                                        // 11
		}                                                                                                                    // 12
                                                                                                                       //
		return findByType;                                                                                                   // 1
	}();                                                                                                                  // 1
                                                                                                                       //
	Integrations.prototype.disableByUserId = function () {                                                                // 1
		function disableByUserId(userId) {                                                                                   // 1
			return this.update({                                                                                                // 15
				userId: userId                                                                                                     // 15
			}, {                                                                                                                // 15
				$set: {                                                                                                            // 15
					enabled: false                                                                                                    // 15
				}                                                                                                                  // 15
			}, {                                                                                                                // 15
				multi: true                                                                                                        // 15
			});                                                                                                                 // 15
		}                                                                                                                    // 16
                                                                                                                       //
		return disableByUserId;                                                                                              // 1
	}();                                                                                                                  // 1
                                                                                                                       //
	return Integrations;                                                                                                  // 1
}(RocketChat.models._Base))();                                                                                         // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"IntegrationHistory.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/models/IntegrationHistory.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                          //
                                                                                                                       //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                                 //
                                                                                                                       //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                            //
                                                                                                                       //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                   //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
RocketChat.models.IntegrationHistory = new (function (_RocketChat$models$_B) {                                         // 1
	(0, _inherits3.default)(IntegrationHistory, _RocketChat$models$_B);                                                   // 1
                                                                                                                       //
	function IntegrationHistory() {                                                                                       // 2
		(0, _classCallCheck3.default)(this, IntegrationHistory);                                                             // 2
		return (0, _possibleConstructorReturn3.default)(this, _RocketChat$models$_B.call(this, 'integration_history'));      // 2
	}                                                                                                                     // 4
                                                                                                                       //
	IntegrationHistory.prototype.findByType = function () {                                                               // 1
		function findByType(type, options) {                                                                                 // 1
			if (type !== 'outgoing-webhook' || type !== 'incoming-webhook') {                                                   // 7
				throw new Meteor.Error('invalid-integration-type');                                                                // 8
			}                                                                                                                   // 9
                                                                                                                       //
			return this.find({                                                                                                  // 11
				type: type                                                                                                         // 11
			}, options);                                                                                                        // 11
		}                                                                                                                    // 12
                                                                                                                       //
		return findByType;                                                                                                   // 1
	}();                                                                                                                  // 1
                                                                                                                       //
	IntegrationHistory.prototype.findByIntegrationId = function () {                                                      // 1
		function findByIntegrationId(id, options) {                                                                          // 1
			return this.find({                                                                                                  // 15
				'integration._id': id                                                                                              // 15
			}, options);                                                                                                        // 15
		}                                                                                                                    // 16
                                                                                                                       //
		return findByIntegrationId;                                                                                          // 1
	}();                                                                                                                  // 1
                                                                                                                       //
	IntegrationHistory.prototype.findByIntegrationIdAndCreatedBy = function () {                                          // 1
		function findByIntegrationIdAndCreatedBy(id, creatorId, options) {                                                   // 1
			return this.find({                                                                                                  // 19
				'integration._id': id,                                                                                             // 19
				'integration._createdBy._id': creatorId                                                                            // 19
			}, options);                                                                                                        // 19
		}                                                                                                                    // 20
                                                                                                                       //
		return findByIntegrationIdAndCreatedBy;                                                                              // 1
	}();                                                                                                                  // 1
                                                                                                                       //
	IntegrationHistory.prototype.findOneByIntegrationIdAndHistoryId = function () {                                       // 1
		function findOneByIntegrationIdAndHistoryId(integrationId, historyId) {                                              // 1
			return this.findOne({                                                                                               // 23
				'integration._id': integrationId,                                                                                  // 23
				_id: historyId                                                                                                     // 23
			});                                                                                                                 // 23
		}                                                                                                                    // 24
                                                                                                                       //
		return findOneByIntegrationIdAndHistoryId;                                                                           // 1
	}();                                                                                                                  // 1
                                                                                                                       //
	IntegrationHistory.prototype.findByEventName = function () {                                                          // 1
		function findByEventName(event, options) {                                                                           // 1
			return this.find({                                                                                                  // 27
				event: event                                                                                                       // 27
			}, options);                                                                                                        // 27
		}                                                                                                                    // 28
                                                                                                                       //
		return findByEventName;                                                                                              // 1
	}();                                                                                                                  // 1
                                                                                                                       //
	IntegrationHistory.prototype.findFailed = function () {                                                               // 1
		function findFailed(options) {                                                                                       // 1
			return this.find({                                                                                                  // 31
				error: true                                                                                                        // 31
			}, options);                                                                                                        // 31
		}                                                                                                                    // 32
                                                                                                                       //
		return findFailed;                                                                                                   // 1
	}();                                                                                                                  // 1
                                                                                                                       //
	IntegrationHistory.prototype.removeByIntegrationId = function () {                                                    // 1
		function removeByIntegrationId(integrationId) {                                                                      // 1
			return this.remove({                                                                                                // 35
				'integration._id': integrationId                                                                                   // 35
			});                                                                                                                 // 35
		}                                                                                                                    // 36
                                                                                                                       //
		return removeByIntegrationId;                                                                                        // 1
	}();                                                                                                                  // 1
                                                                                                                       //
	return IntegrationHistory;                                                                                            // 1
}(RocketChat.models._Base))();                                                                                         // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"publications":{"integrations.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/publications/integrations.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.publish('integrations', function () {                                                                           // 1
	function _integrationPublication() {                                                                                  // 1
		if (!this.userId) {                                                                                                  // 2
			return this.ready();                                                                                                // 3
		}                                                                                                                    // 4
                                                                                                                       //
		if (RocketChat.authz.hasPermission(this.userId, 'manage-integrations')) {                                            // 6
			return RocketChat.models.Integrations.find();                                                                       // 7
		} else if (RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations')) {                                 // 8
			return RocketChat.models.Integrations.find({                                                                        // 9
				'_createdBy._id': this.userId                                                                                      // 9
			});                                                                                                                 // 9
		} else {                                                                                                             // 10
			throw new Meteor.Error('not-authorized');                                                                           // 11
		}                                                                                                                    // 12
	}                                                                                                                     // 13
                                                                                                                       //
	return _integrationPublication;                                                                                       // 1
}());                                                                                                                  // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"integrationHistory.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/publications/integrationHistory.js                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.publish('integrationHistory', function () {                                                                     // 1
	function _integrationHistoryPublication(integrationId) {                                                              // 1
		var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;                                  // 1
                                                                                                                       //
		if (!this.userId) {                                                                                                  // 2
			return this.ready();                                                                                                // 3
		}                                                                                                                    // 4
                                                                                                                       //
		if (RocketChat.authz.hasPermission(this.userId, 'manage-integrations')) {                                            // 6
			return RocketChat.models.IntegrationHistory.findByIntegrationId(integrationId, {                                    // 7
				sort: {                                                                                                            // 7
					_updatedAt: -1                                                                                                    // 7
				},                                                                                                                 // 7
				limit: limit                                                                                                       // 7
			});                                                                                                                 // 7
		} else if (RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations')) {                                 // 8
			return RocketChat.models.IntegrationHistory.findByIntegrationIdAndCreatedBy(integrationId, this.userId, {           // 9
				sort: {                                                                                                            // 9
					_updatedAt: -1                                                                                                    // 9
				},                                                                                                                 // 9
				limit: limit                                                                                                       // 9
			});                                                                                                                 // 9
		} else {                                                                                                             // 10
			throw new Meteor.Error('not-authorized');                                                                           // 11
		}                                                                                                                    // 12
	}                                                                                                                     // 13
                                                                                                                       //
	return _integrationHistoryPublication;                                                                                // 1
}());                                                                                                                  // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"methods":{"incoming":{"addIncomingIntegration.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/methods/incoming/addIncomingIntegration.js                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global Babel */var validChannelChars = ['@', '#'];                                                                  // 1
Meteor.methods({                                                                                                       // 4
	addIncomingIntegration: function (integration) {                                                                      // 5
		if (!RocketChat.authz.hasPermission(this.userId, 'manage-integrations') && !RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations')) {
			throw new Meteor.Error('not_authorized', 'Unauthorized', {                                                          // 7
				method: 'addIncomingIntegration'                                                                                   // 7
			});                                                                                                                 // 7
		}                                                                                                                    // 8
                                                                                                                       //
		if (!_.isString(integration.channel)) {                                                                              // 10
			throw new Meteor.Error('error-invalid-channel', 'Invalid channel', {                                                // 11
				method: 'addIncomingIntegration'                                                                                   // 11
			});                                                                                                                 // 11
		}                                                                                                                    // 12
                                                                                                                       //
		if (integration.channel.trim() === '') {                                                                             // 14
			throw new Meteor.Error('error-invalid-channel', 'Invalid channel', {                                                // 15
				method: 'addIncomingIntegration'                                                                                   // 15
			});                                                                                                                 // 15
		}                                                                                                                    // 16
                                                                                                                       //
		var channels = _.map(integration.channel.split(','), function (channel) {                                            // 18
			return s.trim(channel);                                                                                             // 18
		});                                                                                                                  // 18
                                                                                                                       //
		for (var _iterator = channels, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
			var _ref;                                                                                                           // 20
                                                                                                                       //
			if (_isArray) {                                                                                                     // 20
				if (_i >= _iterator.length) break;                                                                                 // 20
				_ref = _iterator[_i++];                                                                                            // 20
			} else {                                                                                                            // 20
				_i = _iterator.next();                                                                                             // 20
				if (_i.done) break;                                                                                                // 20
				_ref = _i.value;                                                                                                   // 20
			}                                                                                                                   // 20
                                                                                                                       //
			var channel = _ref;                                                                                                 // 20
                                                                                                                       //
			if (!validChannelChars.includes(channel[0])) {                                                                      // 21
				throw new Meteor.Error('error-invalid-channel-start-with-chars', 'Invalid channel. Start with @ or #', {           // 22
					method: 'updateIncomingIntegration'                                                                               // 22
				});                                                                                                                // 22
			}                                                                                                                   // 23
		}                                                                                                                    // 24
                                                                                                                       //
		if (!_.isString(integration.username) || integration.username.trim() === '') {                                       // 26
			throw new Meteor.Error('error-invalid-username', 'Invalid username', {                                              // 27
				method: 'addIncomingIntegration'                                                                                   // 27
			});                                                                                                                 // 27
		}                                                                                                                    // 28
                                                                                                                       //
		if (integration.scriptEnabled === true && integration.script && integration.script.trim() !== '') {                  // 30
			try {                                                                                                               // 31
				var babelOptions = Babel.getDefaultOptions({                                                                       // 32
					runtime: false                                                                                                    // 32
				});                                                                                                                // 32
				babelOptions = _.extend(babelOptions, {                                                                            // 33
					compact: true,                                                                                                    // 33
					minified: true,                                                                                                   // 33
					comments: false                                                                                                   // 33
				});                                                                                                                // 33
				integration.scriptCompiled = Babel.compile(integration.script, babelOptions).code;                                 // 35
				integration.scriptError = undefined;                                                                               // 36
			} catch (e) {                                                                                                       // 37
				integration.scriptCompiled = undefined;                                                                            // 38
				integration.scriptError = _.pick(e, 'name', 'message', 'stack');                                                   // 39
			}                                                                                                                   // 40
		}                                                                                                                    // 41
                                                                                                                       //
		for (var _iterator2 = channels, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
			var _ref2;                                                                                                          // 43
                                                                                                                       //
			if (_isArray2) {                                                                                                    // 43
				if (_i2 >= _iterator2.length) break;                                                                               // 43
				_ref2 = _iterator2[_i2++];                                                                                         // 43
			} else {                                                                                                            // 43
				_i2 = _iterator2.next();                                                                                           // 43
				if (_i2.done) break;                                                                                               // 43
				_ref2 = _i2.value;                                                                                                 // 43
			}                                                                                                                   // 43
                                                                                                                       //
			var _channel = _ref2;                                                                                               // 43
			var record = void 0;                                                                                                // 44
			var channelType = _channel[0];                                                                                      // 45
			_channel = _channel.substr(1);                                                                                      // 46
                                                                                                                       //
			switch (channelType) {                                                                                              // 48
				case '#':                                                                                                          // 49
					record = RocketChat.models.Rooms.findOne({                                                                        // 50
						$or: [{                                                                                                          // 51
							_id: _channel                                                                                                   // 52
						}, {                                                                                                             // 52
							name: _channel                                                                                                  // 53
						}]                                                                                                               // 53
					});                                                                                                               // 50
					break;                                                                                                            // 56
                                                                                                                       //
				case '@':                                                                                                          // 57
					record = RocketChat.models.Users.findOne({                                                                        // 58
						$or: [{                                                                                                          // 59
							_id: _channel                                                                                                   // 60
						}, {                                                                                                             // 60
							username: _channel                                                                                              // 61
						}]                                                                                                               // 61
					});                                                                                                               // 58
					break;                                                                                                            // 64
			}                                                                                                                   // 48
                                                                                                                       //
			if (!record) {                                                                                                      // 67
				throw new Meteor.Error('error-invalid-room', 'Invalid room', {                                                     // 68
					method: 'addIncomingIntegration'                                                                                  // 68
				});                                                                                                                // 68
			}                                                                                                                   // 69
                                                                                                                       //
			if (record.usernames && !RocketChat.authz.hasPermission(this.userId, 'manage-integrations') && RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations') && !record.usernames.includes(Meteor.user().username)) {
				throw new Meteor.Error('error-invalid-channel', 'Invalid Channel', {                                               // 72
					method: 'addIncomingIntegration'                                                                                  // 72
				});                                                                                                                // 72
			}                                                                                                                   // 73
		}                                                                                                                    // 74
                                                                                                                       //
		var user = RocketChat.models.Users.findOne({                                                                         // 76
			username: integration.username                                                                                      // 76
		});                                                                                                                  // 76
                                                                                                                       //
		if (!user) {                                                                                                         // 78
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {                                                      // 79
				method: 'addIncomingIntegration'                                                                                   // 79
			});                                                                                                                 // 79
		}                                                                                                                    // 80
                                                                                                                       //
		var token = Random.id(48);                                                                                           // 82
		integration.type = 'webhook-incoming';                                                                               // 84
		integration.token = token;                                                                                           // 85
		integration.channel = channels;                                                                                      // 86
		integration.userId = user._id;                                                                                       // 87
		integration._createdAt = new Date();                                                                                 // 88
		integration._createdBy = RocketChat.models.Users.findOne(this.userId, {                                              // 89
			fields: {                                                                                                           // 89
				username: 1                                                                                                        // 89
			}                                                                                                                   // 89
		});                                                                                                                  // 89
		RocketChat.models.Roles.addUserRoles(user._id, 'bot');                                                               // 91
		integration._id = RocketChat.models.Integrations.insert(integration);                                                // 93
		return integration;                                                                                                  // 95
	}                                                                                                                     // 96
});                                                                                                                    // 4
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"updateIncomingIntegration.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/methods/incoming/updateIncomingIntegration.js                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global Babel */var validChannelChars = ['@', '#'];                                                                  // 1
Meteor.methods({                                                                                                       // 4
	updateIncomingIntegration: function (integrationId, integration) {                                                    // 5
		if (!_.isString(integration.channel) || integration.channel.trim() === '') {                                         // 6
			throw new Meteor.Error('error-invalid-channel', 'Invalid channel', {                                                // 7
				method: 'updateIncomingIntegration'                                                                                // 7
			});                                                                                                                 // 7
		}                                                                                                                    // 8
                                                                                                                       //
		var channels = _.map(integration.channel.split(','), function (channel) {                                            // 10
			return s.trim(channel);                                                                                             // 10
		});                                                                                                                  // 10
                                                                                                                       //
		for (var _iterator = channels, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
			var _ref;                                                                                                           // 12
                                                                                                                       //
			if (_isArray) {                                                                                                     // 12
				if (_i >= _iterator.length) break;                                                                                 // 12
				_ref = _iterator[_i++];                                                                                            // 12
			} else {                                                                                                            // 12
				_i = _iterator.next();                                                                                             // 12
				if (_i.done) break;                                                                                                // 12
				_ref = _i.value;                                                                                                   // 12
			}                                                                                                                   // 12
                                                                                                                       //
			var channel = _ref;                                                                                                 // 12
                                                                                                                       //
			if (!validChannelChars.includes(channel[0])) {                                                                      // 13
				throw new Meteor.Error('error-invalid-channel-start-with-chars', 'Invalid channel. Start with @ or #', {           // 14
					method: 'updateIncomingIntegration'                                                                               // 14
				});                                                                                                                // 14
			}                                                                                                                   // 15
		}                                                                                                                    // 16
                                                                                                                       //
		var currentIntegration = void 0;                                                                                     // 18
                                                                                                                       //
		if (RocketChat.authz.hasPermission(this.userId, 'manage-integrations')) {                                            // 20
			currentIntegration = RocketChat.models.Integrations.findOne(integrationId);                                         // 21
		} else if (RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations')) {                                 // 22
			currentIntegration = RocketChat.models.Integrations.findOne({                                                       // 23
				_id: integrationId,                                                                                                // 23
				'_createdBy._id': this.userId                                                                                      // 23
			});                                                                                                                 // 23
		} else {                                                                                                             // 24
			throw new Meteor.Error('not_authorized', 'Unauthorized', {                                                          // 25
				method: 'updateIncomingIntegration'                                                                                // 25
			});                                                                                                                 // 25
		}                                                                                                                    // 26
                                                                                                                       //
		if (!currentIntegration) {                                                                                           // 28
			throw new Meteor.Error('error-invalid-integration', 'Invalid integration', {                                        // 29
				method: 'updateIncomingIntegration'                                                                                // 29
			});                                                                                                                 // 29
		}                                                                                                                    // 30
                                                                                                                       //
		if (integration.scriptEnabled === true && integration.script && integration.script.trim() !== '') {                  // 32
			try {                                                                                                               // 33
				var babelOptions = Babel.getDefaultOptions({                                                                       // 34
					runtime: false                                                                                                    // 34
				});                                                                                                                // 34
				babelOptions = _.extend(babelOptions, {                                                                            // 35
					compact: true,                                                                                                    // 35
					minified: true,                                                                                                   // 35
					comments: false                                                                                                   // 35
				});                                                                                                                // 35
				integration.scriptCompiled = Babel.compile(integration.script, babelOptions).code;                                 // 37
				integration.scriptError = undefined;                                                                               // 38
			} catch (e) {                                                                                                       // 39
				integration.scriptCompiled = undefined;                                                                            // 40
				integration.scriptError = _.pick(e, 'name', 'message', 'stack');                                                   // 41
			}                                                                                                                   // 42
		}                                                                                                                    // 43
                                                                                                                       //
		for (var _iterator2 = channels, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
			var _ref2;                                                                                                          // 45
                                                                                                                       //
			if (_isArray2) {                                                                                                    // 45
				if (_i2 >= _iterator2.length) break;                                                                               // 45
				_ref2 = _iterator2[_i2++];                                                                                         // 45
			} else {                                                                                                            // 45
				_i2 = _iterator2.next();                                                                                           // 45
				if (_i2.done) break;                                                                                               // 45
				_ref2 = _i2.value;                                                                                                 // 45
			}                                                                                                                   // 45
                                                                                                                       //
			var _channel = _ref2;                                                                                               // 45
			var channelType = _channel[0];                                                                                      // 46
			_channel = _channel.substr(1);                                                                                      // 47
			var record = void 0;                                                                                                // 48
                                                                                                                       //
			switch (channelType) {                                                                                              // 50
				case '#':                                                                                                          // 51
					record = RocketChat.models.Rooms.findOne({                                                                        // 52
						$or: [{                                                                                                          // 53
							_id: _channel                                                                                                   // 54
						}, {                                                                                                             // 54
							name: _channel                                                                                                  // 55
						}]                                                                                                               // 55
					});                                                                                                               // 52
					break;                                                                                                            // 58
                                                                                                                       //
				case '@':                                                                                                          // 59
					record = RocketChat.models.Users.findOne({                                                                        // 60
						$or: [{                                                                                                          // 61
							_id: _channel                                                                                                   // 62
						}, {                                                                                                             // 62
							username: _channel                                                                                              // 63
						}]                                                                                                               // 63
					});                                                                                                               // 60
					break;                                                                                                            // 66
			}                                                                                                                   // 50
                                                                                                                       //
			if (!record) {                                                                                                      // 69
				throw new Meteor.Error('error-invalid-room', 'Invalid room', {                                                     // 70
					method: 'updateIncomingIntegration'                                                                               // 70
				});                                                                                                                // 70
			}                                                                                                                   // 71
                                                                                                                       //
			if (record.usernames && !RocketChat.authz.hasPermission(this.userId, 'manage-integrations') && RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations') && !record.usernames.includes(Meteor.user().username)) {
				throw new Meteor.Error('error-invalid-channel', 'Invalid Channel', {                                               // 74
					method: 'updateIncomingIntegration'                                                                               // 74
				});                                                                                                                // 74
			}                                                                                                                   // 75
		}                                                                                                                    // 76
                                                                                                                       //
		var user = RocketChat.models.Users.findOne({                                                                         // 78
			username: currentIntegration.username                                                                               // 78
		});                                                                                                                  // 78
		RocketChat.models.Roles.addUserRoles(user._id, 'bot');                                                               // 79
		RocketChat.models.Integrations.update(integrationId, {                                                               // 81
			$set: {                                                                                                             // 82
				enabled: integration.enabled,                                                                                      // 83
				name: integration.name,                                                                                            // 84
				avatar: integration.avatar,                                                                                        // 85
				emoji: integration.emoji,                                                                                          // 86
				alias: integration.alias,                                                                                          // 87
				channel: channels,                                                                                                 // 88
				script: integration.script,                                                                                        // 89
				scriptEnabled: integration.scriptEnabled,                                                                          // 90
				scriptCompiled: integration.scriptCompiled,                                                                        // 91
				scriptError: integration.scriptError,                                                                              // 92
				_updatedAt: new Date(),                                                                                            // 93
				_updatedBy: RocketChat.models.Users.findOne(this.userId, {                                                         // 94
					fields: {                                                                                                         // 94
						username: 1                                                                                                      // 94
					}                                                                                                                 // 94
				})                                                                                                                 // 94
			}                                                                                                                   // 82
		});                                                                                                                  // 81
		return RocketChat.models.Integrations.findOne(integrationId);                                                        // 98
	}                                                                                                                     // 99
});                                                                                                                    // 4
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"deleteIncomingIntegration.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/methods/incoming/deleteIncomingIntegration.js                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	deleteIncomingIntegration: function (integrationId) {                                                                 // 2
		var integration = void 0;                                                                                            // 3
                                                                                                                       //
		if (RocketChat.authz.hasPermission(this.userId, 'manage-integrations')) {                                            // 5
			integration = RocketChat.models.Integrations.findOne(integrationId);                                                // 6
		} else if (RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations')) {                                 // 7
			integration = RocketChat.models.Integrations.findOne(integrationId, {                                               // 8
				fields: {                                                                                                          // 8
					'_createdBy._id': this.userId                                                                                     // 8
				}                                                                                                                  // 8
			});                                                                                                                 // 8
		} else {                                                                                                             // 9
			throw new Meteor.Error('not_authorized', 'Unauthorized', {                                                          // 10
				method: 'deleteIncomingIntegration'                                                                                // 10
			});                                                                                                                 // 10
		}                                                                                                                    // 11
                                                                                                                       //
		if (!integration) {                                                                                                  // 13
			throw new Meteor.Error('error-invalid-integration', 'Invalid integration', {                                        // 14
				method: 'deleteIncomingIntegration'                                                                                // 14
			});                                                                                                                 // 14
		}                                                                                                                    // 15
                                                                                                                       //
		RocketChat.models.Integrations.remove({                                                                              // 17
			_id: integrationId                                                                                                  // 17
		});                                                                                                                  // 17
		return true;                                                                                                         // 19
	}                                                                                                                     // 20
});                                                                                                                    // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"outgoing":{"addOutgoingIntegration.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/methods/outgoing/addOutgoingIntegration.js                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	addOutgoingIntegration: function (integration) {                                                                      // 2
		if (!RocketChat.authz.hasPermission(this.userId, 'manage-integrations') && !RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations') && !RocketChat.authz.hasPermission(this.userId, 'manage-integrations', 'bot') && !RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations', 'bot')) {
			throw new Meteor.Error('not_authorized');                                                                           // 7
		}                                                                                                                    // 8
                                                                                                                       //
		integration = RocketChat.integrations.validateOutgoing(integration, this.userId);                                    // 10
		integration._createdAt = new Date();                                                                                 // 12
		integration._createdBy = RocketChat.models.Users.findOne(this.userId, {                                              // 13
			fields: {                                                                                                           // 13
				username: 1                                                                                                        // 13
			}                                                                                                                   // 13
		});                                                                                                                  // 13
		integration._id = RocketChat.models.Integrations.insert(integration);                                                // 14
		return integration;                                                                                                  // 16
	}                                                                                                                     // 17
});                                                                                                                    // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"updateOutgoingIntegration.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/methods/outgoing/updateOutgoingIntegration.js                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	updateOutgoingIntegration: function (integrationId, integration) {                                                    // 2
		integration = RocketChat.integrations.validateOutgoing(integration, this.userId);                                    // 3
                                                                                                                       //
		if (!integration.token || integration.token.trim() === '') {                                                         // 5
			throw new Meteor.Error('error-invalid-token', 'Invalid token', {                                                    // 6
				method: 'updateOutgoingIntegration'                                                                                // 6
			});                                                                                                                 // 6
		}                                                                                                                    // 7
                                                                                                                       //
		var currentIntegration = void 0;                                                                                     // 9
                                                                                                                       //
		if (RocketChat.authz.hasPermission(this.userId, 'manage-integrations')) {                                            // 11
			currentIntegration = RocketChat.models.Integrations.findOne(integrationId);                                         // 12
		} else if (RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations')) {                                 // 13
			currentIntegration = RocketChat.models.Integrations.findOne({                                                       // 14
				_id: integrationId,                                                                                                // 14
				'_createdBy._id': this.userId                                                                                      // 14
			});                                                                                                                 // 14
		} else {                                                                                                             // 15
			throw new Meteor.Error('not_authorized', 'Unauthorized', {                                                          // 16
				method: 'updateOutgoingIntegration'                                                                                // 16
			});                                                                                                                 // 16
		}                                                                                                                    // 17
                                                                                                                       //
		if (!currentIntegration) {                                                                                           // 19
			throw new Meteor.Error('invalid_integration', '[methods] updateOutgoingIntegration -> integration not found');      // 20
		}                                                                                                                    // 21
                                                                                                                       //
		RocketChat.models.Integrations.update(integrationId, {                                                               // 23
			$set: {                                                                                                             // 24
				event: integration.event,                                                                                          // 25
				enabled: integration.enabled,                                                                                      // 26
				name: integration.name,                                                                                            // 27
				avatar: integration.avatar,                                                                                        // 28
				emoji: integration.emoji,                                                                                          // 29
				alias: integration.alias,                                                                                          // 30
				channel: integration.channel,                                                                                      // 31
				targetRoom: integration.targetRoom,                                                                                // 32
				impersonateUser: integration.impersonateUser,                                                                      // 33
				username: integration.username,                                                                                    // 34
				userId: integration.userId,                                                                                        // 35
				urls: integration.urls,                                                                                            // 36
				token: integration.token,                                                                                          // 37
				script: integration.script,                                                                                        // 38
				scriptEnabled: integration.scriptEnabled,                                                                          // 39
				scriptCompiled: integration.scriptCompiled,                                                                        // 40
				scriptError: integration.scriptError,                                                                              // 41
				triggerWords: integration.triggerWords,                                                                            // 42
				retryFailedCalls: integration.retryFailedCalls,                                                                    // 43
				retryCount: integration.retryCount,                                                                                // 44
				retryDelay: integration.retryDelay,                                                                                // 45
				triggerWordAnywhere: integration.triggerWordAnywhere,                                                              // 46
				_updatedAt: new Date(),                                                                                            // 47
				_updatedBy: RocketChat.models.Users.findOne(this.userId, {                                                         // 48
					fields: {                                                                                                         // 48
						username: 1                                                                                                      // 48
					}                                                                                                                 // 48
				})                                                                                                                 // 48
			}                                                                                                                   // 24
		});                                                                                                                  // 23
		return RocketChat.models.Integrations.findOne(integrationId);                                                        // 52
	}                                                                                                                     // 53
});                                                                                                                    // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"replayOutgoingIntegration.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/methods/outgoing/replayOutgoingIntegration.js                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	replayOutgoingIntegration: function (_ref) {                                                                          // 2
		var integrationId = _ref.integrationId,                                                                              // 2
		    historyId = _ref.historyId;                                                                                      // 2
		var integration = void 0;                                                                                            // 3
                                                                                                                       //
		if (RocketChat.authz.hasPermission(this.userId, 'manage-integrations') || RocketChat.authz.hasPermission(this.userId, 'manage-integrations', 'bot')) {
			integration = RocketChat.models.Integrations.findOne(integrationId);                                                // 6
		} else if (RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations') || RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations', 'bot')) {
			integration = RocketChat.models.Integrations.findOne(integrationId, {                                               // 8
				fields: {                                                                                                          // 8
					'_createdBy._id': this.userId                                                                                     // 8
				}                                                                                                                  // 8
			});                                                                                                                 // 8
		} else {                                                                                                             // 9
			throw new Meteor.Error('not_authorized', 'Unauthorized', {                                                          // 10
				method: 'replayOutgoingIntegration'                                                                                // 10
			});                                                                                                                 // 10
		}                                                                                                                    // 11
                                                                                                                       //
		if (!integration) {                                                                                                  // 13
			throw new Meteor.Error('error-invalid-integration', 'Invalid integration', {                                        // 14
				method: 'replayOutgoingIntegration'                                                                                // 14
			});                                                                                                                 // 14
		}                                                                                                                    // 15
                                                                                                                       //
		var history = RocketChat.models.IntegrationHistory.findOneByIntegrationIdAndHistoryId(integration._id, historyId);   // 17
                                                                                                                       //
		if (!history) {                                                                                                      // 19
			throw new Meteor.Error('error-invalid-integration-history', 'Invalid Integration History', {                        // 20
				method: 'replayOutgoingIntegration'                                                                                // 20
			});                                                                                                                 // 20
		}                                                                                                                    // 21
                                                                                                                       //
		RocketChat.integrations.triggerHandler.replay(integration, history);                                                 // 23
		return true;                                                                                                         // 25
	}                                                                                                                     // 26
});                                                                                                                    // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"deleteOutgoingIntegration.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/methods/outgoing/deleteOutgoingIntegration.js                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	deleteOutgoingIntegration: function (integrationId) {                                                                 // 2
		var integration = void 0;                                                                                            // 3
                                                                                                                       //
		if (RocketChat.authz.hasPermission(this.userId, 'manage-integrations') || RocketChat.authz.hasPermission(this.userId, 'manage-integrations', 'bot')) {
			integration = RocketChat.models.Integrations.findOne(integrationId);                                                // 6
		} else if (RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations') || RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations', 'bot')) {
			integration = RocketChat.models.Integrations.findOne(integrationId, {                                               // 8
				fields: {                                                                                                          // 8
					'_createdBy._id': this.userId                                                                                     // 8
				}                                                                                                                  // 8
			});                                                                                                                 // 8
		} else {                                                                                                             // 9
			throw new Meteor.Error('not_authorized', 'Unauthorized', {                                                          // 10
				method: 'deleteOutgoingIntegration'                                                                                // 10
			});                                                                                                                 // 10
		}                                                                                                                    // 11
                                                                                                                       //
		if (!integration) {                                                                                                  // 13
			throw new Meteor.Error('error-invalid-integration', 'Invalid integration', {                                        // 14
				method: 'deleteOutgoingIntegration'                                                                                // 14
			});                                                                                                                 // 14
		}                                                                                                                    // 15
                                                                                                                       //
		RocketChat.models.Integrations.remove({                                                                              // 17
			_id: integrationId                                                                                                  // 17
		});                                                                                                                  // 17
		RocketChat.models.IntegrationHistory.removeByIntegrationId(integrationId);                                           // 18
		return true;                                                                                                         // 20
	}                                                                                                                     // 21
});                                                                                                                    // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"clearIntegrationHistory.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/methods/clearIntegrationHistory.js                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	clearIntegrationHistory: function (integrationId) {                                                                   // 2
		var integration = void 0;                                                                                            // 3
                                                                                                                       //
		if (RocketChat.authz.hasPermission(this.userId, 'manage-integrations') || RocketChat.authz.hasPermission(this.userId, 'manage-integrations', 'bot')) {
			integration = RocketChat.models.Integrations.findOne(integrationId);                                                // 6
		} else if (RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations') || RocketChat.authz.hasPermission(this.userId, 'manage-own-integrations', 'bot')) {
			integration = RocketChat.models.Integrations.findOne(integrationId, {                                               // 8
				fields: {                                                                                                          // 8
					'_createdBy._id': this.userId                                                                                     // 8
				}                                                                                                                  // 8
			});                                                                                                                 // 8
		} else {                                                                                                             // 9
			throw new Meteor.Error('not_authorized', 'Unauthorized', {                                                          // 10
				method: 'clearIntegrationHistory'                                                                                  // 10
			});                                                                                                                 // 10
		}                                                                                                                    // 11
                                                                                                                       //
		if (!integration) {                                                                                                  // 13
			throw new Meteor.Error('error-invalid-integration', 'Invalid integration', {                                        // 14
				method: 'clearIntegrationHistory'                                                                                  // 14
			});                                                                                                                 // 14
		}                                                                                                                    // 15
                                                                                                                       //
		RocketChat.models.IntegrationHistory.removeByIntegrationId(integrationId);                                           // 17
		return true;                                                                                                         // 19
	}                                                                                                                     // 20
});                                                                                                                    // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"api":{"api.coffee.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/api/api.coffee.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Api, addIntegrationRest, compiledScripts, createIntegration, executeIntegrationRest, getIntegrationScript, integrationInfoRest, integrationSampleRest, removeIntegration, removeIntegrationRest, vm;
vm = Npm.require('vm');                                                                                                //
compiledScripts = {};                                                                                                  //
                                                                                                                       //
getIntegrationScript = function (integration) {                                                                        //
  var compiledScript, e, sandbox, script, vmScript;                                                                    //
  compiledScript = compiledScripts[integration._id];                                                                   //
                                                                                                                       //
  if (compiledScript != null && +compiledScript._updatedAt === +integration._updatedAt) {                              //
    return compiledScript.script;                                                                                      //
  }                                                                                                                    //
                                                                                                                       //
  script = integration.scriptCompiled;                                                                                 //
  vmScript = void 0;                                                                                                   //
  sandbox = {                                                                                                          //
    _: _,                                                                                                              //
    s: s,                                                                                                              //
    console: console,                                                                                                  //
    Store: {                                                                                                           //
      set: function (key, val) {                                                                                       //
        return store[key] = val;                                                                                       //
      },                                                                                                               //
      get: function (key) {                                                                                            //
        return store[key];                                                                                             //
      }                                                                                                                //
    },                                                                                                                 //
    HTTP: function (method, url, options) {                                                                            //
      var e;                                                                                                           //
                                                                                                                       //
      try {                                                                                                            //
        return {                                                                                                       //
          result: HTTP.call(method, url, options)                                                                      //
        };                                                                                                             //
      } catch (error) {                                                                                                //
        e = error;                                                                                                     //
        return {                                                                                                       //
          error: e                                                                                                     //
        };                                                                                                             //
      }                                                                                                                //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       //
  try {                                                                                                                //
    logger.incoming.info('Will evaluate script of Trigger', integration.name);                                         //
    logger.incoming.debug(script);                                                                                     //
    vmScript = vm.createScript(script, 'script.js');                                                                   //
    vmScript.runInNewContext(sandbox);                                                                                 //
                                                                                                                       //
    if (sandbox.Script != null) {                                                                                      //
      compiledScripts[integration._id] = {                                                                             //
        script: new sandbox.Script(),                                                                                  //
        _updatedAt: integration._updatedAt                                                                             //
      };                                                                                                               //
      return compiledScripts[integration._id].script;                                                                  //
    }                                                                                                                  //
  } catch (error) {                                                                                                    //
    e = error;                                                                                                         //
    logger.incoming.error('[Error evaluating Script in Trigger', integration.name, ':]');                              //
    logger.incoming.error(script.replace(/^/gm, '  '));                                                                //
    logger.incoming.error("[Stack:]");                                                                                 //
    logger.incoming.error(e.stack.replace(/^/gm, '  '));                                                               //
    throw RocketChat.API.v1.failure('error-evaluating-script');                                                        //
  }                                                                                                                    //
                                                                                                                       //
  if (sandbox.Script == null) {                                                                                        //
    logger.incoming.error('[Class "Script" not in Trigger', integration.name, ']');                                    //
    throw RocketChat.API.v1.failure('class-script-not-found');                                                         //
  }                                                                                                                    //
};                                                                                                                     //
                                                                                                                       //
Api = new Restivus({                                                                                                   //
  enableCors: true,                                                                                                    //
  apiPath: 'hooks/',                                                                                                   //
  auth: {                                                                                                              //
    user: function () {                                                                                                //
      var e, payloadIsWrapped, payloadKeys, ref, user;                                                                 //
      payloadKeys = Object.keys(this.bodyParams);                                                                      //
      payloadIsWrapped = ((ref = this.bodyParams) != null ? ref.payload : void 0) != null && payloadKeys.length === 1;
                                                                                                                       //
      if (payloadIsWrapped && this.request.headers['content-type'] === 'application/x-www-form-urlencoded') {          //
        try {                                                                                                          //
          this.bodyParams = JSON.parse(this.bodyParams.payload);                                                       //
        } catch (error) {                                                                                              //
          e = error;                                                                                                   //
          return {                                                                                                     //
            error: {                                                                                                   //
              statusCode: 400,                                                                                         //
              body: {                                                                                                  //
                success: false,                                                                                        //
                error: e.message                                                                                       //
              }                                                                                                        //
            }                                                                                                          //
          };                                                                                                           //
        }                                                                                                              //
      }                                                                                                                //
                                                                                                                       //
      this.integration = RocketChat.models.Integrations.findOne({                                                      //
        _id: this.request.params.integrationId,                                                                        //
        token: decodeURIComponent(this.request.params.token)                                                           //
      });                                                                                                              //
                                                                                                                       //
      if (this.integration == null) {                                                                                  //
        logger.incoming.info("Invalid integration id", this.request.params.integrationId, "or token", this.request.params.token);
        return;                                                                                                        //
      }                                                                                                                //
                                                                                                                       //
      user = RocketChat.models.Users.findOne({                                                                         //
        _id: this.integration.userId                                                                                   //
      });                                                                                                              //
      return {                                                                                                         //
        user: user                                                                                                     //
      };                                                                                                               //
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
createIntegration = function (options, user) {                                                                         //
  logger.incoming.info('Add integration', options.name);                                                               //
  logger.incoming.debug(options);                                                                                      //
  Meteor.runAsUser(user._id, function (_this) {                                                                        //
    return function () {                                                                                               //
      switch (options['event']) {                                                                                      //
        case 'newMessageOnChannel':                                                                                    //
          if (options.data == null) {                                                                                  //
            options.data = {};                                                                                         //
          }                                                                                                            //
                                                                                                                       //
          if (options.data.channel_name != null && options.data.channel_name.indexOf('#') === -1) {                    //
            options.data.channel_name = '#' + options.data.channel_name;                                               //
          }                                                                                                            //
                                                                                                                       //
          return Meteor.call('addOutgoingIntegration', {                                                               //
            username: 'rocket.cat',                                                                                    //
            urls: [options.target_url],                                                                                //
            name: options.name,                                                                                        //
            channel: options.data.channel_name,                                                                        //
            triggerWords: options.data.trigger_words                                                                   //
          });                                                                                                          //
                                                                                                                       //
        case 'newMessageToUser':                                                                                       //
          if (options.data.username.indexOf('@') === -1) {                                                             //
            options.data.username = '@' + options.data.username;                                                       //
          }                                                                                                            //
                                                                                                                       //
          return Meteor.call('addOutgoingIntegration', {                                                               //
            username: 'rocket.cat',                                                                                    //
            urls: [options.target_url],                                                                                //
            name: options.name,                                                                                        //
            channel: options.data.username,                                                                            //
            triggerWords: options.data.trigger_words                                                                   //
          });                                                                                                          //
      }                                                                                                                //
    };                                                                                                                 //
  }(this));                                                                                                            //
  return RocketChat.API.v1.success();                                                                                  //
};                                                                                                                     //
                                                                                                                       //
removeIntegration = function (options, user) {                                                                         //
  var integrationToRemove;                                                                                             //
  logger.incoming.info('Remove integration');                                                                          //
  logger.incoming.debug(options);                                                                                      //
  integrationToRemove = RocketChat.models.Integrations.findOne({                                                       //
    urls: options.target_url                                                                                           //
  });                                                                                                                  //
  Meteor.runAsUser(user._id, function (_this) {                                                                        //
    return function () {                                                                                               //
      return Meteor.call('deleteOutgoingIntegration', integrationToRemove._id);                                        //
    };                                                                                                                 //
  }(this));                                                                                                            //
  return RocketChat.API.v1.success();                                                                                  //
};                                                                                                                     //
                                                                                                                       //
executeIntegrationRest = function () {                                                                                 //
  var defaultValues, e, message, ref, ref1, request, result, sandbox, script;                                          //
  logger.incoming.info('Post integration', this.integration.name);                                                     //
  logger.incoming.debug('@urlParams', this.urlParams);                                                                 //
  logger.incoming.debug('@bodyParams', this.bodyParams);                                                               //
                                                                                                                       //
  if (this.integration.enabled !== true) {                                                                             //
    return {                                                                                                           //
      statusCode: 503,                                                                                                 //
      body: 'Service Unavailable'                                                                                      //
    };                                                                                                                 //
  }                                                                                                                    //
                                                                                                                       //
  defaultValues = {                                                                                                    //
    channel: this.integration.channel,                                                                                 //
    alias: this.integration.alias,                                                                                     //
    avatar: this.integration.avatar,                                                                                   //
    emoji: this.integration.emoji                                                                                      //
  };                                                                                                                   //
                                                                                                                       //
  if (this.integration.scriptEnabled === true && this.integration.scriptCompiled != null && this.integration.scriptCompiled.trim() !== '') {
    script = void 0;                                                                                                   //
                                                                                                                       //
    try {                                                                                                              //
      script = getIntegrationScript(this.integration);                                                                 //
    } catch (error) {                                                                                                  //
      e = error;                                                                                                       //
      return e;                                                                                                        //
    }                                                                                                                  //
                                                                                                                       //
    request = {                                                                                                        //
      url: {                                                                                                           //
        hash: this.request._parsedUrl.hash,                                                                            //
        search: this.request._parsedUrl.search,                                                                        //
        query: this.queryParams,                                                                                       //
        pathname: this.request._parsedUrl.pathname,                                                                    //
        path: this.request._parsedUrl.path                                                                             //
      },                                                                                                               //
      url_raw: this.request.url,                                                                                       //
      url_params: this.urlParams,                                                                                      //
      content: this.bodyParams,                                                                                        //
      content_raw: (ref = this.request._readableState) != null ? (ref1 = ref.buffer) != null ? ref1.toString() : void 0 : void 0,
      headers: this.request.headers,                                                                                   //
      user: {                                                                                                          //
        _id: this.user._id,                                                                                            //
        name: this.user.name,                                                                                          //
        username: this.user.username                                                                                   //
      }                                                                                                                //
    };                                                                                                                 //
                                                                                                                       //
    try {                                                                                                              //
      sandbox = {                                                                                                      //
        _: _,                                                                                                          //
        s: s,                                                                                                          //
        console: console,                                                                                              //
        Store: {                                                                                                       //
          set: function (key, val) {                                                                                   //
            return store[key] = val;                                                                                   //
          },                                                                                                           //
          get: function (key) {                                                                                        //
            return store[key];                                                                                         //
          }                                                                                                            //
        },                                                                                                             //
        HTTP: function (method, url, options) {                                                                        //
          try {                                                                                                        //
            return {                                                                                                   //
              result: HTTP.call(method, url, options)                                                                  //
            };                                                                                                         //
          } catch (error) {                                                                                            //
            e = error;                                                                                                 //
            return {                                                                                                   //
              error: e                                                                                                 //
            };                                                                                                         //
          }                                                                                                            //
        },                                                                                                             //
        script: script,                                                                                                //
        request: request                                                                                               //
      };                                                                                                               //
      result = vm.runInNewContext('script.process_incoming_request({ request: request })', sandbox, {                  //
        timeout: 3000                                                                                                  //
      });                                                                                                              //
                                                                                                                       //
      if ((result != null ? result.error : void 0) != null) {                                                          //
        return RocketChat.API.v1.failure(result.error);                                                                //
      }                                                                                                                //
                                                                                                                       //
      this.bodyParams = result != null ? result.content : void 0;                                                      //
      logger.incoming.debug('[Process Incoming Request result of Trigger', this.integration.name, ':]');               //
      logger.incoming.debug('result', this.bodyParams);                                                                //
    } catch (error) {                                                                                                  //
      e = error;                                                                                                       //
      logger.incoming.error('[Error running Script in Trigger', this.integration.name, ':]');                          //
      logger.incoming.error(this.integration.scriptCompiled.replace(/^/gm, '  '));                                     //
      logger.incoming.error("[Stack:]");                                                                               //
      logger.incoming.error(e.stack.replace(/^/gm, '  '));                                                             //
      return RocketChat.API.v1.failure('error-running-script');                                                        //
    }                                                                                                                  //
  }                                                                                                                    //
                                                                                                                       //
  if (this.bodyParams == null) {                                                                                       //
    return RocketChat.API.v1.failure('body-empty');                                                                    //
  }                                                                                                                    //
                                                                                                                       //
  this.bodyParams.bot = {                                                                                              //
    i: this.integration._id                                                                                            //
  };                                                                                                                   //
                                                                                                                       //
  try {                                                                                                                //
    message = processWebhookMessage(this.bodyParams, this.user, defaultValues);                                        //
                                                                                                                       //
    if (_.isEmpty(message)) {                                                                                          //
      return RocketChat.API.v1.failure('unknown-error');                                                               //
    }                                                                                                                  //
                                                                                                                       //
    return RocketChat.API.v1.success();                                                                                //
  } catch (error) {                                                                                                    //
    e = error;                                                                                                         //
    return RocketChat.API.v1.failure(e.error);                                                                         //
  }                                                                                                                    //
};                                                                                                                     //
                                                                                                                       //
addIntegrationRest = function () {                                                                                     //
  return createIntegration(this.bodyParams, this.user);                                                                //
};                                                                                                                     //
                                                                                                                       //
removeIntegrationRest = function () {                                                                                  //
  return removeIntegration(this.bodyParams, this.user);                                                                //
};                                                                                                                     //
                                                                                                                       //
integrationSampleRest = function () {                                                                                  //
  logger.incoming.info('Sample Integration');                                                                          //
  return {                                                                                                             //
    statusCode: 200,                                                                                                   //
    body: [{                                                                                                           //
      token: Random.id(24),                                                                                            //
      channel_id: Random.id(),                                                                                         //
      channel_name: 'general',                                                                                         //
      timestamp: new Date(),                                                                                           //
      user_id: Random.id(),                                                                                            //
      user_name: 'rocket.cat',                                                                                         //
      text: 'Sample text 1',                                                                                           //
      trigger_word: 'Sample'                                                                                           //
    }, {                                                                                                               //
      token: Random.id(24),                                                                                            //
      channel_id: Random.id(),                                                                                         //
      channel_name: 'general',                                                                                         //
      timestamp: new Date(),                                                                                           //
      user_id: Random.id(),                                                                                            //
      user_name: 'rocket.cat',                                                                                         //
      text: 'Sample text 2',                                                                                           //
      trigger_word: 'Sample'                                                                                           //
    }, {                                                                                                               //
      token: Random.id(24),                                                                                            //
      channel_id: Random.id(),                                                                                         //
      channel_name: 'general',                                                                                         //
      timestamp: new Date(),                                                                                           //
      user_id: Random.id(),                                                                                            //
      user_name: 'rocket.cat',                                                                                         //
      text: 'Sample text 3',                                                                                           //
      trigger_word: 'Sample'                                                                                           //
    }]                                                                                                                 //
  };                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
integrationInfoRest = function () {                                                                                    //
  logger.incoming.info('Info integration');                                                                            //
  return {                                                                                                             //
    statusCode: 200,                                                                                                   //
    body: {                                                                                                            //
      success: true                                                                                                    //
    }                                                                                                                  //
  };                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
Api.addRoute(':integrationId/:userId/:token', {                                                                        //
  authRequired: true                                                                                                   //
}, {                                                                                                                   //
  post: executeIntegrationRest,                                                                                        //
  get: executeIntegrationRest                                                                                          //
});                                                                                                                    //
Api.addRoute(':integrationId/:token', {                                                                                //
  authRequired: true                                                                                                   //
}, {                                                                                                                   //
  post: executeIntegrationRest,                                                                                        //
  get: executeIntegrationRest                                                                                          //
});                                                                                                                    //
Api.addRoute('sample/:integrationId/:userId/:token', {                                                                 //
  authRequired: true                                                                                                   //
}, {                                                                                                                   //
  get: integrationSampleRest                                                                                           //
});                                                                                                                    //
Api.addRoute('sample/:integrationId/:token', {                                                                         //
  authRequired: true                                                                                                   //
}, {                                                                                                                   //
  get: integrationSampleRest                                                                                           //
});                                                                                                                    //
Api.addRoute('info/:integrationId/:userId/:token', {                                                                   //
  authRequired: true                                                                                                   //
}, {                                                                                                                   //
  get: integrationInfoRest                                                                                             //
});                                                                                                                    //
Api.addRoute('info/:integrationId/:token', {                                                                           //
  authRequired: true                                                                                                   //
}, {                                                                                                                   //
  get: integrationInfoRest                                                                                             //
});                                                                                                                    //
Api.addRoute('add/:integrationId/:userId/:token', {                                                                    //
  authRequired: true                                                                                                   //
}, {                                                                                                                   //
  post: addIntegrationRest                                                                                             //
});                                                                                                                    //
Api.addRoute('add/:integrationId/:token', {                                                                            //
  authRequired: true                                                                                                   //
}, {                                                                                                                   //
  post: addIntegrationRest                                                                                             //
});                                                                                                                    //
Api.addRoute('remove/:integrationId/:userId/:token', {                                                                 //
  authRequired: true                                                                                                   //
}, {                                                                                                                   //
  post: removeIntegrationRest                                                                                          //
});                                                                                                                    //
Api.addRoute('remove/:integrationId/:token', {                                                                         //
  authRequired: true                                                                                                   //
}, {                                                                                                                   //
  post: removeIntegrationRest                                                                                          //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"triggers.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/triggers.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var callbackHandler = function () {                                                                                    // 1
	function _callbackHandler(eventType) {                                                                                // 1
		return function () {                                                                                                 // 2
			function _wrapperFunction() {                                                                                       // 2
				var _RocketChat$integrati;                                                                                         // 2
                                                                                                                       //
				return (_RocketChat$integrati = RocketChat.integrations.triggerHandler).executeTriggers.apply(_RocketChat$integrati, [eventType].concat(Array.prototype.slice.call(arguments)));
			}                                                                                                                   // 4
                                                                                                                       //
			return _wrapperFunction;                                                                                            // 2
		}();                                                                                                                 // 2
	}                                                                                                                     // 5
                                                                                                                       //
	return _callbackHandler;                                                                                              // 1
}();                                                                                                                   // 1
                                                                                                                       //
RocketChat.callbacks.add('afterSaveMessage', callbackHandler('sendMessage'), RocketChat.callbacks.priority.LOW);       // 7
RocketChat.callbacks.add('afterCreateChannel', callbackHandler('roomCreated'), RocketChat.callbacks.priority.LOW);     // 8
RocketChat.callbacks.add('afterCreatePrivateGroup', callbackHandler('roomCreated'), RocketChat.callbacks.priority.LOW);
RocketChat.callbacks.add('afterCreateUser', callbackHandler('userCreated'), RocketChat.callbacks.priority.LOW);        // 10
RocketChat.callbacks.add('afterJoinRoom', callbackHandler('roomJoined'), RocketChat.callbacks.priority.LOW);           // 11
RocketChat.callbacks.add('afterLeaveRoom', callbackHandler('roomLeft'), RocketChat.callbacks.priority.LOW);            // 12
RocketChat.callbacks.add('afterRoomArchived', callbackHandler('roomArchived'), RocketChat.callbacks.priority.LOW);     // 13
RocketChat.callbacks.add('afterFileUpload', callbackHandler('fileUploaded'), RocketChat.callbacks.priority.LOW);       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"processWebhookMessage.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_integrations/server/processWebhookMessage.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
this.processWebhookMessage = function (messageObj, user) {                                                             // 1
	var defaultValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {                             // 1
		channel: '',                                                                                                         // 1
		alias: '',                                                                                                           // 1
		avatar: '',                                                                                                          // 1
		emoji: ''                                                                                                            // 1
	};                                                                                                                    // 1
	var sentData = [];                                                                                                    // 2
	var channels = [].concat(messageObj.channel || messageObj.roomId || defaultValues.channel);                           // 3
                                                                                                                       //
	for (var _iterator = channels, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		var _ref;                                                                                                            // 5
                                                                                                                       //
		if (_isArray) {                                                                                                      // 5
			if (_i >= _iterator.length) break;                                                                                  // 5
			_ref = _iterator[_i++];                                                                                             // 5
		} else {                                                                                                             // 5
			_i = _iterator.next();                                                                                              // 5
			if (_i.done) break;                                                                                                 // 5
			_ref = _i.value;                                                                                                    // 5
		}                                                                                                                    // 5
                                                                                                                       //
		var channel = _ref;                                                                                                  // 5
		var channelType = channel[0];                                                                                        // 6
		var channelValue = channel.substr(1);                                                                                // 8
		var room = void 0;                                                                                                   // 9
                                                                                                                       //
		switch (channelType) {                                                                                               // 11
			case '#':                                                                                                           // 12
				room = RocketChat.getRoomByNameOrIdWithOptionToJoin({                                                              // 13
					currentUserId: user._id,                                                                                          // 13
					nameOrId: channelValue,                                                                                           // 13
					joinChannel: true                                                                                                 // 13
				});                                                                                                                // 13
				break;                                                                                                             // 14
                                                                                                                       //
			case '@':                                                                                                           // 15
				room = RocketChat.getRoomByNameOrIdWithOptionToJoin({                                                              // 16
					currentUserId: user._id,                                                                                          // 16
					nameOrId: channelValue,                                                                                           // 16
					type: 'd'                                                                                                         // 16
				});                                                                                                                // 16
				break;                                                                                                             // 17
                                                                                                                       //
			default:                                                                                                            // 18
				channelValue = channelType + channelValue; //Try to find the room by id or name if they didn't include the prefix.
                                                                                                                       //
				room = RocketChat.getRoomByNameOrIdWithOptionToJoin({                                                              // 22
					currentUserId: user._id,                                                                                          // 22
					nameOrId: channelValue,                                                                                           // 22
					joinChannel: true,                                                                                                // 22
					errorOnEmpty: false                                                                                               // 22
				});                                                                                                                // 22
                                                                                                                       //
				if (room) {                                                                                                        // 23
					break;                                                                                                            // 24
				} //We didn't get a room, let's try finding direct messages                                                        // 25
                                                                                                                       //
                                                                                                                       //
				room = RocketChat.getRoomByNameOrIdWithOptionToJoin({                                                              // 28
					currentUserId: user._id,                                                                                          // 28
					nameOrId: channelValue,                                                                                           // 28
					type: 'd',                                                                                                        // 28
					tryDirectByUserIdOnly: true                                                                                       // 28
				});                                                                                                                // 28
                                                                                                                       //
				if (room) {                                                                                                        // 29
					break;                                                                                                            // 30
				} //No room, so throw an error                                                                                     // 31
                                                                                                                       //
                                                                                                                       //
				throw new Meteor.Error('invalid-channel');                                                                         // 34
		}                                                                                                                    // 11
                                                                                                                       //
		if (messageObj.attachments && !_.isArray(messageObj.attachments)) {                                                  // 37
			console.log('Attachments should be Array, ignoring value'.red, messageObj.attachments);                             // 38
			messageObj.attachments = undefined;                                                                                 // 39
		}                                                                                                                    // 40
                                                                                                                       //
		var message = {                                                                                                      // 42
			alias: messageObj.username || messageObj.alias || defaultValues.alias,                                              // 43
			msg: _.trim(messageObj.text || messageObj.msg || ''),                                                               // 44
			attachments: messageObj.attachments,                                                                                // 45
			parseUrls: messageObj.parseUrls !== undefined ? messageObj.parseUrls : !messageObj.attachments,                     // 46
			bot: messageObj.bot,                                                                                                // 47
			groupable: messageObj.groupable !== undefined ? messageObj.groupable : false                                        // 48
		};                                                                                                                   // 42
                                                                                                                       //
		if (!_.isEmpty(messageObj.icon_url) || !_.isEmpty(messageObj.avatar)) {                                              // 51
			message.avatar = messageObj.icon_url || messageObj.avatar;                                                          // 52
		} else if (!_.isEmpty(messageObj.icon_emoji) || !_.isEmpty(messageObj.emoji)) {                                      // 53
			message.emoji = messageObj.icon_emoji || messageObj.emoji;                                                          // 54
		} else if (!_.isEmpty(defaultValues.avatar)) {                                                                       // 55
			message.avatar = defaultValues.avatar;                                                                              // 56
		} else if (!_.isEmpty(defaultValues.emoji)) {                                                                        // 57
			message.emoji = defaultValues.emoji;                                                                                // 58
		}                                                                                                                    // 59
                                                                                                                       //
		if (_.isArray(message.attachments)) {                                                                                // 61
			for (var i = 0; i < message.attachments.length; i++) {                                                              // 62
				var attachment = message.attachments[i];                                                                           // 63
                                                                                                                       //
				if (attachment.msg) {                                                                                              // 64
					attachment.text = _.trim(attachment.msg);                                                                         // 65
					delete attachment.msg;                                                                                            // 66
				}                                                                                                                  // 67
			}                                                                                                                   // 68
		}                                                                                                                    // 69
                                                                                                                       //
		var messageReturn = RocketChat.sendMessage(user, message, room);                                                     // 71
		sentData.push({                                                                                                      // 72
			channel: channel,                                                                                                   // 72
			message: messageReturn                                                                                              // 72
		});                                                                                                                  // 72
	}                                                                                                                     // 73
                                                                                                                       //
	return sentData;                                                                                                      // 75
};                                                                                                                     // 76
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:integrations/lib/rocketchat.js");
require("./node_modules/meteor/rocketchat:integrations/server/logger.js");
require("./node_modules/meteor/rocketchat:integrations/server/lib/validation.js");
require("./node_modules/meteor/rocketchat:integrations/server/models/Integrations.js");
require("./node_modules/meteor/rocketchat:integrations/server/models/IntegrationHistory.js");
require("./node_modules/meteor/rocketchat:integrations/server/publications/integrations.js");
require("./node_modules/meteor/rocketchat:integrations/server/publications/integrationHistory.js");
require("./node_modules/meteor/rocketchat:integrations/server/methods/incoming/addIncomingIntegration.js");
require("./node_modules/meteor/rocketchat:integrations/server/methods/incoming/updateIncomingIntegration.js");
require("./node_modules/meteor/rocketchat:integrations/server/methods/incoming/deleteIncomingIntegration.js");
require("./node_modules/meteor/rocketchat:integrations/server/methods/outgoing/addOutgoingIntegration.js");
require("./node_modules/meteor/rocketchat:integrations/server/methods/outgoing/updateOutgoingIntegration.js");
require("./node_modules/meteor/rocketchat:integrations/server/methods/outgoing/replayOutgoingIntegration.js");
require("./node_modules/meteor/rocketchat:integrations/server/methods/outgoing/deleteOutgoingIntegration.js");
require("./node_modules/meteor/rocketchat:integrations/server/methods/clearIntegrationHistory.js");
require("./node_modules/meteor/rocketchat:integrations/server/api/api.coffee.js");
require("./node_modules/meteor/rocketchat:integrations/server/lib/triggerHandler.js");
require("./node_modules/meteor/rocketchat:integrations/server/triggers.js");
require("./node_modules/meteor/rocketchat:integrations/server/processWebhookMessage.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:integrations'] = {};

})();

//# sourceMappingURL=rocketchat_integrations.js.map
