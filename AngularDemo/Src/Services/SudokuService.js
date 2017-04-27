"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var index_1 = require("../Models/index");
var SudokuService = (function () {
    function SudokuService() {
        var _this = this;
        this.AvailableArray = new Array();
        this.FIX = new Array();
        this.RF = new Array();
        this.C = new Array();
        this.setInitData = function (data, wSmall, hSmall, wBig, hBig) {
            _this.width = wSmall;
            _this.height = hSmall;
            _this.C = new Array();
            console.warn("setInitData");
            for (var hb = 0; hb < hBig; hb++)
                for (var wb = 1; wb <= wBig; wb++)
                    for (var hs = 0; hs < hSmall; hs++)
                        for (var ws = 1; ws <= wSmall; ws++) {
                            var row = wb + hb * wBig;
                            var col = hs * wSmall + ws;
                            var block = hs + 1 + hb * wBig;
                            var referenceNode = new index_1.ReferenceNode(row, col, block);
                            if (data[row - 1][col - 1] > 0) {
                                _this.C.push(data[row - 1][col - 1]);
                                _this.FIX.push(true);
                            }
                            else {
                                _this.C.push(0);
                                _this.FIX.push(false);
                            }
                            _this.RF.push(referenceNode.row.toString() + referenceNode.block.toString() + referenceNode.column.toString());
                        }
            return _this.C;
        };
        this.getResultForCell = function (index, RealIndex) {
            console.log("getResultForCell", index, RealIndex);
            return _this.getAvailableForCell(index, _this.RF, _this.C, _this.AvailableArray, RealIndex, _this.FIX);
        };
        this.solveSudoku = function (data, wSmall, hSmall, wBig, hBig) {
            console.log("solveSudoku", data);
            var C = new Array();
            var FIX = new Array();
            var RF = new Array();
            var AvailableArray = new Array();
            //var referenceFrameTemp = "";
            for (var hb = 0; hb < hBig; hb++)
                for (var wb = 1; wb <= wBig; wb++)
                    for (var hs = 0; hs < hSmall; hs++)
                        for (var ws = 1; ws <= wSmall; ws++) {
                            var row = wb + hb * wBig;
                            var col = hs * wSmall + ws;
                            var block = hs + 1 + hb * wBig;
                            //console.log(row, col, block);
                            var referenceNode = new index_1.ReferenceNode(row, col, block);
                            //console.log(referenceNode);
                            if (data[row - 1][col - 1] > 0) {
                                C.push(data[row - 1][col - 1]);
                                FIX.push(true);
                            }
                            else {
                                C.push(0);
                                FIX.push(false);
                            }
                            RF.push(referenceNode.row.toString() + referenceNode.block.toString() + referenceNode.column.toString());
                        }
            console.warn("RF", RF);
            var resultX;
            var RunCounter = 0;
            var RealIndex = new Array;
            for (var index = 0; index < 81; index++) {
                resultX = 0;
                if (C[index] === 0) {
                    if (RealIndex[index] === null || RealIndex[index] === undefined) {
                        RealIndex[index] = 0;
                    }
                    resultX = _this.getAvailableForCell(index, RF, C, AvailableArray, RealIndex, FIX);
                }
                if (resultX > 0) {
                    index = index - (1 + resultX);
                    RealIndex[index + 1]++;
                }
                RunCounter++;
                if (RunCounter > 10000) {
                    console.error("loop!!!");
                    break;
                }
            }
            //console.log("C", C)
            var sudokuResult = [];
            for (var i = 0; i < 9; i++) {
                sudokuResult[i] = [];
                for (var j = 0; j < 9; j++) {
                    //console.log("C at ", C[i * 9 + j])
                    sudokuResult[i][j] = C[i * 9 + j];
                }
            }
            return sudokuResult;
        };
        this.getAvailableForCell = function (index, RF, C, AvailableArray, RealIndex, FIX) {
            console.log("Reference", RF[index]);
            var result = 0;
            var TempListR = new Array(); //TempListR = [];
            var TempListB = new Array(); //TempListB = [];
            var TempListC = new Array(); //TempListC = [];
            var Row = RF[index].toString().charAt(0);
            var Block = RF[index].toString().charAt(1);
            var Colume = RF[index].toString().charAt(2);
            console.log("AvailableArray[index]", AvailableArray[index]);
            if (AvailableArray[index] == undefined)
                AvailableArray[index] = [];
            for (var i = 0; i < 81; i++) {
                if (RF[i] !== RF[index]) {
                    console.log("RF[i]", RF[i]);
                    if ((RF[i].charAt(0)) == Row) {
                        if (C[i] != 0)
                            TempListR.push(C[i]);
                    }
                    if ((RF[i].charAt(1)) == Block) {
                        if (C[i] != 0)
                            TempListB.push(C[i]);
                    }
                    if ((RF[i].charAt(2)) == Colume) {
                        if (C[i] != 0)
                            TempListC.push(C[i]);
                    }
                }
            }
            console.log("TempListC", TempListC);
            console.log("TempListB", TempListB);
            console.log("TempListR", TempListR);
            for (var i = 1; i < (_this.height * _this.width + 1); i++) {
                if ((TempListC.indexOf(i) === -1) &&
                    (TempListB.indexOf(i) === -1) &&
                    (TempListR.indexOf(i) === -1)) {
                    AvailableArray[index].push(i);
                }
            }
            console.log("AvailableArray", AvailableArray[index]);
            if (AvailableArray[index].length === 0) {
                //reset backward
                for (var i = index - 1; i >= 0; i--) {
                    if (!FIX[i]) {
                        C[i] = 0;
                        if (AvailableArray[i].length > 1 &&
                            (AvailableArray[i][RealIndex[i] + 1] !== null || AvailableArray[i][RealIndex[i] + 1] !== undefined)) {
                            result = index - i;
                            break;
                        }
                        else {
                            RealIndex[i] = 0;
                        }
                    }
                }
            }
            else {
                console.log("get ", RealIndex, index, RealIndex[index]);
                C[index] = AvailableArray[index][RealIndex[index]];
            }
            console.log("getAvailableForCell", result);
            return result;
        };
        this.referenceTable = function (wSmall, hSmall, wBig, hBig) {
            var result = new Array();
            for (var hb = 0; hb < hBig; hb++)
                for (var wb = 1; wb <= wBig; wb++)
                    for (var hs = 0; hs < hSmall; hs++)
                        for (var ws = 1; ws <= wSmall; ws++) {
                            //row,col,block
                            var row = wb + hb * wBig;
                            var col = hs * wSmall + ws;
                            var block = hs + 1 + hb * wBig;
                            console.log(row, col, block);
                        }
            console.log("result", result);
            return result;
        };
        console.log("constructor SudokuService");
    }
    return SudokuService;
}());
SudokuService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SudokuService);
exports.SudokuService = SudokuService;
//# sourceMappingURL=SudokuService.js.map