module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addFilter("date", require("./src/filters/date.js"));
  
  eleventyConfig.addCollection('posts', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/blog/posts/**/*.md');

  });

  const wordcountPlugin = require("eleventy-plugin-wordcount-extended");
  module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(wordcountPlugin);
  };
  
    return {
      passthroughFileCopy: true,
      dir: {
        input: "src",
        output: "public",
        includes: "_includes",
      },
      templateFormats: ['md', 'njk', 'html'],
      markdownTemplateEngine: 'njk',
      htmlTemplateEngine: 'njk',
      dataTemplateEngine: 'njk',
    };
  };