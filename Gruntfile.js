module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: ['Grunfile.js', 'src/**/*.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/js/scripts.min.js': 'src/js/scripts.js'
        }
      }
    },

    // compile sass stylesheets to css -----------------------------------------
    sass: {
      build: {
        files: {
          'src/css/style.css': 'src/scss/style.scss'
        }
      }
    },

    // add vendor prefixes -----------------------------------------------------
    autoprefixer: {
      // supported browsers listed in browserlist file, for percentage usage
      // options: {
      //   browsers: ['last 2 versions', 'ie 8', 'ie 9']
      // },
      dist: {
        files: {
          'src/css/style.css': 'src/css/style.css'
        }
      },
    },

    // copy comiled css file to dist folder ------------------------------------
    copy: {
      main: {
        expand: true,
        cwd: 'src',
        src: '**',
        dest: 'dest/',
      },
    },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/style.min.css': 'src/css/style.css'
        }
      }
    },

    // configure watch to auto update ------------------------------------------
    watch: {
      stylesheets: {
        files: ['src/**/*.css', 'src/**/*.scss'],
        tasks: ['sass', 'cssmin']
      },
      scripts: {
        files: 'src/**/*.js',
        tasks: ['jshint', 'uglify']
      }
    }

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // ===========================================================================
  // CREATE TASKS ==============================================================
  // ===========================================================================
  grunt.registerTask('build', ['jshint', 'uglify', 'sass', 'autoprefixer', 'cssmin']);
  grunt.registerTask('buildcss', ['sass', 'autoprefixer', 'cssmin']);
  grunt.registerTask('watch', ['watch']);

};
