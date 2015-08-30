# gruntandbabel
Grunt para palestra sobre grunt e ES6.

Instalando o grunt global

npm install -g grunt-cli


Configurando as dependencias 
Devemos criar o arquivo package.json com ex:

``` 
{
  "name": "Apresentacao-grunt",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "*",
    "grunt-contrib-jshint": "*",
    "grunt-contrib-qunit": "*",
    "grunt-babel": "*",
    "grunt-contrib-uglify": "*",
    "grunt-contrib-concat": "*",
    "grunt-contrib-watch": "*",
    "grunt-contrib-compass": "*"
  }
}
``` 

Em seguinda criaremos nosso Gruntile.js
``` 
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
``` 

Criamos assim o ``` grunt watch ``` irá:
  Sempre que alterarmos algo na pasta /SASS irá criar um novo css na pasta /css
  Sempre que alterarmos algo na pasta /babel irá converter os arquivos em ES6, testar com qunit, testar com o jslint, minificar e concatenar na pasta ```dist/Apresentacao-grunt.min.js```


