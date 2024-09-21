const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  // eleventyConfig.addPassthroughCopy("content/**/*.json");

  // Add json filter
  eleventyConfig.addFilter('json', JSON.stringify);

  // Images to JSON
  eleventyConfig.addCollection("images", function() {
    const imageDir = 'assets/images'; // Adjust this path to your image directory
    const files = fs.readdirSync(imageDir);
    
    return files.map(file => ({
      filename: file,
      path: path.join(imageDir, file),
      url: `/images/${file}` // Adjust this if your output directory structure is different
    }));
  });

  // You can add configuration here if needed

  eleventyConfig.addPassthroughCopy("assets");
  return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: ["md", "njk", "html", "liquid"],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "content", // default: "."
			includes: "../_includes", // default: "_includes"
			data: "../_data", // default: "_data"
			output: "_site",
		},

		// -----------------------------------------------------------------
		// Optional items:
		// -----------------------------------------------------------------

		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

		// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
		// it will transform any absolute URLs in your HTML to include this
		// folder name and does **not** affect where things go in the output folder.
		pathPrefix: "/",
	};
};