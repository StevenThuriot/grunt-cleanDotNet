/*
 * grunt-cleanDotNet
 * https://github.com/StevenThuriot/grunt-cleanDotNet
 *
 * Copyright (c) 2014 Steven Thuriot
 * Licensed under the MIT license.
 */

'use strict';


function folderStartsWith(stats, value) {
    return stats.name.slice(0, value.length) == value;
}

var path = require('path'),
    fs = require('fs'),
    rimraf = require('rimraf'),
    walk = require('fs-walker'),
    filter = {
        file: function (stats) {
            //Look for csproj and vbproj files to be sure, rather than looking for bin and obj folders.
            return /\.csproj$|\.vbproj$/i.test(stats.name);
        },
        directory: function (stats) {
            //Skip looking through big and uninteresting folders.
            return stats.name[0] !== '.' && 
                stats.name !== 'node_modules' && 
                !folderStartsWith(stats, '_Resharper');
        }
    };

module.exports = function (grunt) {
    grunt.registerTask('cleanDotNet', 'Clean .NET build files', function () {
        var cwd = process.cwd();

        console.log('- Cleaning up %s', cwd);
        var deletionCounter = 0;
        
        walk.sync(cwd, filter).map(function (stats) {
            console.log('-   Found project folder: %s', stats.directory);
            return stats.directory;
        }).map(function (dir) {
            var bin = path.join(dir, 'bin');
            var obj = path.join(dir, 'obj');

            return [bin, obj];
        }).reduce(function (result, dir) {
            return result.concat(dir);
        }).filter(function (dir) {
            return fs.existsSync(dir);
        }).forEach(function (dir) {
            console.log('-      Deleting %s', dir);
            rimraf.sync(dir);
            deletionCounter++;
        });
        
        console.log('\n- Cleaned up %s folders.', deletionCounter);
    });
};