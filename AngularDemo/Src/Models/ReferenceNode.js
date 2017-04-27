"use strict";
var ReferenceNode = (function () {
    function ReferenceNode(row, column, block, value, fix) {
        this.row = row;
        this.block = block;
        this.column = column;
        this.value = value;
        this.fix = fix;
    }
    return ReferenceNode;
}());
exports.ReferenceNode = ReferenceNode;
//# sourceMappingURL=ReferenceNode.js.map