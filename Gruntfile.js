module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    babel: {
        options: {
            sourceMap: true
        },
          dist: {
              files: [
                  {
                      expand: true,
                      cwd: 'babel/',
                      src: ['*.js'],
                      dest: 'src/'
                  }
              ]
          }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'dist/babel.js', 'test/*.js'],
      options: {
        // options here to override JSHint defaults
        node : true ,
        globals: {
          strict: true,
          jQuery: true,
          console: true,
          module: true,
          document: true 
        }
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'sass',
          cssDir: 'css'
        }
      }
    },
    watch: {
      sass: {
        files: ['sass/*'],
        tasks: ['style'],
      },
      test: {
        files: 'src/*',
        tasks: ['default'],
      },
      babel: {
        files: 'babel/*',
        tasks: ['babel'],
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['babel','concat', 'jshint', 'qunit',  'uglify']);
  grunt.registerTask('gerarbabel', ['babel']);
  grunt.registerTask('testjs', ['jshint']);
  grunt.registerTask('style', ['compass']);


};