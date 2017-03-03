(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var Logger = Package['rocketchat:logger'].Logger;
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
var logger;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:slackbridge":{"logger.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_slackbridge/logger.js                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals logger:true */ /* exported logger */logger = new Logger('SlackBridge', {                                   // 1
	sections: {                                                                                                          // 5
		connection: 'Connection',                                                                                           // 6
		events: 'Events',                                                                                                   // 7
		"class": 'Class'                                                                                                    // 8
	}                                                                                                                    // 5
});                                                                                                                   // 4
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"settings.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_slackbridge/settings.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.startup(function () {                                                                                          // 1
	RocketChat.settings.addGroup('SlackBridge', function () {                                                            // 2
		this.add('SlackBridge_Enabled', false, {                                                                            // 3
			type: 'boolean',                                                                                                   // 4
			i18nLabel: 'Enabled',                                                                                              // 5
			"public": true                                                                                                     // 6
		});                                                                                                                 // 3
		this.add('SlackBridge_APIToken', '', {                                                                              // 9
			type: 'string',                                                                                                    // 10
			enableQuery: {                                                                                                     // 11
				_id: 'SlackBridge_Enabled',                                                                                       // 12
				value: true                                                                                                       // 13
			},                                                                                                                 // 11
			i18nLabel: 'API_Token'                                                                                             // 15
		});                                                                                                                 // 9
		this.add('SlackBridge_AliasFormat', '', {                                                                           // 18
			type: 'string',                                                                                                    // 19
			enableQuery: {                                                                                                     // 20
				_id: 'SlackBridge_Enabled',                                                                                       // 21
				value: true                                                                                                       // 22
			},                                                                                                                 // 20
			i18nLabel: 'Alias_Format',                                                                                         // 24
			i18nDescription: 'Alias_Format_Description'                                                                        // 25
		});                                                                                                                 // 18
		this.add('SlackBridge_ExcludeBotnames', '', {                                                                       // 28
			type: 'string',                                                                                                    // 29
			enableQuery: {                                                                                                     // 30
				_id: 'SlackBridge_Enabled',                                                                                       // 31
				value: true                                                                                                       // 32
			},                                                                                                                 // 30
			i18nLabel: 'Exclude_Botnames',                                                                                     // 34
			i18nDescription: 'Exclude_Botnames_Description'                                                                    // 35
		});                                                                                                                 // 28
		this.add('SlackBridge_Out_Enabled', false, {                                                                        // 38
			type: 'boolean',                                                                                                   // 39
			enableQuery: {                                                                                                     // 40
				_id: 'SlackBridge_Enabled',                                                                                       // 41
				value: true                                                                                                       // 42
			}                                                                                                                  // 40
		});                                                                                                                 // 38
		this.add('SlackBridge_Out_All', false, {                                                                            // 46
			type: 'boolean',                                                                                                   // 47
			enableQuery: [{                                                                                                    // 48
				_id: 'SlackBridge_Enabled',                                                                                       // 49
				value: true                                                                                                       // 50
			}, {                                                                                                               // 48
				_id: 'SlackBridge_Out_Enabled',                                                                                   // 52
				value: true                                                                                                       // 53
			}]                                                                                                                 // 51
		});                                                                                                                 // 46
		this.add('SlackBridge_Out_Channels', '', {                                                                          // 57
			type: 'roomPick',                                                                                                  // 58
			enableQuery: [{                                                                                                    // 59
				_id: 'SlackBridge_Enabled',                                                                                       // 60
				value: true                                                                                                       // 61
			}, {                                                                                                               // 59
				_id: 'SlackBridge_Out_Enabled',                                                                                   // 63
				value: true                                                                                                       // 64
			}, {                                                                                                               // 62
				_id: 'SlackBridge_Out_All',                                                                                       // 66
				value: false                                                                                                      // 67
			}]                                                                                                                 // 65
		});                                                                                                                 // 57
	});                                                                                                                  // 70
});                                                                                                                   // 71
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"slackbridge.js":["babel-runtime/helpers/typeof","babel-runtime/helpers/classCallCheck",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_slackbridge/slackbridge.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                               //
                                                                                                                      //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                      //
                                                                                                                      //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                               //
                                                                                                                      //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
/* globals logger */var SlackBridge = function () {                                                                   // 1
	function SlackBridge() {                                                                                             // 5
		var _this = this;                                                                                                   // 5
                                                                                                                      //
		(0, _classCallCheck3.default)(this, SlackBridge);                                                                   // 5
		this.util = Npm.require('util');                                                                                    // 6
		this.slackClient = Npm.require('slack-client');                                                                     // 7
		this.apiToken = RocketChat.settings.get('SlackBridge_APIToken');                                                    // 8
		this.aliasFormat = RocketChat.settings.get('SlackBridge_AliasFormat');                                              // 9
		this.excludeBotnames = RocketChat.settings.get('SlackBridge_Botnames');                                             // 10
		this.rtm = {};                                                                                                      // 11
		this.connected = false;                                                                                             // 12
		this.userTags = {};                                                                                                 // 13
		this.slackChannelMap = {};                                                                                          // 14
		this.reactionsMap = new Map();                                                                                      // 15
		RocketChat.settings.get('SlackBridge_APIToken', function (key, value) {                                             // 17
			if (value !== _this.apiToken) {                                                                                    // 18
				_this.apiToken = value;                                                                                           // 19
                                                                                                                      //
				if (_this.connected) {                                                                                            // 20
					_this.disconnect();                                                                                              // 21
                                                                                                                      //
					_this.connect();                                                                                                 // 22
				}                                                                                                                 // 23
			}                                                                                                                  // 24
		});                                                                                                                 // 25
		RocketChat.settings.get('SlackBridge_AliasFormat', function (key, value) {                                          // 27
			_this.aliasFormat = value;                                                                                         // 28
		});                                                                                                                 // 29
		RocketChat.settings.get('SlackBridge_ExcludeBotnames', function (key, value) {                                      // 31
			_this.excludeBotnames = value;                                                                                     // 32
		});                                                                                                                 // 33
		RocketChat.settings.get('SlackBridge_Enabled', function (key, value) {                                              // 35
			if (value && _this.apiToken) {                                                                                     // 36
				_this.connect();                                                                                                  // 37
			} else {                                                                                                           // 38
				_this.disconnect();                                                                                               // 39
			}                                                                                                                  // 40
		});                                                                                                                 // 41
	}                                                                                                                    // 42
                                                                                                                      //
	SlackBridge.prototype.connect = function () {                                                                        //
		function connect() {                                                                                                //
			var _this2 = this;                                                                                                 // 44
                                                                                                                      //
			if (this.connected === false) {                                                                                    // 45
				this.connected = true;                                                                                            // 46
				logger.connection.info('Connecting via token: ', this.apiToken);                                                  // 47
				var RtmClient = this.slackClient.RtmClient;                                                                       // 48
				this.rtm = new RtmClient(this.apiToken);                                                                          // 49
				this.rtm.start();                                                                                                 // 50
				this.registerForSlackEvents();                                                                                    // 51
				RocketChat.settings.get('SlackBridge_Out_Enabled', function (key, value) {                                        // 52
					if (value) {                                                                                                     // 53
						_this2.registerForRocketEvents();                                                                               // 54
					} else {                                                                                                         // 55
						_this2.unregisterForRocketEvents();                                                                             // 56
					}                                                                                                                // 57
				});                                                                                                               // 58
				Meteor.startup(function () {                                                                                      // 59
					try {                                                                                                            // 60
						_this2.populateSlackChannelMap(); // If run outside of Meteor.startup, HTTP is not defined                      // 61
                                                                                                                      //
					} catch (err) {                                                                                                  // 62
						logger.class.error('Error attempting to connect to Slack', err);                                                // 63
                                                                                                                      //
						_this2.disconnect();                                                                                            // 64
					}                                                                                                                // 65
				});                                                                                                               // 66
			}                                                                                                                  // 67
		}                                                                                                                   // 68
                                                                                                                      //
		return connect;                                                                                                     //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.disconnect = function () {                                                                     //
		function disconnect() {                                                                                             //
			if (this.connected === true) {                                                                                     // 71
				this.connected = false;                                                                                           // 72
				this.rtm.disconnect && this.rtm.disconnect();                                                                     // 73
				logger.connection.info('Disconnected');                                                                           // 74
				this.unregisterForRocketEvents();                                                                                 // 75
			}                                                                                                                  // 76
		}                                                                                                                   // 77
                                                                                                                      //
		return disconnect;                                                                                                  //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.convertSlackMsgTxtToRocketTxtFormat = function () {                                            //
		function convertSlackMsgTxtToRocketTxtFormat(slackMsgTxt) {                                                         //
			var _this3 = this;                                                                                                 // 79
                                                                                                                      //
			if (!_.isEmpty(slackMsgTxt)) {                                                                                     // 80
				slackMsgTxt = slackMsgTxt.replace(/<!everyone>/g, '@all');                                                        // 81
				slackMsgTxt = slackMsgTxt.replace(/<!channel>/g, '@all');                                                         // 82
				slackMsgTxt = slackMsgTxt.replace(/&gt;/g, '<');                                                                  // 83
				slackMsgTxt = slackMsgTxt.replace(/&lt;/g, '>');                                                                  // 84
				slackMsgTxt = slackMsgTxt.replace(/&amp;/g, '&');                                                                 // 85
				slackMsgTxt = slackMsgTxt.replace(/:simple_smile:/g, ':smile:');                                                  // 86
				slackMsgTxt = slackMsgTxt.replace(/:memo:/g, ':pencil:');                                                         // 87
				slackMsgTxt = slackMsgTxt.replace(/:piggy:/g, ':pig:');                                                           // 88
				slackMsgTxt = slackMsgTxt.replace(/:uk:/g, ':gb:');                                                               // 89
				slackMsgTxt = slackMsgTxt.replace(/<(http[s]?:[^>]*)>/g, '$1');                                                   // 90
				slackMsgTxt.replace(/(?:<@)([a-zA-Z0-9]+)(?:\|.+)?(?:>)/g, function (match, userId) {                             // 92
					if (!_this3.userTags[userId]) {                                                                                  // 93
						_this3.findRocketUser(userId) || _this3.addRocketUser(userId); // This adds userTags for the userId             // 94
					}                                                                                                                // 95
                                                                                                                      //
					var userTags = _this3.userTags[userId];                                                                          // 96
                                                                                                                      //
					if (userTags) {                                                                                                  // 97
						slackMsgTxt = slackMsgTxt.replace(userTags.slack, userTags.rocket);                                             // 98
					}                                                                                                                // 99
				});                                                                                                               // 100
			} else {                                                                                                           // 101
				slackMsgTxt = '';                                                                                                 // 102
			}                                                                                                                  // 103
                                                                                                                      //
			return slackMsgTxt;                                                                                                // 104
		}                                                                                                                   // 105
                                                                                                                      //
		return convertSlackMsgTxtToRocketTxtFormat;                                                                         //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.findRocketChannel = function () {                                                              //
		function findRocketChannel(slackChannelId) {                                                                        //
			return RocketChat.models.Rooms.findOneByImportId(slackChannelId);                                                  // 108
		}                                                                                                                   // 109
                                                                                                                      //
		return findRocketChannel;                                                                                           //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.addRocketChannel = function () {                                                               //
		function addRocketChannel(slackChannelID) {                                                                         //
			var hasRetried = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;                        // 111
			logger.class.debug('Adding Rocket.Chat channel from Slack', slackChannelID);                                       // 112
			var slackResults = null;                                                                                           // 113
			var isGroup = false;                                                                                               // 114
                                                                                                                      //
			if (slackChannelID.charAt(0) === 'C') {                                                                            // 115
				slackResults = HTTP.get('https://slack.com/api/channels.info', {                                                  // 116
					params: {                                                                                                        // 116
						token: this.apiToken,                                                                                           // 116
						channel: slackChannelID                                                                                         // 116
					}                                                                                                                // 116
				});                                                                                                               // 116
			} else if (slackChannelID.charAt(0) === 'G') {                                                                     // 117
				slackResults = HTTP.get('https://slack.com/api/groups.info', {                                                    // 118
					params: {                                                                                                        // 118
						token: this.apiToken,                                                                                           // 118
						channel: slackChannelID                                                                                         // 118
					}                                                                                                                // 118
				});                                                                                                               // 118
				isGroup = true;                                                                                                   // 119
			}                                                                                                                  // 120
                                                                                                                      //
			if (slackResults && slackResults.data && slackResults.data.ok === true) {                                          // 121
				var rocketChannelData = isGroup ? slackResults.data.group : slackResults.data.channel;                            // 122
				var existingRocketRoom = RocketChat.models.Rooms.findOneByName(rocketChannelData.name); // If the room exists, make sure we have its id in importIds
                                                                                                                      //
				if (existingRocketRoom || rocketChannelData.is_general) {                                                         // 126
					rocketChannelData.rocketId = rocketChannelData.is_general ? 'GENERAL' : existingRocketRoom._id;                  // 127
					RocketChat.models.Rooms.addImportIds(rocketChannelData.rocketId, rocketChannelData.id);                          // 128
				} else {                                                                                                          // 129
					var rocketUsers = [];                                                                                            // 130
                                                                                                                      //
					for (var _iterator = rocketChannelData.members, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
						var _ref;                                                                                                       // 131
                                                                                                                      //
						if (_isArray) {                                                                                                 // 131
							if (_i >= _iterator.length) break;                                                                             // 131
							_ref = _iterator[_i++];                                                                                        // 131
						} else {                                                                                                        // 131
							_i = _iterator.next();                                                                                         // 131
							if (_i.done) break;                                                                                            // 131
							_ref = _i.value;                                                                                               // 131
						}                                                                                                               // 131
                                                                                                                      //
						var member = _ref;                                                                                              // 131
                                                                                                                      //
						if (member !== rocketChannelData.creator) {                                                                     // 132
							var rocketUser = this.findRocketUser(member) || this.addRocketUser(member);                                    // 133
                                                                                                                      //
							if (rocketUser && rocketUser.username) {                                                                       // 134
								rocketUsers.push(rocketUser.username);                                                                        // 135
							}                                                                                                              // 136
						}                                                                                                               // 137
					}                                                                                                                // 138
                                                                                                                      //
					var rocketUserCreator = rocketChannelData.creator ? this.findRocketUser(rocketChannelData.creator) || this.addRocketUser(rocketChannelData.creator) : null;
                                                                                                                      //
					if (!rocketUserCreator) {                                                                                        // 140
						logger.class.error('Could not fetch room creator information', rocketChannelData.creator);                      // 141
						return;                                                                                                         // 142
					}                                                                                                                // 143
                                                                                                                      //
					try {                                                                                                            // 145
						var rocketChannel = RocketChat.createRoom(isGroup ? 'p' : 'c', rocketChannelData.name, rocketUserCreator.username, rocketUsers);
						rocketChannelData.rocketId = rocketChannel.rid;                                                                 // 147
					} catch (e) {                                                                                                    // 148
						if (!hasRetried) {                                                                                              // 149
							logger.class.debug('Error adding channel from Slack. Will retry in 1s.', e.message); // If first time trying to create channel fails, could be because of multiple messages received at the same time. Try again once after 1s.
                                                                                                                      //
							Meteor._sleepForMs(1000);                                                                                      // 152
                                                                                                                      //
							return this.findRocketChannel(slackChannelID) || this.addRocketChannel(slackChannelID, true);                  // 153
						} else {                                                                                                        // 154
							console.log(e.message);                                                                                        // 155
						}                                                                                                               // 156
					}                                                                                                                // 157
                                                                                                                      //
					var roomUpdate = {                                                                                               // 159
						ts: new Date(rocketChannelData.created * 1000)                                                                  // 160
					};                                                                                                               // 159
					var lastSetTopic = 0;                                                                                            // 162
                                                                                                                      //
					if (!_.isEmpty(rocketChannelData.topic && rocketChannelData.topic.value)) {                                      // 163
						roomUpdate.topic = rocketChannelData.topic.value;                                                               // 164
						lastSetTopic = rocketChannelData.topic.last_set;                                                                // 165
					}                                                                                                                // 166
                                                                                                                      //
					if (!_.isEmpty(rocketChannelData.purpose && rocketChannelData.purpose.value) && rocketChannelData.purpose.last_set > lastSetTopic) {
						roomUpdate.topic = rocketChannelData.purpose.value;                                                             // 168
					}                                                                                                                // 169
                                                                                                                      //
					RocketChat.models.Rooms.addImportIds(rocketChannelData.rocketId, rocketChannelData.id);                          // 170
					this.slackChannelMap[rocketChannelData.rocketId] = {                                                             // 171
						id: slackChannelID,                                                                                             // 171
						family: slackChannelID.charAt(0) === 'C' ? 'channels' : 'groups'                                                // 171
					};                                                                                                               // 171
				}                                                                                                                 // 172
                                                                                                                      //
				return RocketChat.models.Rooms.findOneById(rocketChannelData.rocketId);                                           // 173
			}                                                                                                                  // 174
                                                                                                                      //
			logger.class.debug('Channel not added');                                                                           // 175
			return;                                                                                                            // 176
		}                                                                                                                   // 177
                                                                                                                      //
		return addRocketChannel;                                                                                            //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.findRocketUser = function () {                                                                 //
		function findRocketUser(slackUserID) {                                                                              //
			var rocketUser = RocketChat.models.Users.findOneByImportId(slackUserID);                                           // 180
                                                                                                                      //
			if (rocketUser && !this.userTags[slackUserID]) {                                                                   // 181
				this.userTags[slackUserID] = {                                                                                    // 182
					slack: "<@" + slackUserID + ">",                                                                                 // 182
					rocket: "@" + rocketUser.username                                                                                // 182
				};                                                                                                                // 182
			}                                                                                                                  // 183
                                                                                                                      //
			return rocketUser;                                                                                                 // 184
		}                                                                                                                   // 185
                                                                                                                      //
		return findRocketUser;                                                                                              //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.addRocketUser = function () {                                                                  //
		function addRocketUser(slackUserID) {                                                                               //
			logger.class.debug('Adding Rocket.Chat user from Slack', slackUserID);                                             // 188
			var slackResults = HTTP.get('https://slack.com/api/users.info', {                                                  // 189
				params: {                                                                                                         // 189
					token: this.apiToken,                                                                                            // 189
					user: slackUserID                                                                                                // 189
				}                                                                                                                 // 189
			});                                                                                                                // 189
                                                                                                                      //
			if (slackResults && slackResults.data && slackResults.data.ok === true && slackResults.data.user) {                // 190
				var rocketUserData = slackResults.data.user;                                                                      // 191
				var isBot = rocketUserData.is_bot === true;                                                                       // 192
				var email = rocketUserData.profile && rocketUserData.profile.email || '';                                         // 193
				var existingRocketUser = void 0;                                                                                  // 194
                                                                                                                      //
				if (!isBot) {                                                                                                     // 195
					existingRocketUser = RocketChat.models.Users.findOneByEmailAddress(email) || RocketChat.models.Users.findOneByUsername(rocketUserData.name);
				} else {                                                                                                          // 197
					existingRocketUser = RocketChat.models.Users.findOneByUsername(rocketUserData.name);                             // 198
				}                                                                                                                 // 199
                                                                                                                      //
				if (existingRocketUser) {                                                                                         // 201
					rocketUserData.rocketId = existingRocketUser._id;                                                                // 202
					rocketUserData.name = existingRocketUser.username;                                                               // 203
				} else {                                                                                                          // 204
					var newUser = {                                                                                                  // 205
						password: Random.id(),                                                                                          // 206
						username: rocketUserData.name                                                                                   // 207
					};                                                                                                               // 205
                                                                                                                      //
					if (!isBot && email) {                                                                                           // 210
						newUser.email = email;                                                                                          // 211
					}                                                                                                                // 212
                                                                                                                      //
					if (isBot) {                                                                                                     // 214
						newUser.joinDefaultChannels = false;                                                                            // 215
					}                                                                                                                // 216
                                                                                                                      //
					rocketUserData.rocketId = Accounts.createUser(newUser);                                                          // 218
					var userUpdate = {                                                                                               // 219
						utcOffset: rocketUserData.tz_offset / 3600,                                                                     // 220
						// Slack's is -18000 which translates to Rocket.Chat's after dividing by 3600,                                  // 220
						roles: isBot ? ['bot'] : ['user']                                                                               // 221
					};                                                                                                               // 219
                                                                                                                      //
					if (rocketUserData.profile && rocketUserData.profile.real_name) {                                                // 224
						userUpdate['name'] = rocketUserData.profile.real_name;                                                          // 225
					}                                                                                                                // 226
                                                                                                                      //
					if (rocketUserData.deleted) {                                                                                    // 228
						userUpdate['active'] = false;                                                                                   // 229
						userUpdate['services.resume.loginTokens'] = [];                                                                 // 230
					}                                                                                                                // 231
                                                                                                                      //
					RocketChat.models.Users.update({                                                                                 // 233
						_id: rocketUserData.rocketId                                                                                    // 233
					}, {                                                                                                             // 233
						$set: userUpdate                                                                                                // 233
					});                                                                                                              // 233
					var user = RocketChat.models.Users.findOneById(rocketUserData.rocketId);                                         // 235
					var url = null;                                                                                                  // 237
                                                                                                                      //
					if (rocketUserData.profile) {                                                                                    // 238
						if (rocketUserData.profile.image_original) {                                                                    // 239
							url = rocketUserData.profile.image_original;                                                                   // 240
						} else if (rocketUserData.profile.image_512) {                                                                  // 241
							url = rocketUserData.profile.image_512;                                                                        // 242
						}                                                                                                               // 243
					}                                                                                                                // 244
                                                                                                                      //
					if (url) {                                                                                                       // 245
						try {                                                                                                           // 246
							RocketChat.setUserAvatar(user, url, null, 'url');                                                              // 247
						} catch (error) {                                                                                               // 248
							logger.class.debug('Error setting user avatar', error.message);                                                // 249
						}                                                                                                               // 250
					}                                                                                                                // 251
				}                                                                                                                 // 252
                                                                                                                      //
				var importIds = [rocketUserData.id];                                                                              // 254
                                                                                                                      //
				if (isBot && rocketUserData.profile && rocketUserData.profile.bot_id) {                                           // 255
					importIds.push(rocketUserData.profile.bot_id);                                                                   // 256
				}                                                                                                                 // 257
                                                                                                                      //
				RocketChat.models.Users.addImportIds(rocketUserData.rocketId, importIds);                                         // 258
                                                                                                                      //
				if (!this.userTags[slackUserID]) {                                                                                // 259
					this.userTags[slackUserID] = {                                                                                   // 260
						slack: "<@" + slackUserID + ">",                                                                                // 260
						rocket: "@" + rocketUserData.name                                                                               // 260
					};                                                                                                               // 260
				}                                                                                                                 // 261
                                                                                                                      //
				return RocketChat.models.Users.findOneById(rocketUserData.rocketId);                                              // 262
			}                                                                                                                  // 263
                                                                                                                      //
			logger.class.debug('User not added');                                                                              // 264
			return;                                                                                                            // 265
		}                                                                                                                   // 266
                                                                                                                      //
		return addRocketUser;                                                                                               //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.addAliasToRocketMsg = function () {                                                            //
		function addAliasToRocketMsg(rocketUserName, rocketMsgObj) {                                                        //
			if (this.aliasFormat) {                                                                                            // 269
				var alias = this.util.format(this.aliasFormat, rocketUserName);                                                   // 270
                                                                                                                      //
				if (alias !== rocketUserName) {                                                                                   // 272
					rocketMsgObj.alias = alias;                                                                                      // 273
				}                                                                                                                 // 274
			}                                                                                                                  // 275
                                                                                                                      //
			return rocketMsgObj;                                                                                               // 277
		}                                                                                                                   // 278
                                                                                                                      //
		return addAliasToRocketMsg;                                                                                         //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.createAndSaveRocketMessage = function () {                                                     //
		function createAndSaveRocketMessage(rocketChannel, rocketUser, slackMessage, rocketMsgDataDefaults, isImporting) {  //
			var _this4 = this;                                                                                                 // 280
                                                                                                                      //
			if (slackMessage.type === 'message') {                                                                             // 281
				var _ret = function () {                                                                                          // 281
					var rocketMsgObj = {};                                                                                           // 282
                                                                                                                      //
					if (!_.isEmpty(slackMessage.subtype)) {                                                                          // 283
						rocketMsgObj = _this4.processSlackSubtypedMessage(rocketChannel, rocketUser, slackMessage, isImporting);        // 284
                                                                                                                      //
						if (!rocketMsgObj) {                                                                                            // 285
							return {                                                                                                       // 286
								v: void 0                                                                                                     // 286
							};                                                                                                             // 286
						}                                                                                                               // 287
					} else {                                                                                                         // 288
						rocketMsgObj = {                                                                                                // 289
							msg: _this4.convertSlackMsgTxtToRocketTxtFormat(slackMessage.text),                                            // 290
							rid: rocketChannel._id,                                                                                        // 291
							u: {                                                                                                           // 292
								_id: rocketUser._id,                                                                                          // 293
								username: rocketUser.username                                                                                 // 294
							}                                                                                                              // 292
						};                                                                                                              // 289
                                                                                                                      //
						_this4.addAliasToRocketMsg(rocketUser.username, rocketMsgObj);                                                  // 298
					}                                                                                                                // 299
                                                                                                                      //
					_.extend(rocketMsgObj, rocketMsgDataDefaults);                                                                   // 300
                                                                                                                      //
					if (slackMessage.edited) {                                                                                       // 301
						rocketMsgObj.editedAt = new Date(parseInt(slackMessage.edited.ts.split('.')[0]) * 1000);                        // 302
					}                                                                                                                // 303
                                                                                                                      //
					if (slackMessage.subtype === 'bot_message') {                                                                    // 304
						rocketUser = RocketChat.models.Users.findOneById('rocket.cat', {                                                // 305
							fields: {                                                                                                      // 305
								username: 1                                                                                                   // 305
							}                                                                                                              // 305
						});                                                                                                             // 305
					}                                                                                                                // 306
                                                                                                                      //
					if (slackMessage.pinned_to && slackMessage.pinned_to.indexOf(slackMessage.channel) !== -1) {                     // 308
						rocketMsgObj.pinned = true;                                                                                     // 309
						rocketMsgObj.pinnedAt = Date.now;                                                                               // 310
						rocketMsgObj.pinnedBy = _.pick(rocketUser, '_id', 'username');                                                  // 311
					}                                                                                                                // 312
                                                                                                                      //
					if (slackMessage.subtype === 'bot_message') {                                                                    // 313
						Meteor.setTimeout(function () {                                                                                 // 314
							if (slackMessage.bot_id && slackMessage.ts && !RocketChat.models.Messages.findOneBySlackBotIdAndSlackTs(slackMessage.bot_id, slackMessage.ts)) {
								RocketChat.sendMessage(rocketUser, rocketMsgObj, rocketChannel, true);                                        // 316
							}                                                                                                              // 317
						}, 500);                                                                                                        // 318
					} else {                                                                                                         // 319
						logger.class.debug('Send message to Rocket.Chat');                                                              // 320
						RocketChat.sendMessage(rocketUser, rocketMsgObj, rocketChannel, true);                                          // 321
					}                                                                                                                // 322
				}();                                                                                                              // 281
                                                                                                                      //
				if ((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object") return _ret.v;        // 281
			}                                                                                                                  // 323
		}                                                                                                                   // 324
                                                                                                                      //
		return createAndSaveRocketMessage;                                                                                  //
	}(); /*                                                                                                              //
       https://api.slack.com/events/reaction_removed                                                                  //
       */                                                                                                             //
                                                                                                                      //
	SlackBridge.prototype.onSlackReactionRemoved = function () {                                                         //
		function onSlackReactionRemoved(slackReactionMsg) {                                                                 //
			var _this5 = this;                                                                                                 // 329
                                                                                                                      //
			if (slackReactionMsg) {                                                                                            // 330
				var _ret2 = function () {                                                                                         // 330
					var rocketUser = _this5.getRocketUser(slackReactionMsg.user); //Lets find our Rocket originated message          // 331
                                                                                                                      //
                                                                                                                      //
					var rocketMsg = RocketChat.models.Messages.findOneBySlackTs(slackReactionMsg.item.ts);                           // 333
                                                                                                                      //
					if (!rocketMsg) {                                                                                                // 335
						//Must have originated from Slack                                                                               // 336
						var rocketID = _this5.createRocketID(slackReactionMsg.item.channel, slackReactionMsg.item.ts);                  // 337
                                                                                                                      //
						rocketMsg = RocketChat.models.Messages.findOneById(rocketID);                                                   // 338
					}                                                                                                                // 339
                                                                                                                      //
					if (rocketMsg && rocketUser) {                                                                                   // 341
						var _ret3 = function () {                                                                                       // 341
							var rocketReaction = ':' + slackReactionMsg.reaction + ':'; //If the Rocket user has already been removed, then this is an echo back from slack
                                                                                                                      //
							if (rocketMsg.reactions) {                                                                                     // 345
								var theReaction = rocketMsg.reactions[rocketReaction];                                                        // 346
                                                                                                                      //
								if (theReaction) {                                                                                            // 347
									if (theReaction.usernames.indexOf(rocketUser.username) === -1) {                                             // 348
										return {                                                                                                    // 349
											v: {                                                                                                       // 349
												v: void 0                                                                                                 // 349
											}                                                                                                          // 349
										}; //Reaction already removed                                                                               // 349
									}                                                                                                            // 350
								}                                                                                                             // 351
							} else {                                                                                                       // 352
								//Reaction already removed                                                                                    // 353
								return {                                                                                                      // 354
									v: {                                                                                                         // 354
										v: void 0                                                                                                   // 354
									}                                                                                                            // 354
								};                                                                                                            // 354
							} //Stash this away to key off it later so we don't send it back to Slack                                      // 355
                                                                                                                      //
                                                                                                                      //
							_this5.reactionsMap.set('unset' + rocketMsg._id + rocketReaction, rocketUser);                                 // 358
                                                                                                                      //
							logger.class.debug('Removing reaction from Slack');                                                            // 359
							Meteor.runAsUser(rocketUser._id, function () {                                                                 // 360
								Meteor.call('setReaction', rocketReaction, rocketMsg._id);                                                    // 361
							});                                                                                                            // 362
						}();                                                                                                            // 341
                                                                                                                      //
						if ((typeof _ret3 === "undefined" ? "undefined" : (0, _typeof3.default)(_ret3)) === "object") return _ret3.v;   // 341
					}                                                                                                                // 363
				}();                                                                                                              // 330
                                                                                                                      //
				if ((typeof _ret2 === "undefined" ? "undefined" : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;     // 330
			}                                                                                                                  // 364
		}                                                                                                                   // 365
                                                                                                                      //
		return onSlackReactionRemoved;                                                                                      //
	}(); /*                                                                                                              //
       https://api.slack.com/events/reaction_added                                                                    //
       */                                                                                                             //
                                                                                                                      //
	SlackBridge.prototype.onSlackReactionAdded = function () {                                                           //
		function onSlackReactionAdded(slackReactionMsg) {                                                                   //
			var _this6 = this;                                                                                                 // 370
                                                                                                                      //
			if (slackReactionMsg) {                                                                                            // 371
				var _ret4 = function () {                                                                                         // 371
					var rocketUser = _this6.getRocketUser(slackReactionMsg.user);                                                    // 372
                                                                                                                      //
					if (rocketUser.roles.includes('bot')) {                                                                          // 374
						return {                                                                                                        // 375
							v: void 0                                                                                                      // 375
						};                                                                                                              // 375
					} //Lets find our Rocket originated message                                                                      // 376
                                                                                                                      //
                                                                                                                      //
					var rocketMsg = RocketChat.models.Messages.findOneBySlackTs(slackReactionMsg.item.ts);                           // 379
                                                                                                                      //
					if (!rocketMsg) {                                                                                                // 381
						//Must have originated from Slack                                                                               // 382
						var rocketID = _this6.createRocketID(slackReactionMsg.item.channel, slackReactionMsg.item.ts);                  // 383
                                                                                                                      //
						rocketMsg = RocketChat.models.Messages.findOneById(rocketID);                                                   // 384
					}                                                                                                                // 385
                                                                                                                      //
					if (rocketMsg && rocketUser) {                                                                                   // 387
						var _ret5 = function () {                                                                                       // 387
							var rocketReaction = ':' + slackReactionMsg.reaction + ':'; //If the Rocket user has already reacted, then this is Slack echoing back to us
                                                                                                                      //
							if (rocketMsg.reactions) {                                                                                     // 391
								var theReaction = rocketMsg.reactions[rocketReaction];                                                        // 392
                                                                                                                      //
								if (theReaction) {                                                                                            // 393
									if (theReaction.usernames.indexOf(rocketUser.username) !== -1) {                                             // 394
										return {                                                                                                    // 395
											v: {                                                                                                       // 395
												v: void 0                                                                                                 // 395
											}                                                                                                          // 395
										}; //Already reacted                                                                                        // 395
									}                                                                                                            // 396
								}                                                                                                             // 397
							} //Stash this away to key off it later so we don't send it back to Slack                                      // 398
                                                                                                                      //
                                                                                                                      //
							_this6.reactionsMap.set('set' + rocketMsg._id + rocketReaction, rocketUser);                                   // 401
                                                                                                                      //
							logger.class.debug('Adding reaction from Slack');                                                              // 402
							Meteor.runAsUser(rocketUser._id, function () {                                                                 // 403
								Meteor.call('setReaction', rocketReaction, rocketMsg._id);                                                    // 404
							});                                                                                                            // 405
						}();                                                                                                            // 387
                                                                                                                      //
						if ((typeof _ret5 === "undefined" ? "undefined" : (0, _typeof3.default)(_ret5)) === "object") return _ret5.v;   // 387
					}                                                                                                                // 406
				}();                                                                                                              // 371
                                                                                                                      //
				if ((typeof _ret4 === "undefined" ? "undefined" : (0, _typeof3.default)(_ret4)) === "object") return _ret4.v;     // 371
			}                                                                                                                  // 407
		}                                                                                                                   // 408
                                                                                                                      //
		return onSlackReactionAdded;                                                                                        //
	}(); /**                                                                                                             //
       * We have received a message from slack and we need to save/delete/update it into rocket                       //
       * https://api.slack.com/events/message                                                                         //
       */                                                                                                             //
                                                                                                                      //
	SlackBridge.prototype.onSlackMessage = function () {                                                                 //
		function onSlackMessage(slackMessage, isImporting) {                                                                //
			if (slackMessage.subtype) {                                                                                        // 415
				switch (slackMessage.subtype) {                                                                                   // 416
					case 'message_deleted':                                                                                          // 417
						this.processSlackMessageDeleted(slackMessage);                                                                  // 418
						break;                                                                                                          // 419
                                                                                                                      //
					case 'message_changed':                                                                                          // 420
						this.processSlackMessageChanged(slackMessage);                                                                  // 421
						break;                                                                                                          // 422
                                                                                                                      //
					default:                                                                                                         // 423
						//Keeping backwards compatability for now, refactor later                                                       // 424
						this.processSlackNewMessage(slackMessage, isImporting);                                                         // 425
				}                                                                                                                 // 416
			} else {                                                                                                           // 427
				//Simple message                                                                                                  // 428
				this.processSlackNewMessage(slackMessage, isImporting);                                                           // 429
			}                                                                                                                  // 430
		}                                                                                                                   // 431
                                                                                                                      //
		return onSlackMessage;                                                                                              //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.processSlackSubtypedMessage = function () {                                                    //
		function processSlackSubtypedMessage(rocketChannel, rocketUser, slackMessage, isImporting) {                        //
			var rocketMsgObj = null;                                                                                           // 434
                                                                                                                      //
			switch (slackMessage.subtype) {                                                                                    // 435
				case 'bot_message':                                                                                               // 436
					if (slackMessage.username !== undefined && this.excludeBotnames && slackMessage.username.match(this.excludeBotnames)) {
						return;                                                                                                         // 438
					}                                                                                                                // 439
                                                                                                                      //
					rocketMsgObj = {                                                                                                 // 441
						msg: this.convertSlackMsgTxtToRocketTxtFormat(slackMessage.text),                                               // 442
						rid: rocketChannel._id,                                                                                         // 443
						bot: true,                                                                                                      // 444
						attachments: slackMessage.attachments,                                                                          // 445
						username: slackMessage.username || slackMessage.bot_id                                                          // 446
					};                                                                                                               // 441
					this.addAliasToRocketMsg(slackMessage.username || slackMessage.bot_id, rocketMsgObj);                            // 448
                                                                                                                      //
					if (slackMessage.icons) {                                                                                        // 449
						rocketMsgObj.emoji = slackMessage.icons.emoji;                                                                  // 450
					}                                                                                                                // 451
                                                                                                                      //
					return rocketMsgObj;                                                                                             // 452
                                                                                                                      //
				case 'me_message':                                                                                                // 453
					return this.addAliasToRocketMsg(rocketUser.username, {                                                           // 454
						msg: "_" + this.convertSlackMsgTxtToRocketTxtFormat(slackMessage.text) + "_"                                    // 455
					});                                                                                                              // 454
                                                                                                                      //
				case 'channel_join':                                                                                              // 457
					if (isImporting) {                                                                                               // 458
						RocketChat.models.Messages.createUserJoinWithRoomIdAndUser(rocketChannel._id, rocketUser, {                     // 459
							ts: new Date(parseInt(slackMessage.ts.split('.')[0]) * 1000),                                                  // 459
							imported: 'slackbridge'                                                                                        // 459
						});                                                                                                             // 459
					} else {                                                                                                         // 460
						RocketChat.addUserToRoom(rocketChannel._id, rocketUser);                                                        // 461
					}                                                                                                                // 462
                                                                                                                      //
					return;                                                                                                          // 463
                                                                                                                      //
				case 'group_join':                                                                                                // 464
					if (slackMessage.inviter) {                                                                                      // 465
						var inviter = slackMessage.inviter ? this.findRocketUser(slackMessage.inviter) || this.addRocketUser(slackMessage.inviter) : null;
                                                                                                                      //
						if (isImporting) {                                                                                              // 467
							RocketChat.models.Messages.createUserAddedWithRoomIdAndUser(rocketChannel._id, rocketUser, {                   // 468
								ts: new Date(parseInt(slackMessage.ts.split('.')[0]) * 1000),                                                 // 469
								u: {                                                                                                          // 470
									_id: inviter._id,                                                                                            // 471
									username: inviter.username                                                                                   // 472
								},                                                                                                            // 470
								imported: 'slackbridge'                                                                                       // 474
							});                                                                                                            // 468
						} else {                                                                                                        // 476
							RocketChat.addUserToRoom(rocketChannel._id, rocketUser, inviter);                                              // 477
						}                                                                                                               // 478
					}                                                                                                                // 479
                                                                                                                      //
					return;                                                                                                          // 480
                                                                                                                      //
				case 'channel_leave':                                                                                             // 481
				case 'group_leave':                                                                                               // 482
					if (isImporting) {                                                                                               // 483
						RocketChat.models.Messages.createUserLeaveWithRoomIdAndUser(rocketChannel._id, rocketUser, {                    // 484
							ts: new Date(parseInt(slackMessage.ts.split('.')[0]) * 1000),                                                  // 485
							imported: 'slackbridge'                                                                                        // 486
						});                                                                                                             // 484
					} else {                                                                                                         // 488
						RocketChat.removeUserFromRoom(rocketChannel._id, rocketUser);                                                   // 489
					}                                                                                                                // 490
                                                                                                                      //
					return;                                                                                                          // 491
                                                                                                                      //
				case 'channel_topic':                                                                                             // 492
				case 'group_topic':                                                                                               // 493
					if (isImporting) {                                                                                               // 494
						RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser('room_changed_topic', rocketChannel._id, slackMessage.topic, rocketUser, {
							ts: new Date(parseInt(slackMessage.ts.split('.')[0]) * 1000),                                                  // 495
							imported: 'slackbridge'                                                                                        // 495
						});                                                                                                             // 495
					} else {                                                                                                         // 496
						RocketChat.saveRoomTopic(rocketChannel._id, slackMessage.topic, rocketUser, false);                             // 497
					}                                                                                                                // 498
                                                                                                                      //
					return;                                                                                                          // 499
                                                                                                                      //
				case 'channel_purpose':                                                                                           // 500
				case 'group_purpose':                                                                                             // 501
					if (isImporting) {                                                                                               // 502
						RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser('room_changed_topic', rocketChannel._id, slackMessage.purpose, rocketUser, {
							ts: new Date(parseInt(slackMessage.ts.split('.')[0]) * 1000),                                                  // 503
							imported: 'slackbridge'                                                                                        // 503
						});                                                                                                             // 503
					} else {                                                                                                         // 504
						RocketChat.saveRoomTopic(rocketChannel._id, slackMessage.purpose, rocketUser, false);                           // 505
					}                                                                                                                // 506
                                                                                                                      //
					return;                                                                                                          // 507
                                                                                                                      //
				case 'channel_name':                                                                                              // 508
				case 'group_name':                                                                                                // 509
					if (isImporting) {                                                                                               // 510
						RocketChat.models.Messages.createRoomRenamedWithRoomIdRoomNameAndUser(rocketChannel._id, slackMessage.name, rocketUser, {
							ts: new Date(parseInt(slackMessage.ts.split('.')[0]) * 1000),                                                  // 511
							imported: 'slackbridge'                                                                                        // 511
						});                                                                                                             // 511
					} else {                                                                                                         // 512
						RocketChat.saveRoomName(rocketChannel._id, slackMessage.name, rocketUser, false);                               // 513
					}                                                                                                                // 514
                                                                                                                      //
					return;                                                                                                          // 515
                                                                                                                      //
				case 'channel_archive':                                                                                           // 516
				case 'group_archive':                                                                                             // 517
					if (!isImporting) {                                                                                              // 518
						RocketChat.archiveRoom(rocketChannel);                                                                          // 519
					}                                                                                                                // 520
                                                                                                                      //
					return;                                                                                                          // 521
                                                                                                                      //
				case 'channel_unarchive':                                                                                         // 522
				case 'group_unarchive':                                                                                           // 523
					if (!isImporting) {                                                                                              // 524
						RocketChat.unarchiveRoom(rocketChannel);                                                                        // 525
					}                                                                                                                // 526
                                                                                                                      //
					return;                                                                                                          // 527
                                                                                                                      //
				case 'file_share':                                                                                                // 528
					if (slackMessage.file && slackMessage.file.url_private_download !== undefined) {                                 // 529
						var details = {                                                                                                 // 530
							message_id: "slack-" + slackMessage.ts.replace(/\./g, '-'),                                                    // 531
							name: slackMessage.file.name,                                                                                  // 532
							size: slackMessage.file.size,                                                                                  // 533
							type: slackMessage.file.mimetype,                                                                              // 534
							rid: rocketChannel._id                                                                                         // 535
						};                                                                                                              // 530
						return this.uploadFileFromSlack(details, slackMessage.file.url_private_download, rocketUser, rocketChannel, new Date(parseInt(slackMessage.ts.split('.')[0]) * 1000), isImporting);
					}                                                                                                                // 538
                                                                                                                      //
					break;                                                                                                           // 539
                                                                                                                      //
				case 'file_comment':                                                                                              // 540
					logger.class.error('File comment not implemented');                                                              // 541
					return;                                                                                                          // 542
                                                                                                                      //
				case 'file_mention':                                                                                              // 543
					logger.class.error('File mentioned not implemented');                                                            // 544
					return;                                                                                                          // 545
                                                                                                                      //
				case 'pinned_item':                                                                                               // 546
					if (slackMessage.attachments && slackMessage.attachments[0] && slackMessage.attachments[0].text) {               // 547
						rocketMsgObj = {                                                                                                // 548
							rid: rocketChannel._id,                                                                                        // 549
							t: 'message_pinned',                                                                                           // 550
							msg: '',                                                                                                       // 551
							u: {                                                                                                           // 552
								_id: rocketUser._id,                                                                                          // 553
								username: rocketUser.username                                                                                 // 554
							},                                                                                                             // 552
							attachments: [{                                                                                                // 556
								'text': this.convertSlackMsgTxtToRocketTxtFormat(slackMessage.attachments[0].text),                           // 557
								'author_name': slackMessage.attachments[0].author_subname,                                                    // 558
								'author_icon': getAvatarUrlFromUsername(slackMessage.attachments[0].author_subname),                          // 559
								'ts': new Date(parseInt(slackMessage.attachments[0].ts.split('.')[0]) * 1000)                                 // 560
							}]                                                                                                             // 556
						};                                                                                                              // 548
                                                                                                                      //
						if (!isImporting) {                                                                                             // 564
							RocketChat.models.Messages.setPinnedByIdAndUserId("slack-" + slackMessage.attachments[0].channel_id + "-" + slackMessage.attachments[0].ts.replace(/\./g, '-'), rocketMsgObj.u, true, new Date(parseInt(slackMessage.ts.split('.')[0]) * 1000));
						}                                                                                                               // 566
                                                                                                                      //
						return rocketMsgObj;                                                                                            // 568
					} else {                                                                                                         // 569
						logger.class.error('Pinned item with no attachment');                                                           // 570
					}                                                                                                                // 571
                                                                                                                      //
					return;                                                                                                          // 572
                                                                                                                      //
				case 'unpinned_item':                                                                                             // 573
					logger.class.error('Unpinned item not implemented');                                                             // 574
					return;                                                                                                          // 575
			}                                                                                                                  // 435
		}                                                                                                                   // 577
                                                                                                                      //
		return processSlackSubtypedMessage;                                                                                 //
	}(); /**                                                                                                             //
      Uploads the file to the storage.                                                                                //
      @param [Object] details an object with details about the upload. name, size, type, and rid                      //
      @param [String] fileUrl url of the file to download/import                                                      //
      @param [Object] user the Rocket.Chat user                                                                       //
      @param [Object] room the Rocket.Chat room                                                                       //
      @param [Date] timeStamp the timestamp the file was uploaded                                                     //
      **/ //details, slackMessage.file.url_private_download, rocketUser, rocketChannel, new Date(parseInt(slackMessage.ts.split('.')[0]) * 1000), isImporting);
                                                                                                                      //
                                                                                                                      //
	SlackBridge.prototype.uploadFileFromSlack = function () {                                                            //
		function uploadFileFromSlack(details, slackFileURL, rocketUser, rocketChannel, timeStamp, isImporting) {            //
			var url = Npm.require('url');                                                                                      // 589
                                                                                                                      //
			var requestModule = /https/i.test(slackFileURL) ? Npm.require('https') : Npm.require('http');                      // 590
			var parsedUrl = url.parse(slackFileURL, true);                                                                     // 591
			parsedUrl.headers = {                                                                                              // 592
				'Authorization': 'Bearer ' + this.apiToken                                                                        // 592
			};                                                                                                                 // 592
			requestModule.get(parsedUrl, Meteor.bindEnvironment(function (stream) {                                            // 593
				var fileId = Meteor.fileStore.create(details);                                                                    // 594
                                                                                                                      //
				if (fileId) {                                                                                                     // 595
					Meteor.fileStore.write(stream, fileId, function (err, file) {                                                    // 596
						console.log('fileStore.write', file);                                                                           // 597
                                                                                                                      //
						if (err) {                                                                                                      // 598
							throw new Error(err);                                                                                          // 599
						} else {                                                                                                        // 600
							var _url = file.url.replace(Meteor.absoluteUrl(), '/');                                                        // 601
                                                                                                                      //
							var attachment = {                                                                                             // 602
								title: "File Uploaded: " + file.name,                                                                         // 603
								title_link: _url                                                                                              // 604
							};                                                                                                             // 602
                                                                                                                      //
							if (/^image\/.+/.test(file.type)) {                                                                            // 607
								attachment.image_url = _url;                                                                                  // 608
								attachment.image_type = file.type;                                                                            // 609
								attachment.image_size = file.size;                                                                            // 610
								attachment.image_dimensions = file.identify && file.identify.size;                                            // 611
							}                                                                                                              // 612
                                                                                                                      //
							if (/^audio\/.+/.test(file.type)) {                                                                            // 613
								attachment.audio_url = _url;                                                                                  // 614
								attachment.audio_type = file.type;                                                                            // 615
								attachment.audio_size = file.size;                                                                            // 616
							}                                                                                                              // 617
                                                                                                                      //
							if (/^video\/.+/.test(file.type)) {                                                                            // 618
								attachment.video_url = _url;                                                                                  // 619
								attachment.video_type = file.type;                                                                            // 620
								attachment.video_size = file.size;                                                                            // 621
							}                                                                                                              // 622
                                                                                                                      //
							var msg = {                                                                                                    // 624
								rid: details.rid,                                                                                             // 625
								ts: timeStamp,                                                                                                // 626
								msg: '',                                                                                                      // 627
								file: {                                                                                                       // 628
									_id: file._id                                                                                                // 629
								},                                                                                                            // 628
								groupable: false,                                                                                             // 631
								attachments: [attachment]                                                                                     // 632
							};                                                                                                             // 624
                                                                                                                      //
							if (isImporting) {                                                                                             // 635
								msg.imported = 'slackbridge';                                                                                 // 636
							}                                                                                                              // 637
                                                                                                                      //
							if (details.message_id && typeof details.message_id === 'string') {                                            // 639
								msg['_id'] = details.message_id;                                                                              // 640
							}                                                                                                              // 641
                                                                                                                      //
							return RocketChat.sendMessage(rocketUser, msg, rocketChannel, true);                                           // 643
						}                                                                                                               // 644
					});                                                                                                              // 645
				}                                                                                                                 // 646
			}));                                                                                                               // 647
		}                                                                                                                   // 648
                                                                                                                      //
		return uploadFileFromSlack;                                                                                         //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.registerForRocketEvents = function () {                                                        //
		function registerForRocketEvents() {                                                                                //
			RocketChat.callbacks.add('afterSaveMessage', this.onRocketMessage.bind(this), RocketChat.callbacks.priority.LOW, 'SlackBridge_Out');
			RocketChat.callbacks.add('afterDeleteMessage', this.onRocketMessageDelete.bind(this), RocketChat.callbacks.priority.LOW, 'SlackBridge_Delete');
			RocketChat.callbacks.add('setReaction', this.onRocketSetReaction.bind(this), RocketChat.callbacks.priority.LOW, 'SlackBridge_SetReaction');
			RocketChat.callbacks.add('unsetReaction', this.onRocketUnSetReaction.bind(this), RocketChat.callbacks.priority.LOW, 'SlackBridge_UnSetReaction');
		}                                                                                                                   // 655
                                                                                                                      //
		return registerForRocketEvents;                                                                                     //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.unregisterForRocketEvents = function () {                                                      //
		function unregisterForRocketEvents() {                                                                              //
			RocketChat.callbacks.remove('afterSaveMessage', 'SlackBridge_Out');                                                // 658
			RocketChat.callbacks.remove('afterDeleteMessage', 'SlackBridge_Delete');                                           // 659
			RocketChat.callbacks.remove('setReaction', 'SlackBridge_SetReaction');                                             // 660
			RocketChat.callbacks.remove('unsetReaction', 'SlackBridge_UnSetReaction');                                         // 661
		}                                                                                                                   // 662
                                                                                                                      //
		return unregisterForRocketEvents;                                                                                   //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.registerForSlackEvents = function () {                                                         //
		function registerForSlackEvents() {                                                                                 //
			var _this7 = this;                                                                                                 // 664
                                                                                                                      //
			var CLIENT_EVENTS = this.slackClient.CLIENT_EVENTS;                                                                // 665
			this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function () {                                                         // 666
				logger.connection.info('Connected to Slack');                                                                     // 667
			});                                                                                                                // 668
			this.rtm.on(CLIENT_EVENTS.RTM.UNABLE_TO_RTM_START, function () {                                                   // 670
				_this7.disconnect();                                                                                              // 671
			});                                                                                                                // 672
			this.rtm.on(CLIENT_EVENTS.RTM.DISCONNECT, function () {                                                            // 674
				_this7.disconnect();                                                                                              // 675
			});                                                                                                                // 676
			var RTM_EVENTS = this.slackClient.RTM_EVENTS; /**                                                                  // 678
                                                 * Event fired when someone messages a channel the bot is in          //
                                                 * {                                                                  //
                                                 *	type: 'message',                                                   //
                                                 * 	channel: [channel_id],                                            //
                                                 * 	user: [user_id],                                                  //
                                                 * 	text: [message],                                                  //
                                                 * 	ts: [ts.milli],                                                   //
                                                 * 	team: [team_id],                                                  //
                                                 * 	subtype: [message_subtype],                                       //
                                                 * 	inviter: [message_subtype = 'group_join|channel_join' -> user_id]
                                                 * }                                                                  //
                                                 **/                                                                  //
			this.rtm.on(RTM_EVENTS.MESSAGE, Meteor.bindEnvironment(function (slackMessage) {                                   // 693
				logger.events.debug('OnSlackEvent-MESSAGE: ', slackMessage);                                                      // 694
                                                                                                                      //
				if (slackMessage) {                                                                                               // 695
					_this7.onSlackMessage(slackMessage);                                                                             // 696
				}                                                                                                                 // 697
			}));                                                                                                               // 698
			this.rtm.on(RTM_EVENTS.REACTION_ADDED, Meteor.bindEnvironment(function (reactionMsg) {                             // 700
				logger.events.debug('OnSlackEvent-REACTION_ADDED: ', reactionMsg);                                                // 701
                                                                                                                      //
				if (reactionMsg) {                                                                                                // 702
					_this7.onSlackReactionAdded(reactionMsg);                                                                        // 703
				}                                                                                                                 // 704
			}));                                                                                                               // 705
			this.rtm.on(RTM_EVENTS.REACTION_REMOVED, Meteor.bindEnvironment(function (reactionMsg) {                           // 707
				logger.events.debug('OnSlackEvent-REACTION_REMOVED: ', reactionMsg);                                              // 708
                                                                                                                      //
				if (reactionMsg) {                                                                                                // 709
					_this7.onSlackReactionRemoved(reactionMsg);                                                                      // 710
				}                                                                                                                 // 711
			})); /**                                                                                                           // 712
        * Event fired when someone creates a public channel                                                           //
        * {                                                                                                           //
        *	type: 'channel_created',                                                                                    //
        *	channel: {                                                                                                  //
        *		id: [channel_id],                                                                                          //
        *		is_channel: true,                                                                                          //
        *		name: [channel_name],                                                                                      //
        *		created: [ts],                                                                                             //
        *		creator: [user_id],                                                                                        //
        *		is_shared: false,                                                                                          //
        *		is_org_shared: false                                                                                       //
        *	},                                                                                                          //
        *	event_ts: [ts.milli]                                                                                        //
        * }                                                                                                           //
        **/                                                                                                           //
			this.rtm.on(RTM_EVENTS.CHANNEL_CREATED, Meteor.bindEnvironment(function () {})); /**                               // 730
                                                                                    * Event fired when the bot joins a public channel
                                                                                    * {                               //
                                                                                    * 	type: 'channel_joined',        //
                                                                                    * 	channel: {                     //
                                                                                    * 		id: [channel_id],             //
                                                                                    * 		name: [channel_name],         //
                                                                                    * 		is_channel: true,             //
                                                                                    * 		created: [ts],                //
                                                                                    * 		creator: [user_id],           //
                                                                                    * 		is_archived: false,           //
                                                                                    * 		is_general: false,            //
                                                                                    * 		is_member: true,              //
                                                                                    * 		last_read: [ts.milli],        //
                                                                                    * 		latest: [message_obj],        //
                                                                                    * 		unread_count: 0,              //
                                                                                    * 		unread_count_display: 0,      //
                                                                                    * 		members: [ user_ids ],        //
                                                                                    * 		topic: {                      //
                                                                                    * 			value: [channel_topic],      //
                                                                                    * 			creator: [user_id],          //
                                                                                    * 			last_set: 0                  //
                                                                                    * 		},                            //
                                                                                    * 		purpose: {                    //
                                                                                    * 			value: [channel_purpose],    //
                                                                                    * 			creator: [user_id],          //
                                                                                    * 			last_set: 0                  //
                                                                                    * 		}                             //
                                                                                    * 	}                              //
                                                                                    * }                               //
                                                                                    **/                               //
			this.rtm.on(RTM_EVENTS.CHANNEL_JOINED, Meteor.bindEnvironment(function () {})); /**                                // 763
                                                                                   * Event fired when the bot leaves (or is removed from) a public channel
                                                                                   * {                                //
                                                                                   * 	type: 'channel_left',           //
                                                                                   * 	channel: [channel_id]           //
                                                                                   * }                                //
                                                                                   **/                                //
			this.rtm.on(RTM_EVENTS.CHANNEL_LEFT, Meteor.bindEnvironment(function () {})); /**                                  // 772
                                                                                 * Event fired when an archived channel is deleted by an admin
                                                                                 * {                                  //
                                                                                 * 	type: 'channel_deleted',          //
                                                                                 * 	channel: [channel_id],            //
                                                                                 *	event_ts: [ts.milli]               //
                                                                                 * }                                  //
                                                                                 **/                                  //
			this.rtm.on(RTM_EVENTS.CHANNEL_DELETED, Meteor.bindEnvironment(function () {})); /**                               // 782
                                                                                    * Event fired when the channel has its name changed
                                                                                    * {                               //
                                                                                    * 	type: 'channel_rename',        //
                                                                                    * 	channel: {                     //
                                                                                    * 		id: [channel_id],             //
                                                                                    * 		name: [channel_name],         //
                                                                                    * 		is_channel: true,             //
                                                                                    * 		created: [ts]                 //
                                                                                    * 	},                             //
                                                                                    *	event_ts: [ts.milli]            //
                                                                                    * }                               //
                                                                                    **/                               //
			this.rtm.on(RTM_EVENTS.CHANNEL_RENAME, Meteor.bindEnvironment(function () {})); /**                                // 797
                                                                                   * Event fired when the bot joins a private channel
                                                                                   * {                                //
                                                                                   * 	type: 'group_joined',           //
                                                                                   * 	channel: {                      //
                                                                                   * 		id: [channel_id],              //
                                                                                   * 		name: [channel_name],          //
                                                                                   * 		is_group: true,                //
                                                                                   * 		created: [ts],                 //
                                                                                   * 		creator: [user_id],            //
                                                                                   * 		is_archived: false,            //
                                                                                   * 		is_mpim: false,                //
                                                                                   * 		is_open: true,                 //
                                                                                   * 		last_read: [ts.milli],         //
                                                                                   * 		latest: [message_obj],         //
                                                                                   * 		unread_count: 0,               //
                                                                                   * 		unread_count_display: 0,       //
                                                                                   * 		members: [ user_ids ],         //
                                                                                   * 		topic: {                       //
                                                                                   * 			value: [channel_topic],       //
                                                                                   * 			creator: [user_id],           //
                                                                                   * 			last_set: 0                   //
                                                                                   * 		},                             //
                                                                                   * 		purpose: {                     //
                                                                                   * 			value: [channel_purpose],     //
                                                                                   * 			creator: [user_id],           //
                                                                                   * 			last_set: 0                   //
                                                                                   * 		}                              //
                                                                                   * 	}                               //
                                                                                   * }                                //
                                                                                   **/                                //
			this.rtm.on(RTM_EVENTS.GROUP_JOINED, Meteor.bindEnvironment(function () {})); /**                                  // 830
                                                                                 * Event fired when the bot leaves (or is removed from) a private channel
                                                                                 * {                                  //
                                                                                 * 	type: 'group_left',               //
                                                                                 * 	channel: [channel_id]             //
                                                                                 * }                                  //
                                                                                 **/                                  //
			this.rtm.on(RTM_EVENTS.GROUP_LEFT, Meteor.bindEnvironment(function () {})); /**                                    // 839
                                                                               * Event fired when the private channel has its name changed
                                                                               * {                                    //
                                                                               * 	type: 'group_rename',               //
                                                                               * 	channel: {                          //
                                                                               * 		id: [channel_id],                  //
                                                                               * 		name: [channel_name],              //
                                                                               * 		is_group: true,                    //
                                                                               * 		created: [ts]                      //
                                                                               * 	},                                  //
                                                                               *	event_ts: [ts.milli]                 //
                                                                               * }                                    //
                                                                               **/                                    //
			this.rtm.on(RTM_EVENTS.GROUP_RENAME, Meteor.bindEnvironment(function () {})); /**                                  // 854
                                                                                 * Event fired when a new user joins the team
                                                                                 * {                                  //
                                                                                 * 	type: 'team_join',                //
                                                                                 * 	user:                             //
                                                                                 * 	{                                 //
                                                                                 * 		id: [user_id],                   //
                                                                                 * 		team_id: [team_id],              //
                                                                                 * 		name: [user_name],               //
                                                                                 * 		deleted: false,                  //
                                                                                 * 		status: null,                    //
                                                                                 * 		color: [color_code],             //
                                                                                 * 		real_name: '',                   //
                                                                                 * 		tz: [timezone],                  //
                                                                                 * 		tz_label: [timezone_label],      //
                                                                                 * 		tz_offset: [timezone_offset],    //
                                                                                 * 		profile:                         //
                                                                                 * 		{                                //
                                                                                 * 			avatar_hash: '',                //
                                                                                 * 			real_name: '',                  //
                                                                                 * 			real_name_normalized: '',       //
                                                                                 * 			email: '',                      //
                                                                                 * 			image_24: '',                   //
                                                                                 * 			image_32: '',                   //
                                                                                 * 			image_48: '',                   //
                                                                                 * 			image_72: '',                   //
                                                                                 * 			image_192: '',                  //
                                                                                 * 			image_512: '',                  //
                                                                                 * 			fields: null                    //
                                                                                 * 		},                               //
                                                                                 * 		is_admin: false,                 //
                                                                                 * 		is_owner: false,                 //
                                                                                 * 		is_primary_owner: false,         //
                                                                                 * 		is_restricted: false,            //
                                                                                 * 		is_ultra_restricted: false,      //
                                                                                 * 		is_bot: false,                   //
                                                                                 * 		presence: [user_presence]        //
                                                                                 * 	},                                //
                                                                                 * 	cache_ts: [ts]                    //
                                                                                 * }                                  //
                                                                                 **/                                  //
			this.rtm.on(RTM_EVENTS.TEAM_JOIN, Meteor.bindEnvironment(function () {}));                                         // 897
		}                                                                                                                   // 898
                                                                                                                      //
		return registerForSlackEvents;                                                                                      //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.findSlackChannel = function () {                                                               //
		function findSlackChannel(rocketChannelName) {                                                                      //
			logger.class.debug('Searching for Slack channel or group', rocketChannelName);                                     // 901
			var response = HTTP.get('https://slack.com/api/channels.list', {                                                   // 902
				params: {                                                                                                         // 902
					token: this.apiToken                                                                                             // 902
				}                                                                                                                 // 902
			});                                                                                                                // 902
                                                                                                                      //
			if (response && response.data && _.isArray(response.data.channels) && response.data.channels.length > 0) {         // 903
				for (var _iterator2 = response.data.channels, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
					var _ref2;                                                                                                       // 904
                                                                                                                      //
					if (_isArray2) {                                                                                                 // 904
						if (_i2 >= _iterator2.length) break;                                                                            // 904
						_ref2 = _iterator2[_i2++];                                                                                      // 904
					} else {                                                                                                         // 904
						_i2 = _iterator2.next();                                                                                        // 904
						if (_i2.done) break;                                                                                            // 904
						_ref2 = _i2.value;                                                                                              // 904
					}                                                                                                                // 904
                                                                                                                      //
					var channel = _ref2;                                                                                             // 904
                                                                                                                      //
					if (channel.name === rocketChannelName && channel.is_member === true) {                                          // 905
						return channel;                                                                                                 // 906
					}                                                                                                                // 907
				}                                                                                                                 // 908
			}                                                                                                                  // 909
                                                                                                                      //
			response = HTTP.get('https://slack.com/api/groups.list', {                                                         // 910
				params: {                                                                                                         // 910
					token: this.apiToken                                                                                             // 910
				}                                                                                                                 // 910
			});                                                                                                                // 910
                                                                                                                      //
			if (response && response.data && _.isArray(response.data.groups) && response.data.groups.length > 0) {             // 911
				for (var _iterator3 = response.data.groups, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
					var _ref3;                                                                                                       // 912
                                                                                                                      //
					if (_isArray3) {                                                                                                 // 912
						if (_i3 >= _iterator3.length) break;                                                                            // 912
						_ref3 = _iterator3[_i3++];                                                                                      // 912
					} else {                                                                                                         // 912
						_i3 = _iterator3.next();                                                                                        // 912
						if (_i3.done) break;                                                                                            // 912
						_ref3 = _i3.value;                                                                                              // 912
					}                                                                                                                // 912
                                                                                                                      //
					var group = _ref3;                                                                                               // 912
                                                                                                                      //
					if (group.name === rocketChannelName) {                                                                          // 913
						return group;                                                                                                   // 914
					}                                                                                                                // 915
				}                                                                                                                 // 916
			}                                                                                                                  // 917
		}                                                                                                                   // 918
                                                                                                                      //
		return findSlackChannel;                                                                                            //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.importFromHistory = function () {                                                              //
		function importFromHistory(family, options) {                                                                       //
			logger.class.debug('Importing messages history');                                                                  // 921
			var response = HTTP.get('https://slack.com/api/' + family + '.history', {                                          // 922
				params: _.extend({                                                                                                // 922
					token: this.apiToken                                                                                             // 922
				}, options)                                                                                                       // 922
			});                                                                                                                // 922
                                                                                                                      //
			if (response && response.data && _.isArray(response.data.messages) && response.data.messages.length > 0) {         // 923
				var latest = 0;                                                                                                   // 924
                                                                                                                      //
				for (var _iterator4 = response.data.messages.reverse(), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
					var _ref4;                                                                                                       // 925
                                                                                                                      //
					if (_isArray4) {                                                                                                 // 925
						if (_i4 >= _iterator4.length) break;                                                                            // 925
						_ref4 = _iterator4[_i4++];                                                                                      // 925
					} else {                                                                                                         // 925
						_i4 = _iterator4.next();                                                                                        // 925
						if (_i4.done) break;                                                                                            // 925
						_ref4 = _i4.value;                                                                                              // 925
					}                                                                                                                // 925
                                                                                                                      //
					var message = _ref4;                                                                                             // 925
					logger.class.debug('MESSAGE: ', message);                                                                        // 926
                                                                                                                      //
					if (!latest || message.ts > latest) {                                                                            // 927
						latest = message.ts;                                                                                            // 928
					}                                                                                                                // 929
                                                                                                                      //
					message.channel = options.channel;                                                                               // 930
					this.onSlackMessage(message, true);                                                                              // 931
				}                                                                                                                 // 932
                                                                                                                      //
				return {                                                                                                          // 933
					has_more: response.data.has_more,                                                                                // 933
					ts: latest                                                                                                       // 933
				};                                                                                                                // 933
			}                                                                                                                  // 934
		}                                                                                                                   // 935
                                                                                                                      //
		return importFromHistory;                                                                                           //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.copySlackChannelInfo = function () {                                                           //
		function copySlackChannelInfo(rid, channelMap) {                                                                    //
			logger.class.debug('Copying users from Slack channel to Rocket.Chat', channelMap.id, rid);                         // 938
			var response = HTTP.get('https://slack.com/api/' + channelMap.family + '.info', {                                  // 939
				params: {                                                                                                         // 939
					token: this.apiToken,                                                                                            // 939
					channel: channelMap.id                                                                                           // 939
				}                                                                                                                 // 939
			});                                                                                                                // 939
                                                                                                                      //
			if (response && response.data) {                                                                                   // 940
				var data = channelMap.family === 'channels' ? response.data.channel : response.data.group;                        // 941
                                                                                                                      //
				if (data && _.isArray(data.members) && data.members.length > 0) {                                                 // 942
					for (var _iterator5 = data.members, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
						var _ref5;                                                                                                      // 943
                                                                                                                      //
						if (_isArray5) {                                                                                                // 943
							if (_i5 >= _iterator5.length) break;                                                                           // 943
							_ref5 = _iterator5[_i5++];                                                                                     // 943
						} else {                                                                                                        // 943
							_i5 = _iterator5.next();                                                                                       // 943
							if (_i5.done) break;                                                                                           // 943
							_ref5 = _i5.value;                                                                                             // 943
						}                                                                                                               // 943
                                                                                                                      //
						var member = _ref5;                                                                                             // 943
						var user = this.findRocketUser(member) || this.addRocketUser(member);                                           // 944
                                                                                                                      //
						if (user) {                                                                                                     // 945
							logger.class.debug('Adding user to room', user.username, rid);                                                 // 946
							RocketChat.addUserToRoom(rid, user, null, true);                                                               // 947
						}                                                                                                               // 948
					}                                                                                                                // 949
				}                                                                                                                 // 950
                                                                                                                      //
				var topic = '';                                                                                                   // 952
				var topic_last_set = 0;                                                                                           // 953
				var topic_creator = null;                                                                                         // 954
                                                                                                                      //
				if (data && data.topic && data.topic.value) {                                                                     // 955
					topic = data.topic.value;                                                                                        // 956
					topic_last_set = data.topic.last_set;                                                                            // 957
					topic_creator = data.topic.creator;                                                                              // 958
				}                                                                                                                 // 959
                                                                                                                      //
				if (data && data.purpose && data.purpose.value) {                                                                 // 961
					if (topic_last_set) {                                                                                            // 962
						if (topic_last_set < data.purpose.last_set) {                                                                   // 963
							topic = data.purpose.topic;                                                                                    // 964
							topic_creator = data.purpose.creator;                                                                          // 965
						}                                                                                                               // 966
					} else {                                                                                                         // 967
						topic = data.purpose.topic;                                                                                     // 968
						topic_creator = data.purpose.creator;                                                                           // 969
					}                                                                                                                // 970
				}                                                                                                                 // 971
                                                                                                                      //
				if (topic) {                                                                                                      // 973
					var creator = this.findRocketUser(topic_creator) || this.addRocketUser(topic_creator);                           // 974
					logger.class.debug('Setting room topic', rid, topic, creator.username);                                          // 975
					RocketChat.saveRoomTopic(rid, topic, creator, false);                                                            // 976
				}                                                                                                                 // 977
			}                                                                                                                  // 978
		}                                                                                                                   // 979
                                                                                                                      //
		return copySlackChannelInfo;                                                                                        //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.copyPins = function () {                                                                       //
		function copyPins(rid, channelMap) {                                                                                //
			var response = HTTP.get('https://slack.com/api/pins.list', {                                                       // 982
				params: {                                                                                                         // 982
					token: this.apiToken,                                                                                            // 982
					channel: channelMap.id                                                                                           // 982
				}                                                                                                                 // 982
			});                                                                                                                // 982
                                                                                                                      //
			if (response && response.data && _.isArray(response.data.items) && response.data.items.length > 0) {               // 983
				for (var _iterator6 = response.data.items, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
					var _ref6;                                                                                                       // 984
                                                                                                                      //
					if (_isArray6) {                                                                                                 // 984
						if (_i6 >= _iterator6.length) break;                                                                            // 984
						_ref6 = _iterator6[_i6++];                                                                                      // 984
					} else {                                                                                                         // 984
						_i6 = _iterator6.next();                                                                                        // 984
						if (_i6.done) break;                                                                                            // 984
						_ref6 = _i6.value;                                                                                              // 984
					}                                                                                                                // 984
                                                                                                                      //
					var pin = _ref6;                                                                                                 // 984
                                                                                                                      //
					if (pin.message) {                                                                                               // 985
						var user = this.findRocketUser(pin.message.user);                                                               // 986
						var msgObj = {                                                                                                  // 987
							rid: rid,                                                                                                      // 988
							t: 'message_pinned',                                                                                           // 989
							msg: '',                                                                                                       // 990
							u: {                                                                                                           // 991
								_id: user._id,                                                                                                // 992
								username: user.username                                                                                       // 993
							},                                                                                                             // 991
							attachments: [{                                                                                                // 995
								'text': this.convertSlackMsgTxtToRocketTxtFormat(pin.message.text),                                           // 996
								'author_name': user.username,                                                                                 // 997
								'author_icon': getAvatarUrlFromUsername(user.username),                                                       // 998
								'ts': new Date(parseInt(pin.message.ts.split('.')[0]) * 1000)                                                 // 999
							}]                                                                                                             // 995
						};                                                                                                              // 987
						RocketChat.models.Messages.setPinnedByIdAndUserId("slack-" + pin.channel + "-" + pin.message.ts.replace(/\./g, '-'), msgObj.u, true, new Date(parseInt(pin.message.ts.split('.')[0]) * 1000));
					}                                                                                                                // 1004
				}                                                                                                                 // 1005
			}                                                                                                                  // 1006
		}                                                                                                                   // 1007
                                                                                                                      //
		return copyPins;                                                                                                    //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.importMessages = function () {                                                                 //
		function importMessages(rid, callback) {                                                                            //
			logger.class.info('importMessages: ', rid);                                                                        // 1010
			var rocketchat_room = RocketChat.models.Rooms.findOneById(rid);                                                    // 1011
                                                                                                                      //
			if (rocketchat_room) {                                                                                             // 1012
				if (this.slackChannelMap[rid]) {                                                                                  // 1013
					this.copySlackChannelInfo(rid, this.slackChannelMap[rid]);                                                       // 1014
					logger.class.debug('Importing messages from Slack to Rocket.Chat', this.slackChannelMap[rid], rid);              // 1016
					var results = this.importFromHistory(this.slackChannelMap[rid].family, {                                         // 1017
						channel: this.slackChannelMap[rid].id,                                                                          // 1017
						oldest: 1                                                                                                       // 1017
					});                                                                                                              // 1017
                                                                                                                      //
					while (results && results.has_more) {                                                                            // 1018
						results = this.importFromHistory(this.slackChannelMap[rid].family, {                                            // 1019
							channel: this.slackChannelMap[rid].id,                                                                         // 1019
							oldest: results.ts                                                                                             // 1019
						});                                                                                                             // 1019
					}                                                                                                                // 1020
                                                                                                                      //
					logger.class.debug('Pinning Slack channel messages to Rocket.Chat', this.slackChannelMap[rid], rid);             // 1022
					this.copyPins(rid, this.slackChannelMap[rid]);                                                                   // 1023
					return callback();                                                                                               // 1025
				} else {                                                                                                          // 1026
					var slack_room = this.findSlackChannel(rocketchat_room.name);                                                    // 1027
                                                                                                                      //
					if (slack_room) {                                                                                                // 1028
						this.slackChannelMap[rid] = {                                                                                   // 1029
							id: slack_room.id,                                                                                             // 1029
							family: slack_room.id.charAt(0) === 'C' ? 'channels' : 'groups'                                                // 1029
						};                                                                                                              // 1029
						return this.importMessages(rid, callback);                                                                      // 1030
					} else {                                                                                                         // 1031
						logger.class.error('Could not find Slack room with specified name', rocketchat_room.name);                      // 1032
						return callback(new Meteor.Error('error-slack-room-not-found', 'Could not find Slack room with specified name'));
					}                                                                                                                // 1034
				}                                                                                                                 // 1035
			} else {                                                                                                           // 1036
				logger.class.error('Could not find Rocket.Chat room with specified id', rid);                                     // 1037
				return callback(new Meteor.Error('error-invalid-room', 'Invalid room'));                                          // 1038
			}                                                                                                                  // 1039
		}                                                                                                                   // 1040
                                                                                                                      //
		return importMessages;                                                                                              //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.populateSlackChannelMap = function () {                                                        //
		function populateSlackChannelMap() {                                                                                //
			logger.class.debug('Populating channel map');                                                                      // 1043
			var response = HTTP.get('https://slack.com/api/channels.list', {                                                   // 1044
				params: {                                                                                                         // 1044
					token: this.apiToken                                                                                             // 1044
				}                                                                                                                 // 1044
			});                                                                                                                // 1044
                                                                                                                      //
			if (response && response.data && _.isArray(response.data.channels) && response.data.channels.length > 0) {         // 1045
				for (var _iterator7 = response.data.channels, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
					var _ref7;                                                                                                       // 1046
                                                                                                                      //
					if (_isArray7) {                                                                                                 // 1046
						if (_i7 >= _iterator7.length) break;                                                                            // 1046
						_ref7 = _iterator7[_i7++];                                                                                      // 1046
					} else {                                                                                                         // 1046
						_i7 = _iterator7.next();                                                                                        // 1046
						if (_i7.done) break;                                                                                            // 1046
						_ref7 = _i7.value;                                                                                              // 1046
					}                                                                                                                // 1046
                                                                                                                      //
					var slackChannel = _ref7;                                                                                        // 1046
					var rocketchat_room = RocketChat.models.Rooms.findOneByName(slackChannel.name, {                                 // 1047
						fields: {                                                                                                       // 1047
							_id: 1                                                                                                         // 1047
						}                                                                                                               // 1047
					});                                                                                                              // 1047
                                                                                                                      //
					if (rocketchat_room) {                                                                                           // 1048
						this.slackChannelMap[rocketchat_room._id] = {                                                                   // 1049
							id: slackChannel.id,                                                                                           // 1049
							family: slackChannel.id.charAt(0) === 'C' ? 'channels' : 'groups'                                              // 1049
						};                                                                                                              // 1049
					}                                                                                                                // 1050
				}                                                                                                                 // 1051
			}                                                                                                                  // 1052
                                                                                                                      //
			response = HTTP.get('https://slack.com/api/groups.list', {                                                         // 1053
				params: {                                                                                                         // 1053
					token: this.apiToken                                                                                             // 1053
				}                                                                                                                 // 1053
			});                                                                                                                // 1053
                                                                                                                      //
			if (response && response.data && _.isArray(response.data.groups) && response.data.groups.length > 0) {             // 1054
				for (var _iterator8 = response.data.groups, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
					var _ref8;                                                                                                       // 1055
                                                                                                                      //
					if (_isArray8) {                                                                                                 // 1055
						if (_i8 >= _iterator8.length) break;                                                                            // 1055
						_ref8 = _iterator8[_i8++];                                                                                      // 1055
					} else {                                                                                                         // 1055
						_i8 = _iterator8.next();                                                                                        // 1055
						if (_i8.done) break;                                                                                            // 1055
						_ref8 = _i8.value;                                                                                              // 1055
					}                                                                                                                // 1055
                                                                                                                      //
					var slackGroup = _ref8;                                                                                          // 1055
                                                                                                                      //
					var _rocketchat_room = RocketChat.models.Rooms.findOneByName(slackGroup.name, {                                  // 1056
						fields: {                                                                                                       // 1056
							_id: 1                                                                                                         // 1056
						}                                                                                                               // 1056
					});                                                                                                              // 1056
                                                                                                                      //
					if (_rocketchat_room) {                                                                                          // 1057
						this.slackChannelMap[_rocketchat_room._id] = {                                                                  // 1058
							id: slackGroup.id,                                                                                             // 1058
							family: slackGroup.id.charAt(0) === 'C' ? 'channels' : 'groups'                                                // 1058
						};                                                                                                              // 1058
					}                                                                                                                // 1059
				}                                                                                                                 // 1060
			}                                                                                                                  // 1061
		}                                                                                                                   // 1062
                                                                                                                      //
		return populateSlackChannelMap;                                                                                     //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.onRocketMessageDelete = function () {                                                          //
		function onRocketMessageDelete(rocketMessageDeleted) {                                                              //
			logger.class.debug('onRocketMessageDelete', rocketMessageDeleted);                                                 // 1065
			this.postDeleteMessageToSlack(rocketMessageDeleted);                                                               // 1067
		}                                                                                                                   // 1068
                                                                                                                      //
		return onRocketMessageDelete;                                                                                       //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.onRocketSetReaction = function () {                                                            //
		function onRocketSetReaction(rocketMsgID, reaction) {                                                               //
			logger.class.debug('onRocketSetReaction');                                                                         // 1071
                                                                                                                      //
			if (rocketMsgID && reaction) {                                                                                     // 1073
				if (this.reactionsMap.delete('set' + rocketMsgID + reaction)) {                                                   // 1074
					//This was a Slack reaction, we don't need to tell Slack about it                                                // 1075
					return;                                                                                                          // 1076
				}                                                                                                                 // 1077
                                                                                                                      //
				var rocketMsg = RocketChat.models.Messages.findOneById(rocketMsgID);                                              // 1078
                                                                                                                      //
				if (rocketMsg) {                                                                                                  // 1079
					var slackChannel = this.slackChannelMap[rocketMsg.rid].id;                                                       // 1080
					var slackTS = this.getSlackTS(rocketMsg);                                                                        // 1081
					this.postReactionAddedToSlack(reaction.replace(/:/g, ''), slackChannel, slackTS);                                // 1082
				}                                                                                                                 // 1083
			}                                                                                                                  // 1084
		}                                                                                                                   // 1085
                                                                                                                      //
		return onRocketSetReaction;                                                                                         //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.onRocketUnSetReaction = function () {                                                          //
		function onRocketUnSetReaction(rocketMsgID, reaction) {                                                             //
			logger.class.debug('onRocketUnSetReaction');                                                                       // 1088
                                                                                                                      //
			if (rocketMsgID && reaction) {                                                                                     // 1090
				if (this.reactionsMap.delete('unset' + rocketMsgID + reaction)) {                                                 // 1091
					//This was a Slack unset reaction, we don't need to tell Slack about it                                          // 1092
					return;                                                                                                          // 1093
				}                                                                                                                 // 1094
                                                                                                                      //
				var rocketMsg = RocketChat.models.Messages.findOneById(rocketMsgID);                                              // 1096
                                                                                                                      //
				if (rocketMsg) {                                                                                                  // 1097
					var slackChannel = this.slackChannelMap[rocketMsg.rid].id;                                                       // 1098
					var slackTS = this.getSlackTS(rocketMsg);                                                                        // 1099
					this.postReactionRemoveToSlack(reaction.replace(/:/g, ''), slackChannel, slackTS);                               // 1100
				}                                                                                                                 // 1101
			}                                                                                                                  // 1102
		}                                                                                                                   // 1103
                                                                                                                      //
		return onRocketUnSetReaction;                                                                                       //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.onRocketMessage = function () {                                                                //
		function onRocketMessage(rocketMessage) {                                                                           //
			logger.class.debug('onRocketMessage', rocketMessage);                                                              // 1106
                                                                                                                      //
			if (rocketMessage.editedAt) {                                                                                      // 1108
				//This is an Edit Event                                                                                           // 1109
				this.processRocketMessageChanged(rocketMessage);                                                                  // 1110
				return rocketMessage;                                                                                             // 1111
			} // Ignore messages originating from Slack                                                                        // 1112
                                                                                                                      //
                                                                                                                      //
			if (rocketMessage._id.indexOf('slack-') === 0) {                                                                   // 1114
				return rocketMessage;                                                                                             // 1115
			} //Probably a new message from Rocket.Chat                                                                        // 1116
                                                                                                                      //
                                                                                                                      //
			var outSlackChannels = RocketChat.settings.get('SlackBridge_Out_All') ? _.keys(this.slackChannelMap) : _.pluck(RocketChat.settings.get('SlackBridge_Out_Channels'), '_id') || []; //logger.class.debug('Out SlackChannels: ', outSlackChannels);
                                                                                                                      //
			if (outSlackChannels.indexOf(rocketMessage.rid) !== -1) {                                                          // 1121
				this.postMessageToSlack(this.slackChannelMap[rocketMessage.rid], rocketMessage);                                  // 1122
			}                                                                                                                  // 1123
                                                                                                                      //
			return rocketMessage;                                                                                              // 1124
		}                                                                                                                   // 1125
                                                                                                                      //
		return onRocketMessage;                                                                                             //
	}(); /*                                                                                                              //
       https://api.slack.com/methods/reactions.add                                                                    //
       */                                                                                                             //
                                                                                                                      //
	SlackBridge.prototype.postReactionAddedToSlack = function () {                                                       //
		function postReactionAddedToSlack(reaction, slackChannel, slackTS) {                                                //
			if (reaction && slackChannel && slackTS) {                                                                         // 1131
				var data = {                                                                                                      // 1132
					token: this.apiToken,                                                                                            // 1133
					name: reaction,                                                                                                  // 1134
					channel: slackChannel,                                                                                           // 1135
					timestamp: slackTS                                                                                               // 1136
				};                                                                                                                // 1132
				logger.class.debug('Posting Add Reaction to Slack');                                                              // 1139
				var postResult = HTTP.post('https://slack.com/api/reactions.add', {                                               // 1140
					params: data                                                                                                     // 1140
				});                                                                                                               // 1140
                                                                                                                      //
				if (postResult.statusCode === 200 && postResult.data && postResult.data.ok === true) {                            // 1141
					logger.class.debug('Reaction added to Slack');                                                                   // 1142
				}                                                                                                                 // 1143
			}                                                                                                                  // 1144
		}                                                                                                                   // 1145
                                                                                                                      //
		return postReactionAddedToSlack;                                                                                    //
	}(); /*                                                                                                              //
       https://api.slack.com/methods/reactions.remove                                                                 //
       */                                                                                                             //
                                                                                                                      //
	SlackBridge.prototype.postReactionRemoveToSlack = function () {                                                      //
		function postReactionRemoveToSlack(reaction, slackChannel, slackTS) {                                               //
			if (reaction && slackChannel && slackTS) {                                                                         // 1151
				var data = {                                                                                                      // 1152
					token: this.apiToken,                                                                                            // 1153
					name: reaction,                                                                                                  // 1154
					channel: slackChannel,                                                                                           // 1155
					timestamp: slackTS                                                                                               // 1156
				};                                                                                                                // 1152
				logger.class.debug('Posting Remove Reaction to Slack');                                                           // 1159
				var postResult = HTTP.post('https://slack.com/api/reactions.remove', {                                            // 1160
					params: data                                                                                                     // 1160
				});                                                                                                               // 1160
                                                                                                                      //
				if (postResult.statusCode === 200 && postResult.data && postResult.data.ok === true) {                            // 1161
					logger.class.debug('Reaction removed from Slack');                                                               // 1162
				}                                                                                                                 // 1163
			}                                                                                                                  // 1164
		}                                                                                                                   // 1165
                                                                                                                      //
		return postReactionRemoveToSlack;                                                                                   //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.postDeleteMessageToSlack = function () {                                                       //
		function postDeleteMessageToSlack(rocketMessage) {                                                                  //
			if (rocketMessage) {                                                                                               // 1168
				var data = {                                                                                                      // 1169
					token: this.apiToken,                                                                                            // 1170
					ts: this.getSlackTS(rocketMessage),                                                                              // 1171
					channel: this.slackChannelMap[rocketMessage.rid].id,                                                             // 1172
					as_user: true                                                                                                    // 1173
				};                                                                                                                // 1169
				logger.class.debug('Post Delete Message to Slack', data);                                                         // 1176
				var postResult = HTTP.post('https://slack.com/api/chat.delete', {                                                 // 1177
					params: data                                                                                                     // 1177
				});                                                                                                               // 1177
                                                                                                                      //
				if (postResult.statusCode === 200 && postResult.data && postResult.data.ok === true) {                            // 1178
					logger.class.debug('Message deleted on Slack');                                                                  // 1179
				}                                                                                                                 // 1180
			}                                                                                                                  // 1181
		}                                                                                                                   // 1182
                                                                                                                      //
		return postDeleteMessageToSlack;                                                                                    //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.postMessageToSlack = function () {                                                             //
		function postMessageToSlack(slackChannel, rocketMessage) {                                                          //
			if (slackChannel && slackChannel.id) {                                                                             // 1185
				var iconUrl = getAvatarUrlFromUsername(rocketMessage.u && rocketMessage.u.username);                              // 1186
                                                                                                                      //
				if (iconUrl) {                                                                                                    // 1187
					iconUrl = Meteor.absoluteUrl().replace(/\/$/, '') + iconUrl;                                                     // 1188
				}                                                                                                                 // 1189
                                                                                                                      //
				var data = {                                                                                                      // 1190
					token: this.apiToken,                                                                                            // 1191
					text: rocketMessage.msg,                                                                                         // 1192
					channel: slackChannel.id,                                                                                        // 1193
					username: rocketMessage.u && rocketMessage.u.username,                                                           // 1194
					icon_url: iconUrl,                                                                                               // 1195
					link_names: 1                                                                                                    // 1196
				};                                                                                                                // 1190
				logger.class.debug('Post Message To Slack', data);                                                                // 1198
				var postResult = HTTP.post('https://slack.com/api/chat.postMessage', {                                            // 1199
					params: data                                                                                                     // 1199
				});                                                                                                               // 1199
                                                                                                                      //
				if (postResult.statusCode === 200 && postResult.data && postResult.data.message && postResult.data.message.bot_id && postResult.data.message.ts) {
					RocketChat.models.Messages.setSlackBotIdAndSlackTs(rocketMessage._id, postResult.data.message.bot_id, postResult.data.message.ts);
					logger.class.debug('RocketMsgID=' + rocketMessage._id + ' SlackMsgID=' + postResult.data.message.ts + ' SlackBotID=' + postResult.data.message.bot_id);
				}                                                                                                                 // 1203
			}                                                                                                                  // 1204
		}                                                                                                                   // 1205
                                                                                                                      //
		return postMessageToSlack;                                                                                          //
	}(); /*                                                                                                              //
       https://api.slack.com/methods/chat.update                                                                      //
       */                                                                                                             //
                                                                                                                      //
	SlackBridge.prototype.postMessageUpdateToSlack = function () {                                                       //
		function postMessageUpdateToSlack(slackChannel, rocketMessage) {                                                    //
			if (slackChannel && slackChannel.id) {                                                                             // 1211
				var data = {                                                                                                      // 1212
					token: this.apiToken,                                                                                            // 1213
					ts: this.getSlackTS(rocketMessage),                                                                              // 1214
					channel: slackChannel.id,                                                                                        // 1215
					text: rocketMessage.msg,                                                                                         // 1216
					as_user: true                                                                                                    // 1217
				};                                                                                                                // 1212
				logger.class.debug('Post UpdateMessage To Slack', data);                                                          // 1219
				var postResult = HTTP.post('https://slack.com/api/chat.update', {                                                 // 1220
					params: data                                                                                                     // 1220
				});                                                                                                               // 1220
                                                                                                                      //
				if (postResult.statusCode === 200 && postResult.data && postResult.data.ok === true) {                            // 1221
					logger.class.debug('Message updated on Slack');                                                                  // 1222
				}                                                                                                                 // 1223
			}                                                                                                                  // 1224
		}                                                                                                                   // 1225
                                                                                                                      //
		return postMessageUpdateToSlack;                                                                                    //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.processRocketMessageChanged = function () {                                                    //
		function processRocketMessageChanged(rocketMessage) {                                                               //
			if (rocketMessage) {                                                                                               // 1228
				if (rocketMessage.updatedBySlack) {                                                                               // 1229
					//We have already processed this                                                                                 // 1230
					delete rocketMessage.updatedBySlack;                                                                             // 1231
					return;                                                                                                          // 1232
				} //This was a change from Rocket.Chat                                                                            // 1233
                                                                                                                      //
                                                                                                                      //
				var slackChannel = this.slackChannelMap[rocketMessage.rid];                                                       // 1236
				this.postMessageUpdateToSlack(slackChannel, rocketMessage);                                                       // 1237
			}                                                                                                                  // 1238
		}                                                                                                                   // 1239
                                                                                                                      //
		return processRocketMessageChanged;                                                                                 //
	}(); /*                                                                                                              //
       https://api.slack.com/events/message/message_deleted                                                           //
       */                                                                                                             //
                                                                                                                      //
	SlackBridge.prototype.processSlackMessageDeleted = function () {                                                     //
		function processSlackMessageDeleted(slackMessage) {                                                                 //
			if (slackMessage.previous_message) {                                                                               // 1245
				var rocketChannel = this.getRocketChannel(slackMessage);                                                          // 1246
				var rocketUser = RocketChat.models.Users.findOneById('rocket.cat', {                                              // 1247
					fields: {                                                                                                        // 1247
						username: 1                                                                                                     // 1247
					}                                                                                                                // 1247
				});                                                                                                               // 1247
                                                                                                                      //
				if (rocketChannel && rocketUser) {                                                                                // 1249
					//Find the Rocket message to delete                                                                              // 1250
					var rocketMsgObj = RocketChat.models.Messages.findOneBySlackBotIdAndSlackTs(slackMessage.previous_message.bot_id, slackMessage.previous_message.ts);
                                                                                                                      //
					if (!rocketMsgObj) {                                                                                             // 1254
						//Must have been a Slack originated msg                                                                         // 1255
						var _id = this.createRocketID(slackMessage.channel, slackMessage.previous_message.ts);                          // 1256
                                                                                                                      //
						rocketMsgObj = RocketChat.models.Messages.findOneById(_id);                                                     // 1257
					}                                                                                                                // 1258
                                                                                                                      //
					if (rocketMsgObj) {                                                                                              // 1260
						RocketChat.deleteMessage(rocketMsgObj, rocketUser);                                                             // 1261
						logger.class.debug('Rocket message deleted by Slack');                                                          // 1262
					}                                                                                                                // 1263
				}                                                                                                                 // 1264
			}                                                                                                                  // 1265
		}                                                                                                                   // 1266
                                                                                                                      //
		return processSlackMessageDeleted;                                                                                  //
	}(); /*                                                                                                              //
       https://api.slack.com/events/message/message_changed                                                           //
       */                                                                                                             //
                                                                                                                      //
	SlackBridge.prototype.processSlackMessageChanged = function () {                                                     //
		function processSlackMessageChanged(slackMessage) {                                                                 //
			if (slackMessage.previous_message) {                                                                               // 1272
				var currentMsg = RocketChat.models.Messages.findOneById(this.createRocketID(slackMessage.channel, slackMessage.message.ts)); //Only process this change, if its an actual update (not just Slack repeating back our Rocket original change)
                                                                                                                      //
				if (currentMsg && slackMessage.message.text !== currentMsg.msg) {                                                 // 1276
					var rocketChannel = this.getRocketChannel(slackMessage);                                                         // 1277
					var rocketUser = slackMessage.previous_message.user ? this.findRocketUser(slackMessage.previous_message.user) || this.addRocketUser(slackMessage.previous_message.user) : null;
					var rocketMsgObj = {                                                                                             // 1280
						//@TODO _id                                                                                                     // 1281
						_id: this.createRocketID(slackMessage.channel, slackMessage.previous_message.ts),                               // 1282
						rid: rocketChannel._id,                                                                                         // 1283
						msg: this.convertSlackMsgTxtToRocketTxtFormat(slackMessage.message.text),                                       // 1284
						updatedBySlack: true //We don't want to notify slack about this change since Slack initiated it                 // 1285
                                                                                                                      //
					};                                                                                                               // 1280
					RocketChat.updateMessage(rocketMsgObj, rocketUser);                                                              // 1288
					logger.class.debug('Rocket message updated by Slack');                                                           // 1289
				}                                                                                                                 // 1290
			}                                                                                                                  // 1291
		}                                                                                                                   // 1292
                                                                                                                      //
		return processSlackMessageChanged;                                                                                  //
	}(); /*                                                                                                              //
       This method will get refactored and broken down into single responsibilities                                   //
       */                                                                                                             //
                                                                                                                      //
	SlackBridge.prototype.processSlackNewMessage = function () {                                                         //
		function processSlackNewMessage(slackMessage, isImporting) {                                                        //
			var rocketChannel = this.getRocketChannel(slackMessage);                                                           // 1298
			var rocketUser = null;                                                                                             // 1299
                                                                                                                      //
			if (slackMessage.subtype === 'bot_message') {                                                                      // 1300
				rocketUser = RocketChat.models.Users.findOneById('rocket.cat', {                                                  // 1301
					fields: {                                                                                                        // 1301
						username: 1                                                                                                     // 1301
					}                                                                                                                // 1301
				});                                                                                                               // 1301
			} else {                                                                                                           // 1302
				rocketUser = slackMessage.user ? this.findRocketUser(slackMessage.user) || this.addRocketUser(slackMessage.user) : null;
			}                                                                                                                  // 1304
                                                                                                                      //
			if (rocketChannel && rocketUser) {                                                                                 // 1305
				var msgDataDefaults = {                                                                                           // 1306
					_id: this.createRocketID(slackMessage.channel, slackMessage.ts),                                                 // 1307
					ts: new Date(parseInt(slackMessage.ts.split('.')[0]) * 1000)                                                     // 1308
				};                                                                                                                // 1306
                                                                                                                      //
				if (isImporting) {                                                                                                // 1310
					msgDataDefaults['imported'] = 'slackbridge';                                                                     // 1311
				}                                                                                                                 // 1312
                                                                                                                      //
				try {                                                                                                             // 1313
					this.createAndSaveRocketMessage(rocketChannel, rocketUser, slackMessage, msgDataDefaults, isImporting);          // 1314
				} catch (e) {                                                                                                     // 1315
					// http://www.mongodb.org/about/contributors/error-codes/                                                        // 1316
					// 11000 == duplicate key error                                                                                  // 1317
					if (e.name === 'MongoError' && e.code === 11000) {                                                               // 1318
						return;                                                                                                         // 1319
					}                                                                                                                // 1320
                                                                                                                      //
					throw e;                                                                                                         // 1322
				}                                                                                                                 // 1323
			}                                                                                                                  // 1324
		}                                                                                                                   // 1325
                                                                                                                      //
		return processSlackNewMessage;                                                                                      //
	}(); /**                                                                                                             //
       * Retrieves the Slack TS from a Rocket msg that originated from Slack                                          //
       * @param rocketMsg                                                                                             //
       * @returns Slack TS or undefined if not a message that originated from slack                                   //
       * @private                                                                                                     //
       */                                                                                                             //
                                                                                                                      //
	SlackBridge.prototype.getSlackTS = function () {                                                                     //
		function getSlackTS(rocketMsg) {                                                                                    //
			//slack-G3KJGGE15-1483081061-000169                                                                                // 1334
			var slackTS = void 0;                                                                                              // 1335
                                                                                                                      //
			var index = rocketMsg._id.indexOf('slack-');                                                                       // 1336
                                                                                                                      //
			if (index === 0) {                                                                                                 // 1337
				//This is a msg that originated from Slack                                                                        // 1338
				slackTS = rocketMsg._id.substr(6, rocketMsg._id.length);                                                          // 1339
				index = slackTS.indexOf('-');                                                                                     // 1340
				slackTS = slackTS.substr(index + 1, slackTS.length);                                                              // 1341
				slackTS = slackTS.replace('-', '.');                                                                              // 1342
			} else {                                                                                                           // 1343
				//This probably originated as a Rocket msg, but has been sent to Slack                                            // 1344
				slackTS = rocketMsg.slackTs;                                                                                      // 1345
			}                                                                                                                  // 1346
                                                                                                                      //
			return slackTS;                                                                                                    // 1348
		}                                                                                                                   // 1349
                                                                                                                      //
		return getSlackTS;                                                                                                  //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.getRocketChannel = function () {                                                               //
		function getRocketChannel(slackMessage) {                                                                           //
			return slackMessage.channel ? this.findRocketChannel(slackMessage.channel) || this.addRocketChannel(slackMessage.channel) : null;
		}                                                                                                                   // 1353
                                                                                                                      //
		return getRocketChannel;                                                                                            //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.getRocketUser = function () {                                                                  //
		function getRocketUser(slackUser) {                                                                                 //
			return slackUser ? this.findRocketUser(slackUser) || this.addRocketUser(slackUser) : null;                         // 1356
		}                                                                                                                   // 1357
                                                                                                                      //
		return getRocketUser;                                                                                               //
	}();                                                                                                                 //
                                                                                                                      //
	SlackBridge.prototype.createRocketID = function () {                                                                 //
		function createRocketID(slackChannel, ts) {                                                                         //
			return "slack-" + slackChannel + "-" + ts.replace(/\./g, '-');                                                     // 1360
		}                                                                                                                   // 1361
                                                                                                                      //
		return createRocketID;                                                                                              //
	}();                                                                                                                 //
                                                                                                                      //
	return SlackBridge;                                                                                                  //
}();                                                                                                                  //
                                                                                                                      //
RocketChat.SlackBridge = new SlackBridge();                                                                           // 1365
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"slashcommand":{"slackbridge_import.server.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_slackbridge/slashcommand/slackbridge_import.server.js                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* globals msgStream */function SlackBridgeImport(command, params, item) {                                            // 1
	var channel, room, user;                                                                                             // 3
                                                                                                                      //
	if (command !== 'slackbridge-import' || !Match.test(params, String)) {                                               // 4
		return;                                                                                                             // 5
	}                                                                                                                    // 6
                                                                                                                      //
	room = RocketChat.models.Rooms.findOneById(item.rid);                                                                // 7
	channel = room.name;                                                                                                 // 8
	user = Meteor.users.findOne(Meteor.userId());                                                                        // 9
	msgStream.emit(item.rid, {                                                                                           // 11
		_id: Random.id(),                                                                                                   // 12
		rid: item.rid,                                                                                                      // 13
		u: {                                                                                                                // 14
			username: 'rocket.cat'                                                                                             // 14
		},                                                                                                                  // 14
		ts: new Date(),                                                                                                     // 15
		msg: TAPi18n.__('SlackBridge_start', {                                                                              // 16
			postProcess: 'sprintf',                                                                                            // 17
			sprintf: [user.username, channel]                                                                                  // 18
		}, user.language)                                                                                                   // 16
	});                                                                                                                  // 11
                                                                                                                      //
	try {                                                                                                                // 22
		RocketChat.SlackBridge.importMessages(item.rid, function (error) {                                                  // 23
			if (error) {                                                                                                       // 24
				msgStream.emit(item.rid, {                                                                                        // 25
					_id: Random.id(),                                                                                                // 26
					rid: item.rid,                                                                                                   // 27
					u: {                                                                                                             // 28
						username: 'rocket.cat'                                                                                          // 28
					},                                                                                                               // 28
					ts: new Date(),                                                                                                  // 29
					msg: TAPi18n.__('SlackBridge_error', {                                                                           // 30
						postProcess: 'sprintf',                                                                                         // 31
						sprintf: [channel, error.message]                                                                               // 32
					}, user.language)                                                                                                // 30
				});                                                                                                               // 25
			} else {                                                                                                           // 35
				msgStream.emit(item.rid, {                                                                                        // 36
					_id: Random.id(),                                                                                                // 37
					rid: item.rid,                                                                                                   // 38
					u: {                                                                                                             // 39
						username: 'rocket.cat'                                                                                          // 39
					},                                                                                                               // 39
					ts: new Date(),                                                                                                  // 40
					msg: TAPi18n.__('SlackBridge_finish', {                                                                          // 41
						postProcess: 'sprintf',                                                                                         // 42
						sprintf: [channel]                                                                                              // 43
					}, user.language)                                                                                                // 41
				});                                                                                                               // 36
			}                                                                                                                  // 46
		});                                                                                                                 // 47
	} catch (error) {                                                                                                    // 48
		msgStream.emit(item.rid, {                                                                                          // 49
			_id: Random.id(),                                                                                                  // 50
			rid: item.rid,                                                                                                     // 51
			u: {                                                                                                               // 52
				username: 'rocket.cat'                                                                                            // 52
			},                                                                                                                 // 52
			ts: new Date(),                                                                                                    // 53
			msg: TAPi18n.__('SlackBridge_error', {                                                                             // 54
				postProcess: 'sprintf',                                                                                           // 55
				sprintf: [channel, error.message]                                                                                 // 56
			}, user.language)                                                                                                  // 54
		});                                                                                                                 // 49
		throw error;                                                                                                        // 59
	}                                                                                                                    // 60
                                                                                                                      //
	return SlackBridgeImport;                                                                                            // 61
}                                                                                                                     // 62
                                                                                                                      //
RocketChat.slashCommands.add('slackbridge-import', SlackBridgeImport);                                                // 64
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/rocketchat:slackbridge/logger.js");
require("./node_modules/meteor/rocketchat:slackbridge/settings.js");
require("./node_modules/meteor/rocketchat:slackbridge/slackbridge.js");
require("./node_modules/meteor/rocketchat:slackbridge/slashcommand/slackbridge_import.server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:slackbridge'] = {};

})();

//# sourceMappingURL=rocketchat_slackbridge.js.map
