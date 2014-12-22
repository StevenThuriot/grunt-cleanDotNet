# grunt-cleanDotNet

This is a grunt task that will clean up all `bin` and `obj` folders, typically found in `.NET` projects.

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