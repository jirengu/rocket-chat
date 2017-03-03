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
var __coffeescriptShare, Irc;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:irc":{"server":{"settings.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_irc/server/settings.js                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Meteor.startup(function () {                                                                                        // 1
	RocketChat.settings.addGroup('IRC', function () {                                                                  // 2
		// Is this thing on?                                                                                              // 4
		this.add('IRC_Enabled', false, {                                                                                  // 5
			type: 'boolean',                                                                                                 // 6
			i18nLabel: 'Enabled',                                                                                            // 7
			i18nDescription: 'IRC_Enabled',                                                                                  // 8
			alert: 'IRC Support is a work in progress. Use on a production system is not recommended at this time.'          // 9
		}); // The IRC host server to talk to                                                                             // 5
                                                                                                                    //
		this.add('IRC_Host', 'irc.freenode.net', {                                                                        // 13
			type: 'string',                                                                                                  // 14
			i18nLabel: 'Host',                                                                                               // 15
			i18nDescription: 'IRC_Hostname'                                                                                  // 16
		}); // The port to connect on the remote server                                                                   // 13
                                                                                                                    //
		this.add('IRC_Port', 6667, {                                                                                      // 20
			type: 'int',                                                                                                     // 21
			i18nLabel: 'Port',                                                                                               // 22
			i18nDescription: 'IRC_Port'                                                                                      // 23
		}); // Cache size of the messages we send the host IRC server                                                     // 20
                                                                                                                    //
		this.add('IRC_Message_Cache_Size', 200, {                                                                         // 27
			type: 'int',                                                                                                     // 28
			i18nLabel: 'Message Cache Size',                                                                                 // 29
			i18nDescription: 'IRC_Message_Cache_Size'                                                                        // 30
		}); // Expandable box for modifying regular expressions for IRC interaction                                       // 27
                                                                                                                    //
		this.section('Regular_Expressions', function () {                                                                 // 34
			this.add('IRC_RegEx_successLogin', 'Welcome to the freenode Internet Relay Chat Network', {                      // 35
				type: 'string',                                                                                                 // 36
				i18nLabel: 'Login Successful',                                                                                  // 37
				i18nDescription: 'IRC_Login_Success'                                                                            // 38
			});                                                                                                              // 35
			this.add('IRC_RegEx_failedLogin', 'You have not registered', {                                                   // 40
				type: 'string',                                                                                                 // 41
				i18nLabel: 'Login Failed',                                                                                      // 42
				i18nDescription: 'IRC_Login_Fail'                                                                               // 43
			});                                                                                                              // 40
			this.add('IRC_RegEx_receiveMessage', '^:(\S+)!~\S+ PRIVMSG (\S+) :(.+)$', {                                      // 45
				type: 'string',                                                                                                 // 46
				i18nLabel: 'Private Message',                                                                                   // 47
				i18nDescription: 'IRC_Private_Message'                                                                          // 48
			});                                                                                                              // 45
			this.add('IRC_RegEx_receiveMemberList', '^:\S+ \d+ \S+ = #(\S+) :(.*)$', {                                       // 50
				type: 'string',                                                                                                 // 51
				i18nLabel: 'Channel User List Start',                                                                           // 52
				i18nDescription: 'IRC_Channel_Users'                                                                            // 53
			});                                                                                                              // 50
			this.add('IRC_RegEx_endMemberList', '^.+#(\S+) :End of \/NAMES list.$', {                                        // 55
				type: 'string',                                                                                                 // 56
				i18nLabel: 'Channel User List End',                                                                             // 57
				i18nDescription: 'IRC_Channel_Users_End'                                                                        // 58
			});                                                                                                              // 55
			this.add('IRC_RegEx_addMemberToRoom', '^:(\S+)!~\S+ JOIN #(\S+)$', {                                             // 60
				type: 'string',                                                                                                 // 61
				i18nLabel: 'Join Channel',                                                                                      // 62
				i18nDescription: 'IRC_Channel_Join'                                                                             // 63
			});                                                                                                              // 60
			this.add('IRC_RegEx_removeMemberFromRoom', '^:(\S+)!~\S+ PART #(\S+)$', {                                        // 65
				type: 'string',                                                                                                 // 66
				i18nLabel: 'Leave Channel',                                                                                     // 67
				i18nDescription: 'IRC_Channel_Leave'                                                                            // 68
			});                                                                                                              // 65
			this.add('IRC_RegEx_quitMember', '^:(\S+)!~\S+ QUIT .*$', {                                                      // 70
				type: 'string',                                                                                                 // 71
				i18nLabel: 'Quit IRC Session',                                                                                  // 72
				i18nDescription: 'IRC_Quit'                                                                                     // 73
			});                                                                                                              // 70
		});                                                                                                               // 75
	});                                                                                                                // 77
});                                                                                                                 // 78
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"server.coffee.js":function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_irc/server/server.coffee.js                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var IRC_AVAILABILITY,                                                                                               //
    IRC_HOST,                                                                                                       //
    IRC_PORT,                                                                                                       //
    IrcClient,                                                                                                      //
    IrcLoginer,                                                                                                     //
    IrcLogoutCleanUper,                                                                                             //
    IrcRoomJoiner,                                                                                                  //
    IrcRoomLeaver,                                                                                                  //
    IrcSender,                                                                                                      //
    Lru,                                                                                                            //
    MESSAGE_CACHE_SIZE,                                                                                             //
    async,                                                                                                          //
    bind,                                                                                                           //
    ircClientMap,                                                                                                   //
    ircReceiveMessageCache,                                                                                         //
    ircSendMessageCache,                                                                                            //
    net,                                                                                                            //
    slice = [].slice,                                                                                               //
    bind1 = function (fn, me) {                                                                                     //
  return function () {                                                                                              //
    return fn.apply(me, arguments);                                                                                 //
  };                                                                                                                //
};                                                                                                                  //
                                                                                                                    //
IRC_AVAILABILITY = RocketChat.settings.get('IRC_Enabled');                                                          //
net = Npm.require('net');                                                                                           //
Lru = Npm.require('lru-cache');                                                                                     //
MESSAGE_CACHE_SIZE = RocketChat.settings.get('IRC_Message_Cache_Size');                                             //
ircReceiveMessageCache = Lru(MESSAGE_CACHE_SIZE);                                                                   //
ircSendMessageCache = Lru(MESSAGE_CACHE_SIZE);                                                                      //
IRC_PORT = RocketChat.settings.get('IRC_Port');                                                                     //
IRC_HOST = RocketChat.settings.get('IRC_Host');                                                                     //
ircClientMap = {};                                                                                                  //
                                                                                                                    //
bind = function (f) {                                                                                               //
  var g;                                                                                                            //
  g = Meteor.bindEnvironment(function () {                                                                          //
    var args, self;                                                                                                 //
    self = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];                              //
    return f.apply(self, args);                                                                                     //
  });                                                                                                               //
  return function () {                                                                                              //
    var args;                                                                                                       //
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   //
    return g.apply(null, [this].concat(slice.call(args)));                                                          //
  };                                                                                                                //
};                                                                                                                  //
                                                                                                                    //
async = function () {                                                                                               //
  var args, f;                                                                                                      //
  f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];                                   //
  return Meteor.wrapAsync(f).apply(null, args);                                                                     //
};                                                                                                                  //
                                                                                                                    //
IrcClient = function () {                                                                                           //
  function IrcClient(loginReq) {                                                                                    //
    this.loginReq = loginReq;                                                                                       //
    this.onReceiveRawMessage = bind1(this.onReceiveRawMessage, this);                                               //
    this.onError = bind1(this.onError, this);                                                                       //
    this.onTimeout = bind1(this.onTimeout, this);                                                                   //
    this.onClose = bind1(this.onClose, this);                                                                       //
    this.onConnect = bind1(this.onConnect, this);                                                                   //
    this.connect = bind1(this.connect, this);                                                                       //
    this.user = this.loginReq.user;                                                                                 //
    ircClientMap[this.user._id] = this;                                                                             //
    this.ircPort = IRC_PORT;                                                                                        //
    this.ircHost = IRC_HOST;                                                                                        //
    this.msgBuf = [];                                                                                               //
    this.isConnected = false;                                                                                       //
    this.isDistroyed = false;                                                                                       //
    this.socket = new net.Socket();                                                                                 //
    this.socket.setNoDelay;                                                                                         //
    this.socket.setEncoding('utf-8');                                                                               //
    this.socket.setKeepAlive(true);                                                                                 //
    this.onConnect = bind(this.onConnect);                                                                          //
    this.onClose = bind(this.onClose);                                                                              //
    this.onTimeout = bind(this.onTimeout);                                                                          //
    this.onError = bind(this.onError);                                                                              //
    this.onReceiveRawMessage = bind(this.onReceiveRawMessage);                                                      //
    this.socket.on('data', this.onReceiveRawMessage);                                                               //
    this.socket.on('close', this.onClose);                                                                          //
    this.socket.on('timeout', this.onTimeout);                                                                      //
    this.socket.on('error', this.onError);                                                                          //
    this.isJoiningRoom = false;                                                                                     //
    this.receiveMemberListBuf = {};                                                                                 //
    this.pendingJoinRoomBuf = [];                                                                                   //
    this.successLoginMessageRegex = /RocketChat.settings.get('IRC_RegEx_successLogin');/;                           //
    this.failedLoginMessageRegex = /RocketChat.settings.get('IRC_RegEx_failedLogin');/;                             //
    this.receiveMessageRegex = /RocketChat.settings.get('IRC_RegEx_receiveMessage');/;                              //
    this.receiveMemberListRegex = /RocketChat.settings.get('IRC_RegEx_receiveMemberList');/;                        //
    this.endMemberListRegex = /RocketChat.settings.get('IRC_RegEx_endMemberList');/;                                //
    this.addMemberToRoomRegex = /RocketChat.settings.get('IRC_RegEx_addMemberToRoom');/;                            //
    this.removeMemberFromRoomRegex = /RocketChat.settings.get('IRC_RegEx_removeMemberFromRoom');/;                  //
    this.quitMemberRegex = /RocketChat.settings.get('IRC_RegEx_quitMember');/;                                      //
  }                                                                                                                 //
                                                                                                                    //
  IrcClient.prototype.connect = function (loginCb) {                                                                //
    this.loginCb = loginCb;                                                                                         //
    this.socket.connect(this.ircPort, this.ircHost, this.onConnect);                                                //
    return this.initRoomList();                                                                                     //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.disconnect = function () {                                                                    //
    this.isDistroyed = true;                                                                                        //
    return this.socket.destroy();                                                                                   //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.onConnect = function () {                                                                     //
    var i, len, msg, ref, results;                                                                                  //
    console.log('[irc] onConnect -> '.yellow, this.user.username, 'connect success.');                              //
    this.socket.write("NICK " + this.user.username + "\r\n");                                                       //
    this.socket.write("USER " + this.user.username + " 0 * :" + this.user.name + "\r\n");                           //
    this.isConnected = true;                                                                                        //
    ref = this.msgBuf;                                                                                              //
    results = [];                                                                                                   //
                                                                                                                    //
    for (i = 0, len = ref.length; i < len; i++) {                                                                   //
      msg = ref[i];                                                                                                 //
      results.push(this.socket.write(msg));                                                                         //
    }                                                                                                               //
                                                                                                                    //
    return results;                                                                                                 //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.onClose = function (data) {                                                                   //
    console.log('[irc] onClose -> '.yellow, this.user.username, 'connection close.');                               //
    this.isConnected = false;                                                                                       //
                                                                                                                    //
    if (this.isDistroyed) {                                                                                         //
      return delete ircClientMap[this.user._id];                                                                    //
    } else {                                                                                                        //
      return this.connect();                                                                                        //
    }                                                                                                               //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.onTimeout = function () {                                                                     //
    return console.log('[irc] onTimeout -> '.yellow, this.user.username, 'connection timeout.', arguments);         //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.onError = function () {                                                                       //
    return console.log('[irc] onError -> '.yellow, this.user.username, 'connection error.', arguments);             //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.onReceiveRawMessage = function (data) {                                                       //
    var i, len, line, matchResult, results;                                                                         //
    data = data.toString().split('\n');                                                                             //
    results = [];                                                                                                   //
                                                                                                                    //
    for (i = 0, len = data.length; i < len; i++) {                                                                  //
      line = data[i];                                                                                               //
      line = line.trim();                                                                                           //
      console.log("[" + this.ircHost + ":" + this.ircPort + "]:", line);                                            //
                                                                                                                    //
      if (line.indexOf('PING') === 0) {                                                                             //
        this.socket.write(line.replace('PING :', 'PONG '));                                                         //
        continue;                                                                                                   //
      }                                                                                                             //
                                                                                                                    //
      matchResult = this.receiveMessageRegex.exec(line);                                                            //
                                                                                                                    //
      if (matchResult) {                                                                                            //
        this.onReceiveMessage(matchResult[1], matchResult[2], matchResult[3]);                                      //
        continue;                                                                                                   //
      }                                                                                                             //
                                                                                                                    //
      matchResult = this.receiveMemberListRegex.exec(line);                                                         //
                                                                                                                    //
      if (matchResult) {                                                                                            //
        this.onReceiveMemberList(matchResult[1], matchResult[2].split(' '));                                        //
        continue;                                                                                                   //
      }                                                                                                             //
                                                                                                                    //
      matchResult = this.endMemberListRegex.exec(line);                                                             //
                                                                                                                    //
      if (matchResult) {                                                                                            //
        this.onEndMemberList(matchResult[1]);                                                                       //
        continue;                                                                                                   //
      }                                                                                                             //
                                                                                                                    //
      matchResult = this.addMemberToRoomRegex.exec(line);                                                           //
                                                                                                                    //
      if (matchResult) {                                                                                            //
        this.onAddMemberToRoom(matchResult[1], matchResult[2]);                                                     //
        continue;                                                                                                   //
      }                                                                                                             //
                                                                                                                    //
      matchResult = this.removeMemberFromRoomRegex.exec(line);                                                      //
                                                                                                                    //
      if (matchResult) {                                                                                            //
        this.onRemoveMemberFromRoom(matchResult[1], matchResult[2]);                                                //
        continue;                                                                                                   //
      }                                                                                                             //
                                                                                                                    //
      matchResult = this.quitMemberRegex.exec(line);                                                                //
                                                                                                                    //
      if (matchResult) {                                                                                            //
        this.onQuitMember(matchResult[1]);                                                                          //
        continue;                                                                                                   //
      }                                                                                                             //
                                                                                                                    //
      matchResult = this.successLoginMessageRegex.exec(line);                                                       //
                                                                                                                    //
      if (matchResult) {                                                                                            //
        this.onSuccessLoginMessage();                                                                               //
        continue;                                                                                                   //
      }                                                                                                             //
                                                                                                                    //
      matchResult = this.failedLoginMessageRegex.exec(line);                                                        //
                                                                                                                    //
      if (matchResult) {                                                                                            //
        this.onFailedLoginMessage();                                                                                //
        continue;                                                                                                   //
      } else {                                                                                                      //
        results.push(void 0);                                                                                       //
      }                                                                                                             //
    }                                                                                                               //
                                                                                                                    //
    return results;                                                                                                 //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.onSuccessLoginMessage = function () {                                                         //
    console.log('[irc] onSuccessLoginMessage -> '.yellow);                                                          //
                                                                                                                    //
    if (this.loginCb) {                                                                                             //
      return this.loginCb(null, this.loginReq);                                                                     //
    }                                                                                                               //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.onFailedLoginMessage = function () {                                                          //
    console.log('[irc] onFailedLoginMessage -> '.yellow);                                                           //
    this.loginReq.allowed = false;                                                                                  //
    this.disconnect();                                                                                              //
                                                                                                                    //
    if (this.loginCb) {                                                                                             //
      return this.loginCb(null, this.loginReq);                                                                     //
    }                                                                                                               //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.onReceiveMessage = function (source, target, content) {                                       //
    var cacheKey, message, now, room, timestamp;                                                                    //
    now = new Date();                                                                                               //
    timestamp = now.getTime();                                                                                      //
    cacheKey = [source, target, content].join(',');                                                                 //
    console.log('[irc] ircSendMessageCache.get -> '.yellow, 'key:', cacheKey, 'value:', ircSendMessageCache.get(cacheKey), 'ts:', timestamp - 1000);
                                                                                                                    //
    if (ircSendMessageCache.get(cacheKey) > timestamp - 1000) {                                                     //
      return;                                                                                                       //
    } else {                                                                                                        //
      ircSendMessageCache.set(cacheKey, timestamp);                                                                 //
    }                                                                                                               //
                                                                                                                    //
    console.log('[irc] onReceiveMessage -> '.yellow, 'source:', source, 'target:', target, 'content:', content);    //
    source = this.createUserWhenNotExist(source);                                                                   //
                                                                                                                    //
    if (target[0] === '#') {                                                                                        //
      room = RocketChat.models.Rooms.findOneByName(target.substring(1));                                            //
    } else {                                                                                                        //
      room = this.createDirectRoomWhenNotExist(source, this.user);                                                  //
    }                                                                                                               //
                                                                                                                    //
    message = {                                                                                                     //
      msg: content,                                                                                                 //
      ts: now                                                                                                       //
    };                                                                                                              //
    cacheKey = "" + source.username + timestamp;                                                                    //
    ircReceiveMessageCache.set(cacheKey, true);                                                                     //
    console.log('[irc] ircReceiveMessageCache.set -> '.yellow, 'key:', cacheKey);                                   //
    return RocketChat.sendMessage(source, message, room);                                                           //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.onReceiveMemberList = function (roomName, members) {                                          //
    return this.receiveMemberListBuf[roomName] = this.receiveMemberListBuf[roomName].concat(members);               //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.onEndMemberList = function (roomName) {                                                       //
    var appendMembers, i, len, member, newMembers, oldMembers, removeMembers, room;                                 //
    newMembers = this.receiveMemberListBuf[roomName];                                                               //
    console.log('[irc] onEndMemberList -> '.yellow, 'room:', roomName, 'members:', newMembers.join(','));           //
    room = RocketChat.models.Rooms.findOneByNameAndType(roomName, 'c');                                             //
                                                                                                                    //
    if (!room) {                                                                                                    //
      return;                                                                                                       //
    }                                                                                                               //
                                                                                                                    //
    oldMembers = room.usernames;                                                                                    //
    appendMembers = _.difference(newMembers, oldMembers);                                                           //
    removeMembers = _.difference(oldMembers, newMembers);                                                           //
                                                                                                                    //
    for (i = 0, len = appendMembers.length; i < len; i++) {                                                         //
      member = appendMembers[i];                                                                                    //
      this.createUserWhenNotExist(member);                                                                          //
    }                                                                                                               //
                                                                                                                    //
    RocketChat.models.Rooms.removeUsernamesById(room._id, removeMembers);                                           //
    RocketChat.models.Rooms.addUsernamesById(room._id, appendMembers);                                              //
    this.isJoiningRoom = false;                                                                                     //
    roomName = this.pendingJoinRoomBuf.shift();                                                                     //
                                                                                                                    //
    if (roomName) {                                                                                                 //
      return this.joinRoom({                                                                                        //
        t: 'c',                                                                                                     //
        name: roomName                                                                                              //
      });                                                                                                           //
    }                                                                                                               //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.sendRawMessage = function (msg) {                                                             //
    console.log('[irc] sendRawMessage -> '.yellow, msg.slice(0, -2));                                               //
                                                                                                                    //
    if (this.isConnected) {                                                                                         //
      return this.socket.write(msg);                                                                                //
    } else {                                                                                                        //
      return this.msgBuf.push(msg);                                                                                 //
    }                                                                                                               //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.sendMessage = function (room, message) {                                                      //
    var cacheKey, i, len, msg, name, ref, target;                                                                   //
    console.log('[irc] sendMessage -> '.yellow, 'userName:', message.u.username);                                   //
    target = '';                                                                                                    //
                                                                                                                    //
    if (room.t === 'c') {                                                                                           //
      target = "#" + room.name;                                                                                     //
    } else if (room.t === 'd') {                                                                                    //
      ref = room.usernames;                                                                                         //
                                                                                                                    //
      for (i = 0, len = ref.length; i < len; i++) {                                                                 //
        name = ref[i];                                                                                              //
                                                                                                                    //
        if (message.u.username !== name) {                                                                          //
          target = name;                                                                                            //
          break;                                                                                                    //
        }                                                                                                           //
      }                                                                                                             //
    }                                                                                                               //
                                                                                                                    //
    cacheKey = [this.user.username, target, message.msg].join(',');                                                 //
    console.log('[irc] ircSendMessageCache.set -> '.yellow, 'key:', cacheKey, 'ts:', message.ts.getTime());         //
    ircSendMessageCache.set(cacheKey, message.ts.getTime());                                                        //
    msg = "PRIVMSG " + target + " :" + message.msg + "\r\n";                                                        //
    return this.sendRawMessage(msg);                                                                                //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.initRoomList = function () {                                                                  //
    var i, len, results, room, rooms, roomsCursor;                                                                  //
    roomsCursor = RocketChat.models.Rooms.findByTypeContainingUsername('c', this.user.username, {                   //
      fields: {                                                                                                     //
        name: 1,                                                                                                    //
        t: 1                                                                                                        //
      }                                                                                                             //
    });                                                                                                             //
    rooms = roomsCursor.fetch();                                                                                    //
    results = [];                                                                                                   //
                                                                                                                    //
    for (i = 0, len = rooms.length; i < len; i++) {                                                                 //
      room = rooms[i];                                                                                              //
      results.push(this.joinRoom(room));                                                                            //
    }                                                                                                               //
                                                                                                                    //
    return results;                                                                                                 //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.joinRoom = function (room) {                                                                  //
    var msg;                                                                                                        //
                                                                                                                    //
    if (room.t !== 'c' || room.name === 'general') {                                                                //
      return;                                                                                                       //
    }                                                                                                               //
                                                                                                                    //
    if (this.isJoiningRoom) {                                                                                       //
      return this.pendingJoinRoomBuf.push(room.name);                                                               //
    } else {                                                                                                        //
      console.log('[irc] joinRoom -> '.yellow, 'roomName:', room.name, 'pendingJoinRoomBuf:', this.pendingJoinRoomBuf.join(','));
      msg = "JOIN #" + room.name + "\r\n";                                                                          //
      this.receiveMemberListBuf[room.name] = [];                                                                    //
      this.sendRawMessage(msg);                                                                                     //
      return this.isJoiningRoom = true;                                                                             //
    }                                                                                                               //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.leaveRoom = function (room) {                                                                 //
    var msg;                                                                                                        //
                                                                                                                    //
    if (room.t !== 'c') {                                                                                           //
      return;                                                                                                       //
    }                                                                                                               //
                                                                                                                    //
    msg = "PART #" + room.name + "\r\n";                                                                            //
    return this.sendRawMessage(msg);                                                                                //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.getMemberList = function (room) {                                                             //
    var msg;                                                                                                        //
                                                                                                                    //
    if (room.t !== 'c') {                                                                                           //
      return;                                                                                                       //
    }                                                                                                               //
                                                                                                                    //
    msg = "NAMES #" + room.name + "\r\n";                                                                           //
    this.receiveMemberListBuf[room.name] = [];                                                                      //
    return this.sendRawMessage(msg);                                                                                //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.onAddMemberToRoom = function (member, roomName) {                                             //
    if (this.user.username === member) {                                                                            //
      return;                                                                                                       //
    }                                                                                                               //
                                                                                                                    //
    console.log('[irc] onAddMemberToRoom -> '.yellow, 'roomName:', roomName, 'member:', member);                    //
    this.createUserWhenNotExist(member);                                                                            //
    return RocketChat.models.Rooms.addUsernameByName(roomName, member);                                             //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.onRemoveMemberFromRoom = function (member, roomName) {                                        //
    console.log('[irc] onRemoveMemberFromRoom -> '.yellow, 'roomName:', roomName, 'member:', member);               //
    return RocketChat.models.Rooms.removeUsernameByName(roomName, member);                                          //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.onQuitMember = function (member) {                                                            //
    console.log('[irc] onQuitMember ->'.yellow, 'username:', member);                                               //
    RocketChat.models.Rooms.removeUsernameFromAll(member);                                                          //
    return Meteor.users.update({                                                                                    //
      name: member                                                                                                  //
    }, {                                                                                                            //
      $set: {                                                                                                       //
        status: 'offline'                                                                                           //
      }                                                                                                             //
    });                                                                                                             //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.createUserWhenNotExist = function (name) {                                                    //
    var user;                                                                                                       //
    user = Meteor.users.findOne({                                                                                   //
      name: name                                                                                                    //
    });                                                                                                             //
                                                                                                                    //
    if (!user) {                                                                                                    //
      console.log('[irc] createNotExistUser ->'.yellow, 'userName:', name);                                         //
      Meteor.call('registerUser', {                                                                                 //
        email: name + "@rocketchat.org",                                                                            //
        pass: 'rocketchat',                                                                                         //
        name: name                                                                                                  //
      });                                                                                                           //
      Meteor.users.update({                                                                                         //
        name: name                                                                                                  //
      }, {                                                                                                          //
        $set: {                                                                                                     //
          status: 'online',                                                                                         //
          username: name                                                                                            //
        }                                                                                                           //
      });                                                                                                           //
      user = Meteor.users.findOne({                                                                                 //
        name: name                                                                                                  //
      });                                                                                                           //
    }                                                                                                               //
                                                                                                                    //
    return user;                                                                                                    //
  };                                                                                                                //
                                                                                                                    //
  IrcClient.prototype.createDirectRoomWhenNotExist = function (source, target) {                                    //
    var now, rid;                                                                                                   //
    console.log('[irc] createDirectRoomWhenNotExist -> '.yellow, 'source:', source, 'target:', target);             //
    rid = [source._id, target._id].sort().join('');                                                                 //
    now = new Date();                                                                                               //
    RocketChat.models.Rooms.upsert({                                                                                //
      _id: rid                                                                                                      //
    }, {                                                                                                            //
      $set: {                                                                                                       //
        usernames: [source.username, target.username]                                                               //
      },                                                                                                            //
      $setOnInsert: {                                                                                               //
        t: 'd',                                                                                                     //
        msgs: 0,                                                                                                    //
        ts: now                                                                                                     //
      }                                                                                                             //
    });                                                                                                             //
    RocketChat.models.Subscriptions.upsert({                                                                        //
      rid: rid,                                                                                                     //
      $and: [{                                                                                                      //
        'u._id': target._id                                                                                         //
      }]                                                                                                            //
    }, {                                                                                                            //
      $setOnInsert: {                                                                                               //
        name: source.username,                                                                                      //
        t: 'd',                                                                                                     //
        open: false,                                                                                                //
        alert: false,                                                                                               //
        unread: 0,                                                                                                  //
        u: {                                                                                                        //
          _id: target._id,                                                                                          //
          username: target.username                                                                                 //
        }                                                                                                           //
      }                                                                                                             //
    });                                                                                                             //
    return {                                                                                                        //
      t: 'd',                                                                                                       //
      _id: rid                                                                                                      //
    };                                                                                                              //
  };                                                                                                                //
                                                                                                                    //
  return IrcClient;                                                                                                 //
}();                                                                                                                //
                                                                                                                    //
IrcClient.getByUid = function (uid) {                                                                               //
  return ircClientMap[uid];                                                                                         //
};                                                                                                                  //
                                                                                                                    //
IrcClient.create = function (login) {                                                                               //
  var ircClient;                                                                                                    //
                                                                                                                    //
  if (login.user == null) {                                                                                         //
    return login;                                                                                                   //
  }                                                                                                                 //
                                                                                                                    //
  if (!(login.user._id in ircClientMap)) {                                                                          //
    ircClient = new IrcClient(login);                                                                               //
    return async(ircClient.connect);                                                                                //
  }                                                                                                                 //
                                                                                                                    //
  return login;                                                                                                     //
};                                                                                                                  //
                                                                                                                    //
IrcLoginer = function () {                                                                                          //
  function IrcLoginer(login) {                                                                                      //
    console.log('[irc] validateLogin -> '.yellow, login);                                                           //
    return IrcClient.create(login);                                                                                 //
  }                                                                                                                 //
                                                                                                                    //
  return IrcLoginer;                                                                                                //
}();                                                                                                                //
                                                                                                                    //
IrcSender = function () {                                                                                           //
  function IrcSender(message) {                                                                                     //
    var cacheKey, ircClient, name, room, timestamp;                                                                 //
    name = message.u.username;                                                                                      //
    timestamp = message.ts.getTime();                                                                               //
    cacheKey = "" + name + timestamp;                                                                               //
                                                                                                                    //
    if (ircReceiveMessageCache.get(cacheKey)) {                                                                     //
      return message;                                                                                               //
    }                                                                                                               //
                                                                                                                    //
    room = RocketChat.models.Rooms.findOneById(message.rid, {                                                       //
      fields: {                                                                                                     //
        name: 1,                                                                                                    //
        usernames: 1,                                                                                               //
        t: 1                                                                                                        //
      }                                                                                                             //
    });                                                                                                             //
    ircClient = IrcClient.getByUid(message.u._id);                                                                  //
    ircClient.sendMessage(room, message);                                                                           //
    return message;                                                                                                 //
  }                                                                                                                 //
                                                                                                                    //
  return IrcSender;                                                                                                 //
}();                                                                                                                //
                                                                                                                    //
IrcRoomJoiner = function () {                                                                                       //
  function IrcRoomJoiner(user, room) {                                                                              //
    var ircClient;                                                                                                  //
    ircClient = IrcClient.getByUid(user._id);                                                                       //
    ircClient.joinRoom(room);                                                                                       //
    return room;                                                                                                    //
  }                                                                                                                 //
                                                                                                                    //
  return IrcRoomJoiner;                                                                                             //
}();                                                                                                                //
                                                                                                                    //
IrcRoomLeaver = function () {                                                                                       //
  function IrcRoomLeaver(user, room) {                                                                              //
    var ircClient;                                                                                                  //
    ircClient = IrcClient.getByUid(user._id);                                                                       //
    ircClient.leaveRoom(room);                                                                                      //
    return room;                                                                                                    //
  }                                                                                                                 //
                                                                                                                    //
  return IrcRoomLeaver;                                                                                             //
}();                                                                                                                //
                                                                                                                    //
IrcLogoutCleanUper = function () {                                                                                  //
  function IrcLogoutCleanUper(user) {                                                                               //
    var ircClient;                                                                                                  //
    ircClient = IrcClient.getByUid(user._id);                                                                       //
    ircClient.disconnect();                                                                                         //
    return user;                                                                                                    //
  }                                                                                                                 //
                                                                                                                    //
  return IrcLogoutCleanUper;                                                                                        //
}();                                                                                                                //
                                                                                                                    //
if (IRC_AVAILABILITY === true) {                                                                                    //
  RocketChat.callbacks.add('beforeValidateLogin', IrcLoginer, RocketChat.callbacks.priority.LOW, 'irc-loginer');    //
  RocketChat.callbacks.add('beforeSaveMessage', IrcSender, RocketChat.callbacks.priority.LOW, 'irc-sender');        //
  RocketChat.callbacks.add('beforeJoinRoom', IrcRoomJoiner, RocketChat.callbacks.priority.LOW, 'irc-room-joiner');  //
  RocketChat.callbacks.add('beforeCreateChannel', IrcRoomJoiner, RocketChat.callbacks.priority.LOW, 'irc-room-joiner-create-channel');
  RocketChat.callbacks.add('beforeLeaveRoom', IrcRoomLeaver, RocketChat.callbacks.priority.LOW, 'irc-room-leaver');
  RocketChat.callbacks.add('afterLogoutCleanUp', IrcLogoutCleanUper, RocketChat.callbacks.priority.LOW, 'irc-clean-up');
} else {                                                                                                            //
  return;                                                                                                           //
}                                                                                                                   //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:irc/server/settings.js");
require("./node_modules/meteor/rocketchat:irc/server/server.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['rocketchat:irc'] = {}, {
  Irc: Irc
});

})();

//# sourceMappingURL=rocketchat_irc.js.map
