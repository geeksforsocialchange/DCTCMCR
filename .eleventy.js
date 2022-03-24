const slugify = require("slugify");
const outdent = require("outdent");
const { JSDOM } = require("jsdom");
const Image = require("@11ty/eleventy-img");

/**
 * creates a 800px wide jpeg based on a url and returns the url of the generated image
 */
const resizer = async (url) => {
  let stats = await Image(url, {
    outputDir: "./public/img/",
    formats: ["jpeg"],
    widths: [800],
  });

  return stats.jpeg[0].url;
};

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/img/");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/fonts/Noto_Serif");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");
  eleventyConfig.addPassthroughCopy("./src/admin/config.yml");

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
      <h2 class="org__title">${collectionObject.data.title}</h2>
      <ul role="list" class="org__contact"]>
        <li class="org__contact__method">
          <p class="org__contact__method__type" >Phone</p>
          <a href="tel:${collectionObject.data.tel}">${collectionObject.data.tel}</a></li>
        <li class="org__contact__method">
          <p class="org__contact__method__type" >Email</p>
          <a href="mailto:${collectionObject.data.email}">${collectionObject.data.email}</a></li>
        <li class="org__contact__method">
          <p class="org__contact__method__type" >Website</p>
          <a href="${collectionObject.data.web}">${collectionObject.data.web}</a></li>
      </ul>
      ${collectionObject.templateContent}
    `;
  });

  eleventyConfig.addShortcode("catagories", function(tagArray, all = false) {
    tagArray = tagArray.filter((tag) => tag !== "orgs");
    return outdent`
      <ul role="list" class="catagories">
          ${
            all
              ? `<li class="catagorie">
              <a class="catagorie__link" href="/pages/who/">All</a>
          </li>`
              : ""
          }
          ${tagArray
            .map(
              (tag) =>
                `<li class="catagorie">
                <a class="catagorie__link" href="/orgs/${slugify(
                  tag.toLowerCase(),
                )}">${tag}</a>
            </li>`,
            )
            .join("")}

      </ul>
    `;
  });

  eleventyConfig.addTransform("resizeImgs", async function(content) {
    if (this.outputPath && this.outputPath.endsWith(".html")) {
      const dom = new JSDOM(content);
      await Promise.all(
        [...dom.window.document.querySelectorAll("img")].map(async (el) => {
          src = el.src;
          if (src.endsWith("svg")) return;
					// If not external pull from the public folder as that's where netlify CMS adds images	
          if (!src.startsWith("http")) src = `public${src}`;
          el.src = await resizer(src);
        }),
      );

      return dom.window.document.documentElement.outerHTML;
    }

    return content; // no change done.
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
