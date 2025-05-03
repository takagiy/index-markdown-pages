"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Inputs", {
    enumerable: true,
    get: function() {
        return Inputs;
    }
});
const _core = require("@actions/core");
class Inputs {
    rootPatterns;
    header;
    constructor(rootPatterns, header){
        this.rootPatterns = rootPatterns;
        this.header = header;
    }
    static get() {
        const rootPatterns = (0, _core.getMultilineInput)("root-patterns");
        const header = (0, _core.getInput)("header");
        return new Inputs(rootPatterns, header);
    }
}

//# sourceMappingURL=Inputs.js.map