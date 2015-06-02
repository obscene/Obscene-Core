module.exports = function (grunt) {

    var flexboxTestFiles = ["align-content", "align-items", "align-self", "center", "hbox", "stretch", "vbox"];
    var testFiles = {};

    flexboxTestFiles.forEach(function (item) {
        var filePath = 'test/bin/' + item + '.html';
        var t = 'test/source/template/';
        testFiles[filePath] = [t + 'head.html', 'test/source/layout/flexbox/' + item + '.html', t + 'foot.html'];
    });

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
            core: {
                src: ['source/**/_*.scss'],
                dest: 'bin/core.scss'
            },
            test: {
                files: testFiles
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['sass']);
    grunt.registerTask('build', ['sass', 'concat:core', 'concat:test']);
    grunt.registerTask('deliver', ['build', 'copy']);
};