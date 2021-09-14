// import nodeHtmlToImage from 'node-html-to-image';
//
// import "reflect-metadata";
//
//
//
// nodeHtmlToImage({
//     output: './image.png',
//     html: '<html><body>Hello world!</body></html>'
// })
//     .then(() => console.log('The image was created successfully!'))

import "reflect-metadata";
import {initLogger} from "./core/logger/Logger";

const Logger = initLogger();
console.log(`Logger level: error`);

import main = require("./main");

main.default().catch(error => {
    Logger.error("Fatal error im main thread:", error);
    process.exit(1);
});