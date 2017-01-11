var gulp = require('gulp');

gulp.task('lpush-install', function(done){
    require('./plugins/cordova-plugin-leanpush/lpush-installer.js')(__dirname, done);
});
