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

  // Exclude certain tags from displaying
    eleventyConfig.addFilter("exclude", (arr, exclude) => arr.filter((el) => el !== exclude));
    eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));
    eleventyConfig.addCollection("tagList", (collections) => {
        const tags = collections
            .getAll()
            .reduce((tags, item) => tags.concat(item.data.tags), [])
            .filter((tag) => !!tag && !["post", "featured", "popular", "opinion", "all"].includes(tag))
            .sort();
        return Array.from(new Set(tags)).map((tag) => ({
            tag,
            count: collections.getFilteredByTag(tag).length
        }));
    });
    eleventyConfig.addFilter("findTagCount", (tagList, findTag) => tagList.find(({ tag }) => tag === findTag)?.count);

<<<<<<< HEAD
// Word Count //
=======
>>>>>>> parent of 11627cb (Fix gallery + posts tags)
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