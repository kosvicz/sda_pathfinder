module.exports = (grunt) => {
  // Load plugins
  [
    'grunt-mocha-test',
    'grunt-contrib-jshint',
    'grunt-exec',
  ].forEach((task) => {
    grunt.loadNpmTasks(task);
  });

  // Config plugins
  grunt.initConfig({
    mochaTest: {
      all: {
        options: { ui: 'tdd'},
        src: 'qa/tests-*.js',
      }
    },
    jshint: {
      app: ['index.js', 'public/js/**/*.js','lib/**/*.js'],
      options: { 'esversion': 6, },
      qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
    },
    exec: {
      linkchecker: {
        cmd: 'linkchecker http://localhost:3000'
      }
    },
  });

  // Reg task
  grunt.registerTask('default', ['mochaTest', 'jshint', 'exec']);
};