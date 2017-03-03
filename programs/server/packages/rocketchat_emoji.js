(function () {

/* Package-scope variables */
var renderEmoji;



/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['rocketchat:emoji'] = {}, {
  renderEmoji: renderEmoji
});

})();
