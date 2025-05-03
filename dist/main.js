"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "run", {
    enumerable: true,
    get: function() {
        return run;
    }
});
const _core = require("@actions/core");
const _globby = require("globby");
const _ChilidDocuments = require("./ChilidDocuments");
const _Document = require("./Document");
const _Inputs = require("./Inputs");
async function run() {
    try {
        const inputs = _Inputs.Inputs.get();
        const rootDocuments = searchRootDocuments(inputs.rootPatterns);
        for await (const rootDocument of rootDocuments){
            const childDocuments = await _ChilidDocuments.ChildDocuments.search(rootDocument);
            const indexBlock = childDocuments.toIndexBlock(inputs.header);
            const document = await _Document.Document.open(rootDocument);
            document.replaceOrAppend(indexBlock);
            await document.save();
        }
    } catch (error) {
        if (error instanceof Error) (0, _core.setFailed)(error.message);
    }
}
async function* searchRootDocuments(rootPatterns) {
    for await (const rootDocument of (0, _globby.globbyStream)(rootPatterns)){
        yield rootDocument.toString();
    }
}

//# sourceMappingURL=main.js.map