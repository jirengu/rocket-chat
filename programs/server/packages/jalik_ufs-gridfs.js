(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"jalik:ufs-gridfs":{"ufs-gridfs.js":["meteor/underscore","meteor/check","meteor/meteor",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/jalik_ufs-gridfs/ufs-gridfs.js                                                  //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
var _ = void 0;                                                                             // 1
                                                                                            //
module.import('meteor/underscore', {                                                        // 1
    "_": function (v) {                                                                     // 1
        _ = v;                                                                              // 1
    }                                                                                       // 1
}, 0);                                                                                      // 1
var check = void 0;                                                                         // 1
module.import('meteor/check', {                                                             // 1
    "check": function (v) {                                                                 // 1
        check = v;                                                                          // 1
    }                                                                                       // 1
}, 1);                                                                                      // 1
var Meteor = void 0;                                                                        // 1
module.import('meteor/meteor', {                                                            // 1
    "Meteor": function (v) {                                                                // 1
        Meteor = v;                                                                         // 1
    }                                                                                       // 1
}, 2);                                                                                      // 1
                                                                                            //
/**                                                                                         // 5
 * GridFS store                                                                             //
 * @param options                                                                           //
 * @constructor                                                                             //
 */UploadFS.store.GridFS = function (options) {                                             //
    // Default options                                                                      // 11
    options = _.extend({                                                                    // 12
        chunkSize: 1024 * 255,                                                              // 13
        collectionName: 'uploadfs'                                                          // 14
    }, options); // Check options                                                           // 12
                                                                                            //
    if (typeof options.chunkSize !== 'number') {                                            // 18
        throw new TypeError('chunkSize is not a number');                                   // 19
    }                                                                                       // 20
                                                                                            //
    if (typeof options.collectionName !== 'string') {                                       // 21
        throw new TypeError('collectionName is not a string');                              // 22
    } // Create the store                                                                   // 23
                                                                                            //
                                                                                            //
    var store = new UploadFS.Store(options);                                                // 26
    store.chunkSize = options.chunkSize;                                                    // 28
    store.collectionName = options.collectionName;                                          // 29
                                                                                            //
    if (Meteor.isServer) {                                                                  // 31
        (function () {                                                                      // 31
            var GridFS = Npm.require('gridfs-stream');                                      // 32
                                                                                            //
            var mongo = Package.mongo.MongoInternals.NpmModule;                             // 33
            var db = Package.mongo.MongoInternals.defaultRemoteCollectionDriver().mongo.db;
            var mongoStore = new GridFS(db, mongo); /**                                     // 35
                                                     * Removes the file                     //
                                                     * @param fileId                        //
                                                     * @param callback                      //
                                                     */                                     //
                                                                                            //
            store.delete = function (fileId, callback) {                                    // 42
                if (typeof callback !== 'function') {                                       // 43
                    callback = function (err) {                                             // 44
                        if (err) {                                                          // 45
                            console.error(err);                                             // 46
                        }                                                                   // 47
                    };                                                                      // 48
                }                                                                           // 49
                                                                                            //
                return mongoStore.remove({                                                  // 50
                    filename: fileId,                                                       // 51
                    root: options.collectionName                                            // 52
                }, callback);                                                               // 50
            }; /**                                                                          // 54
                * Returns the file read stream                                              //
                * @param fileId                                                             //
                * @param file                                                               //
                * @param options                                                            //
                * @return {*}                                                               //
                */                                                                          //
                                                                                            //
            store.getReadStream = function (fileId, file, options) {                        // 63
                options = _.extend({}, options);                                            // 64
                return mongoStore.createReadStream({                                        // 65
                    _id: fileId,                                                            // 66
                    root: store.collectionName,                                             // 67
                    range: {                                                                // 68
                        startPos: options.start,                                            // 69
                        endPos: options.end                                                 // 70
                    }                                                                       // 68
                });                                                                         // 65
            }; /**                                                                          // 73
                * Returns the file write stream                                             //
                * @param fileId                                                             //
                * @param file                                                               //
                * @param options                                                            //
                * @return {*}                                                               //
                */                                                                          //
                                                                                            //
            store.getWriteStream = function (fileId, file, options) {                       // 82
                var writeStream = mongoStore.createWriteStream({                            // 83
                    _id: fileId,                                                            // 84
                    filename: fileId,                                                       // 85
                    mode: 'w',                                                              // 86
                    chunkSize: store.chunkSize,                                             // 87
                    root: store.collectionName,                                             // 88
                    content_type: file.type                                                 // 89
                });                                                                         // 83
                writeStream.on('close', function () {                                       // 91
                    writeStream.emit('finish');                                             // 92
                });                                                                         // 93
                return writeStream;                                                         // 94
            };                                                                              // 95
        })();                                                                               // 31
    }                                                                                       // 96
                                                                                            //
    return store;                                                                           // 98
};                                                                                          // 99
//////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/jalik:ufs-gridfs/ufs-gridfs.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['jalik:ufs-gridfs'] = {};

})();

//# sourceMappingURL=jalik_ufs-gridfs.js.map
