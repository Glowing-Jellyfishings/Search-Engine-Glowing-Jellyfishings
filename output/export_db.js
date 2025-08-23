const { getAllPages } = require("../db");
const fs = require("fs");

getAllPages(pages => {
  fs.writeFileSync("./output/pages.json", JSON.stringify(pages, null, 2));
});
