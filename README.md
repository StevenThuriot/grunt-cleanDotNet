# ![grunt-cleanDotNet](https://cloud.githubusercontent.com/assets/544444/5529848/4e596082-8a19-11e4-9521-dbdeb9cd1749.png)

This is a grunt task that will clean up all `bin` and `obj` folders, typically found in `.NET` projects.

For those, like myself, that don't fully trust Visual Studio's `clean` feature.

## Usage

Add the following configuration to your `Gruntfile.js`:

```js
  grunt.loadNpmTasks('grunt-cleanDotNet');
  grunt.registerTask('clean', ['cleanDotNet']);
```

Run grunt as follows:

```
grunt clean
```
