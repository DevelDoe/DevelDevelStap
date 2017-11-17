'use strict'

/* dependencies */
const gulp      = require('gulp')
const util      = require('gulp-util')
const clean     = require('gulp-clean')
const plumber   = require('gulp-plumber')
const sequence  = require('run-sequence')
const less      = require('gulp-less')

/**
 * Error loging logic
 * @param {object} error           - the error object
 * @param {string} error.plugin    - The plugin that threw an Error
 * @param {string} error.message   - representation of the thrown error
 */
const onError = (error) => {
    util.log(util.colors.red(`Error plugin: ${error.plugin}`))
    util.log(util.colors.red(`Error message: ${error.message}`))
    util.beep()
}

/* src and dist folders */
const srcFolder         = 'src/'
const srcAssetsFolder   = `${srcFolder}assets/`
const distFolder        = 'dist/'
const distAssetsFolder  = `${distFolder}assets/`

/* Move fonts to dist */
const fontsFolder   = `${srcAssetsFolder}fonts/`
const fontsPath     = [`${fontsFolder}*.+(eot|svg|ttf|woff|woff2)`]
const fontsDistPath = `${distAssetsFolder}fonts/`
gulp.task('fonts', function() {
    return gulp.src(fontsPath)
        .pipe(plumber(onError))
        .pipe(gulp.dest(fontsDistPath))
})

/* Compile Less */
const lessFolder    = `${srcAssetsFolder}less/`
const lessPaths      = [`${lessFolder}**/*.less`]
const distCssFolder = `${distAssetsFolder}/css`
gulp.task('less', function() {
    return gulp.src(lessPaths)
        .pipe(less())
        .pipe(plumber(onError))
        .pipe(gulp.dest(distCssFolder))
})

/* Buld */
gulp.task('clean:build', function() {
    return gulp.src(`dist`, { read:false})
        .pipe(clean({force: true}))
})
gulp.task('build', function(fn) {
    sequence('clean:build', ['fonts', 'less'],fn)
})
