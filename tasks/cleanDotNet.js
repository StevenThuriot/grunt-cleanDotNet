/*
 * grunt-cleanDotNet
 * https://github.com/StevenThuriot/grunt-cleanDotNet
 *
 * Copyright (c) 2014 Steven Thuriot
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

var walkSync = function (dir, filelist) {
        
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);

    filelist = filelist || [];
    
    files.forEach(function (file) {
        var fullname = path.join(dir, file);
        
        if (fs.statSync(fullname).isDirectory()) {
            filelist = walkSync(fullname, filelist);
        } else if (fullname.match(/\.csproj$/gi)) {
            filelist.push(fullname);
        }
    });
    
    return filelist;
};

module.exports = function (grunt) {
    grunt.registerTask('cleanDotNet', 'Clean .NET build files', function () {
        var rimraf = require('rimraf'),
            fs = require('fs'),
            cwd = process.cwd();

        console.log('- Cleaning ' + cwd);

        walkSync(cwd).map(function (file) {
            var directory = path.dirname(file);
            
            console.log('-   Found project folder: ' + directory);
            
            return directory;
        }).map(function (dir) {
            var bin = path.join(dir, 'bin');
            var obj = path.join(dir, 'obj');

            return [bin, obj];
        }).reduce(function (result, dir) {
            return result.concat(dir);
        }).filter(function (dir) {
            return fs.existsSync(dir);
        }).forEach(function (dir) {
            
            console.log('-      Deleting ' + dir);
            
            rimraf.sync(dir);
        });
    });
};