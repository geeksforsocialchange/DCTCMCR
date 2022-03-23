const { readFile, writeFile } = require("fs/promises");
const { JSDOM } = require("jsdom");
const Image = require("@11ty/eleventy-img");

// STATS OBJECT
// {
//   jpeg: [
//     {
//       format: "jpeg",
//       width: 900,
//       height: 1500,
//       url: "/img/lZ-pVb18oK-900.jpeg",
//       sourceType: "image/jpeg",
//       srcset: "/img/lZ-pVb18oK-900.jpeg 900w",
//       filename: "lZ-pVb18oK-900.jpeg",
//       outputPath: "public/img/lZ-pVb18oK-900.jpeg",
//       size: 114405,
//     },
//   ];
// }

/**
 * creates a 900px wide jpeg based on a url and returns the url of the generated image
 */
const resizer = async (url) => {
  let stats = await Image(url, {
    outputDir: "./public/img/",
    formats: ["jpeg"],
    widths: [900],
  });

  return stats.jpeg[0].url;
};

resizer("public/img/phone.png");
readFile("in.html", { encoding: "utf-8" }).then(async (contents) => {
  const dom = new JSDOM(contents);
  src = dom.window.document.querySelector("img").src;
  dom.window.document.querySelector("img").src = `public/${await resizer(src)}`;
  console.log(src);
  console.log(dom.window.document.documentElement.outerHTML);
  writeFile("out.html", dom.window.document.documentElement.outerHTML);
});
