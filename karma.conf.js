module.exports = function(config) {
  config.set({
  	browsers: ['Chrome'],
    frameworks: ['browserify', 'jasmine'],
    plugins: [
     'karma-jasmine',
     'karma-browserify',
     'karma-chrome-launcher',
     'karma-babel-preprocessor'
    ],
    browserify: {
	  "transform": [
	    "babelify"
	  ]
	},
    files: [
      "test/**/*.spec.js"
    ],
    preprocessors: {
      "src/**/*.js": "browserify",
      "test/**/*.js": "browserify"
    },
    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      }
    }
  });
};
