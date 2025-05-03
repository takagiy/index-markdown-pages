"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChildDocuments", {
    enumerable: true,
    get: function() {
        return ChildDocuments;
    }
});
const _nodepath = require("node:path");
const _globby = require("globby");
class ChildDocuments {
    rootDocument;
    rootDirectory;
    childDocuments;
    constructor(rootDocument, rootDirectory, childDocuments){
        this.rootDocument = rootDocument;
        this.rootDirectory = rootDirectory;
        this.childDocuments = childDocuments;
    }
    static async search(rootDocument) {
        const rootDirectory = (0, _nodepath.dirname)(rootDocument);
        const childDocuments = await (0, _globby.globby)(`${rootDirectory}/**/*.md`).then((entries)=>entries.filter((entry)=>entry !== rootDocument).map((entry)=>(0, _nodepath.relative)(rootDirectory, entry)));
        return new ChildDocuments(rootDocument, rootDirectory, childDocuments);
    }
    toIndexBlock(header) {
        return header.concat("\n\n").concat(this.childDocuments.toSorted().map((childDocument)=>`- [${childDocument}](${childDocument})\n`).join(""));
    }
}

//# sourceMappingURL=ChilidDocuments.js.map