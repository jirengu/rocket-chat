(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var Random = Package.random.Random;
var Log = Package.logging.Log;
var colors = Package['nooitaf:colors'].colors;
var EventEmitter = Package['raix:eventemitter'].EventEmitter;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var __coffeescriptShare, Logger;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:logger":{"server.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_logger/server.coffee.js                                                            //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var StdOut,                                                                                               //
    processString,                                                                                        //
    extend = function (child, parent) {                                                                   //
  for (var key in meteorBabelHelpers.sanitizeForInObject(parent)) {                                       //
    if (hasProp.call(parent, key)) child[key] = parent[key];                                              //
  }                                                                                                       //
                                                                                                          //
  function ctor() {                                                                                       //
    this.constructor = child;                                                                             //
  }                                                                                                       //
                                                                                                          //
  ctor.prototype = parent.prototype;                                                                      //
  child.prototype = new ctor();                                                                           //
  child.__super__ = parent.prototype;                                                                     //
  return child;                                                                                           //
},                                                                                                        //
    hasProp = {}.hasOwnProperty,                                                                          //
    slice = [].slice;                                                                                     //
                                                                                                          //
this.LoggerManager = new (function (superClass) {                                                         //
  extend(_Class, superClass);                                                                             //
                                                                                                          //
  function _Class() {                                                                                     //
    this.enabled = false;                                                                                 //
    this.loggers = {};                                                                                    //
    this.queue = [];                                                                                      //
    this.showPackage = false;                                                                             //
    this.showFileAndLine = false;                                                                         //
    this.logLevel = 0;                                                                                    //
  }                                                                                                       //
                                                                                                          //
  _Class.prototype.register = function (logger) {                                                         //
    if (!logger instanceof Logger) {                                                                      //
      return;                                                                                             //
    }                                                                                                     //
                                                                                                          //
    this.loggers[logger.name] = logger;                                                                   //
    return this.emit('register', logger);                                                                 //
  };                                                                                                      //
                                                                                                          //
  _Class.prototype.addToQueue = function (logger, args) {                                                 //
    return this.queue.push({                                                                              //
      logger: logger,                                                                                     //
      args: args                                                                                          //
    });                                                                                                   //
  };                                                                                                      //
                                                                                                          //
  _Class.prototype.dispatchQueue = function () {                                                          //
    var i, item, len1, ref;                                                                               //
    ref = this.queue;                                                                                     //
                                                                                                          //
    for (i = 0, len1 = ref.length; i < len1; i++) {                                                       //
      item = ref[i];                                                                                      //
                                                                                                          //
      item.logger._log.apply(item.logger, item.args);                                                     //
    }                                                                                                     //
                                                                                                          //
    return this.clearQueue();                                                                             //
  };                                                                                                      //
                                                                                                          //
  _Class.prototype.clearQueue = function () {                                                             //
    return this.queue = [];                                                                               //
  };                                                                                                      //
                                                                                                          //
  _Class.prototype.disable = function () {                                                                //
    return this.enabled = false;                                                                          //
  };                                                                                                      //
                                                                                                          //
  _Class.prototype.enable = function (dispatchQueue) {                                                    //
    if (dispatchQueue == null) {                                                                          //
      dispatchQueue = false;                                                                              //
    }                                                                                                     //
                                                                                                          //
    this.enabled = true;                                                                                  //
                                                                                                          //
    if (dispatchQueue === true) {                                                                         //
      return this.dispatchQueue();                                                                        //
    } else {                                                                                              //
      return this.clearQueue();                                                                           //
    }                                                                                                     //
  };                                                                                                      //
                                                                                                          //
  return _Class;                                                                                          //
}(EventEmitter))();                                                                                       //
                                                                                                          //
this.Logger = Logger = function () {                                                                      //
  Logger.prototype.defaultTypes = {                                                                       //
    debug: {                                                                                              //
      name: 'debug',                                                                                      //
      color: 'blue',                                                                                      //
      level: 2                                                                                            //
    },                                                                                                    //
    log: {                                                                                                //
      name: 'info',                                                                                       //
      color: 'blue',                                                                                      //
      level: 1                                                                                            //
    },                                                                                                    //
    info: {                                                                                               //
      name: 'info',                                                                                       //
      color: 'blue',                                                                                      //
      level: 1                                                                                            //
    },                                                                                                    //
    success: {                                                                                            //
      name: 'info',                                                                                       //
      color: 'green',                                                                                     //
      level: 1                                                                                            //
    },                                                                                                    //
    warn: {                                                                                               //
      name: 'warn',                                                                                       //
      color: 'magenta',                                                                                   //
      level: 1                                                                                            //
    },                                                                                                    //
    error: {                                                                                              //
      name: 'error',                                                                                      //
      color: 'red',                                                                                       //
      level: 0                                                                                            //
    }                                                                                                     //
  };                                                                                                      //
                                                                                                          //
  function Logger(name1, config) {                                                                        //
    var fn, fn1, fn2, method, name, ref, ref1, ref2, section, self, type, typeConfig;                     //
    this.name = name1;                                                                                    //
                                                                                                          //
    if (config == null) {                                                                                 //
      config = {};                                                                                        //
    }                                                                                                     //
                                                                                                          //
    self = this;                                                                                          //
    this.config = {};                                                                                     //
                                                                                                          //
    _.extend(this.config, config);                                                                        //
                                                                                                          //
    if (LoggerManager.loggers[this.name] != null) {                                                       //
      LoggerManager.loggers[this.name].warn('Duplicated instance');                                       //
      return LoggerManager.loggers[this.name];                                                            //
    }                                                                                                     //
                                                                                                          //
    ref = this.defaultTypes;                                                                              //
                                                                                                          //
    fn = function (type, typeConfig) {                                                                    //
      self[type] = function () {                                                                          //
        var args;                                                                                         //
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                     //
        return self._log.call(self, {                                                                     //
          section: this.__section,                                                                        //
          type: type,                                                                                     //
          level: typeConfig.level,                                                                        //
          method: typeConfig.name,                                                                        //
          "arguments": args                                                                               //
        });                                                                                               //
      };                                                                                                  //
                                                                                                          //
      return self[type + "_box"] = function () {                                                          //
        var args;                                                                                         //
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                     //
        return self._log.call(self, {                                                                     //
          section: this.__section,                                                                        //
          type: type,                                                                                     //
          box: true,                                                                                      //
          level: typeConfig.level,                                                                        //
          method: typeConfig.name,                                                                        //
          "arguments": args                                                                               //
        });                                                                                               //
      };                                                                                                  //
    };                                                                                                    //
                                                                                                          //
    for (type in meteorBabelHelpers.sanitizeForInObject(ref)) {                                           //
      typeConfig = ref[type];                                                                             //
      fn(type, typeConfig);                                                                               //
    }                                                                                                     //
                                                                                                          //
    if (this.config.methods != null) {                                                                    //
      ref1 = this.config.methods;                                                                         //
                                                                                                          //
      fn1 = function (method, typeConfig) {                                                               //
        if (self[method] != null) {                                                                       //
          self.warn("Method", method, "already exists");                                                  //
        }                                                                                                 //
                                                                                                          //
        if (self.defaultTypes[typeConfig.type] == null) {                                                 //
          self.warn("Method type", typeConfig.type, "does not exist");                                    //
        }                                                                                                 //
                                                                                                          //
        self[method] = function () {                                                                      //
          var args, ref2;                                                                                 //
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                   //
          return self._log.call(self, {                                                                   //
            section: this.__section,                                                                      //
            type: typeConfig.type,                                                                        //
            level: typeConfig.level != null ? typeConfig.level : (ref2 = self.defaultTypes[typeConfig.type]) != null ? ref2.level : void 0,
            method: method,                                                                               //
            "arguments": args                                                                             //
          });                                                                                             //
        };                                                                                                //
                                                                                                          //
        return self[method + "_box"] = function () {                                                      //
          var args, ref2;                                                                                 //
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                   //
          return self._log.call(self, {                                                                   //
            section: this.__section,                                                                      //
            type: typeConfig.type,                                                                        //
            box: true,                                                                                    //
            level: typeConfig.level != null ? typeConfig.level : (ref2 = self.defaultTypes[typeConfig.type]) != null ? ref2.level : void 0,
            method: method,                                                                               //
            "arguments": args                                                                             //
          });                                                                                             //
        };                                                                                                //
      };                                                                                                  //
                                                                                                          //
      for (method in meteorBabelHelpers.sanitizeForInObject(ref1)) {                                      //
        typeConfig = ref1[method];                                                                        //
        fn1(method, typeConfig);                                                                          //
      }                                                                                                   //
    }                                                                                                     //
                                                                                                          //
    if (this.config.sections != null) {                                                                   //
      ref2 = this.config.sections;                                                                        //
                                                                                                          //
      fn2 = function (section, name) {                                                                    //
        var fn3, ref3, ref4, results;                                                                     //
        self[section] = {};                                                                               //
        ref3 = self.defaultTypes;                                                                         //
                                                                                                          //
        fn3 = function (_this) {                                                                          //
          return function (type, typeConfig) {                                                            //
            self[section][type] = function () {                                                           //
              return self[type].apply({                                                                   //
                __section: name                                                                           //
              }, arguments);                                                                              //
            };                                                                                            //
                                                                                                          //
            return self[section][type + "_box"] = function () {                                           //
              return self[type + "_box"].apply({                                                          //
                __section: name                                                                           //
              }, arguments);                                                                              //
            };                                                                                            //
          };                                                                                              //
        }(this);                                                                                          //
                                                                                                          //
        for (type in meteorBabelHelpers.sanitizeForInObject(ref3)) {                                      //
          typeConfig = ref3[type];                                                                        //
          fn3(type, typeConfig);                                                                          //
        }                                                                                                 //
                                                                                                          //
        ref4 = self.config.methods;                                                                       //
        results = [];                                                                                     //
                                                                                                          //
        for (method in meteorBabelHelpers.sanitizeForInObject(ref4)) {                                    //
          typeConfig = ref4[method];                                                                      //
          results.push(function (_this) {                                                                 //
            return function (method, typeConfig) {                                                        //
              self[section][method] = function () {                                                       //
                return self[method].apply({                                                               //
                  __section: name                                                                         //
                }, arguments);                                                                            //
              };                                                                                          //
                                                                                                          //
              return self[section][method + "_box"] = function () {                                       //
                return self[method + "_box"].apply({                                                      //
                  __section: name                                                                         //
                }, arguments);                                                                            //
              };                                                                                          //
            };                                                                                            //
          }(this)(method, typeConfig));                                                                   //
        }                                                                                                 //
                                                                                                          //
        return results;                                                                                   //
      };                                                                                                  //
                                                                                                          //
      for (section in meteorBabelHelpers.sanitizeForInObject(ref2)) {                                     //
        name = ref2[section];                                                                             //
        fn2(section, name);                                                                               //
      }                                                                                                   //
    }                                                                                                     //
                                                                                                          //
    LoggerManager.register(this);                                                                         //
    return this;                                                                                          //
  }                                                                                                       //
                                                                                                          //
  Logger.prototype.getPrefix = function (options) {                                                       //
    var detailParts, details, prefix;                                                                     //
                                                                                                          //
    if (options.section != null) {                                                                        //
      prefix = this.name + " ➔ " + options.section + "." + options.method;                                //
    } else {                                                                                              //
      prefix = this.name + " ➔ " + options.method;                                                        //
    }                                                                                                     //
                                                                                                          //
    details = this._getCallerDetails();                                                                   //
    detailParts = [];                                                                                     //
                                                                                                          //
    if (details["package"] != null && (LoggerManager.showPackage === true || options.type === 'error')) {
      detailParts.push(details["package"]);                                                               //
    }                                                                                                     //
                                                                                                          //
    if (LoggerManager.showFileAndLine === true || options.type === 'error') {                             //
      if (details.file != null && details.line != null) {                                                 //
        detailParts.push(details.file + ":" + details.line);                                              //
      } else {                                                                                            //
        if (details.file != null) {                                                                       //
          detailParts.push(details.file);                                                                 //
        }                                                                                                 //
                                                                                                          //
        if (details.line != null) {                                                                       //
          detailParts.push(details.line);                                                                 //
        }                                                                                                 //
      }                                                                                                   //
    }                                                                                                     //
                                                                                                          //
    if (this.defaultTypes[options.type] != null) {                                                        //
      prefix = prefix[this.defaultTypes[options.type].color];                                             //
    }                                                                                                     //
                                                                                                          //
    if (detailParts.length > 0) {                                                                         //
      prefix = detailParts.join(' ') + " " + prefix;                                                      //
    }                                                                                                     //
                                                                                                          //
    return prefix;                                                                                        //
  };                                                                                                      //
                                                                                                          //
  Logger.prototype._getCallerDetails = function () {                                                      //
    var details, getStack, i, index, item, len1, line, lines, match, packageMatch, stack;                 //
                                                                                                          //
    getStack = function () {                                                                              //
      var err, stack;                                                                                     //
      err = new Error();                                                                                  //
      stack = err.stack;                                                                                  //
      return stack;                                                                                       //
    };                                                                                                    //
                                                                                                          //
    stack = getStack();                                                                                   //
                                                                                                          //
    if (!stack) {                                                                                         //
      return {};                                                                                          //
    }                                                                                                     //
                                                                                                          //
    lines = stack.split('\n');                                                                            //
    line = void 0;                                                                                        //
                                                                                                          //
    for (index = i = 0, len1 = lines.length; i < len1; index = ++i) {                                     //
      item = lines[index];                                                                                //
                                                                                                          //
      if (!(index > 0)) {                                                                                 //
        continue;                                                                                         //
      }                                                                                                   //
                                                                                                          //
      line = item;                                                                                        //
                                                                                                          //
      if (line.match(/^\s*at eval \(eval/)) {                                                             //
        return {                                                                                          //
          file: "eval"                                                                                    //
        };                                                                                                //
      }                                                                                                   //
                                                                                                          //
      if (!line.match(/packages\/rocketchat_logger(?:\/|\.js)/)) {                                        //
        break;                                                                                            //
      }                                                                                                   //
    }                                                                                                     //
                                                                                                          //
    details = {};                                                                                         //
    match = /(?:[@(]| at )([^(]+?):([0-9:]+)(?:\)|$)/.exec(line);                                         //
                                                                                                          //
    if (!match) {                                                                                         //
      return details;                                                                                     //
    }                                                                                                     //
                                                                                                          //
    details.line = match[2].split(':')[0];                                                                //
    details.file = match[1].split('/').slice(-1)[0].split('?')[0];                                        //
    packageMatch = match[1].match(/packages\/([^\.\/]+)(?:\/|\.)/);                                       //
                                                                                                          //
    if (packageMatch != null) {                                                                           //
      details["package"] = packageMatch[1];                                                               //
    }                                                                                                     //
                                                                                                          //
    return details;                                                                                       //
  };                                                                                                      //
                                                                                                          //
  Logger.prototype.makeABox = function (message, title) {                                                 //
    var i, j, len, len1, len2, line, lines, separator, topLine;                                           //
                                                                                                          //
    if (!_.isArray(message)) {                                                                            //
      message = message.split("\n");                                                                      //
    }                                                                                                     //
                                                                                                          //
    len = 0;                                                                                              //
                                                                                                          //
    for (i = 0, len1 = message.length; i < len1; i++) {                                                   //
      line = message[i];                                                                                  //
      len = Math.max(len, line.length);                                                                   //
    }                                                                                                     //
                                                                                                          //
    topLine = "+--" + s.pad('', len, '-') + "--+";                                                        //
    separator = "|  " + s.pad('', len, '') + "  |";                                                       //
    lines = [];                                                                                           //
    lines.push(topLine);                                                                                  //
                                                                                                          //
    if (title != null) {                                                                                  //
      lines.push("|  " + s.lrpad(title, len) + "  |");                                                    //
      lines.push(topLine);                                                                                //
    }                                                                                                     //
                                                                                                          //
    lines.push(separator);                                                                                //
                                                                                                          //
    for (j = 0, len2 = message.length; j < len2; j++) {                                                   //
      line = message[j];                                                                                  //
      lines.push("|  " + s.rpad(line, len) + "  |");                                                      //
    }                                                                                                     //
                                                                                                          //
    lines.push(separator);                                                                                //
    lines.push(topLine);                                                                                  //
    return lines;                                                                                         //
  };                                                                                                      //
                                                                                                          //
  Logger.prototype._log = function (options) {                                                            //
    var box, color, i, len1, line, prefix, subPrefix;                                                     //
                                                                                                          //
    if (LoggerManager.enabled === false) {                                                                //
      LoggerManager.addToQueue(this, arguments);                                                          //
      return;                                                                                             //
    }                                                                                                     //
                                                                                                          //
    if (options.level == null) {                                                                          //
      options.level = 1;                                                                                  //
    }                                                                                                     //
                                                                                                          //
    if (LoggerManager.logLevel < options.level) {                                                         //
      return;                                                                                             //
    }                                                                                                     //
                                                                                                          //
    prefix = this.getPrefix(options);                                                                     //
                                                                                                          //
    if (options.box === true && _.isString(options["arguments"][0])) {                                    //
      color = void 0;                                                                                     //
                                                                                                          //
      if (this.defaultTypes[options.type] != null) {                                                      //
        color = this.defaultTypes[options.type].color;                                                    //
      }                                                                                                   //
                                                                                                          //
      box = this.makeABox(options["arguments"][0], options["arguments"][1]);                              //
      subPrefix = '➔';                                                                                    //
                                                                                                          //
      if (color != null) {                                                                                //
        subPrefix = subPrefix[color];                                                                     //
      }                                                                                                   //
                                                                                                          //
      console.log(subPrefix, prefix);                                                                     //
                                                                                                          //
      for (i = 0, len1 = box.length; i < len1; i++) {                                                     //
        line = box[i];                                                                                    //
                                                                                                          //
        if (color != null) {                                                                              //
          console.log(subPrefix, line[color]);                                                            //
        } else {                                                                                          //
          console.log(subPrefix, line);                                                                   //
        }                                                                                                 //
      }                                                                                                   //
    } else {                                                                                              //
      options["arguments"].unshift(prefix);                                                               //
      console.log.apply(console, options["arguments"]);                                                   //
    }                                                                                                     //
  };                                                                                                      //
                                                                                                          //
  return Logger;                                                                                          //
}();                                                                                                      //
                                                                                                          //
this.SystemLogger = new Logger('System', {                                                                //
  methods: {                                                                                              //
    startup: {                                                                                            //
      type: 'success',                                                                                    //
      level: 0                                                                                            //
    }                                                                                                     //
  }                                                                                                       //
});                                                                                                       //
                                                                                                          //
processString = function (string, date) {                                                                 //
  if (string[0] === '{') {                                                                                //
    try {                                                                                                 //
      return Log.format(EJSON.parse(string), {                                                            //
        color: true                                                                                       //
      });                                                                                                 //
    } catch (error) {}                                                                                    //
  }                                                                                                       //
                                                                                                          //
  try {                                                                                                   //
    return Log.format({                                                                                   //
      message: string,                                                                                    //
      time: date,                                                                                         //
      level: 'info'                                                                                       //
    }, {                                                                                                  //
      color: true                                                                                         //
    });                                                                                                   //
  } catch (error) {}                                                                                      //
                                                                                                          //
  return string;                                                                                          //
};                                                                                                        //
                                                                                                          //
StdOut = new (function (superClass) {                                                                     //
  extend(_Class, superClass);                                                                             //
                                                                                                          //
  function _Class() {                                                                                     //
    var write;                                                                                            //
    this.queue = [];                                                                                      //
    write = process.stdout.write;                                                                         //
                                                                                                          //
    process.stdout.write = function (_this) {                                                             //
      return function (string, encoding, fd) {                                                            //
        var date, item, ref;                                                                              //
        write.apply(process.stdout, arguments);                                                           //
        date = new Date();                                                                                //
        string = processString(string, date);                                                             //
        item = {                                                                                          //
          id: Random.id(),                                                                                //
          string: string,                                                                                 //
          ts: date                                                                                        //
        };                                                                                                //
                                                                                                          //
        _this.queue.push(item);                                                                           //
                                                                                                          //
        if ((typeof RocketChat !== "undefined" && RocketChat !== null ? (ref = RocketChat.settings) != null ? ref.get('Log_View_Limit') : void 0 : void 0) != null && _this.queue.length > RocketChat.settings.get('Log_View_Limit')) {
          _this.queue.shift();                                                                            //
        }                                                                                                 //
                                                                                                          //
        return _this.emit('write', string, item);                                                         //
      };                                                                                                  //
    }(this);                                                                                              //
  }                                                                                                       //
                                                                                                          //
  return _Class;                                                                                          //
}(EventEmitter))();                                                                                       //
Meteor.publish('stdout', function () {                                                                    //
  var i, item, len1, ref;                                                                                 //
                                                                                                          //
  if (!this.userId) {                                                                                     //
    return this.ready();                                                                                  //
  }                                                                                                       //
                                                                                                          //
  if (RocketChat.authz.hasPermission(this.userId, 'view-logs') !== true) {                                //
    return this.ready();                                                                                  //
  }                                                                                                       //
                                                                                                          //
  ref = StdOut.queue;                                                                                     //
                                                                                                          //
  for (i = 0, len1 = ref.length; i < len1; i++) {                                                         //
    item = ref[i];                                                                                        //
    this.added('stdout', item.id, {                                                                       //
      string: item.string,                                                                                //
      ts: item.ts                                                                                         //
    });                                                                                                   //
  }                                                                                                       //
                                                                                                          //
  this.ready();                                                                                           //
  StdOut.on('write', function (_this) {                                                                   //
    return function (string, item) {                                                                      //
      return _this.added('stdout', item.id, {                                                             //
        string: item.string,                                                                              //
        ts: item.ts                                                                                       //
      });                                                                                                 //
    };                                                                                                    //
  }(this));                                                                                               //
});                                                                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:logger/server.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['rocketchat:logger'] = {}, {
  Logger: Logger
});

})();
