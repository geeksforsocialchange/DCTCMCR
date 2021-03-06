const { JSDOM } = require("jsdom");
const slugify = require("slugify");
const outdent = require("outdent");

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/fonts/Noto_Serif");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");
  eleventyConfig.addPassthroughCopy("./src/admin/config.yml");

  eleventyConfig.addCollection("orgs", function(collection) {
    return collection.getFilteredByGlob("src/orgs/*.md");
  });

  eleventyConfig.addCollection("menu", function(collection) {
    return [
      ...collection.getFilteredByGlob("src/pages/*.md"),
      ...collection.getFilteredByGlob("src/index.md"),
    ].sort((a, b) => a.data.order - b.data.order);
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
${
  collectionObject.data.tel
    ? `
        <li class="org__contact__method">
          <p class="org__contact__method__type" >Phone</p>
          <a href="tel:${collectionObject.data.tel}">${collectionObject.data.tel}</a></li>
	`
    : ``
}
${
  collectionObject.data.email
    ? `
        <li class="org__contact__method">
          <p class="org__contact__method__type" >Email</p>
          <a href="mailto:${collectionObject.data.email}">${collectionObject.data.email}</a></li>

	`
    : ``
}
${
  collectionObject.data.web
    ? `
        <li class="org__contact__method">
          <p class="org__contact__method__type" >Website</p>
          <a href="${collectionObject.data.web}">${collectionObject.data.web}</a></li>

	`
    : ``
}
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

  // This is can be resolved in chrome using css but it is not widely supported yet
  // h2:has(> a) {color: var(--color-link)}

  eleventyConfig.addTransform("checkHeadersForLinks", function(content) {
    if (this.outputPath && this.outputPath.endsWith(".html")) {
      const dom = new JSDOM(content);
      [...dom.window.document.querySelectorAll("a")].forEach((el) => {
        // check parentNode if header
        let parent = el.parentElement;
        if (/H[1-6]/.test(parent.tagName)) {
          // add an inline style if it is
          // seems to fail when passing in "var(--color-link)"
          parent.style.color = "darkcyan";
        }
      });

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
