"use strict";
var Models = require("./index");
var SudokuTable = (function () {
    function SudokuTable(Nodes, width, height) {
        var _this = this;
        this.buildReferences = function () {
            _this.ArrayNode = [];
            _this.References = [[]];
            var index = 0;
            for (var hb = 0; hb < _this.height; hb++)
                for (var wb = 1; wb <= _this.width; wb++)
                    for (var hs = 0; hs < _this.height; hs++)
                        for (var ws = 1; ws <= _this.width; ws++) {
                            var row = wb + hb * _this.width;
                            var col = hs * _this.width + ws;
                            var block = hs + 1 + hb * _this.width;
                            var referenceNode = new Models.ReferenceNode(row, col, block);
                            if (_this.Nodes[row - 1][col - 1] > 0) {
                                _this.ArrayNode.push(_this.Nodes[row - 1][col - 1]);
                                referenceNode.fix = true;
                            }
                            else {
                                _this.ArrayNode.push(0);
                                referenceNode.fix = false;
                            }
                            referenceNode.value = _this.Nodes[row - 1][col - 1];
                            _this.NodeDictionary[block] = referenceNode;
                            _this.References[row - 1][col - 1] = referenceNode;
                            index++;
                        }
        };
        this.Nodes = Nodes;
        this.width = width;
        this.height = height;
        this.buildReferences();
    }
    return SudokuTable;
}());
exports.SudokuTable = SudokuTable;
//# sourceMappingURL=SudokuTable.js.map