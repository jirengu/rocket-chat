(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;
var ECMAScript = Package.ecmascript.ECMAScript;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var _ = Package.underscore._;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"jalik:ufs":{"ufs.js":["babel-runtime/helpers/typeof","meteor/underscore","meteor/meteor","meteor/mongo","./ufs-mime","meteor/random","./ufs-tokens","./ufs-config","./ufs-filter","./ufs-store","./ufs-store-permissions","./ufs-uploader","./ufs-template-helpers","./ufs-methods","./ufs-server",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jalik_ufs/ufs.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                               //
                                                                                                                      //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
module.export({                                                                                                       // 1
    UploadFS: function () {                                                                                           // 1
        return UploadFS;                                                                                              // 1
    }                                                                                                                 // 1
});                                                                                                                   // 1
                                                                                                                      //
var _ = void 0;                                                                                                       // 1
                                                                                                                      //
module.import('meteor/underscore', {                                                                                  // 1
    "_": function (v) {                                                                                               // 1
        _ = v;                                                                                                        // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
var Meteor = void 0;                                                                                                  // 1
module.import('meteor/meteor', {                                                                                      // 1
    "Meteor": function (v) {                                                                                          // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 1);                                                                                                                // 1
var Mongo = void 0;                                                                                                   // 1
module.import('meteor/mongo', {                                                                                       // 1
    "Mongo": function (v) {                                                                                           // 1
        Mongo = v;                                                                                                    // 1
    }                                                                                                                 // 1
}, 2);                                                                                                                // 1
var MIME = void 0;                                                                                                    // 1
module.import('./ufs-mime', {                                                                                         // 1
    "MIME": function (v) {                                                                                            // 1
        MIME = v;                                                                                                     // 1
    }                                                                                                                 // 1
}, 3);                                                                                                                // 1
var Random = void 0;                                                                                                  // 1
module.import('meteor/random', {                                                                                      // 1
    "Random": function (v) {                                                                                          // 1
        Random = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 4);                                                                                                                // 1
var Tokens = void 0;                                                                                                  // 1
module.import('./ufs-tokens', {                                                                                       // 1
    "Tokens": function (v) {                                                                                          // 1
        Tokens = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 5);                                                                                                                // 1
var Config = void 0;                                                                                                  // 1
module.import('./ufs-config', {                                                                                       // 1
    "Config": function (v) {                                                                                          // 1
        Config = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 6);                                                                                                                // 1
var Filter = void 0;                                                                                                  // 1
module.import('./ufs-filter', {                                                                                       // 1
    "Filter": function (v) {                                                                                          // 1
        Filter = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 7);                                                                                                                // 1
var Store = void 0;                                                                                                   // 1
module.import('./ufs-store', {                                                                                        // 1
    "Store": function (v) {                                                                                           // 1
        Store = v;                                                                                                    // 1
    }                                                                                                                 // 1
}, 8);                                                                                                                // 1
var StorePermissions = void 0;                                                                                        // 1
module.import('./ufs-store-permissions', {                                                                            // 1
    "StorePermissions": function (v) {                                                                                // 1
        StorePermissions = v;                                                                                         // 1
    }                                                                                                                 // 1
}, 9);                                                                                                                // 1
var Uploader = void 0;                                                                                                // 1
module.import('./ufs-uploader', {                                                                                     // 1
    "Uploader": function (v) {                                                                                        // 1
        Uploader = v;                                                                                                 // 1
    }                                                                                                                 // 1
}, 10);                                                                                                               // 1
var stores = {};                                                                                                      // 34
var UploadFS = {                                                                                                      // 36
    /**                                                                                                               // 38
     * Contains all stores                                                                                            //
     */store: {},                                                                                                     //
    /**                                                                                                               // 43
     * Collection of tokens                                                                                           //
     */tokens: Tokens,                                                                                                //
    /**                                                                                                               // 48
     * Adds the "etag" attribute to files                                                                             //
     * @param where                                                                                                   //
     */addETagAttributeToFiles: function (where) {                                                                    //
        var _this = this;                                                                                             // 52
                                                                                                                      //
        _.each(this.getStores(), function (store) {                                                                   // 53
            var files = store.getCollection(); // By default update only files with no path set                       // 54
                                                                                                                      //
            files.find(where || {                                                                                     // 57
                etag: null                                                                                            // 57
            }, {                                                                                                      // 57
                fields: {                                                                                             // 57
                    _id: 1                                                                                            // 57
                }                                                                                                     // 57
            }).forEach(function (file) {                                                                              // 57
                files.direct.update(file._id, {                                                                       // 58
                    $set: {                                                                                           // 58
                        etag: _this.generateEtag()                                                                    // 58
                    }                                                                                                 // 58
                });                                                                                                   // 58
            });                                                                                                       // 59
        });                                                                                                           // 60
    },                                                                                                                // 61
    /**                                                                                                               // 63
     * Adds the MIME type for an extension                                                                            //
     * @param extension                                                                                               //
     * @param mime                                                                                                    //
     */addMimeType: function (extension, mime) {                                                                      //
        MIME[extension.toLowerCase()] = mime;                                                                         // 69
    },                                                                                                                // 70
    /**                                                                                                               // 72
     * Adds the "path" attribute to files                                                                             //
     * @param where                                                                                                   //
     */addPathAttributeToFiles: function (where) {                                                                    //
        _.each(this.getStores(), function (store) {                                                                   // 77
            var files = store.getCollection(); // By default update only files with no path set                       // 78
                                                                                                                      //
            files.find(where || {                                                                                     // 81
                path: null                                                                                            // 81
            }, {                                                                                                      // 81
                fields: {                                                                                             // 81
                    _id: 1                                                                                            // 81
                }                                                                                                     // 81
            }).forEach(function (file) {                                                                              // 81
                files.direct.update(file._id, {                                                                       // 82
                    $set: {                                                                                           // 82
                        path: store.getFileRelativeURL(file._id)                                                      // 82
                    }                                                                                                 // 82
                });                                                                                                   // 82
            });                                                                                                       // 83
        });                                                                                                           // 84
    },                                                                                                                // 85
    /**                                                                                                               // 87
     * Generates a unique ETag                                                                                        //
     * @return {string}                                                                                               //
     */generateEtag: function () {                                                                                    //
        return Random.id();                                                                                           // 92
    },                                                                                                                // 93
    /**                                                                                                               // 95
     * Returns the MIME type of the extension                                                                         //
     * @param extension                                                                                               //
     * @returns {*}                                                                                                   //
     */getMimeType: function (extension) {                                                                            //
        extension = extension.toLowerCase();                                                                          // 101
        return MIME[extension];                                                                                       // 102
    },                                                                                                                // 103
    /**                                                                                                               // 105
     * Returns all MIME types                                                                                         //
     */getMimeTypes: function () {                                                                                    //
        return MIME;                                                                                                  // 109
    },                                                                                                                // 110
    /**                                                                                                               // 112
     * Returns the store by its name                                                                                  //
     * @param name                                                                                                    //
     * @return {UploadFS.Store}                                                                                       //
     */getStore: function (name) {                                                                                    //
        return stores[name];                                                                                          // 118
    },                                                                                                                // 119
    /**                                                                                                               // 121
     * Returns all stores                                                                                             //
     * @return {object}                                                                                               //
     */getStores: function () {                                                                                       //
        return stores;                                                                                                // 126
    },                                                                                                                // 127
    /**                                                                                                               // 129
     * Returns the temporary file path                                                                                //
     * @param fileId                                                                                                  //
     * @return {string}                                                                                               //
     */getTempFilePath: function (fileId) {                                                                           //
        return this.config.tmpDir + "/" + fileId;                                                                     // 135
    },                                                                                                                // 136
    /**                                                                                                               // 138
     * Imports a file from a URL                                                                                      //
     * @param url                                                                                                     //
     * @param file                                                                                                    //
     * @param store                                                                                                   //
     * @param callback                                                                                                //
     */importFromURL: function (url, file, store, callback) {                                                         //
        if (typeof store === 'string') {                                                                              // 146
            Meteor.call('ufsImportURL', url, file, store, callback);                                                  // 147
        } else if ((typeof store === "undefined" ? "undefined" : (0, _typeof3.default)(store)) === 'object') {        // 148
            store.importFromURL(url, file, callback);                                                                 // 150
        }                                                                                                             // 151
    },                                                                                                                // 152
    /**                                                                                                               // 154
     * Returns file and data as ArrayBuffer for each files in the event                                               //
     * @deprecated                                                                                                    //
     * @param event                                                                                                   //
     * @param callback                                                                                                //
     */readAsArrayBuffer: function (event, callback) {                                                                //
        console.error('UploadFS.readAsArrayBuffer is deprecated, see https://github.com/jalik/jalik-ufs#uploading-from-a-file');
    },                                                                                                                // 162
    /**                                                                                                               // 164
     * Opens a dialog to select a single file                                                                         //
     * @param callback                                                                                                //
     */selectFile: function (callback) {                                                                              //
        var input = document.createElement('input');                                                                  // 169
        input.type = 'file';                                                                                          // 170
        input.multiple = false;                                                                                       // 171
                                                                                                                      //
        input.onchange = function (ev) {                                                                              // 172
            var files = ev.target.files;                                                                              // 173
            callback.call(UploadFS, files[0]);                                                                        // 174
        }; // Fix for iOS                                                                                             // 175
                                                                                                                      //
                                                                                                                      //
        input.style = 'display:none';                                                                                 // 177
        document.body.appendChild(input);                                                                             // 178
        input.click();                                                                                                // 179
    },                                                                                                                // 180
    /**                                                                                                               // 182
     * Opens a dialog to select multiple files                                                                        //
     * @param callback                                                                                                //
     */selectFiles: function (callback) {                                                                             //
        var input = document.createElement('input');                                                                  // 187
        input.type = 'file';                                                                                          // 188
        input.multiple = true;                                                                                        // 189
                                                                                                                      //
        input.onchange = function (ev) {                                                                              // 190
            var files = ev.target.files;                                                                              // 191
                                                                                                                      //
            for (var i = 0; i < files.length; i += 1) {                                                               // 193
                callback.call(UploadFS, files[i]);                                                                    // 194
            }                                                                                                         // 195
        }; // Fix for iOS                                                                                             // 196
                                                                                                                      //
                                                                                                                      //
        input.style = 'display:none';                                                                                 // 198
        document.body.appendChild(input);                                                                             // 199
        input.click();                                                                                                // 200
    }                                                                                                                 // 201
};                                                                                                                    // 36
                                                                                                                      //
if (Meteor.isClient) {                                                                                                // 211
    require('./ufs-template-helpers');                                                                                // 212
}                                                                                                                     // 213
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 214
    require('./ufs-methods');                                                                                         // 215
                                                                                                                      //
    require('./ufs-server');                                                                                          // 216
} /**                                                                                                                 // 217
   * UploadFS Configuration                                                                                           //
   * @type {Config}                                                                                                   //
   */                                                                                                                 //
                                                                                                                      //
UploadFS.config = new Config(); // Add classes to global namespace                                                    // 223
                                                                                                                      //
UploadFS.Config = Config;                                                                                             // 226
UploadFS.Filter = Filter;                                                                                             // 227
UploadFS.Store = Store;                                                                                               // 228
UploadFS.StorePermissions = StorePermissions;                                                                         // 229
UploadFS.Uploader = Uploader;                                                                                         // 230
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 232
    // Expose the module globally                                                                                     // 233
    if (typeof global !== 'undefined') {                                                                              // 234
        global['UploadFS'] = UploadFS;                                                                                // 235
    }                                                                                                                 // 236
} else if (Meteor.isClient) {                                                                                         // 237
    // Expose the module globally                                                                                     // 239
    if (typeof window !== 'undefined') {                                                                              // 240
        window.UploadFS = UploadFS;                                                                                   // 241
    }                                                                                                                 // 242
}                                                                                                                     // 243
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ufs-config.js":["babel-runtime/helpers/classCallCheck","meteor/underscore","meteor/meteor","./ufs-store-permissions",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jalik_ufs/ufs-config.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                               //
                                                                                                                      //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
module.export({                                                                                                       // 1
    Config: function () {                                                                                             // 1
        return Config;                                                                                                // 1
    }                                                                                                                 // 1
});                                                                                                                   // 1
                                                                                                                      //
var _ = void 0;                                                                                                       // 1
                                                                                                                      //
module.import('meteor/underscore', {                                                                                  // 1
    "_": function (v) {                                                                                               // 1
        _ = v;                                                                                                        // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
var Meteor = void 0;                                                                                                  // 1
module.import('meteor/meteor', {                                                                                      // 1
    "Meteor": function (v) {                                                                                          // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 1);                                                                                                                // 1
var StorePermissions = void 0;                                                                                        // 1
module.import('./ufs-store-permissions', {                                                                            // 1
    "StorePermissions": function (v) {                                                                                // 1
        StorePermissions = v;                                                                                         // 1
    }                                                                                                                 // 1
}, 2);                                                                                                                // 1
                                                                                                                      //
var Config = function () {                                                                                            //
    function Config(options) {                                                                                        // 36
        (0, _classCallCheck3.default)(this, Config);                                                                  // 36
        // Default options                                                                                            // 37
        options = _.extend({                                                                                          // 38
            defaultStorePermissions: null,                                                                            // 39
            https: false,                                                                                             // 40
            simulateReadDelay: 0,                                                                                     // 41
            simulateUploadSpeed: 0,                                                                                   // 42
            simulateWriteDelay: 0,                                                                                    // 43
            storesPath: 'ufs',                                                                                        // 44
            tmpDir: '/tmp/ufs',                                                                                       // 45
            tmpDirPermissions: '0700'                                                                                 // 46
        }, options); // Check options                                                                                 // 38
                                                                                                                      //
        if (options.defaultStorePermissions && !(options.defaultStorePermissions instanceof StorePermissions)) {      // 50
            throw new TypeError('Config: defaultStorePermissions is not an instance of StorePermissions');            // 51
        }                                                                                                             // 52
                                                                                                                      //
        if (typeof options.https !== 'boolean') {                                                                     // 53
            throw new TypeError('Config: https is not a function');                                                   // 54
        }                                                                                                             // 55
                                                                                                                      //
        if (typeof options.simulateReadDelay !== 'number') {                                                          // 56
            throw new TypeError('Config: simulateReadDelay is not a number');                                         // 57
        }                                                                                                             // 58
                                                                                                                      //
        if (typeof options.simulateUploadSpeed !== 'number') {                                                        // 59
            throw new TypeError('Config: simulateUploadSpeed is not a number');                                       // 60
        }                                                                                                             // 61
                                                                                                                      //
        if (typeof options.simulateWriteDelay !== 'number') {                                                         // 62
            throw new TypeError('Config: simulateWriteDelay is not a number');                                        // 63
        }                                                                                                             // 64
                                                                                                                      //
        if (typeof options.storesPath !== 'string') {                                                                 // 65
            throw new TypeError('Config: storesPath is not a string');                                                // 66
        }                                                                                                             // 67
                                                                                                                      //
        if (typeof options.tmpDir !== 'string') {                                                                     // 68
            throw new TypeError('Config: tmpDir is not a string');                                                    // 69
        }                                                                                                             // 70
                                                                                                                      //
        if (typeof options.tmpDirPermissions !== 'string') {                                                          // 71
            throw new TypeError('Config: tmpDirPermissions is not a string');                                         // 72
        } /**                                                                                                         // 73
           * Default store permissions                                                                                //
           * @type {UploadFS.StorePermissions}                                                                        //
           */                                                                                                         //
                                                                                                                      //
        this.defaultStorePermissions = options.defaultStorePermissions; /**                                           // 79
                                                                         * Use or not secured protocol in URLS        //
                                                                         * @type {boolean}                            //
                                                                         */                                           //
        this.https = options.https; /**                                                                               // 84
                                     * The simulation read delay                                                      //
                                     * @type {Number}                                                                 //
                                     */                                                                               //
        this.simulateReadDelay = parseInt(options.simulateReadDelay); /**                                             // 89
                                                                       * The simulation upload speed                  //
                                                                       * @type {Number}                               //
                                                                       */                                             //
        this.simulateUploadSpeed = parseInt(options.simulateUploadSpeed); /**                                         // 94
                                                                           * The simulation write delay               //
                                                                           * @type {Number}                           //
                                                                           */                                         //
        this.simulateWriteDelay = parseInt(options.simulateWriteDelay); /**                                           // 99
                                                                         * The URL root path of stores                //
                                                                         * @type {string}                             //
                                                                         */                                           //
        this.storesPath = options.storesPath; /**                                                                     // 104
                                               * The temporary directory of uploading files                           //
                                               * @type {string}                                                       //
                                               */                                                                     //
        this.tmpDir = options.tmpDir; /**                                                                             // 109
                                       * The permissions of the temporary directory                                   //
                                       * @type {string}                                                               //
                                       */                                                                             //
        this.tmpDirPermissions = options.tmpDirPermissions;                                                           // 114
    }                                                                                                                 // 115
                                                                                                                      //
    return Config;                                                                                                    //
}();                                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ufs-filter.js":["babel-runtime/helpers/typeof","babel-runtime/helpers/classCallCheck","meteor/underscore","meteor/meteor",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jalik_ufs/ufs-filter.js                                                                                   //
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
module.export({                                                                                                       // 1
    Filter: function () {                                                                                             // 1
        return Filter;                                                                                                // 1
    }                                                                                                                 // 1
});                                                                                                                   // 1
                                                                                                                      //
var _ = void 0;                                                                                                       // 1
                                                                                                                      //
module.import('meteor/underscore', {                                                                                  // 1
    "_": function (v) {                                                                                               // 1
        _ = v;                                                                                                        // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
var Meteor = void 0;                                                                                                  // 1
module.import('meteor/meteor', {                                                                                      // 1
    "Meteor": function (v) {                                                                                          // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 1);                                                                                                                // 1
                                                                                                                      //
var Filter = function () {                                                                                            //
    function Filter(options) {                                                                                        // 35
        (0, _classCallCheck3.default)(this, Filter);                                                                  // 35
        // Default options                                                                                            // 36
        options = _.extend({                                                                                          // 37
            contentTypes: null,                                                                                       // 38
            extensions: null,                                                                                         // 39
            minSize: 1,                                                                                               // 40
            maxSize: 0,                                                                                               // 41
            onCheck: null                                                                                             // 42
        }, options); // Check options                                                                                 // 37
                                                                                                                      //
        if (options.contentTypes && !(options.contentTypes instanceof Array)) {                                       // 46
            throw new TypeError("Filter: contentTypes is not an Array");                                              // 47
        }                                                                                                             // 48
                                                                                                                      //
        if (options.extensions && !(options.extensions instanceof Array)) {                                           // 49
            throw new TypeError("Filter: extensions is not an Array");                                                // 50
        }                                                                                                             // 51
                                                                                                                      //
        if (typeof options.minSize !== "number") {                                                                    // 52
            throw new TypeError("Filter: minSize is not a number");                                                   // 53
        }                                                                                                             // 54
                                                                                                                      //
        if (typeof options.maxSize !== "number") {                                                                    // 55
            throw new TypeError("Filter: maxSize is not a number");                                                   // 56
        }                                                                                                             // 57
                                                                                                                      //
        if (options.onCheck && typeof options.onCheck !== "function") {                                               // 58
            throw new TypeError("Filter: onCheck is not a function");                                                 // 59
        } // Private attributes                                                                                       // 60
                                                                                                                      //
                                                                                                                      //
        var contentTypes = options.contentTypes;                                                                      // 63
        var extensions = options.extensions;                                                                          // 64
        var maxSize = parseInt(options.maxSize);                                                                      // 65
        var minSize = parseInt(options.minSize);                                                                      // 66
        this.onCheck = options.onCheck; /**                                                                           // 68
                                         * Returns the allowed content types                                          //
                                         * @return {Array}                                                            //
                                         */                                                                           //
                                                                                                                      //
        this.getContentTypes = function () {                                                                          // 74
            return contentTypes;                                                                                      // 75
        }; /**                                                                                                        // 76
            * Returns the allowed extensions                                                                          //
            * @return {Array}                                                                                         //
            */                                                                                                        //
                                                                                                                      //
        this.getExtensions = function () {                                                                            // 82
            return extensions;                                                                                        // 83
        }; /**                                                                                                        // 84
            * Returns the maximum file size                                                                           //
            * @return {Number}                                                                                        //
            */                                                                                                        //
                                                                                                                      //
        this.getMaxSize = function () {                                                                               // 90
            return maxSize;                                                                                           // 91
        }; /**                                                                                                        // 92
            * Returns the minimum file size                                                                           //
            * @return {Number}                                                                                        //
            */                                                                                                        //
                                                                                                                      //
        this.getMinSize = function () {                                                                               // 98
            return minSize;                                                                                           // 99
        };                                                                                                            // 100
    } /**                                                                                                             // 101
       * Checks the file                                                                                              //
       * @param file                                                                                                  //
       */                                                                                                             //
                                                                                                                      //
    Filter.prototype.check = function () {                                                                            //
        function check(file) {                                                                                        //
            if ((typeof file === "undefined" ? "undefined" : (0, _typeof3.default)(file)) !== "object" || !file) {    // 108
                throw new Meteor.Error('invalid-file', "File is not valid");                                          // 109
            } // Check size                                                                                           // 110
                                                                                                                      //
                                                                                                                      //
            if (file.size <= 0 || file.size < this.getMinSize()) {                                                    // 112
                throw new Meteor.Error('file-too-small', "File size is too small (min = " + this.getMinSize() + ")");
            }                                                                                                         // 114
                                                                                                                      //
            if (this.getMaxSize() > 0 && file.size > this.getMaxSize()) {                                             // 115
                throw new Meteor.Error('file-too-large', "File size is too large (max = " + this.getMaxSize() + ")");
            } // Check extension                                                                                      // 117
                                                                                                                      //
                                                                                                                      //
            if (this.getExtensions() && !_.contains(this.getExtensions(), file.extension)) {                          // 119
                throw new Meteor.Error('invalid-file-extension', "File extension \"" + file.extension + "\" is not accepted");
            } // Check content type                                                                                   // 121
                                                                                                                      //
                                                                                                                      //
            if (this.getContentTypes() && !this.isContentTypeInList(file.type, this.getContentTypes())) {             // 123
                throw new Meteor.Error('invalid-file-type', "File type \"" + file.type + "\" is not accepted");       // 124
            } // Apply custom check                                                                                   // 125
                                                                                                                      //
                                                                                                                      //
            if (typeof this.onCheck === 'function' && !this.onCheck(file)) {                                          // 127
                throw new Meteor.Error('invalid-file', "File does not match filter");                                 // 128
            }                                                                                                         // 129
        }                                                                                                             // 130
                                                                                                                      //
        return check;                                                                                                 //
    }(); /**                                                                                                          //
          * Checks if content type is in the given list                                                               //
          * @param type                                                                                               //
          * @param list                                                                                               //
          * @return {boolean}                                                                                         //
          */                                                                                                          //
                                                                                                                      //
    Filter.prototype.isContentTypeInList = function () {                                                              //
        function isContentTypeInList(type, list) {                                                                    //
            if (typeof type === 'string' && list instanceof Array) {                                                  // 139
                if (_.contains(list, type)) {                                                                         // 140
                    return true;                                                                                      // 141
                } else {                                                                                              // 142
                    var _ret = function () {                                                                          // 142
                        var wildCardGlob = '/*';                                                                      // 143
                                                                                                                      //
                        var wildcards = _.filter(list, function (item) {                                              // 144
                            return item.indexOf(wildCardGlob) > 0;                                                    // 145
                        });                                                                                           // 146
                                                                                                                      //
                        if (_.contains(wildcards, type.replace(/(\/.*)$/, wildCardGlob))) {                           // 148
                            return {                                                                                  // 149
                                v: true                                                                               // 149
                            };                                                                                        // 149
                        }                                                                                             // 150
                    }();                                                                                              // 142
                                                                                                                      //
                    if ((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
                }                                                                                                     // 151
            }                                                                                                         // 152
                                                                                                                      //
            return false;                                                                                             // 153
        }                                                                                                             // 154
                                                                                                                      //
        return isContentTypeInList;                                                                                   //
    }(); /**                                                                                                          //
          * Checks if the file matches filter                                                                         //
          * @param file                                                                                               //
          * @return {boolean}                                                                                         //
          */                                                                                                          //
                                                                                                                      //
    Filter.prototype.isValid = function () {                                                                          //
        function isValid(file) {                                                                                      //
            var result = true;                                                                                        // 162
                                                                                                                      //
            try {                                                                                                     // 163
                this.check(file);                                                                                     // 164
            } catch (err) {                                                                                           // 165
                result = false;                                                                                       // 166
            }                                                                                                         // 167
                                                                                                                      //
            return result;                                                                                            // 168
        }                                                                                                             // 169
                                                                                                                      //
        return isValid;                                                                                               //
    }(); /**                                                                                                          //
          * Executes custom checks                                                                                    //
          * @param file                                                                                               //
          * @return {boolean}                                                                                         //
          */                                                                                                          //
                                                                                                                      //
    Filter.prototype.onCheck = function () {                                                                          //
        function onCheck(file) {                                                                                      //
            return true;                                                                                              // 177
        }                                                                                                             // 178
                                                                                                                      //
        return onCheck;                                                                                               //
    }();                                                                                                              //
                                                                                                                      //
    return Filter;                                                                                                    //
}();                                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ufs-methods.js":["babel-runtime/helpers/typeof","meteor/underscore","meteor/check","meteor/meteor","./ufs","./ufs-filter","./ufs-tokens",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jalik_ufs/ufs-methods.js                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                               //
                                                                                                                      //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
var _ = void 0;                                                                                                       // 1
                                                                                                                      //
module.import('meteor/underscore', {                                                                                  // 1
    "_": function (v) {                                                                                               // 1
        _ = v;                                                                                                        // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
var check = void 0;                                                                                                   // 1
module.import('meteor/check', {                                                                                       // 1
    "check": function (v) {                                                                                           // 1
        check = v;                                                                                                    // 1
    }                                                                                                                 // 1
}, 1);                                                                                                                // 1
var Meteor = void 0;                                                                                                  // 1
module.import('meteor/meteor', {                                                                                      // 1
    "Meteor": function (v) {                                                                                          // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 2);                                                                                                                // 1
var UploadFS = void 0;                                                                                                // 1
module.import('./ufs', {                                                                                              // 1
    "UploadFS": function (v) {                                                                                        // 1
        UploadFS = v;                                                                                                 // 1
    }                                                                                                                 // 1
}, 3);                                                                                                                // 1
var Filter = void 0;                                                                                                  // 1
module.import('./ufs-filter', {                                                                                       // 1
    "Filter": function (v) {                                                                                          // 1
        Filter = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 4);                                                                                                                // 1
var Tokens = void 0;                                                                                                  // 1
module.import('./ufs-tokens', {                                                                                       // 1
    "Tokens": function (v) {                                                                                          // 1
        Tokens = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 5);                                                                                                                // 1
                                                                                                                      //
var fs = Npm.require('fs');                                                                                           // 33
                                                                                                                      //
var http = Npm.require('http');                                                                                       // 34
                                                                                                                      //
var https = Npm.require('https');                                                                                     // 35
                                                                                                                      //
var Future = Npm.require('fibers/future');                                                                            // 36
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 39
    Meteor.methods({                                                                                                  // 40
        /**                                                                                                           // 42
         * Completes the file transfer                                                                                //
         * @param fileId                                                                                              //
         * @param storeName                                                                                           //
         * @param token                                                                                               //
         */ufsComplete: function (fileId, storeName, token) {                                                         //
            check(fileId, String);                                                                                    // 49
            check(storeName, String);                                                                                 // 50
            check(token, String); // Get store                                                                        // 51
                                                                                                                      //
            var store = UploadFS.getStore(storeName);                                                                 // 54
                                                                                                                      //
            if (!store) {                                                                                             // 55
                throw new Meteor.Error('invalid-store', "Store not found");                                           // 56
            } // Check token                                                                                          // 57
                                                                                                                      //
                                                                                                                      //
            if (!store.checkToken(token, fileId)) {                                                                   // 59
                throw new Meteor.Error('invalid-token', "Token is not valid");                                        // 60
            }                                                                                                         // 61
                                                                                                                      //
            var fut = new Future();                                                                                   // 63
            var tmpFile = UploadFS.getTempFilePath(fileId);                                                           // 64
                                                                                                                      //
            var removeTempFile = function () {                                                                        // 66
                fs.unlink(tmpFile, function (err) {                                                                   // 67
                    err && console.error("ufs: cannot delete temp file \"" + tmpFile + "\" (" + err.message + ")");   // 68
                });                                                                                                   // 69
            };                                                                                                        // 70
                                                                                                                      //
            try {                                                                                                     // 72
                // todo check if temp file exists                                                                     // 73
                // Get file                                                                                           // 75
                var file = store.getCollection().findOne({                                                            // 76
                    _id: fileId                                                                                       // 76
                }); // Validate file before moving to the store                                                       // 76
                                                                                                                      //
                store.validate(file); // Get the temp file                                                            // 79
                                                                                                                      //
                var rs = fs.createReadStream(tmpFile, {                                                               // 82
                    flags: 'r',                                                                                       // 83
                    encoding: null,                                                                                   // 84
                    autoClose: true                                                                                   // 85
                }); // Clean upload if error occurs                                                                   // 82
                                                                                                                      //
                rs.on('error', Meteor.bindEnvironment(function (err) {                                                // 89
                    console.error(err);                                                                               // 90
                    store.getCollection().remove({                                                                    // 91
                        _id: fileId                                                                                   // 91
                    });                                                                                               // 91
                    fut.throw(err);                                                                                   // 92
                })); // Save file in the store                                                                        // 93
                                                                                                                      //
                store.write(rs, fileId, Meteor.bindEnvironment(function (err, file) {                                 // 96
                    removeTempFile();                                                                                 // 97
                                                                                                                      //
                    if (err) {                                                                                        // 99
                        fut.throw(err);                                                                               // 100
                    } else {                                                                                          // 101
                        // File has been fully uploaded                                                               // 102
                        // so we don't need to keep the token anymore.                                                // 103
                        // Also this ensure that the file cannot be modified with extra chunks later.                 // 104
                        Tokens.remove({                                                                               // 105
                            fileId: fileId                                                                            // 105
                        });                                                                                           // 105
                        fut.return(file);                                                                             // 106
                    }                                                                                                 // 107
                }));                                                                                                  // 108
            } catch (err) {                                                                                           // 109
                // If write failed, remove the file                                                                   // 111
                store.getCollection().remove({                                                                        // 112
                    _id: fileId                                                                                       // 112
                }); // removeTempFile();                                                                              // 112
                                                                                                                      //
                fut.throw(err);                                                                                       // 114
            }                                                                                                         // 115
                                                                                                                      //
            return fut.wait();                                                                                        // 116
        },                                                                                                            // 117
        /**                                                                                                           // 119
         * Creates the file and returns the file upload token                                                         //
         * @param file                                                                                                //
         * @return {{fileId: string, token: *, url: *}}                                                               //
         */ufsCreate: function (file) {                                                                               //
            check(file, Object);                                                                                      // 125
                                                                                                                      //
            if (typeof file.name !== 'string' || !file.name.length) {                                                 // 127
                throw new Meteor.Error('invalid-file-name', "file name is not valid");                                // 128
            }                                                                                                         // 129
                                                                                                                      //
            if (typeof file.store !== 'string' || !file.store.length) {                                               // 130
                throw new Meteor.Error('invalid-store', "store is not valid");                                        // 131
            } // Get store                                                                                            // 132
                                                                                                                      //
                                                                                                                      //
            var store = UploadFS.getStore(file.store);                                                                // 134
                                                                                                                      //
            if (!store) {                                                                                             // 135
                throw new Meteor.Error('invalid-store', "Store not found");                                           // 136
            } // Set default info                                                                                     // 137
                                                                                                                      //
                                                                                                                      //
            file.complete = false;                                                                                    // 140
            file.uploading = false;                                                                                   // 141
            file.extension = file.name && file.name.substr((~-file.name.lastIndexOf('.') >>> 0) + 2).toLowerCase(); // Assign file MIME type based on the extension
                                                                                                                      //
            if (file.extension && !file.type) {                                                                       // 144
                file.type = UploadFS.getMimeType(file.extension) || 'application/octet-stream';                       // 145
            }                                                                                                         // 146
                                                                                                                      //
            file.progress = 0;                                                                                        // 147
            file.size = parseInt(file.size) || 0;                                                                     // 148
            file.userId = file.userId || this.userId; // Check if the file matches store filter                       // 149
                                                                                                                      //
            var filter = store.getFilter();                                                                           // 152
                                                                                                                      //
            if (filter instanceof Filter) {                                                                           // 153
                filter.check(file);                                                                                   // 154
            } // Create the file                                                                                      // 155
                                                                                                                      //
                                                                                                                      //
            var fileId = store.create(file);                                                                          // 158
            var token = store.createToken(fileId);                                                                    // 159
            var uploadUrl = store.getURL(fileId + "?token=" + token);                                                 // 160
            return {                                                                                                  // 162
                fileId: fileId,                                                                                       // 163
                token: token,                                                                                         // 164
                url: uploadUrl                                                                                        // 165
            };                                                                                                        // 162
        },                                                                                                            // 167
        /**                                                                                                           // 169
         * Deletes a file                                                                                             //
         * @param fileId                                                                                              //
         * @param storeName                                                                                           //
         * @param token                                                                                               //
         * @returns {*}                                                                                               //
         */ufsDelete: function (fileId, storeName, token) {                                                           //
            check(fileId, String);                                                                                    // 177
            check(storeName, String);                                                                                 // 178
            check(token, String); // Check store                                                                      // 179
                                                                                                                      //
            var store = UploadFS.getStore(storeName);                                                                 // 182
                                                                                                                      //
            if (!store) {                                                                                             // 183
                throw new Meteor.Error('invalid-store', "Store not found");                                           // 184
            } // Ignore files that does not exist                                                                     // 185
                                                                                                                      //
                                                                                                                      //
            if (store.getCollection().find({                                                                          // 187
                _id: fileId                                                                                           // 187
            }).count() === 0) {                                                                                       // 187
                return 1;                                                                                             // 188
            } // Check token                                                                                          // 189
                                                                                                                      //
                                                                                                                      //
            if (!store.checkToken(token, fileId)) {                                                                   // 191
                throw new Meteor.Error('invalid-token', "Token is not valid");                                        // 192
            }                                                                                                         // 193
                                                                                                                      //
            return store.getCollection().remove({                                                                     // 194
                _id: fileId                                                                                           // 194
            });                                                                                                       // 194
        },                                                                                                            // 195
        /**                                                                                                           // 197
         * Imports a file from the URL                                                                                //
         * @param url                                                                                                 //
         * @param file                                                                                                //
         * @param storeName                                                                                           //
         * @return {*}                                                                                                //
         */ufsImportURL: function (url, file, storeName) {                                                            //
            check(url, String);                                                                                       // 205
            check(file, Object);                                                                                      // 206
            check(storeName, String); // Check URL                                                                    // 207
                                                                                                                      //
            if (typeof url !== 'string' || url.length <= 0) {                                                         // 210
                throw new Meteor.Error('invalid-url', "The url is not valid");                                        // 211
            } // Check file                                                                                           // 212
                                                                                                                      //
                                                                                                                      //
            if ((typeof file === "undefined" ? "undefined" : (0, _typeof3.default)(file)) !== 'object' || file === null) {
                throw new Meteor.Error('invalid-file', "The file is not valid");                                      // 215
            } // Check store                                                                                          // 216
                                                                                                                      //
                                                                                                                      //
            var store = UploadFS.getStore(storeName);                                                                 // 218
                                                                                                                      //
            if (!store) {                                                                                             // 219
                throw new Meteor.Error('invalid-store', 'The store does not exist');                                  // 220
            } // Extract file info                                                                                    // 221
                                                                                                                      //
                                                                                                                      //
            if (!file.name) {                                                                                         // 224
                file.name = url.replace(/\?.*$/, '').split('/').pop();                                                // 225
            }                                                                                                         // 226
                                                                                                                      //
            if (file.name && !file.extension) {                                                                       // 227
                file.extension = file.name && file.name.substr((~-file.name.lastIndexOf('.') >>> 0) + 2).toLowerCase();
            }                                                                                                         // 229
                                                                                                                      //
            if (file.extension && !file.type) {                                                                       // 230
                // Assign file MIME type based on the extension                                                       // 231
                file.type = UploadFS.getMimeType(file.extension) || 'application/octet-stream';                       // 232
            } // Check if file is valid                                                                               // 233
                                                                                                                      //
                                                                                                                      //
            if (store.getFilter() instanceof Filter) {                                                                // 235
                store.getFilter().check(file);                                                                        // 236
            }                                                                                                         // 237
                                                                                                                      //
            if (file.originalUrl) {                                                                                   // 239
                console.warn("ufs: The \"originalUrl\" attribute is automatically set when importing a file from a URL");
            } // Add original URL                                                                                     // 241
                                                                                                                      //
                                                                                                                      //
            file.originalUrl = url; // Create the file                                                                // 244
                                                                                                                      //
            file.complete = false;                                                                                    // 247
            file.uploading = true;                                                                                    // 248
            file.progress = 0;                                                                                        // 249
            file._id = store.create(file);                                                                            // 250
            var fut = new Future();                                                                                   // 252
            var proto = void 0; // Detect protocol to use                                                             // 253
                                                                                                                      //
            if (/http:\/\//i.test(url)) {                                                                             // 256
                proto = http;                                                                                         // 257
            } else if (/https:\/\//i.test(url)) {                                                                     // 258
                proto = https;                                                                                        // 259
            }                                                                                                         // 260
                                                                                                                      //
            this.unblock(); // Download file                                                                          // 262
                                                                                                                      //
            proto.get(url, Meteor.bindEnvironment(function (res) {                                                    // 265
                // Save the file in the store                                                                         // 266
                store.write(res, file._id, function (err, file) {                                                     // 267
                    if (err) {                                                                                        // 268
                        fut.throw(err);                                                                               // 269
                    } else {                                                                                          // 270
                        fut.return(file);                                                                             // 271
                    }                                                                                                 // 272
                });                                                                                                   // 273
            })).on('error', function (err) {                                                                          // 274
                fut.throw(err);                                                                                       // 275
            });                                                                                                       // 276
            return fut.wait();                                                                                        // 277
        },                                                                                                            // 278
        /**                                                                                                           // 280
         * Marks the file uploading as stopped                                                                        //
         * @param fileId                                                                                              //
         * @param storeName                                                                                           //
         * @param token                                                                                               //
         * @returns {*}                                                                                               //
         */ufsStop: function (fileId, storeName, token) {                                                             //
            check(fileId, String);                                                                                    // 288
            check(storeName, String);                                                                                 // 289
            check(token, String); // Check store                                                                      // 290
                                                                                                                      //
            var store = UploadFS.getStore(storeName);                                                                 // 293
                                                                                                                      //
            if (!store) {                                                                                             // 294
                throw new Meteor.Error('invalid-store', "Store not found");                                           // 295
            } // Check file                                                                                           // 296
                                                                                                                      //
                                                                                                                      //
            var file = store.getCollection().find({                                                                   // 298
                _id: fileId                                                                                           // 298
            }, {                                                                                                      // 298
                fields: {                                                                                             // 298
                    userId: 1                                                                                         // 298
                }                                                                                                     // 298
            });                                                                                                       // 298
                                                                                                                      //
            if (!file) {                                                                                              // 299
                throw new Meteor.Error('invalid-file', "File not found");                                             // 300
            } // Check token                                                                                          // 301
                                                                                                                      //
                                                                                                                      //
            if (!store.checkToken(token, fileId)) {                                                                   // 303
                throw new Meteor.Error('invalid-token', "Token is not valid");                                        // 304
            }                                                                                                         // 305
                                                                                                                      //
            return store.getCollection().update({                                                                     // 307
                _id: fileId                                                                                           // 307
            }, {                                                                                                      // 307
                $set: {                                                                                               // 308
                    uploading: false                                                                                  // 308
                }                                                                                                     // 308
            });                                                                                                       // 307
        }                                                                                                             // 310
    });                                                                                                               // 40
}                                                                                                                     // 312
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ufs-mime.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jalik_ufs/ufs-mime.js                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({                                                                                                       // 1
    MIME: function () {                                                                                               // 1
        return MIME;                                                                                                  // 1
    }                                                                                                                 // 1
});                                                                                                                   // 1
var MIME = {                                                                                                          // 29
    // application                                                                                                    // 31
    '7z': 'application/x-7z-compressed',                                                                              // 32
    'arc': 'application/octet-stream',                                                                                // 33
    'ai': 'application/postscript',                                                                                   // 34
    'bin': 'application/octet-stream',                                                                                // 35
    'bz': 'application/x-bzip',                                                                                       // 36
    'bz2': 'application/x-bzip2',                                                                                     // 37
    'eps': 'application/postscript',                                                                                  // 38
    'exe': 'application/octet-stream',                                                                                // 39
    'gz': 'application/x-gzip',                                                                                       // 40
    'gzip': 'application/x-gzip',                                                                                     // 41
    'js': 'application/javascript',                                                                                   // 42
    'json': 'application/json',                                                                                       // 43
    'ogx': 'application/ogg',                                                                                         // 44
    'pdf': 'application/pdf',                                                                                         // 45
    'ps': 'application/postscript',                                                                                   // 46
    'psd': 'application/octet-stream',                                                                                // 47
    'rar': 'application/x-rar-compressed',                                                                            // 48
    'rev': 'application/x-rar-compressed',                                                                            // 49
    'swf': 'application/x-shockwave-flash',                                                                           // 50
    'tar': 'application/x-tar',                                                                                       // 51
    'xhtml': 'application/xhtml+xml',                                                                                 // 52
    'xml': 'application/xml',                                                                                         // 53
    'zip': 'application/zip',                                                                                         // 54
    // audio                                                                                                          // 56
    'aif': 'audio/aiff',                                                                                              // 57
    'aifc': 'audio/aiff',                                                                                             // 58
    'aiff': 'audio/aiff',                                                                                             // 59
    'au': 'audio/basic',                                                                                              // 60
    'flac': 'audio/flac',                                                                                             // 61
    'midi': 'audio/midi',                                                                                             // 62
    'mp2': 'audio/mpeg',                                                                                              // 63
    'mp3': 'audio/mpeg',                                                                                              // 64
    'mpa': 'audio/mpeg',                                                                                              // 65
    'oga': 'audio/ogg',                                                                                               // 66
    'ogg': 'audio/ogg',                                                                                               // 67
    'opus': 'audio/ogg',                                                                                              // 68
    'ra': 'audio/vnd.rn-realaudio',                                                                                   // 69
    'spx': 'audio/ogg',                                                                                               // 70
    'wav': 'audio/x-wav',                                                                                             // 71
    'weba': 'audio/webm',                                                                                             // 72
    'wma': 'audio/x-ms-wma',                                                                                          // 73
    // image                                                                                                          // 75
    'avs': 'image/avs-video',                                                                                         // 76
    'bmp': 'image/x-windows-bmp',                                                                                     // 77
    'gif': 'image/gif',                                                                                               // 78
    'ico': 'image/vnd.microsoft.icon',                                                                                // 79
    'jpeg': 'image/jpeg',                                                                                             // 80
    'jpg': 'image/jpg',                                                                                               // 81
    'mjpg': 'image/x-motion-jpeg',                                                                                    // 82
    'pic': 'image/pic',                                                                                               // 83
    'png': 'image/png',                                                                                               // 84
    'svg': 'image/svg+xml',                                                                                           // 85
    'tif': 'image/tiff',                                                                                              // 86
    'tiff': 'image/tiff',                                                                                             // 87
    // text                                                                                                           // 89
    'css': 'text/css',                                                                                                // 90
    'csv': 'text/csv',                                                                                                // 91
    'html': 'text/html',                                                                                              // 92
    'txt': 'text/plain',                                                                                              // 93
    // video                                                                                                          // 95
    'avi': 'video/avi',                                                                                               // 96
    'dv': 'video/x-dv',                                                                                               // 97
    'flv': 'video/x-flv',                                                                                             // 98
    'mov': 'video/quicktime',                                                                                         // 99
    'mp4': 'video/mp4',                                                                                               // 100
    'mpeg': 'video/mpeg',                                                                                             // 101
    'mpg': 'video/mpg',                                                                                               // 102
    'ogv': 'video/ogg',                                                                                               // 103
    'vdo': 'video/vdo',                                                                                               // 104
    'webm': 'video/webm',                                                                                             // 105
    'wmv': 'video/x-ms-wmv',                                                                                          // 106
    // specific to vendors                                                                                            // 108
    'doc': 'application/msword',                                                                                      // 109
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',                                // 110
    'odb': 'application/vnd.oasis.opendocument.database',                                                             // 111
    'odc': 'application/vnd.oasis.opendocument.chart',                                                                // 112
    'odf': 'application/vnd.oasis.opendocument.formula',                                                              // 113
    'odg': 'application/vnd.oasis.opendocument.graphics',                                                             // 114
    'odi': 'application/vnd.oasis.opendocument.image',                                                                // 115
    'odm': 'application/vnd.oasis.opendocument.text-master',                                                          // 116
    'odp': 'application/vnd.oasis.opendocument.presentation',                                                         // 117
    'ods': 'application/vnd.oasis.opendocument.spreadsheet',                                                          // 118
    'odt': 'application/vnd.oasis.opendocument.text',                                                                 // 119
    'otg': 'application/vnd.oasis.opendocument.graphics-template',                                                    // 120
    'otp': 'application/vnd.oasis.opendocument.presentation-template',                                                // 121
    'ots': 'application/vnd.oasis.opendocument.spreadsheet-template',                                                 // 122
    'ott': 'application/vnd.oasis.opendocument.text-template',                                                        // 123
    'ppt': 'application/vnd.ms-powerpoint',                                                                           // 124
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',                              // 125
    'xls': 'application/vnd.ms-excel',                                                                                // 126
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'                                       // 127
};                                                                                                                    // 29
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ufs-server.js":["babel-runtime/helpers/typeof","meteor/underscore","meteor/meteor","meteor/webapp","./ufs",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jalik_ufs/ufs-server.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                               //
                                                                                                                      //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
var _ = void 0;                                                                                                       // 1
                                                                                                                      //
module.import('meteor/underscore', {                                                                                  // 1
    "_": function (v) {                                                                                               // 1
        _ = v;                                                                                                        // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
var Meteor = void 0;                                                                                                  // 1
module.import('meteor/meteor', {                                                                                      // 1
    "Meteor": function (v) {                                                                                          // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 1);                                                                                                                // 1
var WebApp = void 0;                                                                                                  // 1
module.import('meteor/webapp', {                                                                                      // 1
    "WebApp": function (v) {                                                                                          // 1
        WebApp = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 2);                                                                                                                // 1
var UploadFS = void 0;                                                                                                // 1
module.import('./ufs', {                                                                                              // 1
    "UploadFS": function (v) {                                                                                        // 1
        UploadFS = v;                                                                                                 // 1
    }                                                                                                                 // 1
}, 3);                                                                                                                // 1
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 32
    (function () {                                                                                                    // 32
        var domain = Npm.require('domain');                                                                           // 34
                                                                                                                      //
        var fs = Npm.require('fs');                                                                                   // 35
                                                                                                                      //
        var http = Npm.require('http');                                                                               // 36
                                                                                                                      //
        var https = Npm.require('https');                                                                             // 37
                                                                                                                      //
        var mkdirp = Npm.require('mkdirp');                                                                           // 38
                                                                                                                      //
        var stream = Npm.require('stream');                                                                           // 39
                                                                                                                      //
        var URL = Npm.require('url');                                                                                 // 40
                                                                                                                      //
        var zlib = Npm.require('zlib');                                                                               // 41
                                                                                                                      //
        Meteor.startup(function () {                                                                                  // 44
            var path = UploadFS.config.tmpDir;                                                                        // 45
            var mode = UploadFS.config.tmpDirPermissions;                                                             // 46
            fs.stat(path, function (err) {                                                                            // 48
                if (err) {                                                                                            // 49
                    // Create the temp directory                                                                      // 50
                    mkdirp(path, {                                                                                    // 51
                        mode: mode                                                                                    // 51
                    }, function (err) {                                                                               // 51
                        if (err) {                                                                                    // 52
                            console.error("ufs: cannot create temp directory at \"" + path + "\" (" + err.message + ")");
                        } else {                                                                                      // 54
                            console.log("ufs: temp directory created at \"" + path + "\"");                           // 55
                        }                                                                                             // 56
                    });                                                                                               // 57
                } else {                                                                                              // 58
                    // Set directory permissions                                                                      // 59
                    fs.chmod(path, mode, function (err) {                                                             // 60
                        err && console.error("ufs: cannot set temp directory permissions " + mode + " (" + err.message + ")");
                    });                                                                                               // 62
                }                                                                                                     // 63
            });                                                                                                       // 64
        }); // Create domain to handle errors                                                                         // 65
        // and possibly avoid server crashes.                                                                         // 68
                                                                                                                      //
        var d = domain.create();                                                                                      // 69
        d.on('error', function (err) {                                                                                // 71
            console.error('ufs: ' + err.message);                                                                     // 72
        }); // Listen HTTP requests to serve files                                                                    // 73
                                                                                                                      //
        WebApp.connectHandlers.use(function (req, res, next) {                                                        // 76
            // Quick check to see if request should be catch                                                          // 77
            if (req.url.indexOf(UploadFS.config.storesPath) === -1) {                                                 // 78
                next();                                                                                               // 79
                return;                                                                                               // 80
            } // Remove store path                                                                                    // 81
                                                                                                                      //
                                                                                                                      //
            var parsedUrl = URL.parse(req.url);                                                                       // 84
            var path = parsedUrl.pathname.substr(UploadFS.config.storesPath.length + 1);                              // 85
                                                                                                                      //
            var allowCORS = function () {                                                                             // 87
                // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);                                  // 88
                res.setHeader("Access-Control-Allow-Methods", "POST");                                                // 89
                res.setHeader("Access-Control-Allow-Origin", "*");                                                    // 90
                res.setHeader("Access-Control-Allow-Headers", "Content-Type");                                        // 91
            };                                                                                                        // 92
                                                                                                                      //
            if (req.method === "OPTIONS") {                                                                           // 94
                var regExp = new RegExp('^\/([^\/\?]+)\/([^\/\?]+)$');                                                // 95
                var match = regExp.exec(path); // Request is not valid                                                // 96
                                                                                                                      //
                if (match === null) {                                                                                 // 99
                    res.writeHead(400);                                                                               // 100
                    res.end();                                                                                        // 101
                    return;                                                                                           // 102
                } // Get store                                                                                        // 103
                                                                                                                      //
                                                                                                                      //
                var store = UploadFS.getStore(match[1]);                                                              // 106
                                                                                                                      //
                if (!store) {                                                                                         // 107
                    res.writeHead(404);                                                                               // 108
                    res.end();                                                                                        // 109
                    return;                                                                                           // 110
                } // If a store is found, go ahead and allow the origin                                               // 111
                                                                                                                      //
                                                                                                                      //
                allowCORS();                                                                                          // 114
                next();                                                                                               // 116
            } else if (req.method === 'POST') {                                                                       // 117
                var _ret2 = function () {                                                                             // 118
                    // Get store                                                                                      // 119
                    var regExp = new RegExp('^\/([^\/\?]+)\/([^\/\?]+)$');                                            // 120
                    var match = regExp.exec(path); // Request is not valid                                            // 121
                                                                                                                      //
                    if (match === null) {                                                                             // 124
                        res.writeHead(400);                                                                           // 125
                        res.end();                                                                                    // 126
                        return {                                                                                      // 127
                            v: void 0                                                                                 // 127
                        };                                                                                            // 127
                    } // Get store                                                                                    // 128
                                                                                                                      //
                                                                                                                      //
                    var store = UploadFS.getStore(match[1]);                                                          // 131
                                                                                                                      //
                    if (!store) {                                                                                     // 132
                        res.writeHead(404);                                                                           // 133
                        res.end();                                                                                    // 134
                        return {                                                                                      // 135
                            v: void 0                                                                                 // 135
                        };                                                                                            // 135
                    } // If a store is found, go ahead and allow the origin                                           // 136
                                                                                                                      //
                                                                                                                      //
                    allowCORS(); // Get file                                                                          // 139
                                                                                                                      //
                    var fileId = match[2];                                                                            // 142
                                                                                                                      //
                    if (store.getCollection().find({                                                                  // 143
                        _id: fileId                                                                                   // 143
                    }).count() === 0) {                                                                               // 143
                        res.writeHead(404);                                                                           // 144
                        res.end();                                                                                    // 145
                        return {                                                                                      // 146
                            v: void 0                                                                                 // 146
                        };                                                                                            // 146
                    } // Check upload token                                                                           // 147
                                                                                                                      //
                                                                                                                      //
                    if (!store.checkToken(req.query.token, fileId)) {                                                 // 150
                        res.writeHead(403);                                                                           // 151
                        res.end();                                                                                    // 152
                        return {                                                                                      // 153
                            v: void 0                                                                                 // 153
                        };                                                                                            // 153
                    }                                                                                                 // 154
                                                                                                                      //
                    var tmpFile = UploadFS.getTempFilePath(fileId);                                                   // 156
                    var ws = fs.createWriteStream(tmpFile, {                                                          // 157
                        flags: 'a'                                                                                    // 157
                    });                                                                                               // 157
                    var fields = {                                                                                    // 158
                        uploading: true                                                                               // 158
                    };                                                                                                // 158
                    var progress = parseFloat(req.query.progress);                                                    // 159
                                                                                                                      //
                    if (!isNaN(progress) && progress > 0) {                                                           // 160
                        fields.progress = Math.min(progress, 1);                                                      // 161
                    }                                                                                                 // 162
                                                                                                                      //
                    req.on('data', function (chunk) {                                                                 // 164
                        ws.write(chunk);                                                                              // 165
                    });                                                                                               // 166
                    req.on('error', function (err) {                                                                  // 167
                        res.writeHead(500);                                                                           // 168
                        res.end();                                                                                    // 169
                    });                                                                                               // 170
                    req.on('end', Meteor.bindEnvironment(function () {                                                // 171
                        // Update completed state without triggering hooks                                            // 172
                        store.getCollection().direct.update({                                                         // 173
                            _id: fileId                                                                               // 173
                        }, {                                                                                          // 173
                            $set: fields                                                                              // 173
                        });                                                                                           // 173
                        ws.end();                                                                                     // 174
                    }));                                                                                              // 175
                    ws.on('error', function (err) {                                                                   // 176
                        console.error("ufs: cannot write chunk of file \"" + fileId + "\" (" + err.message + ")");    // 177
                        fs.unlink(tmpFile, function (err) {                                                           // 178
                            err && console.error("ufs: cannot delete temp file \"" + tmpFile + "\" (" + err.message + ")");
                        });                                                                                           // 180
                        res.writeHead(500);                                                                           // 181
                        res.end();                                                                                    // 182
                    });                                                                                               // 183
                    ws.on('finish', function () {                                                                     // 184
                        res.writeHead(204, {                                                                          // 185
                            "Content-Type": 'text/plain'                                                              // 185
                        });                                                                                           // 185
                        res.end();                                                                                    // 186
                    });                                                                                               // 187
                }();                                                                                                  // 118
                                                                                                                      //
                if ((typeof _ret2 === "undefined" ? "undefined" : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;
            } else if (req.method == 'GET') {                                                                         // 188
                var _ret3 = function () {                                                                             // 189
                    // Get store, file Id and file name                                                               // 190
                    var regExp = new RegExp('^\/([^\/\?]+)\/([^\/\?]+)(?:\/([^\/\?]+))?$');                           // 191
                    var match = regExp.exec(path); // Avoid 504 Gateway timeout error                                 // 192
                    // if file is not handled by UploadFS.                                                            // 195
                                                                                                                      //
                    if (match === null) {                                                                             // 196
                        next();                                                                                       // 197
                        return {                                                                                      // 198
                            v: void 0                                                                                 // 198
                        };                                                                                            // 198
                    } // Get store                                                                                    // 199
                                                                                                                      //
                                                                                                                      //
                    var storeName = match[1];                                                                         // 202
                    var store = UploadFS.getStore(storeName);                                                         // 203
                                                                                                                      //
                    if (!store) {                                                                                     // 205
                        res.writeHead(404);                                                                           // 206
                        res.end();                                                                                    // 207
                        return {                                                                                      // 208
                            v: void 0                                                                                 // 208
                        };                                                                                            // 208
                    }                                                                                                 // 209
                                                                                                                      //
                    if (store.onRead !== null && store.onRead !== undefined && typeof store.onRead !== 'function') {  // 211
                        console.error("ufs: store \"" + storeName + "\" onRead is not a function");                   // 212
                        res.writeHead(500);                                                                           // 213
                        res.end();                                                                                    // 214
                        return {                                                                                      // 215
                            v: void 0                                                                                 // 215
                        };                                                                                            // 215
                    } // Remove file extension from file Id                                                           // 216
                                                                                                                      //
                                                                                                                      //
                    var index = match[2].indexOf('.');                                                                // 219
                    var fileId = index !== -1 ? match[2].substr(0, index) : match[2]; // Get file from database       // 220
                                                                                                                      //
                    var file = store.getCollection().findOne({                                                        // 223
                        _id: fileId                                                                                   // 223
                    });                                                                                               // 223
                                                                                                                      //
                    if (!file) {                                                                                      // 224
                        res.writeHead(404);                                                                           // 225
                        res.end();                                                                                    // 226
                        return {                                                                                      // 227
                            v: void 0                                                                                 // 227
                        };                                                                                            // 227
                    } // Simulate read speed                                                                          // 228
                                                                                                                      //
                                                                                                                      //
                    if (UploadFS.config.simulateReadDelay) {                                                          // 231
                        Meteor._sleepForMs(UploadFS.config.simulateReadDelay);                                        // 232
                    }                                                                                                 // 233
                                                                                                                      //
                    d.run(function () {                                                                               // 235
                        // Check if the file can be accessed                                                          // 236
                        if (store.onRead.call(store, fileId, file, req, res) !== false) {                             // 237
                            var _ret4 = function () {                                                                 // 237
                                var options = {};                                                                     // 238
                                var status = 200; // Prepare response headers                                         // 239
                                                                                                                      //
                                var headers = {                                                                       // 242
                                    'Content-Type': file.type,                                                        // 243
                                    'Content-Length': file.size                                                       // 244
                                }; // Add ETag header                                                                 // 242
                                                                                                                      //
                                if (typeof file.etag === 'string') {                                                  // 248
                                    headers['ETag'] = file.etag;                                                      // 249
                                } // Add Last-Modified header                                                         // 250
                                                                                                                      //
                                                                                                                      //
                                if (file.modifiedAt instanceof Date) {                                                // 253
                                    headers['Last-Modified'] = file.modifiedAt.toUTCString();                         // 254
                                } else if (file.uploadedAt instanceof Date) {                                         // 255
                                    headers['Last-Modified'] = file.uploadedAt.toUTCString();                         // 257
                                } // Parse request headers                                                            // 258
                                                                                                                      //
                                                                                                                      //
                                if ((0, _typeof3.default)(req.headers) === 'object') {                                // 261
                                    // Compare ETag                                                                   // 263
                                    if (req.headers['if-none-match']) {                                               // 264
                                        if (file.etag === req.headers['if-none-match']) {                             // 265
                                            res.writeHead(304); // Not Modified                                       // 266
                                                                                                                      //
                                            res.end();                                                                // 267
                                            return {                                                                  // 268
                                                v: void 0                                                             // 268
                                            };                                                                        // 268
                                        }                                                                             // 269
                                    } // Compare file modification date                                               // 270
                                                                                                                      //
                                                                                                                      //
                                    if (req.headers['if-modified-since']) {                                           // 273
                                        var modifiedSince = new Date(req.headers['if-modified-since']);               // 274
                                                                                                                      //
                                        if (file.modifiedAt instanceof Date && file.modifiedAt > modifiedSince || file.uploadedAt instanceof Date && file.uploadedAt > modifiedSince) {
                                            res.writeHead(304); // Not Modified                                       // 278
                                                                                                                      //
                                            res.end();                                                                // 279
                                            return {                                                                  // 280
                                                v: void 0                                                             // 280
                                            };                                                                        // 280
                                        }                                                                             // 281
                                    } // Send data in range                                                           // 282
                                                                                                                      //
                                                                                                                      //
                                    if (typeof req.headers.range === 'string') {                                      // 285
                                        var range = req.headers.range; // Range is not valid                          // 286
                                                                                                                      //
                                        if (!range) {                                                                 // 289
                                            res.writeHead(416);                                                       // 290
                                            res.end();                                                                // 291
                                            return {                                                                  // 292
                                                v: void 0                                                             // 292
                                            };                                                                        // 292
                                        }                                                                             // 293
                                                                                                                      //
                                        var positions = range.replace(/bytes=/, '').split('-');                       // 295
                                        var start = parseInt(positions[0], 10);                                       // 296
                                        var total = file.size;                                                        // 297
                                        var end = positions[1] ? parseInt(positions[1], 10) : total - 1; // Update headers
                                                                                                                      //
                                        headers['Content-Range'] = "bytes " + start + "-" + end + "/" + total;        // 301
                                        headers['Accept-Ranges'] = "bytes";                                           // 302
                                        headers['Content-Length'] = end - start + 1;                                  // 303
                                        status = 206; // partial content                                              // 305
                                                                                                                      //
                                        options.start = start;                                                        // 306
                                        options.end = end;                                                            // 307
                                    }                                                                                 // 308
                                } // Open the file stream                                                             // 309
                                                                                                                      //
                                                                                                                      //
                                var rs = store.getReadStream(fileId, file, options);                                  // 312
                                var ws = new stream.PassThrough();                                                    // 313
                                rs.on('error', Meteor.bindEnvironment(function (err) {                                // 315
                                    store.onReadError.call(store, err, fileId, file);                                 // 316
                                    res.end();                                                                        // 317
                                }));                                                                                  // 318
                                ws.on('error', Meteor.bindEnvironment(function (err) {                                // 319
                                    store.onReadError.call(store, err, fileId, file);                                 // 320
                                    res.end();                                                                        // 321
                                }));                                                                                  // 322
                                ws.on('close', function () {                                                          // 323
                                    // Close output stream at the end                                                 // 324
                                    ws.emit('end');                                                                   // 325
                                }); // Transform stream                                                               // 326
                                                                                                                      //
                                store.transformRead(rs, ws, fileId, file, req, headers); // Parse request headers     // 329
                                                                                                                      //
                                if ((0, _typeof3.default)(req.headers) === 'object') {                                // 332
                                    // Compress data using if needed (ignore audio/video as they are already compressed)
                                    if (typeof req.headers['accept-encoding'] === 'string' && !/^(audio|video)/.test(file.type)) {
                                        var accept = req.headers['accept-encoding']; // Compress with gzip            // 335
                                                                                                                      //
                                        if (accept.match(/\bgzip\b/)) {                                               // 338
                                            headers['Content-Encoding'] = 'gzip';                                     // 339
                                            delete headers['Content-Length'];                                         // 340
                                            res.writeHead(status, headers);                                           // 341
                                            ws.pipe(zlib.createGzip()).pipe(res);                                     // 342
                                            return {                                                                  // 343
                                                v: void 0                                                             // 343
                                            };                                                                        // 343
                                        } // Compress with deflate                                                    // 344
                                        else if (accept.match(/\bdeflate\b/)) {                                       // 338
                                                headers['Content-Encoding'] = 'deflate';                              // 347
                                                delete headers['Content-Length'];                                     // 348
                                                res.writeHead(status, headers);                                       // 349
                                                ws.pipe(zlib.createDeflate()).pipe(res);                              // 350
                                                return {                                                              // 351
                                                    v: void 0                                                         // 351
                                                };                                                                    // 351
                                            }                                                                         // 352
                                    }                                                                                 // 353
                                } // Send raw data                                                                    // 354
                                                                                                                      //
                                                                                                                      //
                                if (!headers['Content-Encoding']) {                                                   // 357
                                    res.writeHead(status, headers);                                                   // 358
                                    ws.pipe(res);                                                                     // 359
                                }                                                                                     // 360
                            }();                                                                                      // 237
                                                                                                                      //
                            if ((typeof _ret4 === "undefined" ? "undefined" : (0, _typeof3.default)(_ret4)) === "object") return _ret4.v;
                        } else {                                                                                      // 362
                            res.end();                                                                                // 363
                        }                                                                                             // 364
                    });                                                                                               // 365
                }();                                                                                                  // 189
                                                                                                                      //
                if ((typeof _ret3 === "undefined" ? "undefined" : (0, _typeof3.default)(_ret3)) === "object") return _ret3.v;
            } else {                                                                                                  // 366
                next();                                                                                               // 367
            }                                                                                                         // 368
        });                                                                                                           // 369
    })();                                                                                                             // 32
}                                                                                                                     // 370
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ufs-store-permissions.js":["babel-runtime/helpers/classCallCheck","meteor/underscore",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jalik_ufs/ufs-store-permissions.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                               //
                                                                                                                      //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
module.export({                                                                                                       // 1
    StorePermissions: function () {                                                                                   // 1
        return StorePermissions;                                                                                      // 1
    }                                                                                                                 // 1
});                                                                                                                   // 1
                                                                                                                      //
var _ = void 0;                                                                                                       // 1
                                                                                                                      //
module.import('meteor/underscore', {                                                                                  // 1
    "_": function (v) {                                                                                               // 1
        _ = v;                                                                                                        // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
                                                                                                                      //
var StorePermissions = function () {                                                                                  //
    function StorePermissions(options) {                                                                              // 34
        (0, _classCallCheck3.default)(this, StorePermissions);                                                        // 34
        // Default options                                                                                            // 35
        options = _.extend({                                                                                          // 36
            insert: null,                                                                                             // 37
            remove: null,                                                                                             // 38
            update: null                                                                                              // 39
        }, options); // Check options                                                                                 // 36
                                                                                                                      //
        if (options.insert && typeof options.insert !== 'function') {                                                 // 43
            throw new TypeError("StorePermissions: insert is not a function");                                        // 44
        }                                                                                                             // 45
                                                                                                                      //
        if (options.remove && typeof options.remove !== 'function') {                                                 // 46
            throw new TypeError("StorePermissions: remove is not a function");                                        // 47
        }                                                                                                             // 48
                                                                                                                      //
        if (options.update && typeof options.update !== 'function') {                                                 // 49
            throw new TypeError("StorePermissions: update is not a function");                                        // 50
        }                                                                                                             // 51
                                                                                                                      //
        this.actions = {                                                                                              // 53
            insert: options.insert,                                                                                   // 54
            remove: options.remove,                                                                                   // 55
            update: options.update                                                                                    // 56
        };                                                                                                            // 53
    } /**                                                                                                             // 58
       * Checks the permission for the action                                                                         //
       * @param action                                                                                                //
       * @param userId                                                                                                //
       * @param file                                                                                                  //
       * @param fields                                                                                                //
       * @param modifiers                                                                                             //
       * @return {*}                                                                                                  //
       */                                                                                                             //
                                                                                                                      //
    StorePermissions.prototype.check = function () {                                                                  //
        function check(action, userId, file, fields, modifiers) {                                                     //
            if (typeof this.actions[action] === 'function') {                                                         // 70
                return this.actions[action](userId, file, fields, modifiers);                                         // 71
            }                                                                                                         // 72
                                                                                                                      //
            return true; // by default allow all                                                                      // 73
        }                                                                                                             // 74
                                                                                                                      //
        return check;                                                                                                 //
    }(); /**                                                                                                          //
          * Checks the insert permission                                                                              //
          * @param userId                                                                                             //
          * @param file                                                                                               //
          * @returns {*}                                                                                              //
          */                                                                                                          //
                                                                                                                      //
    StorePermissions.prototype.checkInsert = function () {                                                            //
        function checkInsert(userId, file) {                                                                          //
            return this.check('insert', userId, file);                                                                // 83
        }                                                                                                             // 84
                                                                                                                      //
        return checkInsert;                                                                                           //
    }(); /**                                                                                                          //
          * Checks the remove permission                                                                              //
          * @param userId                                                                                             //
          * @param file                                                                                               //
          * @returns {*}                                                                                              //
          */                                                                                                          //
                                                                                                                      //
    StorePermissions.prototype.checkRemove = function () {                                                            //
        function checkRemove(userId, file) {                                                                          //
            return this.check('remove', userId, file);                                                                // 93
        }                                                                                                             // 94
                                                                                                                      //
        return checkRemove;                                                                                           //
    }(); /**                                                                                                          //
          * Checks the update permission                                                                              //
          * @param userId                                                                                             //
          * @param file                                                                                               //
          * @param fields                                                                                             //
          * @param modifiers                                                                                          //
          * @returns {*}                                                                                              //
          */                                                                                                          //
                                                                                                                      //
    StorePermissions.prototype.checkUpdate = function () {                                                            //
        function checkUpdate(userId, file, fields, modifiers) {                                                       //
            return this.check('update', userId, file, fields, modifiers);                                             // 105
        }                                                                                                             // 106
                                                                                                                      //
        return checkUpdate;                                                                                           //
    }();                                                                                                              //
                                                                                                                      //
    return StorePermissions;                                                                                          //
}();                                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ufs-store.js":["babel-runtime/helpers/classCallCheck","meteor/underscore","meteor/check","meteor/meteor","meteor/mongo","./ufs","./ufs-filter","./ufs-store-permissions","./ufs-tokens",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jalik_ufs/ufs-store.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                               //
                                                                                                                      //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
module.export({                                                                                                       // 1
    Store: function () {                                                                                              // 1
        return Store;                                                                                                 // 1
    }                                                                                                                 // 1
});                                                                                                                   // 1
                                                                                                                      //
var _ = void 0;                                                                                                       // 1
                                                                                                                      //
module.import('meteor/underscore', {                                                                                  // 1
    "_": function (v) {                                                                                               // 1
        _ = v;                                                                                                        // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
var check = void 0;                                                                                                   // 1
module.import('meteor/check', {                                                                                       // 1
    "check": function (v) {                                                                                           // 1
        check = v;                                                                                                    // 1
    }                                                                                                                 // 1
}, 1);                                                                                                                // 1
var Meteor = void 0;                                                                                                  // 1
module.import('meteor/meteor', {                                                                                      // 1
    "Meteor": function (v) {                                                                                          // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 2);                                                                                                                // 1
var Mongo = void 0;                                                                                                   // 1
module.import('meteor/mongo', {                                                                                       // 1
    "Mongo": function (v) {                                                                                           // 1
        Mongo = v;                                                                                                    // 1
    }                                                                                                                 // 1
}, 3);                                                                                                                // 1
var UploadFS = void 0;                                                                                                // 1
module.import('./ufs', {                                                                                              // 1
    "UploadFS": function (v) {                                                                                        // 1
        UploadFS = v;                                                                                                 // 1
    }                                                                                                                 // 1
}, 4);                                                                                                                // 1
var Filter = void 0;                                                                                                  // 1
module.import('./ufs-filter', {                                                                                       // 1
    "Filter": function (v) {                                                                                          // 1
        Filter = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 5);                                                                                                                // 1
var StorePermissions = void 0;                                                                                        // 1
module.import('./ufs-store-permissions', {                                                                            // 1
    "StorePermissions": function (v) {                                                                                // 1
        StorePermissions = v;                                                                                         // 1
    }                                                                                                                 // 1
}, 6);                                                                                                                // 1
var Tokens = void 0;                                                                                                  // 1
module.import('./ufs-tokens', {                                                                                       // 1
    "Tokens": function (v) {                                                                                          // 1
        Tokens = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 7);                                                                                                                // 1
                                                                                                                      //
var Store = function () {                                                                                             //
    function Store(options) {                                                                                         // 41
        (0, _classCallCheck3.default)(this, Store);                                                                   // 41
        var self = this; // Default options                                                                           // 42
                                                                                                                      //
        options = _.extend({                                                                                          // 45
            collection: null,                                                                                         // 46
            filter: null,                                                                                             // 47
            name: null,                                                                                               // 48
            onCopyError: null,                                                                                        // 49
            onFinishUpload: null,                                                                                     // 50
            onRead: null,                                                                                             // 51
            onReadError: null,                                                                                        // 52
            onValidate: this.onValidate,                                                                              // 53
            onWriteError: null,                                                                                       // 54
            permissions: null,                                                                                        // 55
            transformRead: null,                                                                                      // 56
            transformWrite: null                                                                                      // 57
        }, options); // Check instance                                                                                // 45
                                                                                                                      //
        if (!(self instanceof Store)) {                                                                               // 61
            throw new Error('UploadFS.Store is not an instance');                                                     // 62
        } // Check options                                                                                            // 63
                                                                                                                      //
                                                                                                                      //
        if (!(options.collection instanceof Mongo.Collection)) {                                                      // 66
            throw new TypeError('Store: collection is not a Mongo.Collection');                                       // 67
        }                                                                                                             // 68
                                                                                                                      //
        if (options.filter && !(options.filter instanceof Filter)) {                                                  // 69
            throw new TypeError('Store: filter is not a UploadFS.Filter');                                            // 70
        }                                                                                                             // 71
                                                                                                                      //
        if (typeof options.name !== 'string') {                                                                       // 72
            throw new TypeError('Store: name is not a string');                                                       // 73
        }                                                                                                             // 74
                                                                                                                      //
        if (UploadFS.getStore(options.name)) {                                                                        // 75
            throw new TypeError('Store: name already exists');                                                        // 76
        }                                                                                                             // 77
                                                                                                                      //
        if (options.onCopyError && typeof options.onCopyError !== 'function') {                                       // 78
            throw new TypeError('Store: onCopyError is not a function');                                              // 79
        }                                                                                                             // 80
                                                                                                                      //
        if (options.onFinishUpload && typeof options.onFinishUpload !== 'function') {                                 // 81
            throw new TypeError('Store: onFinishUpload is not a function');                                           // 82
        }                                                                                                             // 83
                                                                                                                      //
        if (options.onRead && typeof options.onRead !== 'function') {                                                 // 84
            throw new TypeError('Store: onRead is not a function');                                                   // 85
        }                                                                                                             // 86
                                                                                                                      //
        if (options.onReadError && typeof options.onReadError !== 'function') {                                       // 87
            throw new TypeError('Store: onReadError is not a function');                                              // 88
        }                                                                                                             // 89
                                                                                                                      //
        if (options.onWriteError && typeof options.onWriteError !== 'function') {                                     // 90
            throw new TypeError('Store: onWriteError is not a function');                                             // 91
        }                                                                                                             // 92
                                                                                                                      //
        if (options.permissions && !(options.permissions instanceof StorePermissions)) {                              // 93
            throw new TypeError('Store: permissions is not a UploadFS.StorePermissions');                             // 94
        }                                                                                                             // 95
                                                                                                                      //
        if (options.transformRead && typeof options.transformRead !== 'function') {                                   // 96
            throw new TypeError('Store: transformRead is not a function');                                            // 97
        }                                                                                                             // 98
                                                                                                                      //
        if (options.transformWrite && typeof options.transformWrite !== 'function') {                                 // 99
            throw new TypeError('Store: transformWrite is not a function');                                           // 100
        }                                                                                                             // 101
                                                                                                                      //
        if (options.onValidate && typeof options.onValidate !== 'function') {                                         // 102
            throw new TypeError('Store: onValidate is not a function');                                               // 103
        } // Public attributes                                                                                        // 104
                                                                                                                      //
                                                                                                                      //
        self.onCopyError = options.onCopyError || self.onCopyError;                                                   // 107
        self.onFinishUpload = options.onFinishUpload || self.onFinishUpload;                                          // 108
        self.onRead = options.onRead || self.onRead;                                                                  // 109
        self.onReadError = options.onReadError || self.onReadError;                                                   // 110
        self.onWriteError = options.onWriteError || self.onWriteError;                                                // 111
        self.permissions = options.permissions;                                                                       // 112
        self.onValidate = options.onValidate; // Private attributes                                                   // 113
                                                                                                                      //
        var collection = options.collection;                                                                          // 116
        var copyTo = options.copyTo;                                                                                  // 117
        var filter = options.filter;                                                                                  // 118
        var name = options.name;                                                                                      // 119
        var transformRead = options.transformRead;                                                                    // 120
        var transformWrite = options.transformWrite; // Set default permissions                                       // 121
                                                                                                                      //
        if (!(self.permissions instanceof StorePermissions)) {                                                        // 124
            // Uses custom default permissions or UFS default permissions                                             // 125
            if (UploadFS.config.defaultStorePermissions instanceof StorePermissions) {                                // 126
                self.permissions = UploadFS.config.defaultStorePermissions;                                           // 127
            } else {                                                                                                  // 128
                self.permissions = new StorePermissions();                                                            // 129
                console.warn("ufs: permissions are not defined for store \"" + name + "\"");                          // 130
            }                                                                                                         // 131
        } // Add the store to the list                                                                                // 132
                                                                                                                      //
                                                                                                                      //
        UploadFS.getStores()[name] = self; /**                                                                        // 135
                                            * Returns the collection                                                  //
                                            * @return {Mongo.Collection}                                              //
                                            */                                                                        //
                                                                                                                      //
        self.getCollection = function () {                                                                            // 141
            return collection;                                                                                        // 142
        }; /**                                                                                                        // 143
            * Returns the file filter                                                                                 //
            * @return {UploadFS.Filter}                                                                               //
            */                                                                                                        //
                                                                                                                      //
        self.getFilter = function () {                                                                                // 149
            return filter;                                                                                            // 150
        }; /**                                                                                                        // 151
            * Returns the store name                                                                                  //
            * @return {string}                                                                                        //
            */                                                                                                        //
                                                                                                                      //
        self.getName = function () {                                                                                  // 157
            return name;                                                                                              // 158
        }; /**                                                                                                        // 159
            * Defines the store permissions                                                                           //
            * @param permissions                                                                                      //
            */                                                                                                        //
                                                                                                                      //
        self.setPermissions = function (permissions) {                                                                // 165
            if (!(permissions instanceof StorePermissions)) {                                                         // 166
                throw new TypeError("permissions is not an instance of UploadFS.StorePermissions");                   // 167
            }                                                                                                         // 168
                                                                                                                      //
            self.permissions = permissions;                                                                           // 169
        };                                                                                                            // 170
                                                                                                                      //
        if (Meteor.isServer) {                                                                                        // 172
            /**                                                                                                       // 174
             * Checks token validity                                                                                  //
             * @param token                                                                                           //
             * @param fileId                                                                                          //
             * @returns {boolean}                                                                                     //
             */self.checkToken = function (token, fileId) {                                                           //
                check(token, String);                                                                                 // 181
                check(fileId, String);                                                                                // 182
                return Tokens.find({                                                                                  // 183
                    value: token,                                                                                     // 183
                    fileId: fileId                                                                                    // 183
                }).count() === 1;                                                                                     // 183
            }; /**                                                                                                    // 184
                * Copies the file to a store                                                                          //
                * @param fileId                                                                                       //
                * @param store                                                                                        //
                * @param callback                                                                                     //
                */                                                                                                    //
                                                                                                                      //
            self.copy = function (fileId, store, callback) {                                                          // 192
                check(fileId, String);                                                                                // 193
                                                                                                                      //
                if (!(store instanceof Store)) {                                                                      // 195
                    throw new TypeError('store is not an instance of UploadFS.Store');                                // 196
                } // Get original file                                                                                // 197
                                                                                                                      //
                                                                                                                      //
                var file = collection.findOne({                                                                       // 199
                    _id: fileId                                                                                       // 199
                });                                                                                                   // 199
                                                                                                                      //
                if (!file) {                                                                                          // 200
                    throw new Meteor.Error('file-not-found', 'File not found');                                       // 201
                } // Silently ignore the file if it does not match filter                                             // 202
                                                                                                                      //
                                                                                                                      //
                var filter = store.getFilter();                                                                       // 204
                                                                                                                      //
                if (filter instanceof Filter && !filter.isValid(file)) {                                              // 205
                    return;                                                                                           // 206
                } // Prepare copy                                                                                     // 207
                                                                                                                      //
                                                                                                                      //
                var copy = _.omit(file, '_id', 'url');                                                                // 210
                                                                                                                      //
                copy.originalStore = self.getName();                                                                  // 211
                copy.originalId = fileId; // Create the copy                                                          // 212
                                                                                                                      //
                var copyId = store.create(copy); // Get original stream                                               // 215
                                                                                                                      //
                var rs = self.getReadStream(fileId, file); // Catch errors to avoid app crashing                      // 218
                                                                                                                      //
                rs.on('error', Meteor.bindEnvironment(function (err) {                                                // 221
                    callback.call(self, err, null);                                                                   // 222
                })); // Copy file data                                                                                // 223
                                                                                                                      //
                store.write(rs, copyId, Meteor.bindEnvironment(function (err) {                                       // 226
                    if (err) {                                                                                        // 227
                        collection.remove({                                                                           // 228
                            _id: copyId                                                                               // 228
                        });                                                                                           // 228
                        self.onCopyError.call(self, err, fileId, file);                                               // 229
                    }                                                                                                 // 230
                                                                                                                      //
                    if (typeof callback === 'function') {                                                             // 231
                        callback.call(self, err, copyId, copy, store);                                                // 232
                    }                                                                                                 // 233
                }));                                                                                                  // 234
            }; /**                                                                                                    // 235
                * Creates the file in the collection                                                                  //
                * @param file                                                                                         //
                * @param callback                                                                                     //
                * @return {string}                                                                                    //
                */                                                                                                    //
                                                                                                                      //
            self.create = function (file, callback) {                                                                 // 243
                check(file, Object);                                                                                  // 244
                file.store = name;                                                                                    // 245
                return collection.insert(file, callback);                                                             // 246
            }; /**                                                                                                    // 247
                * Creates a token for the file (only needed for client side upload)                                   //
                * @param fileId                                                                                       //
                * @returns {*}                                                                                        //
                */                                                                                                    //
                                                                                                                      //
            self.createToken = function (fileId) {                                                                    // 254
                var token = self.generateToken(); // Check if token exists                                            // 255
                                                                                                                      //
                if (Tokens.find({                                                                                     // 258
                    fileId: fileId                                                                                    // 258
                }).count()) {                                                                                         // 258
                    Tokens.update({                                                                                   // 259
                        fileId: fileId                                                                                // 259
                    }, {                                                                                              // 259
                        $set: {                                                                                       // 260
                            createdAt: new Date(),                                                                    // 261
                            value: token                                                                              // 262
                        }                                                                                             // 260
                    });                                                                                               // 259
                } else {                                                                                              // 265
                    Tokens.insert({                                                                                   // 266
                        createdAt: new Date(),                                                                        // 267
                        fileId: fileId,                                                                               // 268
                        value: token                                                                                  // 269
                    });                                                                                               // 266
                }                                                                                                     // 271
                                                                                                                      //
                return token;                                                                                         // 272
            }; /**                                                                                                    // 273
                * Generates a random token                                                                            //
                * @param pattern                                                                                      //
                * @return {string}                                                                                    //
                */                                                                                                    //
                                                                                                                      //
            self.generateToken = function (pattern) {                                                                 // 280
                return (pattern || 'xyxyxyxyxy').replace(/[xy]/g, function (c) {                                      // 281
                    var r = Math.random() * 16 | 0,                                                                   // 282
                        v = c == 'x' ? r : r & 0x3 | 0x8;                                                             // 282
                    var s = v.toString(16);                                                                           // 283
                    return Math.round(Math.random()) ? s.toUpperCase() : s;                                           // 284
                });                                                                                                   // 285
            }; /**                                                                                                    // 286
                * Transforms the file on reading                                                                      //
                * @param readStream                                                                                   //
                * @param writeStream                                                                                  //
                * @param fileId                                                                                       //
                * @param file                                                                                         //
                * @param request                                                                                      //
                * @param headers                                                                                      //
                */                                                                                                    //
                                                                                                                      //
            self.transformRead = function (readStream, writeStream, fileId, file, request, headers) {                 // 297
                if (typeof transformRead === 'function') {                                                            // 298
                    transformRead.call(self, readStream, writeStream, fileId, file, request, headers);                // 299
                } else {                                                                                              // 300
                    readStream.pipe(writeStream);                                                                     // 301
                }                                                                                                     // 302
            }; /**                                                                                                    // 303
                * Transforms the file on writing                                                                      //
                * @param readStream                                                                                   //
                * @param writeStream                                                                                  //
                * @param fileId                                                                                       //
                * @param file                                                                                         //
                */                                                                                                    //
                                                                                                                      //
            self.transformWrite = function (readStream, writeStream, fileId, file) {                                  // 312
                if (typeof transformWrite === 'function') {                                                           // 313
                    transformWrite.call(self, readStream, writeStream, fileId, file);                                 // 314
                } else {                                                                                              // 315
                    readStream.pipe(writeStream);                                                                     // 316
                }                                                                                                     // 317
            }; /**                                                                                                    // 318
                * Writes the file to the store                                                                        //
                * @param rs                                                                                           //
                * @param fileId                                                                                       //
                * @param callback                                                                                     //
                */                                                                                                    //
                                                                                                                      //
            self.write = function (rs, fileId, callback) {                                                            // 326
                var file = collection.findOne({                                                                       // 327
                    _id: fileId                                                                                       // 327
                });                                                                                                   // 327
                var ws = self.getWriteStream(fileId, file);                                                           // 328
                var errorHandler = Meteor.bindEnvironment(function (err) {                                            // 330
                    collection.remove({                                                                               // 331
                        _id: fileId                                                                                   // 331
                    });                                                                                               // 331
                    self.onWriteError.call(self, err, fileId, file);                                                  // 332
                    callback.call(self, err);                                                                         // 333
                });                                                                                                   // 334
                ws.on('error', errorHandler);                                                                         // 336
                ws.on('finish', Meteor.bindEnvironment(function () {                                                  // 337
                    var size = 0;                                                                                     // 338
                    var readStream = self.getReadStream(fileId, file);                                                // 339
                    readStream.on('error', Meteor.bindEnvironment(function (error) {                                  // 341
                        callback.call(self, error, null);                                                             // 342
                    }));                                                                                              // 343
                    readStream.on('data', Meteor.bindEnvironment(function (data) {                                    // 344
                        size += data.length;                                                                          // 345
                    }));                                                                                              // 346
                    readStream.on('end', Meteor.bindEnvironment(function () {                                         // 347
                        // Set file attribute                                                                         // 348
                        file.complete = true;                                                                         // 349
                        file.etag = UploadFS.generateEtag();                                                          // 350
                        file.path = self.getFileRelativeURL(fileId);                                                  // 351
                        file.progress = 1;                                                                            // 352
                        file.size = size;                                                                             // 353
                        file.token = self.generateToken();                                                            // 354
                        file.uploading = false;                                                                       // 355
                        file.uploadedAt = new Date();                                                                 // 356
                        file.url = self.getFileURL(fileId); // Sets the file URL when file transfer is complete,      // 357
                        // this way, the image will loads entirely.                                                   // 360
                                                                                                                      //
                        collection.direct.update({                                                                    // 361
                            _id: fileId                                                                               // 361
                        }, {                                                                                          // 361
                            $set: {                                                                                   // 362
                                complete: file.complete,                                                              // 363
                                etag: file.etag,                                                                      // 364
                                path: file.path,                                                                      // 365
                                progress: file.progress,                                                              // 366
                                size: file.size,                                                                      // 367
                                token: file.token,                                                                    // 368
                                uploading: file.uploading,                                                            // 369
                                uploadedAt: file.uploadedAt,                                                          // 370
                                url: file.url                                                                         // 371
                            }                                                                                         // 362
                        }); // Return file info                                                                       // 361
                                                                                                                      //
                        callback.call(self, null, file); // Execute callback                                          // 376
                                                                                                                      //
                        if (typeof self.onFinishUpload == 'function') {                                               // 379
                            self.onFinishUpload.call(self, file);                                                     // 380
                        } // Simulate write speed                                                                     // 381
                                                                                                                      //
                                                                                                                      //
                        if (UploadFS.config.simulateWriteDelay) {                                                     // 384
                            Meteor._sleepForMs(UploadFS.config.simulateWriteDelay);                                   // 385
                        } // Copy file to other stores                                                                // 386
                                                                                                                      //
                                                                                                                      //
                        if (copyTo instanceof Array) {                                                                // 389
                            for (var i = 0; i < copyTo.length; i += 1) {                                              // 390
                                var store = copyTo[i];                                                                // 391
                                                                                                                      //
                                if (!store.getFilter() || store.getFilter().isValid(file)) {                          // 393
                                    self.copy(fileId, store);                                                         // 394
                                }                                                                                     // 395
                            }                                                                                         // 396
                        }                                                                                             // 397
                    }));                                                                                              // 398
                })); // Execute transformation                                                                        // 399
                                                                                                                      //
                self.transformWrite(rs, ws, fileId, file);                                                            // 402
            };                                                                                                        // 403
        }                                                                                                             // 404
                                                                                                                      //
        if (Meteor.isServer) {                                                                                        // 406
            (function () {                                                                                            // 406
                var fs = Npm.require('fs'); // Code executed after removing file                                      // 407
                                                                                                                      //
                                                                                                                      //
                collection.after.remove(function (userId, file) {                                                     // 410
                    // Remove associated tokens                                                                       // 411
                    Tokens.remove({                                                                                   // 412
                        fileId: file._id                                                                              // 412
                    });                                                                                               // 412
                                                                                                                      //
                    if (copyTo instanceof Array) {                                                                    // 414
                        for (var i = 0; i < copyTo.length; i += 1) {                                                  // 415
                            // Remove copies in stores                                                                // 416
                            copyTo[i].getCollection().remove({                                                        // 417
                                originalId: file._id                                                                  // 417
                            });                                                                                       // 417
                        }                                                                                             // 418
                    }                                                                                                 // 419
                }); // Code executed before inserting file                                                            // 420
                                                                                                                      //
                collection.before.insert(function (userId, file) {                                                    // 423
                    if (!self.permissions.checkInsert(userId, file)) {                                                // 424
                        throw new Meteor.Error('forbidden', "Forbidden");                                             // 425
                    }                                                                                                 // 426
                }); // Code executed before updating file                                                             // 427
                                                                                                                      //
                collection.before.update(function (userId, file, fields, modifiers) {                                 // 430
                    if (!self.permissions.checkUpdate(userId, file, fields, modifiers)) {                             // 431
                        throw new Meteor.Error('forbidden', "Forbidden");                                             // 432
                    }                                                                                                 // 433
                }); // Code executed before removing file                                                             // 434
                                                                                                                      //
                collection.before.remove(function (userId, file) {                                                    // 437
                    if (!self.permissions.checkRemove(userId, file)) {                                                // 438
                        throw new Meteor.Error('forbidden', "Forbidden");                                             // 439
                    } // Delete the physical file in the store                                                        // 440
                                                                                                                      //
                                                                                                                      //
                    self.delete(file._id);                                                                            // 443
                    var tmpFile = UploadFS.getTempFilePath(file._id); // Delete the temp file                         // 445
                                                                                                                      //
                    fs.stat(tmpFile, function (err) {                                                                 // 448
                        !err && fs.unlink(tmpFile, function (err) {                                                   // 449
                            err && console.error("ufs: cannot delete temp file at " + tmpFile + " (" + err.message + ")");
                        });                                                                                           // 451
                    });                                                                                               // 452
                }); /**                                                                                               // 453
                     * Deletes a file async                                                                           //
                     * @param fileId                                                                                  //
                     * @param callback                                                                                //
                     */                                                                                               //
                                                                                                                      //
                self.delete = function (fileId, callback) {                                                           // 460
                    throw new Error('delete is not implemented');                                                     // 461
                }; /**                                                                                                // 462
                    * Returns the file read stream                                                                    //
                    * @param fileId                                                                                   //
                    * @param file                                                                                     //
                    */                                                                                                //
                                                                                                                      //
                self.getReadStream = function (fileId, file) {                                                        // 469
                    throw new Error('getReadStream is not implemented');                                              // 470
                }; /**                                                                                                // 471
                    * Returns the file write stream                                                                   //
                    * @param fileId                                                                                   //
                    * @param file                                                                                     //
                    */                                                                                                //
                                                                                                                      //
                self.getWriteStream = function (fileId, file) {                                                       // 478
                    throw new Error('getWriteStream is not implemented');                                             // 479
                }; /**                                                                                                // 480
                    * Callback for copy errors                                                                        //
                    * @param err                                                                                      //
                    * @param fileId                                                                                   //
                    * @param file                                                                                     //
                    * @return boolean                                                                                 //
                    */                                                                                                //
                                                                                                                      //
                self.onCopyError = function (err, fileId, file) {                                                     // 489
                    console.error("ufs: cannot copy file \"" + fileId + "\" (" + err.message + ")", err);             // 490
                }; /**                                                                                                // 491
                    * Called when a file has been uploaded                                                            //
                    * @param file                                                                                     //
                    */                                                                                                //
                                                                                                                      //
                self.onFinishUpload = function (file) {}; /**                                                         // 497
                                                           * Called when a file is read from the store                //
                                                           * @param fileId                                            //
                                                           * @param file                                              //
                                                           * @param request                                           //
                                                           * @param response                                          //
                                                           * @return boolean                                          //
                                                           */                                                         //
                                                                                                                      //
                self.onRead = function (fileId, file, request, response) {                                            // 508
                    return true;                                                                                      // 509
                }; /**                                                                                                // 510
                    * Callback for read errors                                                                        //
                    * @param err                                                                                      //
                    * @param fileId                                                                                   //
                    * @param file                                                                                     //
                    * @return boolean                                                                                 //
                    */                                                                                                //
                                                                                                                      //
                self.onReadError = function (err, fileId, file) {                                                     // 519
                    console.error("ufs: cannot read file \"" + fileId + "\" (" + err.message + ")", err);             // 520
                }; /**                                                                                                // 521
                    * Callback for write errors                                                                       //
                    * @param err                                                                                      //
                    * @param fileId                                                                                   //
                    * @param file                                                                                     //
                    * @return boolean                                                                                 //
                    */                                                                                                //
                                                                                                                      //
                self.onWriteError = function (err, fileId, file) {                                                    // 530
                    console.error("ufs: cannot write file \"" + fileId + "\" (" + err.message + ")", err);            // 531
                };                                                                                                    // 532
            })();                                                                                                     // 406
        }                                                                                                             // 533
    } /**                                                                                                             // 534
       * Returns the file URL                                                                                         //
       * @param fileId                                                                                                //
       */                                                                                                             //
                                                                                                                      //
    Store.prototype.getFileRelativeURL = function () {                                                                //
        function getFileRelativeURL(fileId) {                                                                         //
            var file = this.getCollection().findOne(fileId, {                                                         // 541
                fields: {                                                                                             // 541
                    name: 1                                                                                           // 541
                }                                                                                                     // 541
            });                                                                                                       // 541
            return file ? this.getRelativeURL(fileId + "/" + file.name) : null;                                       // 542
        }                                                                                                             // 543
                                                                                                                      //
        return getFileRelativeURL;                                                                                    //
    }(); /**                                                                                                          //
          * Returns the file URL                                                                                      //
          * @param fileId                                                                                             //
          */                                                                                                          //
                                                                                                                      //
    Store.prototype.getFileURL = function () {                                                                        //
        function getFileURL(fileId) {                                                                                 //
            var file = this.getCollection().findOne(fileId, {                                                         // 550
                fields: {                                                                                             // 550
                    name: 1                                                                                           // 550
                }                                                                                                     // 550
            });                                                                                                       // 550
            return file ? this.getURL(fileId + "/" + file.name) : null;                                               // 551
        }                                                                                                             // 552
                                                                                                                      //
        return getFileURL;                                                                                            //
    }(); /**                                                                                                          //
          * Returns the store relative URL                                                                            //
          * @param path                                                                                               //
          */                                                                                                          //
                                                                                                                      //
    Store.prototype.getRelativeURL = function () {                                                                    //
        function getRelativeURL(path) {                                                                               //
            var rootUrl = Meteor.absoluteUrl().replace(/\/+$/, '');                                                   // 559
            var rootPath = rootUrl.replace(/^[a-z]+:\/\/[^/]+\/*/gi, '');                                             // 560
            var storeName = this.getName();                                                                           // 561
            path = String(path).replace(/\/$/, '').trim();                                                            // 562
            return encodeURI(rootPath + "/" + UploadFS.config.storesPath + "/" + storeName + "/" + path);             // 563
        }                                                                                                             // 564
                                                                                                                      //
        return getRelativeURL;                                                                                        //
    }(); /**                                                                                                          //
          * Returns the store absolute URL                                                                            //
          * @param path                                                                                               //
          */                                                                                                          //
                                                                                                                      //
    Store.prototype.getURL = function () {                                                                            //
        function getURL(path) {                                                                                       //
            var rootUrl = Meteor.absoluteUrl().replace(/\/+$/, '');                                                   // 571
            var storeName = this.getName();                                                                           // 572
            path = String(path).replace(/\/$/, '').trim();                                                            // 573
            return encodeURI(rootUrl + "/" + UploadFS.config.storesPath + "/" + storeName + "/" + path);              // 574
        }                                                                                                             // 575
                                                                                                                      //
        return getURL;                                                                                                //
    }(); /**                                                                                                          //
          * Completes the file upload                                                                                 //
          * @param url                                                                                                //
          * @param file                                                                                               //
          * @param callback                                                                                           //
          */                                                                                                          //
                                                                                                                      //
    Store.prototype.importFromURL = function () {                                                                     //
        function importFromURL(url, file, callback) {                                                                 //
            Meteor.call('ufsImportURL', url, file, this.getName(), callback);                                         // 584
        }                                                                                                             // 585
                                                                                                                      //
        return importFromURL;                                                                                         //
    }(); /**                                                                                                          //
          * Validates the file                                                                                        //
          * @param file                                                                                               //
          */                                                                                                          //
                                                                                                                      //
    Store.prototype.onValidate = function () {                                                                        //
        function onValidate(file) {}                                                                                  //
                                                                                                                      //
        return onValidate;                                                                                            //
    }(); /**                                                                                                          //
          * Validates the file                                                                                        //
          * @param file                                                                                               //
          */                                                                                                          //
                                                                                                                      //
    Store.prototype.validate = function () {                                                                          //
        function validate(file) {                                                                                     //
            if (typeof this.onValidate === 'function') {                                                              // 599
                this.onValidate(file);                                                                                // 600
            }                                                                                                         // 601
        }                                                                                                             // 602
                                                                                                                      //
        return validate;                                                                                              //
    }();                                                                                                              //
                                                                                                                      //
    return Store;                                                                                                     //
}();                                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ufs-template-helpers.js":["meteor/templating",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jalik_ufs/ufs-template-helpers.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Template = void 0;                                                                                                // 1
module.import('meteor/templating', {                                                                                  // 1
    "Template": function (v) {                                                                                        // 1
        Template = v;                                                                                                 // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
                                                                                                                      //
var isMIME = function (type, mime) {                                                                                  // 29
    return typeof type === 'string' && typeof mime === 'string' && mime.indexOf(type + '/') === 0;                    // 30
};                                                                                                                    // 33
                                                                                                                      //
Template.registerHelper('isApplication', function (type) {                                                            // 35
    return isMIME('application', this.type || type);                                                                  // 36
});                                                                                                                   // 37
Template.registerHelper('isAudio', function (type) {                                                                  // 39
    return isMIME('audio', this.type || type);                                                                        // 40
});                                                                                                                   // 41
Template.registerHelper('isImage', function (type) {                                                                  // 43
    return isMIME('image', this.type || type);                                                                        // 44
});                                                                                                                   // 45
Template.registerHelper('isText', function (type) {                                                                   // 47
    return isMIME('text', this.type || type);                                                                         // 48
});                                                                                                                   // 49
Template.registerHelper('isVideo', function (type) {                                                                  // 51
    return isMIME('video', this.type || type);                                                                        // 52
});                                                                                                                   // 53
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ufs-tokens.js":["meteor/mongo",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jalik_ufs/ufs-tokens.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({                                                                                                       // 1
  Tokens: function () {                                                                                               // 1
    return Tokens;                                                                                                    // 1
  }                                                                                                                   // 1
});                                                                                                                   // 1
var Mongo = void 0;                                                                                                   // 1
module.import('meteor/mongo', {                                                                                       // 1
  "Mongo": function (v) {                                                                                             // 1
    Mongo = v;                                                                                                        // 1
  }                                                                                                                   // 1
}, 0);                                                                                                                // 1
var Tokens = new Mongo.Collection('ufsTokens');                                                                       // 32
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ufs-uploader.js":["babel-runtime/helpers/typeof","babel-runtime/helpers/classCallCheck","meteor/underscore","meteor/meteor","./ufs-store",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jalik_ufs/ufs-uploader.js                                                                                 //
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
module.export({                                                                                                       // 1
    Uploader: function () {                                                                                           // 1
        return Uploader;                                                                                              // 1
    }                                                                                                                 // 1
});                                                                                                                   // 1
                                                                                                                      //
var _ = void 0;                                                                                                       // 1
                                                                                                                      //
module.import('meteor/underscore', {                                                                                  // 1
    "_": function (v) {                                                                                               // 1
        _ = v;                                                                                                        // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
var Meteor = void 0;                                                                                                  // 1
module.import('meteor/meteor', {                                                                                      // 1
    "Meteor": function (v) {                                                                                          // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 1);                                                                                                                // 1
var Store = void 0;                                                                                                   // 1
module.import('./ufs-store', {                                                                                        // 1
    "Store": function (v) {                                                                                           // 1
        Store = v;                                                                                                    // 1
    }                                                                                                                 // 1
}, 2);                                                                                                                // 1
                                                                                                                      //
var Uploader = function () {                                                                                          //
    function Uploader(options) {                                                                                      // 36
        (0, _classCallCheck3.default)(this, Uploader);                                                                // 36
        var self = this; // Set default options                                                                       // 37
                                                                                                                      //
        options = _.extend({                                                                                          // 40
            adaptive: true,                                                                                           // 41
            capacity: 0.9,                                                                                            // 42
            chunkSize: 16 * 1024,                                                                                     // 43
            data: null,                                                                                               // 44
            file: null,                                                                                               // 45
            maxChunkSize: 4 * 1024 * 1000,                                                                            // 46
            maxTries: 5,                                                                                              // 47
            onAbort: this.onAbort,                                                                                    // 48
            onComplete: this.onComplete,                                                                              // 49
            onCreate: this.onCreate,                                                                                  // 50
            onError: this.onError,                                                                                    // 51
            onProgress: this.onProgress,                                                                              // 52
            onStart: this.onStart,                                                                                    // 53
            onStop: this.onStop,                                                                                      // 54
            retryDelay: 2000,                                                                                         // 55
            store: null,                                                                                              // 56
            transferDelay: 100                                                                                        // 57
        }, options); // Check options                                                                                 // 40
                                                                                                                      //
        if (typeof options.adaptive !== 'boolean') {                                                                  // 61
            throw new TypeError('adaptive is not a number');                                                          // 62
        }                                                                                                             // 63
                                                                                                                      //
        if (typeof options.capacity !== 'number') {                                                                   // 64
            throw new TypeError('capacity is not a number');                                                          // 65
        }                                                                                                             // 66
                                                                                                                      //
        if (options.capacity <= 0 || options.capacity > 1) {                                                          // 67
            throw new RangeError('capacity must be a float between 0.1 and 1.0');                                     // 68
        }                                                                                                             // 69
                                                                                                                      //
        if (typeof options.chunkSize !== 'number') {                                                                  // 70
            throw new TypeError('chunkSize is not a number');                                                         // 71
        }                                                                                                             // 72
                                                                                                                      //
        if (!(options.data instanceof Blob) && !(options.data instanceof File)) {                                     // 73
            throw new TypeError('data is not an Blob or File');                                                       // 74
        }                                                                                                             // 75
                                                                                                                      //
        if (options.file === null || (0, _typeof3.default)(options.file) !== 'object') {                              // 76
            throw new TypeError('file is not an object');                                                             // 77
        }                                                                                                             // 78
                                                                                                                      //
        if (typeof options.maxChunkSize !== 'number') {                                                               // 79
            throw new TypeError('maxChunkSize is not a number');                                                      // 80
        }                                                                                                             // 81
                                                                                                                      //
        if (typeof options.maxTries !== 'number') {                                                                   // 82
            throw new TypeError('maxTries is not a number');                                                          // 83
        }                                                                                                             // 84
                                                                                                                      //
        if (typeof options.retryDelay !== 'number') {                                                                 // 85
            throw new TypeError('retryDelay is not a number');                                                        // 86
        }                                                                                                             // 87
                                                                                                                      //
        if (typeof options.transferDelay !== 'number') {                                                              // 88
            throw new TypeError('transferDelay is not a number');                                                     // 89
        }                                                                                                             // 90
                                                                                                                      //
        if (typeof options.onAbort !== 'function') {                                                                  // 91
            throw new TypeError('onAbort is not a function');                                                         // 92
        }                                                                                                             // 93
                                                                                                                      //
        if (typeof options.onComplete !== 'function') {                                                               // 94
            throw new TypeError('onComplete is not a function');                                                      // 95
        }                                                                                                             // 96
                                                                                                                      //
        if (typeof options.onCreate !== 'function') {                                                                 // 97
            throw new TypeError('onCreate is not a function');                                                        // 98
        }                                                                                                             // 99
                                                                                                                      //
        if (typeof options.onError !== 'function') {                                                                  // 100
            throw new TypeError('onError is not a function');                                                         // 101
        }                                                                                                             // 102
                                                                                                                      //
        if (typeof options.onProgress !== 'function') {                                                               // 103
            throw new TypeError('onProgress is not a function');                                                      // 104
        }                                                                                                             // 105
                                                                                                                      //
        if (typeof options.onStart !== 'function') {                                                                  // 106
            throw new TypeError('onStart is not a function');                                                         // 107
        }                                                                                                             // 108
                                                                                                                      //
        if (typeof options.onStop !== 'function') {                                                                   // 109
            throw new TypeError('onStop is not a function');                                                          // 110
        }                                                                                                             // 111
                                                                                                                      //
        if (typeof options.store !== 'string' && !(options.store instanceof Store)) {                                 // 112
            throw new TypeError('store must be the name of the store or an instance of UploadFS.Store');              // 113
        } // Public attributes                                                                                        // 114
                                                                                                                      //
                                                                                                                      //
        self.adaptive = options.adaptive;                                                                             // 117
        self.capacity = parseFloat(options.capacity);                                                                 // 118
        self.chunkSize = parseInt(options.chunkSize);                                                                 // 119
        self.maxChunkSize = parseInt(options.maxChunkSize);                                                           // 120
        self.maxTries = parseInt(options.maxTries);                                                                   // 121
        self.retryDelay = parseInt(options.retryDelay);                                                               // 122
        self.transferDelay = parseInt(options.transferDelay);                                                         // 123
        self.onAbort = options.onAbort;                                                                               // 124
        self.onComplete = options.onComplete;                                                                         // 125
        self.onCreate = options.onCreate;                                                                             // 126
        self.onError = options.onError;                                                                               // 127
        self.onProgress = options.onProgress;                                                                         // 128
        self.onStart = options.onStart;                                                                               // 129
        self.onStop = options.onStop; // Private attributes                                                           // 130
                                                                                                                      //
        var store = options.store;                                                                                    // 133
        var data = options.data;                                                                                      // 134
        var capacityMargin = 0.1;                                                                                     // 135
        var file = options.file;                                                                                      // 136
        var fileId = null;                                                                                            // 137
        var offset = 0;                                                                                               // 138
        var loaded = 0;                                                                                               // 139
        var total = data.size;                                                                                        // 140
        var tries = 0;                                                                                                // 141
        var postUrl = null;                                                                                           // 142
        var token = null;                                                                                             // 143
        var complete = false;                                                                                         // 144
        var uploading = false;                                                                                        // 145
        var timeA = null;                                                                                             // 147
        var timeB = null;                                                                                             // 148
        var elapsedTime = 0;                                                                                          // 150
        var startTime = 0; // Keep only the name of the store                                                         // 151
                                                                                                                      //
        if (store instanceof Store) {                                                                                 // 154
            store = store.getName();                                                                                  // 155
        } // Assign file to store                                                                                     // 156
                                                                                                                      //
                                                                                                                      //
        file.store = store;                                                                                           // 159
                                                                                                                      //
        function finish() {                                                                                           // 161
            // Finish the upload by telling the store the upload is complete                                          // 162
            Meteor.call('ufsComplete', fileId, store, token, function (err, uploadedFile) {                           // 163
                if (err) {                                                                                            // 164
                    self.onError(err, file);                                                                          // 165
                    self.abort();                                                                                     // 166
                } else if (uploadedFile) {                                                                            // 167
                    uploading = false;                                                                                // 169
                    complete = true;                                                                                  // 170
                    file = uploadedFile;                                                                              // 171
                    self.onComplete(uploadedFile);                                                                    // 172
                }                                                                                                     // 173
            });                                                                                                       // 174
        } /**                                                                                                         // 175
           * Aborts the current transfer                                                                              //
           */                                                                                                         //
                                                                                                                      //
        self.abort = function () {                                                                                    // 180
            // Remove the file from database                                                                          // 181
            Meteor.call('ufsDelete', fileId, store, token, function (err, result) {                                   // 182
                if (err) {                                                                                            // 183
                    self.onError(err, file);                                                                          // 184
                }                                                                                                     // 185
            }); // Reset uploader status                                                                              // 186
                                                                                                                      //
            uploading = false;                                                                                        // 189
            fileId = null;                                                                                            // 190
            offset = 0;                                                                                               // 191
            tries = 0;                                                                                                // 192
            loaded = 0;                                                                                               // 193
            complete = false;                                                                                         // 194
            startTime = null;                                                                                         // 195
            self.onAbort(file);                                                                                       // 196
        }; /**                                                                                                        // 197
            * Returns the average speed in bytes per second                                                           //
            * @returns {number}                                                                                       //
            */                                                                                                        //
                                                                                                                      //
        self.getAverageSpeed = function () {                                                                          // 203
            var seconds = self.getElapsedTime() / 1000;                                                               // 204
            return self.getLoaded() / seconds;                                                                        // 205
        }; /**                                                                                                        // 206
            * Returns the elapsed time in milliseconds                                                                //
            * @returns {number}                                                                                       //
            */                                                                                                        //
                                                                                                                      //
        self.getElapsedTime = function () {                                                                           // 212
            if (startTime && self.isUploading()) {                                                                    // 213
                return elapsedTime + (Date.now() - startTime);                                                        // 214
            }                                                                                                         // 215
                                                                                                                      //
            return elapsedTime;                                                                                       // 216
        }; /**                                                                                                        // 217
            * Returns the file                                                                                        //
            * @return {object}                                                                                        //
            */                                                                                                        //
                                                                                                                      //
        self.getFile = function () {                                                                                  // 223
            return file;                                                                                              // 224
        }; /**                                                                                                        // 225
            * Returns the loaded bytes                                                                                //
            * @return {number}                                                                                        //
            */                                                                                                        //
                                                                                                                      //
        self.getLoaded = function () {                                                                                // 231
            return loaded;                                                                                            // 232
        }; /**                                                                                                        // 233
            * Returns current progress                                                                                //
            * @return {number}                                                                                        //
            */                                                                                                        //
                                                                                                                      //
        self.getProgress = function () {                                                                              // 239
            return Math.min(loaded / total * 100 / 100, 1.0);                                                         // 240
        }; /**                                                                                                        // 241
            * Returns the remaining time in milliseconds                                                              //
            * @returns {number}                                                                                       //
            */                                                                                                        //
                                                                                                                      //
        self.getRemainingTime = function () {                                                                         // 247
            var averageSpeed = self.getAverageSpeed();                                                                // 248
            var remainingBytes = total - self.getLoaded();                                                            // 249
            return averageSpeed && remainingBytes ? Math.max(remainingBytes / averageSpeed, 0) : 0;                   // 250
        }; /**                                                                                                        // 251
            * Returns the upload speed in bytes per second                                                            //
            * @returns {number}                                                                                       //
            */                                                                                                        //
                                                                                                                      //
        self.getSpeed = function () {                                                                                 // 257
            if (timeA && timeB && self.isUploading()) {                                                               // 258
                var seconds = (timeB - timeA) / 1000;                                                                 // 259
                return self.chunkSize / seconds;                                                                      // 260
            }                                                                                                         // 261
                                                                                                                      //
            return 0;                                                                                                 // 262
        }; /**                                                                                                        // 263
            * Returns the total bytes                                                                                 //
            * @return {number}                                                                                        //
            */                                                                                                        //
                                                                                                                      //
        self.getTotal = function () {                                                                                 // 269
            return total;                                                                                             // 270
        }; /**                                                                                                        // 271
            * Checks if the transfer is complete                                                                      //
            * @return {boolean}                                                                                       //
            */                                                                                                        //
                                                                                                                      //
        self.isComplete = function () {                                                                               // 277
            return complete;                                                                                          // 278
        }; /**                                                                                                        // 279
            * Checks if the transfer is active                                                                        //
            * @return {boolean}                                                                                       //
            */                                                                                                        //
                                                                                                                      //
        self.isUploading = function () {                                                                              // 285
            return uploading;                                                                                         // 286
        }; /**                                                                                                        // 287
            * Reads a portion of file                                                                                 //
            * @param start                                                                                            //
            * @param length                                                                                           //
            * @param callback                                                                                         //
            * @returns {Blob}                                                                                         //
            */                                                                                                        //
                                                                                                                      //
        self.readChunk = function (start, length, callback) {                                                         // 296
            if (typeof callback != 'function') {                                                                      // 297
                throw new Error('readChunk is missing callback');                                                     // 298
            }                                                                                                         // 299
                                                                                                                      //
            try {                                                                                                     // 300
                var end = void 0; // Calculate the chunk size                                                         // 301
                                                                                                                      //
                if (length && start + length > total) {                                                               // 304
                    end = total;                                                                                      // 305
                } else {                                                                                              // 306
                    end = start + length;                                                                             // 307
                } // Get chunk                                                                                        // 308
                                                                                                                      //
                                                                                                                      //
                var chunk = data.slice(start, end); // Pass chunk to callback                                         // 310
                                                                                                                      //
                callback.call(self, null, chunk);                                                                     // 312
            } catch (err) {                                                                                           // 314
                console.error('read error', err); // Retry to read chunk                                              // 315
                                                                                                                      //
                Meteor.setTimeout(function () {                                                                       // 317
                    if (tries < self.maxTries) {                                                                      // 318
                        tries += 1;                                                                                   // 319
                        self.readChunk(start, length, callback);                                                      // 320
                    }                                                                                                 // 321
                }, self.retryDelay);                                                                                  // 322
            }                                                                                                         // 323
        }; /**                                                                                                        // 324
            * Sends a file chunk to the store                                                                         //
            */                                                                                                        //
                                                                                                                      //
        self.sendChunk = function () {                                                                                // 329
            if (!complete && startTime !== null) {                                                                    // 330
                if (offset < total) {                                                                                 // 331
                    (function () {                                                                                    // 331
                        var chunkSize = self.chunkSize; // Use adaptive length                                        // 332
                                                                                                                      //
                        if (self.adaptive && timeA && timeB && timeB > timeA) {                                       // 335
                            var duration = (timeB - timeA) / 1000;                                                    // 336
                            var max = self.capacity * (1 + capacityMargin);                                           // 337
                            var min = self.capacity * (1 - capacityMargin);                                           // 338
                                                                                                                      //
                            if (duration >= max) {                                                                    // 340
                                chunkSize = Math.abs(Math.round(chunkSize * (max - duration)));                       // 341
                            } else if (duration < min) {                                                              // 343
                                chunkSize = Math.round(chunkSize * (min / duration));                                 // 344
                            } // Limit to max chunk size                                                              // 345
                                                                                                                      //
                                                                                                                      //
                            if (self.maxChunkSize > 0 && chunkSize > self.maxChunkSize) {                             // 347
                                chunkSize = self.maxChunkSize;                                                        // 348
                            }                                                                                         // 349
                        } // Limit to max chunk size                                                                  // 350
                                                                                                                      //
                                                                                                                      //
                        if (self.maxChunkSize > 0 && chunkSize > self.maxChunkSize) {                                 // 353
                            chunkSize = self.maxChunkSize;                                                            // 354
                        } // Reduce chunk size to fit total                                                           // 355
                                                                                                                      //
                                                                                                                      //
                        if (offset + chunkSize > total) {                                                             // 358
                            chunkSize = total - offset;                                                               // 359
                        } // Prepare the chunk                                                                        // 360
                                                                                                                      //
                                                                                                                      //
                        self.readChunk(offset, chunkSize, function (err, chunk) {                                     // 363
                            if (err) {                                                                                // 364
                                self.onError(err, file);                                                              // 365
                                return;                                                                               // 366
                            }                                                                                         // 367
                                                                                                                      //
                            var xhr = new XMLHttpRequest();                                                           // 369
                                                                                                                      //
                            xhr.onreadystatechange = function () {                                                    // 370
                                if (xhr.readyState === 4) {                                                           // 371
                                    if (_.contains([200, 201, 202, 204], xhr.status)) {                               // 372
                                        timeB = Date.now();                                                           // 373
                                        offset += chunkSize;                                                          // 374
                                        loaded += chunkSize; // Send next chunk                                       // 375
                                                                                                                      //
                                        self.onProgress(file, self.getProgress()); // Finish upload                   // 378
                                                                                                                      //
                                        if (loaded >= total) {                                                        // 381
                                            elapsedTime = Date.now() - startTime;                                     // 382
                                            finish();                                                                 // 383
                                        } else {                                                                      // 384
                                            Meteor.setTimeout(self.sendChunk, self.transferDelay);                    // 385
                                        }                                                                             // 386
                                    } else if (!_.contains([402, 403, 404, 500], xhr.status)) {                       // 387
                                        // Retry until max tries is reach                                             // 389
                                        // But don't retry if these errors occur                                      // 390
                                        if (tries <= self.maxTries) {                                                 // 391
                                            tries += 1; // Wait before retrying                                       // 392
                                                                                                                      //
                                            Meteor.setTimeout(self.sendChunk, self.retryDelay);                       // 394
                                        } else {                                                                      // 395
                                            self.abort();                                                             // 396
                                        }                                                                             // 397
                                    } else {                                                                          // 398
                                        self.abort();                                                                 // 400
                                    }                                                                                 // 401
                                }                                                                                     // 402
                            }; // Calculate upload progress                                                           // 403
                                                                                                                      //
                                                                                                                      //
                            var progress = (offset + chunkSize) / total; // let formData = new FormData();            // 406
                            // formData.append('progress', progress);                                                 // 408
                            // formData.append('chunk', chunk);                                                       // 409
                                                                                                                      //
                            var url = postUrl + "&progress=" + progress;                                              // 410
                            timeA = Date.now();                                                                       // 412
                            timeB = null;                                                                             // 413
                            uploading = true; // Send chunk to the store                                              // 414
                                                                                                                      //
                            xhr.open('POST', url, true);                                                              // 417
                            xhr.send(chunk);                                                                          // 418
                        });                                                                                           // 419
                    })();                                                                                             // 331
                }                                                                                                     // 420
            }                                                                                                         // 421
        }; /**                                                                                                        // 422
            * Starts or resumes the transfer                                                                          //
            */                                                                                                        //
                                                                                                                      //
        self.start = function () {                                                                                    // 427
            if (!fileId) {                                                                                            // 428
                // Create the file document and get the token                                                         // 429
                // that allows the user to send chunks to the store.                                                  // 430
                Meteor.call('ufsCreate', _.extend({}, file), function (err, result) {                                 // 431
                    if (err) {                                                                                        // 432
                        self.onError(err, file);                                                                      // 433
                    } else if (result) {                                                                              // 434
                        token = result.token;                                                                         // 435
                        postUrl = result.url;                                                                         // 436
                        fileId = result.fileId;                                                                       // 437
                        file._id = result.fileId;                                                                     // 438
                        self.onCreate(file);                                                                          // 439
                        tries = 0;                                                                                    // 440
                        startTime = Date.now();                                                                       // 441
                        self.onStart(file);                                                                           // 442
                        self.sendChunk();                                                                             // 443
                    }                                                                                                 // 444
                });                                                                                                   // 445
            } else if (!uploading && !complete) {                                                                     // 446
                // Resume uploading                                                                                   // 447
                tries = 0;                                                                                            // 448
                startTime = Date.now();                                                                               // 449
                self.onStart(file);                                                                                   // 450
                self.sendChunk();                                                                                     // 451
            }                                                                                                         // 452
        }; /**                                                                                                        // 453
            * Stops the transfer                                                                                      //
            */                                                                                                        //
                                                                                                                      //
        self.stop = function () {                                                                                     // 458
            if (uploading) {                                                                                          // 459
                // Update elapsed time                                                                                // 460
                elapsedTime = Date.now() - startTime;                                                                 // 461
                startTime = null;                                                                                     // 462
                uploading = false;                                                                                    // 463
                self.onStop(file);                                                                                    // 464
                Meteor.call('ufsStop', fileId, store, token, function (err, result) {                                 // 466
                    if (err) {                                                                                        // 467
                        self.onError(err, file);                                                                      // 468
                    }                                                                                                 // 469
                });                                                                                                   // 470
            }                                                                                                         // 471
        };                                                                                                            // 472
    } /**                                                                                                             // 473
       * Called when the file upload is aborted                                                                       //
       * @param file                                                                                                  //
       */                                                                                                             //
                                                                                                                      //
    Uploader.prototype.onAbort = function () {                                                                        //
        function onAbort(file) {}                                                                                     //
                                                                                                                      //
        return onAbort;                                                                                               //
    }(); /**                                                                                                          //
          * Called when the file upload is complete                                                                   //
          * @param file                                                                                               //
          */                                                                                                          //
                                                                                                                      //
    Uploader.prototype.onComplete = function () {                                                                     //
        function onComplete(file) {}                                                                                  //
                                                                                                                      //
        return onComplete;                                                                                            //
    }(); /**                                                                                                          //
          * Called when the file is created in the collection                                                         //
          * @param file                                                                                               //
          */                                                                                                          //
                                                                                                                      //
    Uploader.prototype.onCreate = function () {                                                                       //
        function onCreate(file) {}                                                                                    //
                                                                                                                      //
        return onCreate;                                                                                              //
    }(); /**                                                                                                          //
          * Called when an error occurs during file upload                                                            //
          * @param err                                                                                                //
          * @param file                                                                                               //
          */                                                                                                          //
                                                                                                                      //
    Uploader.prototype.onError = function () {                                                                        //
        function onError(err, file) {                                                                                 //
            console.error("ufs: " + err.message);                                                                     // 502
        }                                                                                                             // 503
                                                                                                                      //
        return onError;                                                                                               //
    }(); /**                                                                                                          //
          * Called when a file chunk has been sent                                                                    //
          * @param file                                                                                               //
          * @param progress is a float from 0.0 to 1.0                                                                //
          */                                                                                                          //
                                                                                                                      //
    Uploader.prototype.onProgress = function () {                                                                     //
        function onProgress(file, progress) {}                                                                        //
                                                                                                                      //
        return onProgress;                                                                                            //
    }(); /**                                                                                                          //
          * Called when the file upload starts                                                                        //
          * @param file                                                                                               //
          */                                                                                                          //
                                                                                                                      //
    Uploader.prototype.onStart = function () {                                                                        //
        function onStart(file) {}                                                                                     //
                                                                                                                      //
        return onStart;                                                                                               //
    }(); /**                                                                                                          //
          * Called when the file upload stops                                                                         //
          * @param file                                                                                               //
          */                                                                                                          //
                                                                                                                      //
    Uploader.prototype.onStop = function () {                                                                         //
        function onStop(file) {}                                                                                      //
                                                                                                                      //
        return onStop;                                                                                                //
    }();                                                                                                              //
                                                                                                                      //
    return Uploader;                                                                                                  //
}();                                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
var exports = require("./node_modules/meteor/jalik:ufs/ufs.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['jalik:ufs'] = exports;

})();

//# sourceMappingURL=jalik_ufs.js.map
