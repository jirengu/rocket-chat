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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:importer-csv":{"server.js":["babel-runtime/helpers/slicedToArray","babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits",function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_importer-csv/server.js                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");                                               //
                                                                                                                    //
var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);                                                      //
                                                                                                                    //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                             //
                                                                                                                    //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                    //
                                                                                                                    //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                       //
                                                                                                                    //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                              //
                                                                                                                    //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                         //
                                                                                                                    //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                //
                                                                                                                    //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                   //
                                                                                                                    //
/* globals Importer */Importer.CSV = function (_Importer$Base) {                                                    // 1
	(0, _inherits3.default)(ImporterCSV, _Importer$Base);                                                              // 3
                                                                                                                    //
	function ImporterCSV(name, descriptionI18N, mimeType) {                                                            // 4
		(0, _classCallCheck3.default)(this, ImporterCSV);                                                                 // 4
                                                                                                                    //
		var _this = (0, _possibleConstructorReturn3.default)(this, _Importer$Base.call(this, name, descriptionI18N, mimeType));
                                                                                                                    //
		_this.logger.debug('Constructed a new CSV Importer.');                                                            // 6
                                                                                                                    //
		_this.csvParser = Npm.require('csv-parse/lib/sync');                                                              // 8
		_this.messages = new Map();                                                                                       // 9
		return _this;                                                                                                     // 4
	}                                                                                                                  // 10
                                                                                                                    //
	ImporterCSV.prototype.prepare = function () {                                                                      // 3
		function prepare(dataURI, sentContentType, fileName) {                                                            // 3
			var _this2 = this;                                                                                               // 12
                                                                                                                    //
			_Importer$Base.prototype.prepare.call(this, dataURI, sentContentType, fileName);                                 // 13
                                                                                                                    //
			var uriResult = RocketChatFile.dataURIParse(dataURI);                                                            // 15
			var zip = new this.AdmZip(new Buffer(uriResult.image, 'base64'));                                                // 16
			var zipEntries = zip.getEntries();                                                                               // 17
			var tempChannels = [];                                                                                           // 19
			var tempUsers = [];                                                                                              // 20
			var tempMessages = new Map();                                                                                    // 21
                                                                                                                    //
			for (var _iterator = zipEntries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
				var _ref;                                                                                                       // 22
                                                                                                                    //
				if (_isArray) {                                                                                                 // 22
					if (_i >= _iterator.length) break;                                                                             // 22
					_ref = _iterator[_i++];                                                                                        // 22
				} else {                                                                                                        // 22
					_i = _iterator.next();                                                                                         // 22
					if (_i.done) break;                                                                                            // 22
					_ref = _i.value;                                                                                               // 22
				}                                                                                                               // 22
                                                                                                                    //
				var entry = _ref;                                                                                               // 22
				this.logger.debug("Entry: " + entry.entryName); //Ignore anything that has `__MACOSX` in it's name, as sadly these things seem to mess everything up
                                                                                                                    //
				if (entry.entryName.indexOf('__MACOSX') > -1) {                                                                 // 26
					this.logger.debug("Ignoring the file: " + entry.entryName);                                                    // 27
					continue;                                                                                                      // 28
				} //Directories are ignored, since they are "virtual" in a zip file                                             // 29
                                                                                                                    //
                                                                                                                    //
				if (entry.isDirectory) {                                                                                        // 32
					this.logger.debug("Ignoring the directory entry: " + entry.entryName);                                         // 33
					continue;                                                                                                      // 34
				} //Parse the channels                                                                                          // 35
                                                                                                                    //
                                                                                                                    //
				if (entry.entryName.toLowerCase() === 'channels.csv') {                                                         // 38
					_Importer$Base.prototype.updateProgress.call(this, Importer.ProgressStep.PREPARING_CHANNELS);                  // 39
                                                                                                                    //
					var parsedChannels = this.csvParser(entry.getData().toString());                                               // 40
					tempChannels = parsedChannels.map(function (c) {                                                               // 41
						return {                                                                                                      // 42
							id: c[0].trim().replace('.', '_'),                                                                           // 43
							name: c[0].trim(),                                                                                           // 44
							creator: c[1].trim(),                                                                                        // 45
							isPrivate: c[2].trim().toLowerCase() === 'private' ? true : false,                                           // 46
							members: c[3].trim().split(';').map(function (m) {                                                           // 47
								return m.trim();                                                                                            // 47
							})                                                                                                           // 47
						};                                                                                                            // 42
					});                                                                                                            // 49
					continue;                                                                                                      // 50
				} //Parse the users                                                                                             // 51
                                                                                                                    //
                                                                                                                    //
				if (entry.entryName.toLowerCase() === 'users.csv') {                                                            // 54
					_Importer$Base.prototype.updateProgress.call(this, Importer.ProgressStep.PREPARING_USERS);                     // 55
                                                                                                                    //
					var parsedUsers = this.csvParser(entry.getData().toString());                                                  // 56
					tempUsers = parsedUsers.map(function (u) {                                                                     // 57
						return {                                                                                                      // 57
							id: u[0].trim().replace('.', '_'),                                                                           // 57
							username: u[0].trim(),                                                                                       // 57
							email: u[1].trim(),                                                                                          // 57
							name: u[2].trim()                                                                                            // 57
						};                                                                                                            // 57
					});                                                                                                            // 57
					continue;                                                                                                      // 58
				} //Parse the messages                                                                                          // 59
                                                                                                                    //
                                                                                                                    //
				if (entry.entryName.indexOf('/') > -1) {                                                                        // 62
					var item = entry.entryName.split('/'); //random/messages.csv                                                   // 63
                                                                                                                    //
					var channelName = item[0]; //random                                                                            // 64
                                                                                                                    //
					var msgGroupData = item[1].split('.')[0]; //2015-10-04                                                         // 65
                                                                                                                    //
					if (!tempMessages.get(channelName)) {                                                                          // 67
						tempMessages.set(channelName, new Map());                                                                     // 68
					}                                                                                                              // 69
                                                                                                                    //
					var msgs = [];                                                                                                 // 71
                                                                                                                    //
					try {                                                                                                          // 73
						msgs = this.csvParser(entry.getData().toString());                                                            // 74
					} catch (e) {                                                                                                  // 75
						this.logger.warn("The file " + entry.entryName + " contains invalid syntax", e);                              // 76
						continue;                                                                                                     // 77
					}                                                                                                              // 78
                                                                                                                    //
					tempMessages.get(channelName).set(msgGroupData, msgs.map(function (m) {                                        // 80
						return {                                                                                                      // 80
							username: m[0],                                                                                              // 80
							ts: m[1],                                                                                                    // 80
							text: m[2]                                                                                                   // 80
						};                                                                                                            // 80
					}));                                                                                                           // 80
					continue;                                                                                                      // 81
				}                                                                                                               // 82
			} // Insert the users record, eventually this might have to be split into several ones as well                   // 83
			// if someone tries to import a several thousands users instance                                                 // 86
                                                                                                                    //
                                                                                                                    //
			var usersId = this.collection.insert({                                                                           // 87
				'import': this.importRecord._id,                                                                                // 87
				'importer': this.name,                                                                                          // 87
				'type': 'users',                                                                                                // 87
				'users': tempUsers                                                                                              // 87
			});                                                                                                              // 87
			this.users = this.collection.findOne(usersId);                                                                   // 88
                                                                                                                    //
			_Importer$Base.prototype.updateRecord.call(this, {                                                               // 89
				'count.users': tempUsers.length                                                                                 // 89
			});                                                                                                              // 89
                                                                                                                    //
			_Importer$Base.prototype.addCountToTotal.call(this, tempUsers.length); // Insert the channels records.           // 90
                                                                                                                    //
                                                                                                                    //
			var channelsId = this.collection.insert({                                                                        // 93
				'import': this.importRecord._id,                                                                                // 93
				'importer': this.name,                                                                                          // 93
				'type': 'channels',                                                                                             // 93
				'channels': tempChannels                                                                                        // 93
			});                                                                                                              // 93
			this.channels = this.collection.findOne(channelsId);                                                             // 94
                                                                                                                    //
			_Importer$Base.prototype.updateRecord.call(this, {                                                               // 95
				'count.channels': tempChannels.length                                                                           // 95
			});                                                                                                              // 95
                                                                                                                    //
			_Importer$Base.prototype.addCountToTotal.call(this, tempChannels.length); // Save the messages records to the import record for `startImport` usage
                                                                                                                    //
                                                                                                                    //
			_Importer$Base.prototype.updateProgress.call(this, Importer.ProgressStep.PREPARING_MESSAGES);                    // 99
                                                                                                                    //
			var messagesCount = 0;                                                                                           // 100
                                                                                                                    //
			var _loop = function (channel, messagesMap) {                                                                    // 12
				if (!_this2.messages.get(channel)) {                                                                            // 102
					_this2.messages.set(channel, new Map());                                                                       // 103
				}                                                                                                               // 104
                                                                                                                    //
				var _loop2 = function (_msgGroupData, _msgs) {                                                                  // 12
					messagesCount += _msgs.length;                                                                                 // 107
                                                                                                                    //
					_Importer$Base.prototype.updateRecord.call(_this2, {                                                           // 108
						'messagesstatus': channel + "/" + _msgGroupData                                                               // 108
					});                                                                                                            // 108
                                                                                                                    //
					if (Importer.Base.getBSONSize(_msgs) > Importer.Base.MaxBSONSize) {                                            // 110
						Importer.Base.getBSONSafeArraysFromAnArray(_msgs).forEach(function (splitMsg, i) {                            // 111
							var messagesId = _this2.collection.insert({                                                                  // 112
								'import': _this2.importRecord._id,                                                                          // 112
								'importer': _this2.name,                                                                                    // 112
								'type': 'messages',                                                                                         // 112
								'name': channel + "/" + _msgGroupData + "." + i,                                                            // 112
								'messages': splitMsg                                                                                        // 112
							});                                                                                                          // 112
                                                                                                                    //
							_this2.messages.get(channel).set(_msgGroupData + "." + i, _this2.collection.findOne(messagesId));            // 113
						});                                                                                                           // 114
					} else {                                                                                                       // 115
						var messagesId = _this2.collection.insert({                                                                   // 116
							'import': _this2.importRecord._id,                                                                           // 116
							'importer': _this2.name,                                                                                     // 116
							'type': 'messages',                                                                                          // 116
							'name': channel + "/" + _msgGroupData,                                                                       // 116
							'messages': _msgs                                                                                            // 116
						});                                                                                                           // 116
                                                                                                                    //
						_this2.messages.get(channel).set(_msgGroupData, _this2.collection.findOne(messagesId));                       // 117
					}                                                                                                              // 118
				};                                                                                                              // 12
                                                                                                                    //
				for (var _iterator3 = messagesMap.entries(), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
					var _ref7;                                                                                                     // 106
                                                                                                                    //
					if (_isArray3) {                                                                                               // 106
						if (_i3 >= _iterator3.length) break;                                                                          // 106
						_ref7 = _iterator3[_i3++];                                                                                    // 106
					} else {                                                                                                       // 106
						_i3 = _iterator3.next();                                                                                      // 106
						if (_i3.done) break;                                                                                          // 106
						_ref7 = _i3.value;                                                                                            // 106
					}                                                                                                              // 106
                                                                                                                    //
					var _ref5 = _ref7;                                                                                             // 106
                                                                                                                    //
					var _ref6 = (0, _slicedToArray3.default)(_ref5, 2);                                                            // 106
                                                                                                                    //
					var _msgGroupData = _ref6[0];                                                                                  // 106
					var _msgs = _ref6[1];                                                                                          // 106
                                                                                                                    //
					_loop2(_msgGroupData, _msgs);                                                                                  // 106
				}                                                                                                               // 119
			};                                                                                                               // 12
                                                                                                                    //
			for (var _iterator2 = tempMessages.entries(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
				var _ref4;                                                                                                      // 101
                                                                                                                    //
				if (_isArray2) {                                                                                                // 101
					if (_i2 >= _iterator2.length) break;                                                                           // 101
					_ref4 = _iterator2[_i2++];                                                                                     // 101
				} else {                                                                                                        // 101
					_i2 = _iterator2.next();                                                                                       // 101
					if (_i2.done) break;                                                                                           // 101
					_ref4 = _i2.value;                                                                                             // 101
				}                                                                                                               // 101
                                                                                                                    //
				var _ref2 = _ref4;                                                                                              // 101
                                                                                                                    //
				var _ref3 = (0, _slicedToArray3.default)(_ref2, 2);                                                             // 101
                                                                                                                    //
				var channel = _ref3[0];                                                                                         // 101
				var messagesMap = _ref3[1];                                                                                     // 101
                                                                                                                    //
				_loop(channel, messagesMap);                                                                                    // 101
			}                                                                                                                // 120
                                                                                                                    //
			_Importer$Base.prototype.updateRecord.call(this, {                                                               // 122
				'count.messages': messagesCount,                                                                                // 122
				'messagesstatus': null                                                                                          // 122
			});                                                                                                              // 122
                                                                                                                    //
			_Importer$Base.prototype.addCountToTotal.call(this, messagesCount); //Ensure we have some users, channels, and messages
                                                                                                                    //
                                                                                                                    //
			if (tempUsers.length === 0 || tempChannels.length === 0 || messagesCount === 0) {                                // 126
				this.logger.warn("The loaded users count " + tempUsers.length + ", the loaded channels " + tempChannels.length + ", and the loaded messages " + messagesCount);
                                                                                                                    //
				_Importer$Base.prototype.updateProgress.call(this, Importer.ProgressStep.ERROR);                                // 128
                                                                                                                    //
				return _Importer$Base.prototype.getProgress.call(this);                                                         // 129
			}                                                                                                                // 130
                                                                                                                    //
			var selectionUsers = tempUsers.map(function (u) {                                                                // 132
				return new Importer.SelectionUser(u.id, u.username, u.email, false, false, true);                               // 132
			});                                                                                                              // 132
			var selectionChannels = tempChannels.map(function (c) {                                                          // 133
				return new Importer.SelectionChannel(c.id, c.name, false, true, c.isPrivate);                                   // 133
			});                                                                                                              // 133
                                                                                                                    //
			_Importer$Base.prototype.updateProgress.call(this, Importer.ProgressStep.USER_SELECTION);                        // 135
                                                                                                                    //
			return new Importer.Selection(this.name, selectionUsers, selectionChannels);                                     // 136
		}                                                                                                                 // 137
                                                                                                                    //
		return prepare;                                                                                                   // 3
	}();                                                                                                               // 3
                                                                                                                    //
	ImporterCSV.prototype.startImport = function () {                                                                  // 3
		function startImport(importSelection) {                                                                           // 3
			var _this3 = this;                                                                                               // 139
                                                                                                                    //
			_Importer$Base.prototype.startImport.call(this, importSelection);                                                // 140
                                                                                                                    //
			var started = Date.now(); //Ensure we're only going to import the users that the user has selected               // 141
                                                                                                                    //
			for (var _iterator4 = importSelection.users, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
				var _ref8;                                                                                                      // 144
                                                                                                                    //
				if (_isArray4) {                                                                                                // 144
					if (_i4 >= _iterator4.length) break;                                                                           // 144
					_ref8 = _iterator4[_i4++];                                                                                     // 144
				} else {                                                                                                        // 144
					_i4 = _iterator4.next();                                                                                       // 144
					if (_i4.done) break;                                                                                           // 144
					_ref8 = _i4.value;                                                                                             // 144
				}                                                                                                               // 144
                                                                                                                    //
				var user = _ref8;                                                                                               // 144
                                                                                                                    //
				for (var _iterator12 = this.users.users, _isArray12 = Array.isArray(_iterator12), _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
					var _ref20;                                                                                                    // 145
                                                                                                                    //
					if (_isArray12) {                                                                                              // 145
						if (_i12 >= _iterator12.length) break;                                                                        // 145
						_ref20 = _iterator12[_i12++];                                                                                 // 145
					} else {                                                                                                       // 145
						_i12 = _iterator12.next();                                                                                    // 145
						if (_i12.done) break;                                                                                         // 145
						_ref20 = _i12.value;                                                                                          // 145
					}                                                                                                              // 145
                                                                                                                    //
					var u = _ref20;                                                                                                // 145
                                                                                                                    //
					if (u.id === user.user_id) {                                                                                   // 146
						u.do_import = user.do_import;                                                                                 // 147
					}                                                                                                              // 148
				}                                                                                                               // 149
			}                                                                                                                // 150
                                                                                                                    //
			this.collection.update({                                                                                         // 151
				_id: this.users._id                                                                                             // 151
			}, {                                                                                                             // 151
				$set: {                                                                                                         // 151
					'users': this.users.users                                                                                      // 151
				}                                                                                                               // 151
			}); //Ensure we're only importing the channels the user has selected.                                            // 151
                                                                                                                    //
			for (var _iterator5 = importSelection.channels, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
				var _ref9;                                                                                                      // 154
                                                                                                                    //
				if (_isArray5) {                                                                                                // 154
					if (_i5 >= _iterator5.length) break;                                                                           // 154
					_ref9 = _iterator5[_i5++];                                                                                     // 154
				} else {                                                                                                        // 154
					_i5 = _iterator5.next();                                                                                       // 154
					if (_i5.done) break;                                                                                           // 154
					_ref9 = _i5.value;                                                                                             // 154
				}                                                                                                               // 154
                                                                                                                    //
				var channel = _ref9;                                                                                            // 154
                                                                                                                    //
				for (var _iterator13 = this.channels.channels, _isArray13 = Array.isArray(_iterator13), _i13 = 0, _iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();;) {
					var _ref21;                                                                                                    // 155
                                                                                                                    //
					if (_isArray13) {                                                                                              // 155
						if (_i13 >= _iterator13.length) break;                                                                        // 155
						_ref21 = _iterator13[_i13++];                                                                                 // 155
					} else {                                                                                                       // 155
						_i13 = _iterator13.next();                                                                                    // 155
						if (_i13.done) break;                                                                                         // 155
						_ref21 = _i13.value;                                                                                          // 155
					}                                                                                                              // 155
                                                                                                                    //
					var c = _ref21;                                                                                                // 155
                                                                                                                    //
					if (c.id === channel.channel_id) {                                                                             // 156
						c.do_import = channel.do_import;                                                                              // 157
					}                                                                                                              // 158
				}                                                                                                               // 159
			}                                                                                                                // 160
                                                                                                                    //
			this.collection.update({                                                                                         // 161
				_id: this.channels._id                                                                                          // 161
			}, {                                                                                                             // 161
				$set: {                                                                                                         // 161
					'channels': this.channels.channels                                                                             // 161
				}                                                                                                               // 161
			});                                                                                                              // 161
			var startedByUserId = Meteor.userId();                                                                           // 163
			Meteor.defer(function () {                                                                                       // 164
				_Importer$Base.prototype.updateProgress.call(_this3, Importer.ProgressStep.IMPORTING_USERS); //Import the users
                                                                                                                    //
                                                                                                                    //
				var _loop3 = function (u) {                                                                                     // 164
					if (!u.do_import) {                                                                                            // 168
						return "continue";                                                                                            // 169
					}                                                                                                              // 170
                                                                                                                    //
					Meteor.runAsUser(startedByUserId, function () {                                                                // 172
						var existantUser = RocketChat.models.Users.findOneByEmailAddress(u.email); //If we couldn't find one by their email address, try to find an existing user by their username
                                                                                                                    //
						if (!existantUser) {                                                                                          // 176
							existantUser = RocketChat.models.Users.findOneByUsername(u.username);                                        // 177
						}                                                                                                             // 178
                                                                                                                    //
						if (existantUser) {                                                                                           // 180
							//since we have an existing user, let's try a few things                                                     // 181
							u.rocketId = existantUser._id;                                                                               // 182
							RocketChat.models.Users.update({                                                                             // 183
								_id: u.rocketId                                                                                             // 183
							}, {                                                                                                         // 183
								$addToSet: {                                                                                                // 183
									importIds: u.id                                                                                            // 183
								}                                                                                                           // 183
							});                                                                                                          // 183
						} else {                                                                                                      // 184
							(function () {                                                                                               // 184
								var userId = Accounts.createUser({                                                                          // 185
									email: u.email,                                                                                            // 185
									password: Date.now() + u.name + u.email.toUpperCase()                                                      // 185
								});                                                                                                         // 185
								Meteor.runAsUser(userId, function () {                                                                      // 186
									Meteor.call('setUsername', u.username, {                                                                   // 187
										joinDefaultChannelsSilenced: true                                                                         // 187
									});                                                                                                        // 187
									RocketChat.models.Users.setName(userId, u.name);                                                           // 188
									RocketChat.models.Users.update({                                                                           // 189
										_id: userId                                                                                               // 189
									}, {                                                                                                       // 189
										$addToSet: {                                                                                              // 189
											importIds: u.id                                                                                          // 189
										}                                                                                                         // 189
									});                                                                                                        // 189
									u.rocketId = userId;                                                                                       // 190
								});                                                                                                         // 191
							})();                                                                                                        // 184
						}                                                                                                             // 192
                                                                                                                    //
						_Importer$Base.prototype.addCountCompleted.call(_this3, 1);                                                   // 194
					});                                                                                                            // 195
				};                                                                                                              // 164
                                                                                                                    //
				for (var _iterator6 = _this3.users.users, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
					var _ref10;                                                                                                    // 167
                                                                                                                    //
					if (_isArray6) {                                                                                               // 167
						if (_i6 >= _iterator6.length) break;                                                                          // 167
						_ref10 = _iterator6[_i6++];                                                                                   // 167
					} else {                                                                                                       // 167
						_i6 = _iterator6.next();                                                                                      // 167
						if (_i6.done) break;                                                                                          // 167
						_ref10 = _i6.value;                                                                                           // 167
					}                                                                                                              // 167
                                                                                                                    //
					var u = _ref10;                                                                                                // 167
                                                                                                                    //
					var _ret3 = _loop3(u);                                                                                         // 167
                                                                                                                    //
					if (_ret3 === "continue") continue;                                                                            // 167
				}                                                                                                               // 196
                                                                                                                    //
				_this3.collection.update({                                                                                      // 197
					_id: _this3.users._id                                                                                          // 197
				}, {                                                                                                            // 197
					$set: {                                                                                                        // 197
						'users': _this3.users.users                                                                                   // 197
					}                                                                                                              // 197
				}); //Import the channels                                                                                       // 197
                                                                                                                    //
                                                                                                                    //
				_Importer$Base.prototype.updateProgress.call(_this3, Importer.ProgressStep.IMPORTING_CHANNELS);                 // 200
                                                                                                                    //
				var _loop4 = function (c) {                                                                                     // 164
					if (!c.do_import) {                                                                                            // 202
						return "continue";                                                                                            // 203
					}                                                                                                              // 204
                                                                                                                    //
					Meteor.runAsUser(startedByUserId, function () {                                                                // 206
						var existantRoom = RocketChat.models.Rooms.findOneByName(c.name); //If the room exists or the name of it is 'general', then we don't need to create it again
                                                                                                                    //
						if (existantRoom || c.name.toUpperCase() === 'GENERAL') {                                                     // 209
							c.rocketId = c.name.toUpperCase() === 'GENERAL' ? 'GENERAL' : existantRoom._id;                              // 210
							RocketChat.models.Rooms.update({                                                                             // 211
								_id: c.rocketId                                                                                             // 211
							}, {                                                                                                         // 211
								$addToSet: {                                                                                                // 211
									importIds: c.id                                                                                            // 211
								}                                                                                                           // 211
							});                                                                                                          // 211
						} else {                                                                                                      // 212
							//Find the rocketchatId of the user who created this channel                                                 // 213
							var creatorId = startedByUserId;                                                                             // 214
                                                                                                                    //
							for (var _iterator9 = _this3.users.users, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
								var _ref15;                                                                                                 // 215
                                                                                                                    //
								if (_isArray9) {                                                                                            // 215
									if (_i9 >= _iterator9.length) break;                                                                       // 215
									_ref15 = _iterator9[_i9++];                                                                                // 215
								} else {                                                                                                    // 215
									_i9 = _iterator9.next();                                                                                   // 215
									if (_i9.done) break;                                                                                       // 215
									_ref15 = _i9.value;                                                                                        // 215
								}                                                                                                           // 215
                                                                                                                    //
								var _u = _ref15;                                                                                            // 215
                                                                                                                    //
								if (_u.username === c.creator && _u.do_import) {                                                            // 216
									creatorId = _u.rocketId;                                                                                   // 217
								}                                                                                                           // 218
							} //Create the channel                                                                                       // 219
                                                                                                                    //
                                                                                                                    //
							Meteor.runAsUser(creatorId, function () {                                                                    // 222
								var roomInfo = Meteor.call(c.isPrivate ? 'createPrivateGroup' : 'createChannel', c.name, c.members);        // 223
								c.rocketId = roomInfo.rid;                                                                                  // 224
							});                                                                                                          // 225
							RocketChat.models.Rooms.update({                                                                             // 227
								_id: c.rocketId                                                                                             // 227
							}, {                                                                                                         // 227
								$addToSet: {                                                                                                // 227
									importIds: c.id                                                                                            // 227
								}                                                                                                           // 227
							});                                                                                                          // 227
						}                                                                                                             // 228
                                                                                                                    //
						_Importer$Base.prototype.addCountCompleted.call(_this3, 1);                                                   // 230
					});                                                                                                            // 231
				};                                                                                                              // 164
                                                                                                                    //
				for (var _iterator7 = _this3.channels.channels, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
					var _ref11;                                                                                                    // 201
                                                                                                                    //
					if (_isArray7) {                                                                                               // 201
						if (_i7 >= _iterator7.length) break;                                                                          // 201
						_ref11 = _iterator7[_i7++];                                                                                   // 201
					} else {                                                                                                       // 201
						_i7 = _iterator7.next();                                                                                      // 201
						if (_i7.done) break;                                                                                          // 201
						_ref11 = _i7.value;                                                                                           // 201
					}                                                                                                              // 201
                                                                                                                    //
					var c = _ref11;                                                                                                // 201
                                                                                                                    //
					var _ret4 = _loop4(c);                                                                                         // 201
                                                                                                                    //
					if (_ret4 === "continue") continue;                                                                            // 201
				}                                                                                                               // 232
                                                                                                                    //
				_this3.collection.update({                                                                                      // 233
					_id: _this3.channels._id                                                                                       // 233
				}, {                                                                                                            // 233
					$set: {                                                                                                        // 233
						'channels': _this3.channels.channels                                                                          // 233
					}                                                                                                              // 233
				}); //Import the Messages                                                                                       // 233
                                                                                                                    //
                                                                                                                    //
				_Importer$Base.prototype.updateProgress.call(_this3, Importer.ProgressStep.IMPORTING_MESSAGES);                 // 236
                                                                                                                    //
				var _loop5 = function (ch, messagesMap) {                                                                       // 164
					var csvChannel = _this3.getChannelFromName(ch);                                                                // 238
                                                                                                                    //
					if (!csvChannel.do_import) {                                                                                   // 239
						return "continue";                                                                                            // 240
					}                                                                                                              // 241
                                                                                                                    //
					var room = RocketChat.models.Rooms.findOneById(csvChannel.rocketId, {                                          // 243
						fields: {                                                                                                     // 243
							usernames: 1,                                                                                                // 243
							t: 1,                                                                                                        // 243
							name: 1                                                                                                      // 243
						}                                                                                                             // 243
					});                                                                                                            // 243
					Meteor.runAsUser(startedByUserId, function () {                                                                // 244
						for (var _iterator10 = messagesMap.entries(), _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
							var _ref18;                                                                                                  // 245
                                                                                                                    //
							if (_isArray10) {                                                                                            // 245
								if (_i10 >= _iterator10.length) break;                                                                      // 245
								_ref18 = _iterator10[_i10++];                                                                               // 245
							} else {                                                                                                     // 245
								_i10 = _iterator10.next();                                                                                  // 245
								if (_i10.done) break;                                                                                       // 245
								_ref18 = _i10.value;                                                                                        // 245
							}                                                                                                            // 245
                                                                                                                    //
							var _ref16 = _ref18;                                                                                         // 245
                                                                                                                    //
							var _ref17 = (0, _slicedToArray3.default)(_ref16, 2);                                                        // 245
                                                                                                                    //
							var msgGroupData = _ref17[0];                                                                                // 245
							var msgs = _ref17[1];                                                                                        // 245
                                                                                                                    //
							_Importer$Base.prototype.updateRecord.call(_this3, {                                                         // 246
								'messagesstatus': ch + "/" + msgGroupData + "." + msgs.messages.length                                      // 246
							});                                                                                                          // 246
                                                                                                                    //
							for (var _iterator11 = msgs.messages, _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
								var _ref19;                                                                                                 // 247
                                                                                                                    //
								if (_isArray11) {                                                                                           // 247
									if (_i11 >= _iterator11.length) break;                                                                     // 247
									_ref19 = _iterator11[_i11++];                                                                              // 247
								} else {                                                                                                    // 247
									_i11 = _iterator11.next();                                                                                 // 247
									if (_i11.done) break;                                                                                      // 247
									_ref19 = _i11.value;                                                                                       // 247
								}                                                                                                           // 247
                                                                                                                    //
								var msg = _ref19;                                                                                           // 247
                                                                                                                    //
								if (isNaN(new Date(parseInt(msg.ts)))) {                                                                    // 248
									_this3.logger.warn("Timestamp on a message in " + ch + "/" + msgGroupData + " is invalid");                // 249
                                                                                                                    //
									_Importer$Base.prototype.addCountCompleted.call(_this3, 1);                                                // 250
                                                                                                                    //
									continue;                                                                                                  // 251
								}                                                                                                           // 252
                                                                                                                    //
								var creator = _this3.getUserFromUsername(msg.username);                                                     // 254
                                                                                                                    //
								if (creator) {                                                                                              // 255
									var msgObj = {                                                                                             // 256
										_id: "csv-" + csvChannel.id + "-" + msg.ts,                                                               // 257
										ts: new Date(parseInt(msg.ts)),                                                                           // 258
										msg: msg.text,                                                                                            // 259
										rid: room._id,                                                                                            // 260
										u: {                                                                                                      // 261
											_id: creator._id,                                                                                        // 262
											username: creator.username                                                                               // 263
										}                                                                                                         // 261
									};                                                                                                         // 256
									RocketChat.sendMessage(creator, msgObj, room, true);                                                       // 267
								}                                                                                                           // 268
                                                                                                                    //
								_Importer$Base.prototype.addCountCompleted.call(_this3, 1);                                                 // 270
							}                                                                                                            // 271
						}                                                                                                             // 272
					});                                                                                                            // 273
				};                                                                                                              // 164
                                                                                                                    //
				for (var _iterator8 = _this3.messages.entries(), _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
					var _ref14;                                                                                                    // 237
                                                                                                                    //
					if (_isArray8) {                                                                                               // 237
						if (_i8 >= _iterator8.length) break;                                                                          // 237
						_ref14 = _iterator8[_i8++];                                                                                   // 237
					} else {                                                                                                       // 237
						_i8 = _iterator8.next();                                                                                      // 237
						if (_i8.done) break;                                                                                          // 237
						_ref14 = _i8.value;                                                                                           // 237
					}                                                                                                              // 237
                                                                                                                    //
					var _ref12 = _ref14;                                                                                           // 237
                                                                                                                    //
					var _ref13 = (0, _slicedToArray3.default)(_ref12, 2);                                                          // 237
                                                                                                                    //
					var ch = _ref13[0];                                                                                            // 237
					var messagesMap = _ref13[1];                                                                                   // 237
                                                                                                                    //
					var _ret5 = _loop5(ch, messagesMap);                                                                           // 237
                                                                                                                    //
					if (_ret5 === "continue") continue;                                                                            // 237
				}                                                                                                               // 274
                                                                                                                    //
				_Importer$Base.prototype.updateProgress.call(_this3, Importer.ProgressStep.FINISHING);                          // 276
                                                                                                                    //
				_Importer$Base.prototype.updateProgress.call(_this3, Importer.ProgressStep.DONE);                               // 277
                                                                                                                    //
				var timeTook = Date.now() - started;                                                                            // 278
                                                                                                                    //
				_this3.logger.log("CSV Import took " + timeTook + " milliseconds.");                                            // 279
			});                                                                                                              // 280
			return _Importer$Base.prototype.getProgress.call(this);                                                          // 282
		}                                                                                                                 // 283
                                                                                                                    //
		return startImport;                                                                                               // 3
	}();                                                                                                               // 3
                                                                                                                    //
	ImporterCSV.prototype.getSelection = function () {                                                                 // 3
		function getSelection() {                                                                                         // 3
			var selectionUsers = this.users.users.map(function (u) {                                                         // 286
				return new Importer.SelectionUser(u.id, u.username, u.email, false, false, true);                               // 286
			});                                                                                                              // 286
			var selectionChannels = this.channels.channels.map(function (c) {                                                // 287
				return new Importer.SelectionChannel(c.id, c.name, false, true, c.isPrivate);                                   // 287
			});                                                                                                              // 287
			return new Importer.Selection(this.name, selectionUsers, selectionChannels);                                     // 289
		}                                                                                                                 // 290
                                                                                                                    //
		return getSelection;                                                                                              // 3
	}();                                                                                                               // 3
                                                                                                                    //
	ImporterCSV.prototype.getChannelFromName = function () {                                                           // 3
		function getChannelFromName(channelName) {                                                                        // 3
			for (var _iterator14 = this.channels.channels, _isArray14 = Array.isArray(_iterator14), _i14 = 0, _iterator14 = _isArray14 ? _iterator14 : _iterator14[Symbol.iterator]();;) {
				var _ref22;                                                                                                     // 293
                                                                                                                    //
				if (_isArray14) {                                                                                               // 293
					if (_i14 >= _iterator14.length) break;                                                                         // 293
					_ref22 = _iterator14[_i14++];                                                                                  // 293
				} else {                                                                                                        // 293
					_i14 = _iterator14.next();                                                                                     // 293
					if (_i14.done) break;                                                                                          // 293
					_ref22 = _i14.value;                                                                                           // 293
				}                                                                                                               // 293
                                                                                                                    //
				var ch = _ref22;                                                                                                // 293
                                                                                                                    //
				if (ch.name === channelName) {                                                                                  // 294
					return ch;                                                                                                     // 295
				}                                                                                                               // 296
			}                                                                                                                // 297
		}                                                                                                                 // 298
                                                                                                                    //
		return getChannelFromName;                                                                                        // 3
	}();                                                                                                               // 3
                                                                                                                    //
	ImporterCSV.prototype.getUserFromUsername = function () {                                                          // 3
		function getUserFromUsername(username) {                                                                          // 3
			for (var _iterator15 = this.users.users, _isArray15 = Array.isArray(_iterator15), _i15 = 0, _iterator15 = _isArray15 ? _iterator15 : _iterator15[Symbol.iterator]();;) {
				var _ref23;                                                                                                     // 301
                                                                                                                    //
				if (_isArray15) {                                                                                               // 301
					if (_i15 >= _iterator15.length) break;                                                                         // 301
					_ref23 = _iterator15[_i15++];                                                                                  // 301
				} else {                                                                                                        // 301
					_i15 = _iterator15.next();                                                                                     // 301
					if (_i15.done) break;                                                                                          // 301
					_ref23 = _i15.value;                                                                                           // 301
				}                                                                                                               // 301
                                                                                                                    //
				var u = _ref23;                                                                                                 // 301
                                                                                                                    //
				if (u.username === username) {                                                                                  // 302
					return RocketChat.models.Users.findOneById(u.rocketId, {                                                       // 303
						fields: {                                                                                                     // 303
							username: 1                                                                                                  // 303
						}                                                                                                             // 303
					});                                                                                                            // 303
				}                                                                                                               // 304
			}                                                                                                                // 305
		}                                                                                                                 // 306
                                                                                                                    //
		return getUserFromUsername;                                                                                       // 3
	}();                                                                                                               // 3
                                                                                                                    //
	return ImporterCSV;                                                                                                // 3
}(Importer.Base);                                                                                                   // 3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"main.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_importer-csv/main.js                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/* globals Importer */Importer.addImporter('csv', Importer.CSV, {                                                   // 1
	name: 'CSV',                                                                                                       // 4
	warnings: [{                                                                                                       // 5
		text: 'Importer_CSV_Information',                                                                                 // 6
		href: 'https://rocket.chat/docs/administrator-guides/import/csv/'                                                 // 7
	}],                                                                                                                // 5
	mimeType: 'application/zip'                                                                                        // 9
});                                                                                                                 // 3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/rocketchat:importer-csv/server.js");
require("./node_modules/meteor/rocketchat:importer-csv/main.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:importer-csv'] = {};

})();

//# sourceMappingURL=rocketchat_importer-csv.js.map
