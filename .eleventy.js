module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/js");

  eleventyConfig.addCollection("orgs", function(collection) {
    return collection.getFilteredByGlob("src/orgs/*.md");
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
