module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addFilter("date", require("./src/filters/date.js"));
  
  eleventyConfig.addCollection('blogpost', function(collectionApi) {
    return collectionApi.getFilteredByGlob('blog/posts/**/*.md');
  });

  eleventyConfig.addCollection('artpost', function(collectionApi) {
    return collectionApi.getFilteredByGlob('gallery/**/*.md');
  });

  // Category Global Data //
    eleventyConfig.addGlobalData("categoryConfig", {
    gallery: {
      items: "artpost",
      tags: "artTags",
      base: "/gallery"
    },
    blog: {
      items: "blogpost",
      tags: "blogTags",
      base: "/blog/posts"
    },
  });

  // Exclude certain tags from displaying
    eleventyConfig.addFilter("exclude", (arr, exclude) => arr.filter((el) => el !== exclude));
    eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));
    eleventyConfig.addCollection("tagsList", (collections) => {
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
    eleventyConfig.addFilter("findTagCount", (tagsList, findTag) => tagsList.find(({ tag }) => tag === findTag)?.count);

  // createTagCollection //
  function createTagCollection(collectionApi, glob) {
  const tagSet = new Set();

  collectionApi.getFilteredByGlob(glob).forEach(item => {
    if (item.data.tags) {
      let tags = item.data.tags;
      if (typeof tags === "string") tags = [tags];
      tags.forEach(tag => tagSet.add(tag));
    }
  });

  return [...tagSet].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );
}
    
  // Individual tags //
    // Art Collection //
  eleventyConfig.addCollection("artTags", collectionApi => {
    return createTagCollection(
      collectionApi,
      "gallery/**/*.md"
    );
  });
    
    // Blog Collection //
  eleventyConfig.addCollection("blogTags", collectionApi => {
    return createTagCollection(
      collectionApi,
      "blog/posts/**/*.md"
    );
  });
  
    // Global tags //
  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const tagSet = new Set();

    collectionApi.getAll().forEach(item => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") tags = [tags];
        tags.forEach(tag => tagSet.add(tag));
      }
    });

    return [...tagSet].sort();
  });

  // FilterByTag //
  eleventyConfig.addFilter("filterByTag", (items, tag) => {
  if (!Array.isArray(items)) return [];
  return items.filter(item =>
    Array.isArray(item.data.tags) &&
    item.data.tags.includes(tag)
  );
});

   // Word count //  
const wordcountPlugin = require("eleventy-plugin-wordcount-extended");
eleventyConfig.addPlugin(wordcountPlugin);
  
  
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