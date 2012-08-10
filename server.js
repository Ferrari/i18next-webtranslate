var express = require('express')
  , app = express()
  , i18n = require('i18next');

// use mongoDb
// var i18nMongoSync = require('../backends/mongoDb/index');
// i18nMongoSync.connect(function() {

//     i18nMongoSync.saveResourceSet('en-US', 'ns.special', {
//         resources: {
//             "app": {
//               "name": "i18n",
//               "insert": "you are __youAre__",
//               "child": "__count__ child",
//               "child_plural": "__count__ children",
//               "friend_context": "A friend",
//               "friend_context_male": "A boyfriend",
//               "friend_context_female": "A girlfriend"
//             }
//         }
//     }, function() {
//         i18n.backend(i18nMongoSync);

//         i18n.init({
//             ns: { namespaces: ['ns.common', 'ns.special'], defaultNs: 'ns.special'},
//             resSetPath: 'locales/__lng__/new.__ns__.json',
//             saveMissing: true,
//             debug: true
//         });
//     });
// });

// use redis
// var i18nRedisSync = require('../backends/redis/index');
// i18nRedisSync.connect(function() {

//     i18nRedisSync.saveResourceSet('en-US', 'ns.special', {
//         resources: {
//             "app": {
//               "name": "i18n",
//               "insert": "you are __youAre__",
//               "child": "__count__ child",
//               "child_plural": "__count__ children",
//               "friend_context": "A friend",
//               "friend_context_male": "A boyfriend",
//               "friend_context_female": "A girlfriend"
//             }
//         }
//     }, function(err) {
//         i18n.backend(i18nRedisSync);

//         i18n.init({
//             ns: { namespaces: ['ns.common', 'ns.special'], defaultNs: 'ns.special'},
//             resSetPath: 'locales/__lng__/new.__ns__.json',
//             saveMissing: true,
//             debug: true
//         });
//     });
// });

// use filesys
i18n.init({
    ns: { namespaces: ['ns.common', 'ns.app', 'ns.layout', 'ns.msg', 'ns.public'], defaultNs: 'ns.common'},
    resSetPath: 'locales/__lng__/new.__ns__.json',
    saveMissing: true,
    debug: true
});

// Configuration
app.configure(function() {
    app.use(express.bodyParser());
    app.use(i18n.handle); // have i18n befor app.router
    
    app.use(app.router);
    app.set('view engine', 'jade');
    app.set('views', __dirname);
});

i18n.registerAppHelper(app)
    .serveClientScript(app)
    .serveDynamicResources(app)
    .serveMissingKeyRoute(app)
    .serveChangeKeyRoute(app);