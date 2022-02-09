const slugify = require("slugify");
const outdent = require("outdent");

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/js");

  eleventyConfig.addCollection("orgs", function(collection) {
    return collection.getFilteredByGlob("src/orgs/*.md");
  });

  eleventyConfig.addCollection("tagsList", function(collectionApi) {
    const tagsList = new Set();
    collectionApi.getAll().map((item) => {
      if (item.data.tags) {
        // handle pages that don't have tags
        item.data.tags.map((tag) => tagsList.add(tag));
      }
    });
    return [...tagsList].filter(
      (tag) => tag !== "orgs" && tag !== "pages" && tag !== "reasons",
    ); // you could do sorting here
  });

  eleventyConfig.addShortcode("organisation", function(collectionObject) {
    return outdent`
      <h2>${collectionObject.data.title}</h2>
      ${collectionObject.templateContent}
      <p>TEL: <a href="tel:${
        collectionObject.data.tel
      }">${collectionObject.data.tel}</a></p>
      <p><a href="${collectionObject.data.web}">Website</a></p>
      <ul>
        ${collectionObject.data.tags
          .map(
            (tag) =>
              `<li><a href="/orgs/${slugify(
                tag.toLowerCase(),
              )}">${tag}</a></li>`,
          )
          .join("")}
      </ul>
    `;
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
