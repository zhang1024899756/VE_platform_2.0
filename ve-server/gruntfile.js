module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			js: {
				files: ['controllers/*.js', 'modeles/*.js', 'schemas/*.js', 'routes/*.js'],
				//tasks: ['jshint'],
				optins: {
					livereload: true
				}
			}
		},
		nodemon: {
			dev: {
				optins: {
					file: 'server.js',
					args: [],
					ignoredFiles: ['node_modules/**'],
					watchedExtensions: ['js'],
					watchFolders: ['./'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 8100
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-nodemon')
	grunt.loadNpmTasks('grunt-concurrent')

	grunt.option('force', true)
	grunt.registerTask('default', ['concurrent'])
}