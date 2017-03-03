(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var ECMAScript = Package.ecmascript.ECMAScript;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;

/* Package-scope variables */
var __coffeescriptShare, RocketChatFile;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:file":{"file.server.coffee.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/rocketchat_file/file.server.coffee.js                                             //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Grid, detectGM, exec, fs, gm, mkdirp, path, stream;                                       //
Grid = Npm.require('gridfs-stream');                                                          //
stream = Npm.require('stream');                                                               //
fs = Npm.require('fs');                                                                       //
path = Npm.require('path');                                                                   //
mkdirp = Npm.require('mkdirp');                                                               //
gm = Npm.require('gm');                                                                       //
exec = Npm.require('child_process').exec;                                                     //
                                                                                              //
Grid.prototype.tryParseObjectId = function () {                                               //
  return false;                                                                               //
};                                                                                            //
                                                                                              //
RocketChatFile = {                                                                            //
  gm: gm,                                                                                     //
  enabled: void 0,                                                                            //
  enable: function () {                                                                       //
    RocketChatFile.enabled = true;                                                            //
    return RocketChat.settings.updateOptionsById('Accounts_AvatarResize', {                   //
      alert: void 0                                                                           //
    });                                                                                       //
  },                                                                                          //
  disable: function () {                                                                      //
    RocketChatFile.enabled = false;                                                           //
    return RocketChat.settings.updateOptionsById('Accounts_AvatarResize', {                   //
      alert: 'The_image_resize_will_not_work_because_we_can_not_detect_ImageMagick_or_GraphicsMagick_installed_in_your_server'
    });                                                                                       //
  }                                                                                           //
};                                                                                            //
                                                                                              //
detectGM = function () {                                                                      //
  return exec('gm version', Meteor.bindEnvironment(function (error, stdout, stderr) {         //
    if (error == null && stdout.indexOf('GraphicsMagick') > -1) {                             //
      RocketChatFile.enable();                                                                //
      RocketChat.Info.GraphicsMagick = {                                                      //
        enabled: true,                                                                        //
        version: stdout                                                                       //
      };                                                                                      //
    } else {                                                                                  //
      RocketChat.Info.GraphicsMagick = {                                                      //
        enabled: false                                                                        //
      };                                                                                      //
    }                                                                                         //
                                                                                              //
    return exec('convert -version', Meteor.bindEnvironment(function (error, stdout, stderr) {
      if (error == null && stdout.indexOf('ImageMagick') > -1) {                              //
        if (RocketChatFile.enabled !== true) {                                                //
          RocketChatFile.gm = RocketChatFile.gm.subClass({                                    //
            imageMagick: true                                                                 //
          });                                                                                 //
          RocketChatFile.enable();                                                            //
        }                                                                                     //
                                                                                              //
        return RocketChat.Info.ImageMagick = {                                                //
          enabled: true,                                                                      //
          version: stdout                                                                     //
        };                                                                                    //
      } else {                                                                                //
        if (RocketChatFile.enabled !== true) {                                                //
          RocketChatFile.disable();                                                           //
        }                                                                                     //
                                                                                              //
        return RocketChat.Info.ImageMagick = {                                                //
          enabled: false                                                                      //
        };                                                                                    //
      }                                                                                       //
    }));                                                                                      //
  }));                                                                                        //
};                                                                                            //
                                                                                              //
detectGM();                                                                                   //
Meteor.methods({                                                                              //
  'detectGM': function () {                                                                   //
    detectGM();                                                                               //
  }                                                                                           //
});                                                                                           //
                                                                                              //
RocketChatFile.bufferToStream = function (buffer) {                                           //
  var bufferStream;                                                                           //
  bufferStream = new stream.PassThrough();                                                    //
  bufferStream.end(buffer);                                                                   //
  return bufferStream;                                                                        //
};                                                                                            //
                                                                                              //
RocketChatFile.dataURIParse = function (dataURI) {                                            //
  var imageData;                                                                              //
  imageData = dataURI.split(';base64,');                                                      //
  return {                                                                                    //
    image: imageData[1],                                                                      //
    contentType: imageData[0].replace('data:', '')                                            //
  };                                                                                          //
};                                                                                            //
                                                                                              //
RocketChatFile.addPassThrough = function (st, fn) {                                           //
  var pass;                                                                                   //
  pass = new stream.PassThrough();                                                            //
  fn(pass, st);                                                                               //
  return pass;                                                                                //
};                                                                                            //
                                                                                              //
RocketChatFile.GridFS = function () {                                                         //
  function _Class(config) {                                                                   //
    var db, mongo, name, transformWrite;                                                      //
                                                                                              //
    if (config == null) {                                                                     //
      config = {};                                                                            //
    }                                                                                         //
                                                                                              //
    name = config.name, transformWrite = config.transformWrite;                               //
                                                                                              //
    if (name == null) {                                                                       //
      name = 'file';                                                                          //
    }                                                                                         //
                                                                                              //
    this.name = name;                                                                         //
    this.transformWrite = transformWrite;                                                     //
    mongo = Package.mongo.MongoInternals.NpmModule;                                           //
    db = Package.mongo.MongoInternals.defaultRemoteCollectionDriver().mongo.db;               //
    this.store = new Grid(db, mongo);                                                         //
    this.findOneSync = Meteor.wrapAsync(this.store.collection(this.name).findOne.bind(this.store.collection(this.name)));
    this.removeSync = Meteor.wrapAsync(this.store.remove.bind(this.store));                   //
    this.getFileSync = Meteor.wrapAsync(this.getFile.bind(this));                             //
  }                                                                                           //
                                                                                              //
  _Class.prototype.findOne = function (fileName) {                                            //
    return this.findOneSync({                                                                 //
      _id: fileName                                                                           //
    });                                                                                       //
  };                                                                                          //
                                                                                              //
  _Class.prototype.remove = function (fileName) {                                             //
    return this.removeSync({                                                                  //
      _id: fileName,                                                                          //
      root: this.name                                                                         //
    });                                                                                       //
  };                                                                                          //
                                                                                              //
  _Class.prototype.createWriteStream = function (fileName, contentType) {                     //
    var self, ws;                                                                             //
    self = this;                                                                              //
    ws = this.store.createWriteStream({                                                       //
      _id: fileName,                                                                          //
      filename: fileName,                                                                     //
      mode: 'w',                                                                              //
      root: this.name,                                                                        //
      content_type: contentType                                                               //
    });                                                                                       //
                                                                                              //
    if (self.transformWrite != null) {                                                        //
      ws = RocketChatFile.addPassThrough(ws, function (rs, ws) {                              //
        var file;                                                                             //
        file = {                                                                              //
          name: self.name,                                                                    //
          fileName: fileName,                                                                 //
          contentType: contentType                                                            //
        };                                                                                    //
        return self.transformWrite(file, rs, ws);                                             //
      });                                                                                     //
    }                                                                                         //
                                                                                              //
    ws.on('close', function () {                                                              //
      return ws.emit('end');                                                                  //
    });                                                                                       //
    return ws;                                                                                //
  };                                                                                          //
                                                                                              //
  _Class.prototype.createReadStream = function (fileName) {                                   //
    return this.store.createReadStream({                                                      //
      _id: fileName,                                                                          //
      root: this.name                                                                         //
    });                                                                                       //
    return void 0;                                                                            //
  };                                                                                          //
                                                                                              //
  _Class.prototype.getFileWithReadStream = function (fileName) {                              //
    var file, rs;                                                                             //
    file = this.findOne(fileName);                                                            //
                                                                                              //
    if (file == null) {                                                                       //
      return void 0;                                                                          //
    }                                                                                         //
                                                                                              //
    rs = this.createReadStream(fileName);                                                     //
    return {                                                                                  //
      readStream: rs,                                                                         //
      contentType: file.contentType,                                                          //
      length: file.length,                                                                    //
      uploadDate: file.uploadDate                                                             //
    };                                                                                        //
  };                                                                                          //
                                                                                              //
  _Class.prototype.getFile = function (fileName, cb) {                                        //
    var data, file;                                                                           //
    file = this.getFileWithReadStream(fileName);                                              //
                                                                                              //
    if (!file) {                                                                              //
      return cb();                                                                            //
    }                                                                                         //
                                                                                              //
    data = [];                                                                                //
    file.readStream.on('data', Meteor.bindEnvironment(function (chunk) {                      //
      return data.push(chunk);                                                                //
    }));                                                                                      //
    return file.readStream.on('end', Meteor.bindEnvironment(function () {                     //
      return cb(null, {                                                                       //
        buffer: Buffer.concat(data),                                                          //
        contentType: file.contentType,                                                        //
        length: file.length,                                                                  //
        uploadDate: file.uploadDate                                                           //
      });                                                                                     //
    }));                                                                                      //
  };                                                                                          //
                                                                                              //
  _Class.prototype.deleteFile = function (fileName) {                                         //
    var file;                                                                                 //
    file = this.findOne(fileName);                                                            //
                                                                                              //
    if (file == null) {                                                                       //
      return void 0;                                                                          //
    }                                                                                         //
                                                                                              //
    return this.remove(fileName);                                                             //
  };                                                                                          //
                                                                                              //
  return _Class;                                                                              //
}();                                                                                          //
                                                                                              //
RocketChatFile.FileSystem = function () {                                                     //
  function _Class(config) {                                                                   //
    var absolutePath, homepath, transformWrite;                                               //
                                                                                              //
    if (config == null) {                                                                     //
      config = {};                                                                            //
    }                                                                                         //
                                                                                              //
    absolutePath = config.absolutePath, transformWrite = config.transformWrite;               //
                                                                                              //
    if (absolutePath == null) {                                                               //
      absolutePath = '~/uploads';                                                             //
    }                                                                                         //
                                                                                              //
    this.transformWrite = transformWrite;                                                     //
                                                                                              //
    if (absolutePath.split(path.sep)[0] === '~') {                                            //
      homepath = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;         //
                                                                                              //
      if (homepath != null) {                                                                 //
        absolutePath = absolutePath.replace('~', homepath);                                   //
      } else {                                                                                //
        throw new Error('Unable to resolve "~" in path');                                     //
      }                                                                                       //
    }                                                                                         //
                                                                                              //
    this.absolutePath = path.resolve(absolutePath);                                           //
    mkdirp.sync(this.absolutePath);                                                           //
    this.statSync = Meteor.wrapAsync(fs.stat.bind(fs));                                       //
    this.unlinkSync = Meteor.wrapAsync(fs.unlink.bind(fs));                                   //
    this.getFileSync = Meteor.wrapAsync(this.getFile.bind(this));                             //
  }                                                                                           //
                                                                                              //
  _Class.prototype.createWriteStream = function (fileName, contentType) {                     //
    var self, ws;                                                                             //
    self = this;                                                                              //
    ws = fs.createWriteStream(path.join(this.absolutePath, fileName));                        //
                                                                                              //
    if (self.transformWrite != null) {                                                        //
      ws = RocketChatFile.addPassThrough(ws, function (rs, ws) {                              //
        var file;                                                                             //
        file = {                                                                              //
          fileName: fileName,                                                                 //
          contentType: contentType                                                            //
        };                                                                                    //
        return self.transformWrite(file, rs, ws);                                             //
      });                                                                                     //
    }                                                                                         //
                                                                                              //
    ws.on('close', function () {                                                              //
      return ws.emit('end');                                                                  //
    });                                                                                       //
    return ws;                                                                                //
  };                                                                                          //
                                                                                              //
  _Class.prototype.createReadStream = function (fileName) {                                   //
    return fs.createReadStream(path.join(this.absolutePath, fileName));                       //
  };                                                                                          //
                                                                                              //
  _Class.prototype.stat = function (fileName) {                                               //
    return this.statSync(path.join(this.absolutePath, fileName));                             //
  };                                                                                          //
                                                                                              //
  _Class.prototype.remove = function (fileName) {                                             //
    return this.unlinkSync(path.join(this.absolutePath, fileName));                           //
  };                                                                                          //
                                                                                              //
  _Class.prototype.getFileWithReadStream = function (fileName) {                              //
    var e, rs, stat;                                                                          //
                                                                                              //
    try {                                                                                     //
      stat = this.stat(fileName);                                                             //
      rs = this.createReadStream(fileName);                                                   //
      return {                                                                                //
        readStream: rs,                                                                       //
        length: stat.size                                                                     //
      };                                                                                      //
    } catch (error1) {                                                                        //
      e = error1;                                                                             //
      return void 0;                                                                          //
    }                                                                                         //
  };                                                                                          //
                                                                                              //
  _Class.prototype.getFile = function (fileName, cb) {                                        //
    var data, file;                                                                           //
    file = this.getFileWithReadStream(fileName);                                              //
                                                                                              //
    if (!file) {                                                                              //
      return cb();                                                                            //
    }                                                                                         //
                                                                                              //
    data = [];                                                                                //
    file.readStream.on('data', Meteor.bindEnvironment(function (chunk) {                      //
      return data.push(chunk);                                                                //
    }));                                                                                      //
    return file.readStream.on('end', Meteor.bindEnvironment(function () {                     //
      return {                                                                                //
        buffer: Buffer.concat(data)({                                                         //
          contentType: file.contentType,                                                      //
          length: file.length,                                                                //
          uploadDate: file.uploadDate                                                         //
        })                                                                                    //
      };                                                                                      //
    }));                                                                                      //
  };                                                                                          //
                                                                                              //
  _Class.prototype.deleteFile = function (fileName) {                                         //
    var e, stat;                                                                              //
                                                                                              //
    try {                                                                                     //
      stat = this.stat(fileName);                                                             //
      return this.remove(fileName);                                                           //
    } catch (error1) {                                                                        //
      e = error1;                                                                             //
      return void 0;                                                                          //
    }                                                                                         //
  };                                                                                          //
                                                                                              //
  return _Class;                                                                              //
}();                                                                                          //
////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:file/file.server.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['rocketchat:file'] = {}, {
  RocketChatFile: RocketChatFile
});

})();
