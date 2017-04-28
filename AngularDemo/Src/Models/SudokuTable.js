"use strict";
var Models = require("./index");
var Utils_1 = require("../Utils/Utils");
var SudokuTable = (function () {
    function SudokuTable(Nodes, width, height) {
        var _this = this;
        this.buildReferences = function () {
            _this.ArrayNode = [];
            _this.References = [];
            _this.NodeDictionary = new Models.Dictionary([]);
            var index = 0;
            for (var hb = 0; hb < _this.height; hb++)
                for (var wb = 1; wb <= _this.width; wb++)
                    for (var hs = 0; hs < _this.height; hs++)
                        for (var ws = 1; ws <= _this.width; ws++) {
                            console.warn("block", block);
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
                            //if (this.NodeDictionary[block] === undefined)
                            //    this.NodeDictionary[block] = [];
                            if (_this.References[row - 1] === undefined || _this.References[row - 1] === null)
                                _this.References[row - 1] = [];
                            if (_this.NodeDictionary[block.toString()] === undefined)
                                _this.NodeDictionary.add(block.toString(), []);
                            _this.NodeDictionary.getValue(block.toString()).push(referenceNode);
                            _this.References[row - 1][col - 1] = referenceNode;
                            index++;
                        }
            console.log(_this.NodeDictionary.getValue("1"));
        };
        this.Nodes = Utils_1.Utils.deepCopy(Nodes);
        this.width = width;
        this.height = height;
        this.buildReferences();
    }
    return SudokuTable;
}());
exports.SudokuTable = SudokuTable;
//# sourceMappingURL=SudokuTable.js.map