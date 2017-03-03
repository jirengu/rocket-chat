(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var Importer = Package['rocketchat:importer'].Importer;
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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:importer-hipchat-enterprise":{"server.js":["babel-runtime/helpers/slicedToArray","babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","stream","zlib","path",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_importer-hipchat-enterprise/server.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");                                                  //
                                                                                                                       //
var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);                                                         //
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
/* globals Importer */Importer.HipChatEnterprise = function (_Importer$Base) {                                         // 1
	(0, _inherits3.default)(ImporterHipChatEnterprise, _Importer$Base);                                                   // 3
                                                                                                                       //
	function ImporterHipChatEnterprise(name, descriptionI18N, mimeType) {                                                 // 4
		(0, _classCallCheck3.default)(this, ImporterHipChatEnterprise);                                                      // 4
                                                                                                                       //
		var _this = (0, _possibleConstructorReturn3.default)(this, _Importer$Base.call(this, name, descriptionI18N, mimeType));
                                                                                                                       //
		_this.logger.debug('Constructed a new HipChat Enterprise Importer.');                                                // 6
                                                                                                                       //
		_this.Readable = require('stream').Readable;                                                                         // 8
		_this.zlib = require('zlib');                                                                                        // 9
		_this.tarStream = Npm.require('tar-stream');                                                                         // 10
		_this.extract = _this.tarStream.extract();                                                                           // 11
		_this.path = require('path');                                                                                        // 12
		_this.messages = new Map();                                                                                          // 13
		_this.directMessages = new Map();                                                                                    // 14
		return _this;                                                                                                        // 4
	}                                                                                                                     // 15
                                                                                                                       //
	ImporterHipChatEnterprise.prototype.prepare = function () {                                                           // 3
		function prepare(dataURI, sentContentType, fileName) {                                                               // 3
			var _this2 = this;                                                                                                  // 17
                                                                                                                       //
			_Importer$Base.prototype.prepare.call(this, dataURI, sentContentType, fileName);                                    // 18
                                                                                                                       //
			var tempUsers = [];                                                                                                 // 20
			var tempRooms = [];                                                                                                 // 21
			var tempMessages = new Map();                                                                                       // 22
			var tempDirectMessages = new Map();                                                                                 // 23
			var promise = new Promise(function (resolve, reject) {                                                              // 24
				_this2.extract.on('entry', Meteor.bindEnvironment(function (header, stream, next) {                                // 25
					if (header.name.indexOf('.json') !== -1) {                                                                        // 26
						(function () {                                                                                                   // 26
							var info = _this2.path.parse(header.name);                                                                      // 27
                                                                                                                       //
							stream.on('data', Meteor.bindEnvironment(function (chunk) {                                                     // 29
								_this2.logger.debug("Processing the file: " + header.name);                                                    // 30
                                                                                                                       //
								var file = JSON.parse(chunk);                                                                                  // 31
                                                                                                                       //
								if (info.base === 'users.json') {                                                                              // 33
									_Importer$Base.prototype.updateProgress.call(_this2, Importer.ProgressStep.PREPARING_USERS);                  // 34
                                                                                                                       //
									for (var _iterator = file, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
										var _ref;                                                                                                    // 35
                                                                                                                       //
										if (_isArray) {                                                                                              // 35
											if (_i >= _iterator.length) break;                                                                          // 35
											_ref = _iterator[_i++];                                                                                     // 35
										} else {                                                                                                     // 35
											_i = _iterator.next();                                                                                      // 35
											if (_i.done) break;                                                                                         // 35
											_ref = _i.value;                                                                                            // 35
										}                                                                                                            // 35
                                                                                                                       //
										var u = _ref;                                                                                                // 35
										tempUsers.push({                                                                                             // 36
											id: u.User.id,                                                                                              // 37
											email: u.User.email,                                                                                        // 38
											name: u.User.name,                                                                                          // 39
											username: u.User.mention_name,                                                                              // 40
											avatar: u.User.avatar.replace(/\n/g, ''),                                                                   // 41
											timezone: u.User.timezone,                                                                                  // 42
											isDeleted: u.User.is_deleted                                                                                // 43
										});                                                                                                          // 36
									}                                                                                                             // 45
								} else if (info.base === 'rooms.json') {                                                                       // 46
									_Importer$Base.prototype.updateProgress.call(_this2, Importer.ProgressStep.PREPARING_CHANNELS);               // 47
                                                                                                                       //
									for (var _iterator2 = file, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
										var _ref2;                                                                                                   // 48
                                                                                                                       //
										if (_isArray2) {                                                                                             // 48
											if (_i2 >= _iterator2.length) break;                                                                        // 48
											_ref2 = _iterator2[_i2++];                                                                                  // 48
										} else {                                                                                                     // 48
											_i2 = _iterator2.next();                                                                                    // 48
											if (_i2.done) break;                                                                                        // 48
											_ref2 = _i2.value;                                                                                          // 48
										}                                                                                                            // 48
                                                                                                                       //
										var r = _ref2;                                                                                               // 48
										tempRooms.push({                                                                                             // 49
											id: r.Room.id,                                                                                              // 50
											creator: r.Room.owner,                                                                                      // 51
											created: new Date(r.Room.created),                                                                          // 52
											name: r.Room.name.replace(/ /g, '_').toLowerCase(),                                                         // 53
											isPrivate: r.Room.privacy === 'private',                                                                    // 54
											isArchived: r.Room.is_archived,                                                                             // 55
											topic: r.Room.topic                                                                                         // 56
										});                                                                                                          // 49
									}                                                                                                             // 58
								} else if (info.base === 'history.json') {                                                                     // 59
									var dirSplit = info.dir.split('/'); //['.', 'users', '1']                                                     // 60
                                                                                                                       //
									var roomIdentifier = dirSplit[1] + "/" + dirSplit[2];                                                         // 61
                                                                                                                       //
									if (dirSplit[1] === 'users') {                                                                                // 63
										var msgs = [];                                                                                               // 64
                                                                                                                       //
										for (var _iterator3 = file, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
											var _ref3;                                                                                                  // 65
                                                                                                                       //
											if (_isArray3) {                                                                                            // 65
												if (_i3 >= _iterator3.length) break;                                                                       // 65
												_ref3 = _iterator3[_i3++];                                                                                 // 65
											} else {                                                                                                    // 65
												_i3 = _iterator3.next();                                                                                   // 65
												if (_i3.done) break;                                                                                       // 65
												_ref3 = _i3.value;                                                                                         // 65
											}                                                                                                           // 65
                                                                                                                       //
											var m = _ref3;                                                                                              // 65
                                                                                                                       //
											if (m.PrivateUserMessage) {                                                                                 // 66
												msgs.push({                                                                                                // 67
													type: 'user',                                                                                             // 68
													id: "hipchatenterprise-" + m.PrivateUserMessage.id,                                                       // 69
													senderId: m.PrivateUserMessage.sender.id,                                                                 // 70
													receiverId: m.PrivateUserMessage.receiver.id,                                                             // 71
													text: m.PrivateUserMessage.message.indexOf('/me ') === -1 ? m.PrivateUserMessage.message : m.PrivateUserMessage.message.replace(/\/me /, '_') + "_",
													ts: new Date(m.PrivateUserMessage.timestamp.split(' ')[0])                                                // 73
												});                                                                                                        // 67
											}                                                                                                           // 75
										}                                                                                                            // 76
                                                                                                                       //
										tempDirectMessages.set(roomIdentifier, msgs);                                                                // 77
									} else if (dirSplit[1] === 'rooms') {                                                                         // 78
										var roomMsgs = [];                                                                                           // 79
                                                                                                                       //
										for (var _iterator4 = file, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
											var _ref4;                                                                                                  // 81
                                                                                                                       //
											if (_isArray4) {                                                                                            // 81
												if (_i4 >= _iterator4.length) break;                                                                       // 81
												_ref4 = _iterator4[_i4++];                                                                                 // 81
											} else {                                                                                                    // 81
												_i4 = _iterator4.next();                                                                                   // 81
												if (_i4.done) break;                                                                                       // 81
												_ref4 = _i4.value;                                                                                         // 81
											}                                                                                                           // 81
                                                                                                                       //
											var _m = _ref4;                                                                                             // 81
                                                                                                                       //
											if (_m.UserMessage) {                                                                                       // 82
												roomMsgs.push({                                                                                            // 83
													type: 'user',                                                                                             // 84
													id: "hipchatenterprise-" + dirSplit[2] + "-" + _m.UserMessage.id,                                         // 85
													userId: _m.UserMessage.sender.id,                                                                         // 86
													text: _m.UserMessage.message.indexOf('/me ') === -1 ? _m.UserMessage.message : _m.UserMessage.message.replace(/\/me /, '_') + "_",
													ts: new Date(_m.UserMessage.timestamp.split(' ')[0])                                                      // 88
												});                                                                                                        // 83
											} else if (_m.TopicRoomMessage) {                                                                           // 90
												roomMsgs.push({                                                                                            // 91
													type: 'topic',                                                                                            // 92
													id: "hipchatenterprise-" + dirSplit[2] + "-" + _m.TopicRoomMessage.id,                                    // 93
													userId: _m.TopicRoomMessage.sender.id,                                                                    // 94
													ts: new Date(_m.TopicRoomMessage.timestamp.split(' ')[0]),                                                // 95
													text: _m.TopicRoomMessage.message                                                                         // 96
												});                                                                                                        // 91
											} else {                                                                                                    // 98
												_this2.logger.warn('HipChat Enterprise importer isn\'t configured to handle this message:', _m);           // 99
											}                                                                                                           // 100
										}                                                                                                            // 101
                                                                                                                       //
										tempMessages.set(roomIdentifier, roomMsgs);                                                                  // 102
									} else {                                                                                                      // 103
										_this2.logger.warn("HipChat Enterprise importer isn't configured to handle \"" + dirSplit[1] + "\" files.");
									}                                                                                                             // 105
								} else {                                                                                                       // 106
									//What are these files!?                                                                                      // 107
									_this2.logger.warn("HipChat Enterprise importer doesn't know what to do with the file \"" + header.name + "\" :o", info);
								}                                                                                                              // 109
							}));                                                                                                            // 110
							stream.on('end', function () {                                                                                  // 112
								return next();                                                                                                 // 112
							});                                                                                                             // 112
							stream.on('error', function () {                                                                                // 113
								return next();                                                                                                 // 113
							});                                                                                                             // 113
						})();                                                                                                            // 26
					} else {                                                                                                          // 114
						next();                                                                                                          // 115
					}                                                                                                                 // 116
				}));                                                                                                               // 117
                                                                                                                       //
				_this2.extract.on('error', function (err) {                                                                        // 119
					_this2.logger.warn('extract error:', err);                                                                        // 120
                                                                                                                       //
					reject();                                                                                                         // 121
				});                                                                                                                // 122
                                                                                                                       //
				_this2.extract.on('finish', Meteor.bindEnvironment(function () {                                                   // 124
					// Insert the users record, eventually this might have to be split into several ones as well                      // 125
					// if someone tries to import a several thousands users instance                                                  // 126
					var usersId = _this2.collection.insert({                                                                          // 127
						'import': _this2.importRecord._id,                                                                               // 127
						'importer': _this2.name,                                                                                         // 127
						'type': 'users',                                                                                                 // 127
						'users': tempUsers                                                                                               // 127
					});                                                                                                               // 127
                                                                                                                       //
					_this2.users = _this2.collection.findOne(usersId);                                                                // 128
                                                                                                                       //
					_Importer$Base.prototype.updateRecord.call(_this2, {                                                              // 129
						'count.users': tempUsers.length                                                                                  // 129
					});                                                                                                               // 129
                                                                                                                       //
					_Importer$Base.prototype.addCountToTotal.call(_this2, tempUsers.length); // Insert the channels records.          // 130
                                                                                                                       //
                                                                                                                       //
					var channelsId = _this2.collection.insert({                                                                       // 133
						'import': _this2.importRecord._id,                                                                               // 133
						'importer': _this2.name,                                                                                         // 133
						'type': 'channels',                                                                                              // 133
						'channels': tempRooms                                                                                            // 133
					});                                                                                                               // 133
                                                                                                                       //
					_this2.channels = _this2.collection.findOne(channelsId);                                                          // 134
                                                                                                                       //
					_Importer$Base.prototype.updateRecord.call(_this2, {                                                              // 135
						'count.channels': tempRooms.length                                                                               // 135
					});                                                                                                               // 135
                                                                                                                       //
					_Importer$Base.prototype.addCountToTotal.call(_this2, tempRooms.length); // Save the messages records to the import record for `startImport` usage
                                                                                                                       //
                                                                                                                       //
					_Importer$Base.prototype.updateProgress.call(_this2, Importer.ProgressStep.PREPARING_MESSAGES);                   // 139
                                                                                                                       //
					var messagesCount = 0;                                                                                            // 140
                                                                                                                       //
					var _loop = function (channel, msgs) {                                                                            // 124
						if (!_this2.messages.get(channel)) {                                                                             // 142
							_this2.messages.set(channel, new Map());                                                                        // 143
						}                                                                                                                // 144
                                                                                                                       //
						messagesCount += msgs.length;                                                                                    // 146
                                                                                                                       //
						_Importer$Base.prototype.updateRecord.call(_this2, {                                                             // 147
							'messagesstatus': channel                                                                                       // 147
						});                                                                                                              // 147
                                                                                                                       //
						if (Importer.Base.getBSONSize(msgs) > Importer.Base.MaxBSONSize) {                                               // 149
							Importer.Base.getBSONSafeArraysFromAnArray(msgs).forEach(function (splitMsg, i) {                               // 150
								var messagesId = _this2.collection.insert({                                                                    // 151
									'import': _this2.importRecord._id,                                                                            // 151
									'importer': _this2.name,                                                                                      // 151
									'type': 'messages',                                                                                           // 151
									'name': channel + "/" + i,                                                                                    // 151
									'messages': splitMsg                                                                                          // 151
								});                                                                                                            // 151
                                                                                                                       //
								_this2.messages.get(channel).set(channel + "." + i, _this2.collection.findOne(messagesId));                    // 152
							});                                                                                                             // 153
						} else {                                                                                                         // 154
							var messagesId = _this2.collection.insert({                                                                     // 155
								'import': _this2.importRecord._id,                                                                             // 155
								'importer': _this2.name,                                                                                       // 155
								'type': 'messages',                                                                                            // 155
								'name': "" + channel,                                                                                          // 155
								'messages': msgs                                                                                               // 155
							});                                                                                                             // 155
                                                                                                                       //
							_this2.messages.get(channel).set(channel, _this2.collection.findOne(messagesId));                               // 156
						}                                                                                                                // 157
					};                                                                                                                // 124
                                                                                                                       //
					for (var _iterator5 = tempMessages.entries(), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
						var _ref7;                                                                                                       // 141
                                                                                                                       //
						if (_isArray5) {                                                                                                 // 141
							if (_i5 >= _iterator5.length) break;                                                                            // 141
							_ref7 = _iterator5[_i5++];                                                                                      // 141
						} else {                                                                                                         // 141
							_i5 = _iterator5.next();                                                                                        // 141
							if (_i5.done) break;                                                                                            // 141
							_ref7 = _i5.value;                                                                                              // 141
						}                                                                                                                // 141
                                                                                                                       //
						var _ref5 = _ref7;                                                                                               // 141
                                                                                                                       //
						var _ref6 = (0, _slicedToArray3.default)(_ref5, 2);                                                              // 141
                                                                                                                       //
						var channel = _ref6[0];                                                                                          // 141
						var msgs = _ref6[1];                                                                                             // 141
                                                                                                                       //
						_loop(channel, msgs);                                                                                            // 141
					}                                                                                                                 // 158
                                                                                                                       //
					var _loop2 = function (directMsgUser, msgs) {                                                                     // 124
						_this2.logger.debug("Preparing the direct messages for: " + directMsgUser);                                      // 161
                                                                                                                       //
						if (!_this2.directMessages.get(directMsgUser)) {                                                                 // 162
							_this2.directMessages.set(directMsgUser, new Map());                                                            // 163
						}                                                                                                                // 164
                                                                                                                       //
						messagesCount += msgs.length;                                                                                    // 166
                                                                                                                       //
						_Importer$Base.prototype.updateRecord.call(_this2, {                                                             // 167
							'messagesstatus': directMsgUser                                                                                 // 167
						});                                                                                                              // 167
                                                                                                                       //
						if (Importer.Base.getBSONSize(msgs) > Importer.Base.MaxBSONSize) {                                               // 169
							Importer.Base.getBSONSafeArraysFromAnArray(msgs).forEach(function (splitMsg, i) {                               // 170
								var messagesId = _this2.collection.insert({                                                                    // 171
									'import': _this2.importRecord._id,                                                                            // 171
									'importer': _this2.name,                                                                                      // 171
									'type': 'directMessages',                                                                                     // 171
									'name': directMsgUser + "/" + i,                                                                              // 171
									'messages': splitMsg                                                                                          // 171
								});                                                                                                            // 171
                                                                                                                       //
								_this2.directMessages.get(directMsgUser).set(directMsgUser + "." + i, _this2.collection.findOne(messagesId));  // 172
							});                                                                                                             // 173
						} else {                                                                                                         // 174
							var messagesId = _this2.collection.insert({                                                                     // 175
								'import': _this2.importRecord._id,                                                                             // 175
								'importer': _this2.name,                                                                                       // 175
								'type': 'directMessages',                                                                                      // 175
								'name': "" + directMsgUser,                                                                                    // 175
								'messages': msgs                                                                                               // 175
							});                                                                                                             // 175
                                                                                                                       //
							_this2.directMessages.get(directMsgUser).set(directMsgUser, _this2.collection.findOne(messagesId));             // 176
						}                                                                                                                // 177
					};                                                                                                                // 124
                                                                                                                       //
					for (var _iterator6 = tempDirectMessages.entries(), _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
						var _ref10;                                                                                                      // 160
                                                                                                                       //
						if (_isArray6) {                                                                                                 // 160
							if (_i6 >= _iterator6.length) break;                                                                            // 160
							_ref10 = _iterator6[_i6++];                                                                                     // 160
						} else {                                                                                                         // 160
							_i6 = _iterator6.next();                                                                                        // 160
							if (_i6.done) break;                                                                                            // 160
							_ref10 = _i6.value;                                                                                             // 160
						}                                                                                                                // 160
                                                                                                                       //
						var _ref8 = _ref10;                                                                                              // 160
                                                                                                                       //
						var _ref9 = (0, _slicedToArray3.default)(_ref8, 2);                                                              // 160
                                                                                                                       //
						var directMsgUser = _ref9[0];                                                                                    // 160
						var msgs = _ref9[1];                                                                                             // 160
                                                                                                                       //
						_loop2(directMsgUser, msgs);                                                                                     // 160
					}                                                                                                                 // 178
                                                                                                                       //
					_Importer$Base.prototype.updateRecord.call(_this2, {                                                              // 180
						'count.messages': messagesCount,                                                                                 // 180
						'messagesstatus': null                                                                                           // 180
					});                                                                                                               // 180
                                                                                                                       //
					_Importer$Base.prototype.addCountToTotal.call(_this2, messagesCount); //Ensure we have some users, channels, and messages
                                                                                                                       //
                                                                                                                       //
					if (tempUsers.length === 0 || tempRooms.length === 0 || messagesCount === 0) {                                    // 184
						_this2.logger.warn("The loaded users count " + tempUsers.length + ", the loaded rooms " + tempRooms.length + ", and the loaded messages " + messagesCount);
                                                                                                                       //
						_Importer$Base.prototype.updateProgress.call(_this2, Importer.ProgressStep.ERROR);                               // 186
                                                                                                                       //
						reject();                                                                                                        // 187
						return;                                                                                                          // 188
					}                                                                                                                 // 189
                                                                                                                       //
					var selectionUsers = tempUsers.map(function (u) {                                                                 // 191
						return new Importer.SelectionUser(u.id, u.username, u.email, u.isDeleted, false, true);                          // 191
					});                                                                                                               // 191
					var selectionChannels = tempRooms.map(function (r) {                                                              // 192
						return new Importer.SelectionChannel(r.id, r.name, r.isArchived, true, r.isPrivate);                             // 192
					});                                                                                                               // 192
                                                                                                                       //
					_Importer$Base.prototype.updateProgress.call(_this2, Importer.ProgressStep.USER_SELECTION);                       // 194
                                                                                                                       //
					resolve(new Importer.Selection(_this2.name, selectionUsers, selectionChannels));                                  // 196
				})); //Wish I could make this cleaner :(                                                                           // 197
                                                                                                                       //
                                                                                                                       //
				var split = dataURI.split(',');                                                                                    // 200
				var s = new _this2.Readable();                                                                                     // 201
				s.push(new Buffer(split[split.length - 1], 'base64'));                                                             // 202
				s.push(null);                                                                                                      // 203
				s.pipe(_this2.zlib.createGunzip()).pipe(_this2.extract);                                                           // 204
			});                                                                                                                 // 205
			return promise;                                                                                                     // 207
		}                                                                                                                    // 208
                                                                                                                       //
		return prepare;                                                                                                      // 3
	}();                                                                                                                  // 3
                                                                                                                       //
	ImporterHipChatEnterprise.prototype.startImport = function () {                                                       // 3
		function startImport(importSelection) {                                                                              // 3
			var _this3 = this;                                                                                                  // 210
                                                                                                                       //
			_Importer$Base.prototype.startImport.call(this, importSelection);                                                   // 211
                                                                                                                       //
			var started = Date.now(); //Ensure we're only going to import the users that the user has selected                  // 212
                                                                                                                       //
			for (var _iterator7 = importSelection.users, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
				var _ref11;                                                                                                        // 215
                                                                                                                       //
				if (_isArray7) {                                                                                                   // 215
					if (_i7 >= _iterator7.length) break;                                                                              // 215
					_ref11 = _iterator7[_i7++];                                                                                       // 215
				} else {                                                                                                           // 215
					_i7 = _iterator7.next();                                                                                          // 215
					if (_i7.done) break;                                                                                              // 215
					_ref11 = _i7.value;                                                                                               // 215
				}                                                                                                                  // 215
                                                                                                                       //
				var user = _ref11;                                                                                                 // 215
                                                                                                                       //
				for (var _iterator18 = this.users.users, _isArray18 = Array.isArray(_iterator18), _i18 = 0, _iterator18 = _isArray18 ? _iterator18 : _iterator18[Symbol.iterator]();;) {
					var _ref30;                                                                                                       // 216
                                                                                                                       //
					if (_isArray18) {                                                                                                 // 216
						if (_i18 >= _iterator18.length) break;                                                                           // 216
						_ref30 = _iterator18[_i18++];                                                                                    // 216
					} else {                                                                                                          // 216
						_i18 = _iterator18.next();                                                                                       // 216
						if (_i18.done) break;                                                                                            // 216
						_ref30 = _i18.value;                                                                                             // 216
					}                                                                                                                 // 216
                                                                                                                       //
					var u = _ref30;                                                                                                   // 216
                                                                                                                       //
					if (u.id === user.user_id) {                                                                                      // 217
						u.do_import = user.do_import;                                                                                    // 218
					}                                                                                                                 // 219
				}                                                                                                                  // 220
			}                                                                                                                   // 221
                                                                                                                       //
			this.collection.update({                                                                                            // 222
				_id: this.users._id                                                                                                // 222
			}, {                                                                                                                // 222
				$set: {                                                                                                            // 222
					'users': this.users.users                                                                                         // 222
				}                                                                                                                  // 222
			}); //Ensure we're only importing the channels the user has selected.                                               // 222
                                                                                                                       //
			for (var _iterator8 = importSelection.channels, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
				var _ref12;                                                                                                        // 225
                                                                                                                       //
				if (_isArray8) {                                                                                                   // 225
					if (_i8 >= _iterator8.length) break;                                                                              // 225
					_ref12 = _iterator8[_i8++];                                                                                       // 225
				} else {                                                                                                           // 225
					_i8 = _iterator8.next();                                                                                          // 225
					if (_i8.done) break;                                                                                              // 225
					_ref12 = _i8.value;                                                                                               // 225
				}                                                                                                                  // 225
                                                                                                                       //
				var channel = _ref12;                                                                                              // 225
                                                                                                                       //
				for (var _iterator19 = this.channels.channels, _isArray19 = Array.isArray(_iterator19), _i19 = 0, _iterator19 = _isArray19 ? _iterator19 : _iterator19[Symbol.iterator]();;) {
					var _ref31;                                                                                                       // 226
                                                                                                                       //
					if (_isArray19) {                                                                                                 // 226
						if (_i19 >= _iterator19.length) break;                                                                           // 226
						_ref31 = _iterator19[_i19++];                                                                                    // 226
					} else {                                                                                                          // 226
						_i19 = _iterator19.next();                                                                                       // 226
						if (_i19.done) break;                                                                                            // 226
						_ref31 = _i19.value;                                                                                             // 226
					}                                                                                                                 // 226
                                                                                                                       //
					var c = _ref31;                                                                                                   // 226
                                                                                                                       //
					if (c.id === channel.channel_id) {                                                                                // 227
						c.do_import = channel.do_import;                                                                                 // 228
					}                                                                                                                 // 229
				}                                                                                                                  // 230
			}                                                                                                                   // 231
                                                                                                                       //
			this.collection.update({                                                                                            // 232
				_id: this.channels._id                                                                                             // 232
			}, {                                                                                                                // 232
				$set: {                                                                                                            // 232
					'channels': this.channels.channels                                                                                // 232
				}                                                                                                                  // 232
			});                                                                                                                 // 232
			var startedByUserId = Meteor.userId();                                                                              // 234
			Meteor.defer(function () {                                                                                          // 235
				_Importer$Base.prototype.updateProgress.call(_this3, Importer.ProgressStep.IMPORTING_USERS); //Import the users    // 236
                                                                                                                       //
                                                                                                                       //
				var _loop3 = function (u) {                                                                                        // 235
					_this3.logger.debug("Starting the user import: " + u.username + " and are we importing them? " + u.do_import);    // 239
                                                                                                                       //
					if (!u.do_import) {                                                                                               // 240
						return "continue";                                                                                               // 241
					}                                                                                                                 // 242
                                                                                                                       //
					Meteor.runAsUser(startedByUserId, function () {                                                                   // 244
						var existantUser = RocketChat.models.Users.findOneByEmailAddress(u.email); //If we couldn't find one by their email address, try to find an existing user by their username
                                                                                                                       //
						if (!existantUser) {                                                                                             // 248
							existantUser = RocketChat.models.Users.findOneByUsername(u.username);                                           // 249
						}                                                                                                                // 250
                                                                                                                       //
						if (existantUser) {                                                                                              // 252
							//since we have an existing user, let's try a few things                                                        // 253
							u.rocketId = existantUser._id;                                                                                  // 254
							RocketChat.models.Users.update({                                                                                // 255
								_id: u.rocketId                                                                                                // 255
							}, {                                                                                                            // 255
								$addToSet: {                                                                                                   // 255
									importIds: u.id                                                                                               // 255
								}                                                                                                              // 255
							});                                                                                                             // 255
						} else {                                                                                                         // 256
							(function () {                                                                                                  // 256
								var userId = Accounts.createUser({                                                                             // 257
									email: u.email,                                                                                               // 257
									password: Date.now() + u.name + u.email.toUpperCase()                                                         // 257
								});                                                                                                            // 257
								Meteor.runAsUser(userId, function () {                                                                         // 258
									Meteor.call('setUsername', u.username, {                                                                      // 259
										joinDefaultChannelsSilenced: true                                                                            // 259
									}); //TODO: Use moment timezone to calc the time offset - Meteor.call 'userSetUtcOffset', user.tz_offset / 3600
                                                                                                                       //
									RocketChat.models.Users.setName(userId, u.name); //TODO: Think about using a custom field for the users "title" field
                                                                                                                       //
									if (u.avatar) {                                                                                               // 264
										Meteor.call('setAvatarFromService', "data:image/png;base64," + u.avatar);                                    // 265
									} //Deleted users are 'inactive' users in Rocket.Chat                                                         // 266
                                                                                                                       //
                                                                                                                       //
									if (u.deleted) {                                                                                              // 269
										Meteor.call('setUserActiveStatus', userId, false);                                                           // 270
									}                                                                                                             // 271
                                                                                                                       //
									RocketChat.models.Users.update({                                                                              // 273
										_id: userId                                                                                                  // 273
									}, {                                                                                                          // 273
										$addToSet: {                                                                                                 // 273
											importIds: u.id                                                                                             // 273
										}                                                                                                            // 273
									});                                                                                                           // 273
									u.rocketId = userId;                                                                                          // 274
								});                                                                                                            // 275
							})();                                                                                                           // 256
						}                                                                                                                // 276
                                                                                                                       //
						_Importer$Base.prototype.addCountCompleted.call(_this3, 1);                                                      // 278
					});                                                                                                               // 279
				};                                                                                                                 // 235
                                                                                                                       //
				for (var _iterator9 = _this3.users.users, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
					var _ref13;                                                                                                       // 238
                                                                                                                       //
					if (_isArray9) {                                                                                                  // 238
						if (_i9 >= _iterator9.length) break;                                                                             // 238
						_ref13 = _iterator9[_i9++];                                                                                      // 238
					} else {                                                                                                          // 238
						_i9 = _iterator9.next();                                                                                         // 238
						if (_i9.done) break;                                                                                             // 238
						_ref13 = _i9.value;                                                                                              // 238
					}                                                                                                                 // 238
                                                                                                                       //
					var u = _ref13;                                                                                                   // 238
                                                                                                                       //
					var _ret4 = _loop3(u);                                                                                            // 238
                                                                                                                       //
					if (_ret4 === "continue") continue;                                                                               // 238
				}                                                                                                                  // 280
                                                                                                                       //
				_this3.collection.update({                                                                                         // 281
					_id: _this3.users._id                                                                                             // 281
				}, {                                                                                                               // 281
					$set: {                                                                                                           // 281
						'users': _this3.users.users                                                                                      // 281
					}                                                                                                                 // 281
				}); //Import the channels                                                                                          // 281
                                                                                                                       //
                                                                                                                       //
				_Importer$Base.prototype.updateProgress.call(_this3, Importer.ProgressStep.IMPORTING_CHANNELS);                    // 284
                                                                                                                       //
				var _loop4 = function (c) {                                                                                        // 235
					if (!c.do_import) {                                                                                               // 286
						return "continue";                                                                                               // 287
					}                                                                                                                 // 288
                                                                                                                       //
					Meteor.runAsUser(startedByUserId, function () {                                                                   // 290
						var existantRoom = RocketChat.models.Rooms.findOneByName(c.name); //If the room exists or the name of it is 'general', then we don't need to create it again
                                                                                                                       //
						if (existantRoom || c.name.toUpperCase() === 'GENERAL') {                                                        // 293
							c.rocketId = c.name.toUpperCase() === 'GENERAL' ? 'GENERAL' : existantRoom._id;                                 // 294
							RocketChat.models.Rooms.update({                                                                                // 295
								_id: c.rocketId                                                                                                // 295
							}, {                                                                                                            // 295
								$addToSet: {                                                                                                   // 295
									importIds: c.id                                                                                               // 295
								}                                                                                                              // 295
							});                                                                                                             // 295
						} else {                                                                                                         // 296
							//Find the rocketchatId of the user who created this channel                                                    // 297
							var creatorId = startedByUserId;                                                                                // 298
                                                                                                                       //
							for (var _iterator13 = _this3.users.users, _isArray13 = Array.isArray(_iterator13), _i13 = 0, _iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();;) {
								var _ref21;                                                                                                    // 299
                                                                                                                       //
								if (_isArray13) {                                                                                              // 299
									if (_i13 >= _iterator13.length) break;                                                                        // 299
									_ref21 = _iterator13[_i13++];                                                                                 // 299
								} else {                                                                                                       // 299
									_i13 = _iterator13.next();                                                                                    // 299
									if (_i13.done) break;                                                                                         // 299
									_ref21 = _i13.value;                                                                                          // 299
								}                                                                                                              // 299
                                                                                                                       //
								var _u = _ref21;                                                                                               // 299
                                                                                                                       //
								if (_u.id === c.creator && _u.do_import) {                                                                     // 300
									creatorId = _u.rocketId;                                                                                      // 301
								}                                                                                                              // 302
							} //Create the channel                                                                                          // 303
                                                                                                                       //
                                                                                                                       //
							Meteor.runAsUser(creatorId, function () {                                                                       // 306
								var roomInfo = Meteor.call(c.isPrivate ? 'createPrivateGroup' : 'createChannel', c.name, []);                  // 307
								c.rocketId = roomInfo.rid;                                                                                     // 308
							});                                                                                                             // 309
							RocketChat.models.Rooms.update({                                                                                // 311
								_id: c.rocketId                                                                                                // 311
							}, {                                                                                                            // 311
								$set: {                                                                                                        // 311
									ts: c.created,                                                                                                // 311
									topic: c.topic                                                                                                // 311
								},                                                                                                             // 311
								$addToSet: {                                                                                                   // 311
									importIds: c.id                                                                                               // 311
								}                                                                                                              // 311
							});                                                                                                             // 311
						}                                                                                                                // 312
                                                                                                                       //
						_Importer$Base.prototype.addCountCompleted.call(_this3, 1);                                                      // 314
					});                                                                                                               // 315
				};                                                                                                                 // 235
                                                                                                                       //
				for (var _iterator10 = _this3.channels.channels, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
					var _ref14;                                                                                                       // 285
                                                                                                                       //
					if (_isArray10) {                                                                                                 // 285
						if (_i10 >= _iterator10.length) break;                                                                           // 285
						_ref14 = _iterator10[_i10++];                                                                                    // 285
					} else {                                                                                                          // 285
						_i10 = _iterator10.next();                                                                                       // 285
						if (_i10.done) break;                                                                                            // 285
						_ref14 = _i10.value;                                                                                             // 285
					}                                                                                                                 // 285
                                                                                                                       //
					var c = _ref14;                                                                                                   // 285
                                                                                                                       //
					var _ret5 = _loop4(c);                                                                                            // 285
                                                                                                                       //
					if (_ret5 === "continue") continue;                                                                               // 285
				}                                                                                                                  // 316
                                                                                                                       //
				_this3.collection.update({                                                                                         // 317
					_id: _this3.channels._id                                                                                          // 317
				}, {                                                                                                               // 317
					$set: {                                                                                                           // 317
						'channels': _this3.channels.channels                                                                             // 317
					}                                                                                                                 // 317
				}); //Import the Messages                                                                                          // 317
                                                                                                                       //
                                                                                                                       //
				_Importer$Base.prototype.updateProgress.call(_this3, Importer.ProgressStep.IMPORTING_MESSAGES);                    // 320
                                                                                                                       //
				var _loop5 = function (ch, messagesMap) {                                                                          // 235
					var hipChannel = _this3.getChannelFromRoomIdentifier(ch);                                                         // 322
                                                                                                                       //
					if (!hipChannel.do_import) {                                                                                      // 323
						return "continue";                                                                                               // 324
					}                                                                                                                 // 325
                                                                                                                       //
					var room = RocketChat.models.Rooms.findOneById(hipChannel.rocketId, {                                             // 327
						fields: {                                                                                                        // 327
							usernames: 1,                                                                                                   // 327
							t: 1,                                                                                                           // 327
							name: 1                                                                                                         // 327
						}                                                                                                                // 327
					});                                                                                                               // 327
					Meteor.runAsUser(startedByUserId, function () {                                                                   // 328
						for (var _iterator14 = messagesMap.entries(), _isArray14 = Array.isArray(_iterator14), _i14 = 0, _iterator14 = _isArray14 ? _iterator14 : _iterator14[Symbol.iterator]();;) {
							var _ref24;                                                                                                     // 329
                                                                                                                       //
							if (_isArray14) {                                                                                               // 329
								if (_i14 >= _iterator14.length) break;                                                                         // 329
								_ref24 = _iterator14[_i14++];                                                                                  // 329
							} else {                                                                                                        // 329
								_i14 = _iterator14.next();                                                                                     // 329
								if (_i14.done) break;                                                                                          // 329
								_ref24 = _i14.value;                                                                                           // 329
							}                                                                                                               // 329
                                                                                                                       //
							var _ref22 = _ref24;                                                                                            // 329
                                                                                                                       //
							var _ref23 = (0, _slicedToArray3.default)(_ref22, 2);                                                           // 329
                                                                                                                       //
							var msgGroupData = _ref23[0];                                                                                   // 329
							var msgs = _ref23[1];                                                                                           // 329
                                                                                                                       //
							_Importer$Base.prototype.updateRecord.call(_this3, {                                                            // 330
								'messagesstatus': ch + "/" + msgGroupData + "." + msgs.messages.length                                         // 330
							});                                                                                                             // 330
                                                                                                                       //
							for (var _iterator15 = msgs.messages, _isArray15 = Array.isArray(_iterator15), _i15 = 0, _iterator15 = _isArray15 ? _iterator15 : _iterator15[Symbol.iterator]();;) {
								var _ref25;                                                                                                    // 331
                                                                                                                       //
								if (_isArray15) {                                                                                              // 331
									if (_i15 >= _iterator15.length) break;                                                                        // 331
									_ref25 = _iterator15[_i15++];                                                                                 // 331
								} else {                                                                                                       // 331
									_i15 = _iterator15.next();                                                                                    // 331
									if (_i15.done) break;                                                                                         // 331
									_ref25 = _i15.value;                                                                                          // 331
								}                                                                                                              // 331
                                                                                                                       //
								var msg = _ref25;                                                                                              // 331
                                                                                                                       //
								if (isNaN(msg.ts)) {                                                                                           // 332
									_this3.logger.warn("Timestamp on a message in " + ch + "/" + msgGroupData + " is invalid");                   // 333
                                                                                                                       //
									_Importer$Base.prototype.addCountCompleted.call(_this3, 1);                                                   // 334
                                                                                                                       //
									continue;                                                                                                     // 335
								}                                                                                                              // 336
                                                                                                                       //
								var creator = _this3.getRocketUserFromUserId(msg.userId);                                                      // 338
                                                                                                                       //
								if (creator) {                                                                                                 // 339
									switch (msg.type) {                                                                                           // 340
										case 'user':                                                                                                 // 341
											RocketChat.sendMessage(creator, {                                                                           // 342
												_id: msg.id,                                                                                               // 343
												ts: msg.ts,                                                                                                // 344
												msg: msg.text,                                                                                             // 345
												rid: room._id,                                                                                             // 346
												u: {                                                                                                       // 347
													_id: creator._id,                                                                                         // 348
													username: creator.username                                                                                // 349
												}                                                                                                          // 347
											}, room, true);                                                                                             // 342
											break;                                                                                                      // 352
                                                                                                                       //
										case 'topic':                                                                                                // 353
											RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser('room_changed_topic', room._id, msg.text, creator, {
												_id: msg.id,                                                                                               // 354
												ts: msg.ts                                                                                                 // 354
											});                                                                                                         // 354
											break;                                                                                                      // 355
									}                                                                                                             // 340
								}                                                                                                              // 357
                                                                                                                       //
								_Importer$Base.prototype.addCountCompleted.call(_this3, 1);                                                    // 359
							}                                                                                                               // 360
						}                                                                                                                // 361
					});                                                                                                               // 362
				};                                                                                                                 // 235
                                                                                                                       //
				for (var _iterator11 = _this3.messages.entries(), _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
					var _ref17;                                                                                                       // 321
                                                                                                                       //
					if (_isArray11) {                                                                                                 // 321
						if (_i11 >= _iterator11.length) break;                                                                           // 321
						_ref17 = _iterator11[_i11++];                                                                                    // 321
					} else {                                                                                                          // 321
						_i11 = _iterator11.next();                                                                                       // 321
						if (_i11.done) break;                                                                                            // 321
						_ref17 = _i11.value;                                                                                             // 321
					}                                                                                                                 // 321
                                                                                                                       //
					var _ref15 = _ref17;                                                                                              // 321
                                                                                                                       //
					var _ref16 = (0, _slicedToArray3.default)(_ref15, 2);                                                             // 321
                                                                                                                       //
					var ch = _ref16[0];                                                                                               // 321
					var messagesMap = _ref16[1];                                                                                      // 321
                                                                                                                       //
					var _ret6 = _loop5(ch, messagesMap);                                                                              // 321
                                                                                                                       //
					if (_ret6 === "continue") continue;                                                                               // 321
				} //Import the Direct Messages                                                                                     // 363
                                                                                                                       //
                                                                                                                       //
				for (var _iterator12 = _this3.directMessages.entries(), _isArray12 = Array.isArray(_iterator12), _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
					var _ref20;                                                                                                       // 366
                                                                                                                       //
					if (_isArray12) {                                                                                                 // 366
						if (_i12 >= _iterator12.length) break;                                                                           // 366
						_ref20 = _iterator12[_i12++];                                                                                    // 366
					} else {                                                                                                          // 366
						_i12 = _iterator12.next();                                                                                       // 366
						if (_i12.done) break;                                                                                            // 366
						_ref20 = _i12.value;                                                                                             // 366
					}                                                                                                                 // 366
                                                                                                                       //
					var _ref18 = _ref20;                                                                                              // 366
                                                                                                                       //
					var _ref19 = (0, _slicedToArray3.default)(_ref18, 2);                                                             // 366
                                                                                                                       //
					var directMsgRoom = _ref19[0];                                                                                    // 366
					var directMessagesMap = _ref19[1];                                                                                // 366
                                                                                                                       //
					var hipUser = _this3.getUserFromDirectMessageIdentifier(directMsgRoom);                                           // 367
                                                                                                                       //
					if (!hipUser.do_import) {                                                                                         // 368
						continue;                                                                                                        // 369
					} //Verify this direct message user's room is valid (confusing but idk how else to explain it)                    // 370
                                                                                                                       //
                                                                                                                       //
					if (!_this3.getRocketUserFromUserId(hipUser.id)) {                                                                // 373
						continue;                                                                                                        // 374
					}                                                                                                                 // 375
                                                                                                                       //
					for (var _iterator16 = directMessagesMap.entries(), _isArray16 = Array.isArray(_iterator16), _i16 = 0, _iterator16 = _isArray16 ? _iterator16 : _iterator16[Symbol.iterator]();;) {
						var _ref28;                                                                                                      // 377
                                                                                                                       //
						if (_isArray16) {                                                                                                // 377
							if (_i16 >= _iterator16.length) break;                                                                          // 377
							_ref28 = _iterator16[_i16++];                                                                                   // 377
						} else {                                                                                                         // 377
							_i16 = _iterator16.next();                                                                                      // 377
							if (_i16.done) break;                                                                                           // 377
							_ref28 = _i16.value;                                                                                            // 377
						}                                                                                                                // 377
                                                                                                                       //
						var _ref26 = _ref28;                                                                                             // 377
                                                                                                                       //
						var _ref27 = (0, _slicedToArray3.default)(_ref26, 2);                                                            // 377
                                                                                                                       //
						var msgGroupData = _ref27[0];                                                                                    // 377
						var msgs = _ref27[1];                                                                                            // 377
                                                                                                                       //
						_Importer$Base.prototype.updateRecord.call(_this3, {                                                             // 378
							'messagesstatus': directMsgRoom + "/" + msgGroupData + "." + msgs.messages.length                               // 378
						});                                                                                                              // 378
                                                                                                                       //
						var _loop6 = function (msg) {                                                                                    // 377
							if (isNaN(msg.ts)) {                                                                                            // 380
								_this3.logger.warn("Timestamp on a message in " + directMsgRoom + "/" + msgGroupData + " is invalid");         // 381
                                                                                                                       //
								_Importer$Base.prototype.addCountCompleted.call(_this3, 1);                                                    // 382
                                                                                                                       //
								return "continue";                                                                                             // 383
							} //make sure the message sender is a valid user inside rocket.chat                                             // 384
                                                                                                                       //
                                                                                                                       //
							var sender = _this3.getRocketUserFromUserId(msg.senderId);                                                      // 387
                                                                                                                       //
							if (!sender) {                                                                                                  // 388
								return "continue";                                                                                             // 389
							} //make sure the receiver of the message is a valid rocket.chat user                                           // 390
                                                                                                                       //
                                                                                                                       //
							var receiver = _this3.getRocketUserFromUserId(msg.receiverId);                                                  // 393
                                                                                                                       //
							if (!receiver) {                                                                                                // 394
								return "continue";                                                                                             // 395
							}                                                                                                               // 396
                                                                                                                       //
							var room = RocketChat.models.Rooms.findOneById([receiver._id, sender._id].sort().join(''));                     // 398
                                                                                                                       //
							if (!room) {                                                                                                    // 399
								Meteor.runAsUser(sender._id, function () {                                                                     // 400
									var roomInfo = Meteor.call('createDirectMessage', receiver.username);                                         // 401
									room = RocketChat.models.Rooms.findOneById(roomInfo.rid);                                                     // 402
								});                                                                                                            // 403
							}                                                                                                               // 404
                                                                                                                       //
							Meteor.runAsUser(sender._id, function () {                                                                      // 406
								RocketChat.sendMessage(sender, {                                                                               // 407
									_id: msg.id,                                                                                                  // 408
									ts: msg.ts,                                                                                                   // 409
									msg: msg.text,                                                                                                // 410
									rid: room._id,                                                                                                // 411
									u: {                                                                                                          // 412
										_id: sender._id,                                                                                             // 413
										username: sender.username                                                                                    // 414
									}                                                                                                             // 412
								}, room, true);                                                                                                // 407
							});                                                                                                             // 417
						};                                                                                                               // 377
                                                                                                                       //
						for (var _iterator17 = msgs.messages, _isArray17 = Array.isArray(_iterator17), _i17 = 0, _iterator17 = _isArray17 ? _iterator17 : _iterator17[Symbol.iterator]();;) {
							var _ref29;                                                                                                     // 379
                                                                                                                       //
							if (_isArray17) {                                                                                               // 379
								if (_i17 >= _iterator17.length) break;                                                                         // 379
								_ref29 = _iterator17[_i17++];                                                                                  // 379
							} else {                                                                                                        // 379
								_i17 = _iterator17.next();                                                                                     // 379
								if (_i17.done) break;                                                                                          // 379
								_ref29 = _i17.value;                                                                                           // 379
							}                                                                                                               // 379
                                                                                                                       //
							var msg = _ref29;                                                                                               // 379
                                                                                                                       //
							var _ret8 = _loop6(msg);                                                                                        // 379
                                                                                                                       //
							if (_ret8 === "continue") continue;                                                                             // 379
						}                                                                                                                // 418
					}                                                                                                                 // 419
				}                                                                                                                  // 420
                                                                                                                       //
				_Importer$Base.prototype.updateProgress.call(_this3, Importer.ProgressStep.FINISHING);                             // 422
                                                                                                                       //
				_Importer$Base.prototype.updateProgress.call(_this3, Importer.ProgressStep.DONE);                                  // 423
                                                                                                                       //
				var timeTook = Date.now() - started;                                                                               // 424
                                                                                                                       //
				_this3.logger.log("HipChat Enterprise Import took " + timeTook + " milliseconds.");                                // 425
			});                                                                                                                 // 426
			return _Importer$Base.prototype.getProgress.call(this);                                                             // 428
		}                                                                                                                    // 429
                                                                                                                       //
		return startImport;                                                                                                  // 3
	}();                                                                                                                  // 3
                                                                                                                       //
	ImporterHipChatEnterprise.prototype.getSelection = function () {                                                      // 3
		function getSelection() {                                                                                            // 3
			var selectionUsers = this.users.users.map(function (u) {                                                            // 432
				return new Importer.SelectionUser(u.id, u.username, u.email, false, false, true);                                  // 432
			});                                                                                                                 // 432
			var selectionChannels = this.channels.channels.map(function (c) {                                                   // 433
				return new Importer.SelectionChannel(c.id, c.name, false, true, c.isPrivate);                                      // 433
			});                                                                                                                 // 433
			return new Importer.Selection(this.name, selectionUsers, selectionChannels);                                        // 435
		}                                                                                                                    // 436
                                                                                                                       //
		return getSelection;                                                                                                 // 3
	}();                                                                                                                  // 3
                                                                                                                       //
	ImporterHipChatEnterprise.prototype.getChannelFromRoomIdentifier = function () {                                      // 3
		function getChannelFromRoomIdentifier(roomIdentifier) {                                                              // 3
			for (var _iterator20 = this.channels.channels, _isArray20 = Array.isArray(_iterator20), _i20 = 0, _iterator20 = _isArray20 ? _iterator20 : _iterator20[Symbol.iterator]();;) {
				var _ref32;                                                                                                        // 439
                                                                                                                       //
				if (_isArray20) {                                                                                                  // 439
					if (_i20 >= _iterator20.length) break;                                                                            // 439
					_ref32 = _iterator20[_i20++];                                                                                     // 439
				} else {                                                                                                           // 439
					_i20 = _iterator20.next();                                                                                        // 439
					if (_i20.done) break;                                                                                             // 439
					_ref32 = _i20.value;                                                                                              // 439
				}                                                                                                                  // 439
                                                                                                                       //
				var ch = _ref32;                                                                                                   // 439
                                                                                                                       //
				if ("rooms/" + ch.id === roomIdentifier) {                                                                         // 440
					return ch;                                                                                                        // 441
				}                                                                                                                  // 442
			}                                                                                                                   // 443
		}                                                                                                                    // 444
                                                                                                                       //
		return getChannelFromRoomIdentifier;                                                                                 // 3
	}();                                                                                                                  // 3
                                                                                                                       //
	ImporterHipChatEnterprise.prototype.getUserFromDirectMessageIdentifier = function () {                                // 3
		function getUserFromDirectMessageIdentifier(directIdentifier) {                                                      // 3
			for (var _iterator21 = this.users.users, _isArray21 = Array.isArray(_iterator21), _i21 = 0, _iterator21 = _isArray21 ? _iterator21 : _iterator21[Symbol.iterator]();;) {
				var _ref33;                                                                                                        // 447
                                                                                                                       //
				if (_isArray21) {                                                                                                  // 447
					if (_i21 >= _iterator21.length) break;                                                                            // 447
					_ref33 = _iterator21[_i21++];                                                                                     // 447
				} else {                                                                                                           // 447
					_i21 = _iterator21.next();                                                                                        // 447
					if (_i21.done) break;                                                                                             // 447
					_ref33 = _i21.value;                                                                                              // 447
				}                                                                                                                  // 447
                                                                                                                       //
				var u = _ref33;                                                                                                    // 447
                                                                                                                       //
				if ("users/" + u.id === directIdentifier) {                                                                        // 448
					return u;                                                                                                         // 449
				}                                                                                                                  // 450
			}                                                                                                                   // 451
		}                                                                                                                    // 452
                                                                                                                       //
		return getUserFromDirectMessageIdentifier;                                                                           // 3
	}();                                                                                                                  // 3
                                                                                                                       //
	ImporterHipChatEnterprise.prototype.getRocketUserFromUserId = function () {                                           // 3
		function getRocketUserFromUserId(userId) {                                                                           // 3
			for (var _iterator22 = this.users.users, _isArray22 = Array.isArray(_iterator22), _i22 = 0, _iterator22 = _isArray22 ? _iterator22 : _iterator22[Symbol.iterator]();;) {
				var _ref34;                                                                                                        // 455
                                                                                                                       //
				if (_isArray22) {                                                                                                  // 455
					if (_i22 >= _iterator22.length) break;                                                                            // 455
					_ref34 = _iterator22[_i22++];                                                                                     // 455
				} else {                                                                                                           // 455
					_i22 = _iterator22.next();                                                                                        // 455
					if (_i22.done) break;                                                                                             // 455
					_ref34 = _i22.value;                                                                                              // 455
				}                                                                                                                  // 455
                                                                                                                       //
				var u = _ref34;                                                                                                    // 455
                                                                                                                       //
				if (u.id === userId) {                                                                                             // 456
					return RocketChat.models.Users.findOneById(u.rocketId, {                                                          // 457
						fields: {                                                                                                        // 457
							username: 1                                                                                                     // 457
						}                                                                                                                // 457
					});                                                                                                               // 457
				}                                                                                                                  // 458
			}                                                                                                                   // 459
		}                                                                                                                    // 460
                                                                                                                       //
		return getRocketUserFromUserId;                                                                                      // 3
	}();                                                                                                                  // 3
                                                                                                                       //
	return ImporterHipChatEnterprise;                                                                                     // 3
}(Importer.Base);                                                                                                      // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"main.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_importer-hipchat-enterprise/main.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals Importer */Importer.addImporter('hipchatenterprise', Importer.HipChatEnterprise, {                          // 1
	name: 'HipChat Enterprise',                                                                                           // 4
	warnings: [{                                                                                                          // 5
		text: 'Importer_HipChatEnterprise_Information',                                                                      // 7
		href: 'https://rocket.chat/docs/administrator-guides/import/hipchat/enterprise/'                                     // 8
	}, {                                                                                                                  // 6
		text: 'Importer_HipChatEnterprise_BetaWarning',                                                                      // 10
		href: 'https://github.com/RocketChat/Rocket.Chat/issues/new'                                                         // 11
	}],                                                                                                                   // 9
	mimeType: 'application/gzip'                                                                                          // 14
});                                                                                                                    // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/rocketchat:importer-hipchat-enterprise/server.js");
require("./node_modules/meteor/rocketchat:importer-hipchat-enterprise/main.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:importer-hipchat-enterprise'] = {};

})();

//# sourceMappingURL=rocketchat_importer-hipchat-enterprise.js.map
