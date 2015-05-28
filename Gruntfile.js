module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            core: {
                options: {
                    style: "compressed"
                },
                files: {
                    'bin/core.min.css': 'source/core.scss',
                }
            }
        },
        watch: {
            core: {
                files: '**/*.scss',
                tasks: ['default'],
                options: {
                    debounceDelay: 500
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'bin/',
                    src: ['**'],
                    dest: 'cdn/<%= pkg.version %>/'
                }, {
                    expand: true,
                    cwd: 'bin/',
                    src: ['**'],
                    dest: 'cdn/'
                }]
            }
        },
        concat: {
            dist: {
                src: ['source/mixin/*.scss', 'source/placeholder/*.scss', 'source/layout.scss', 'source/reset.scss', 'source/helper.scss'],
                dest: 'bin/_core.scss'
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['sass']);
    grunt.registerTask('build', ['sass', 'concat']);
    grunt.registerTask('deliver', ['build', 'copy']);
};