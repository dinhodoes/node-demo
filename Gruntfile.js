module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
         src: [
           'public/sass/sections/*.scss',
         ],
         dest: 'public/sass/main.scss',
       }      
    },

    jshint: {
    	js: {	
    		src: 'public/js/*.js'
    	}
    },

    sass: {
			dist: {
				files: {
					'public/css/main.css': 'public/sass/main.scss'
				}
			}
		},
		
     watch: {
      sass: {
        files: 'public/sass/sections/*.scss',
        tasks: ['concat', 'sass']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  //// tasks
  grunt.registerTask('default', ['watch']);
};