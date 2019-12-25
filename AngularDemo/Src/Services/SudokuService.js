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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Models = require("../Models/index");
var CellResult = /** @class */ (function () {
    function CellResult() {
    }
    return CellResult;
}());
exports.CellResult = CellResult;
var SudokuService = /** @class */ (function () {
    function SudokuService() {
        var _this = this;
        this.cellAvailableValues = new Array();
        this.RF = new Array();
        this.cells = new Array();
        this.fixeds = new Array();
        this.setInitData = function (data, wSmall, hSmall, wBig, hBig) {
            _this.width = wSmall;
            _this.height = hSmall;
            _this.areaS = _this.height * _this.width;
            _this.maxValue = _this.areaS + 1;
            _this.broadCellNumber = _this.areaS * _this.areaS;
            _this.cells = new Array();
            for (var hb = 0; hb < hBig; hb++)
                for (var wb = 1; wb <= wBig; wb++)
                    for (var hs = 0; hs < hSmall; hs++)
                        for (var ws = 1; ws <= wSmall; ws++) {
                            var row = wb + hb * wBig;
                            var col = hs * wSmall + ws;
                            var block = hs + 1 + hb * wBig;
                            var referenceNode = new Models.ReferenceNode(row, col, block);
                            if (data[row - 1][col - 1] > 0) {
                                _this.cells.push(data[row - 1][col - 1]);
                                _this.fixeds.push(true);
                            }
                            else {
                                _this.cells.push(0);
                                _this.fixeds.push(false);
                            }
                            _this.RF.push(referenceNode.row.toString() + referenceNode.block.toString() + referenceNode.column.toString());
                        }
            console.warn("setInitData", _this.cells);
            return _this.cells;
        };
        this.getReference = function (index) {
            var reference = _this.RF[index];
            var result = {
                row: parseInt(reference[0]),
                block: parseInt(reference[1]),
                column: parseInt(reference[2]),
                value: _this.cells[index],
                fix: _this.fixeds[index]
            };
            return result;
        };
        this.getResultForCell = function (index) {
            console.log("getResultForCell", index);
            _this.getCellAvailableValues(index);
            return;
        };
        this.getCellValue = function (index) {
            var result = 0;
            var availableValues = _this.getCellAvailableValues(index);
            if (availableValues.length > 0) {
                result = availableValues.pop();
                _this.cells[index] = result;
                _this.cellAvailableValues[index] = availableValues;
            }
            return result;
        };
        this.handleResetBackward = function (index, setTableResult) {
            var result;
            for (var j = index - 1; j >= 0; j--) {
                if (!_this.fixeds[j]) {
                    _this.cells[j] = 0;
                    if (_this.cellAvailableValues[j].length > 0) {
                        console.log("cellAvailableValues", _this.cellAvailableValues[j]);
                        _this.cells[j] = _this.cellAvailableValues[j].pop();
                        setTableResult(j, _this.cells[j]);
                        result = j + 1;
                        break;
                    }
                }
            }
            console.log("handleResetBackward", result);
            return result;
        };
        this.getCellAvailableValues = function (index) {
            console.log("getAvailableForCell", index, _this.RF[index], _this.cells);
            var result = [];
            var reference = _this.RF[index];
            var listRow = new Array(); //TempListR = [];
            var listBlock = new Array(); //TempListB = [];
            var listColumn = new Array(); //TempListC = [];
            var Row = reference[0];
            var Block = reference[1];
            var Colume = reference[2];
            for (var i = 0; i < _this.broadCellNumber; i++) {
                if (_this.RF[i] !== reference) {
                    if (_this.RF[i][0] == Row) {
                        if (_this.cells[i] != 0)
                            listRow.push(_this.cells[i]);
                    }
                    if (_this.RF[i][1] == Block) {
                        if (_this.cells[i] != 0)
                            listBlock.push(_this.cells[i]);
                    }
                    if (_this.RF[i][2] == Colume) {
                        if (_this.cells[i] != 0)
                            listColumn.push(_this.cells[i]);
                    }
                }
            }
            console.log("TempListC", listColumn);
            console.log("TempListB", listBlock);
            console.log("TempListR", listRow);
            for (var i_1 = 1; i_1 < _this.maxValue; i_1++) {
                if ((listColumn.indexOf(i_1) === -1) &&
                    (listBlock.indexOf(i_1) === -1) &&
                    (listRow.indexOf(i_1) === -1)) {
                    result.push(i_1);
                }
            }
            console.log("getAvailableForCell", result);
            return result;
        };
        //public solveSudoku = (data: number[][], wSmall: number, hSmall: number, wBig: number, hBig: number) =>
        //{
        //    console.log("solveSudoku", data);
        //    var C: number[] = new Array();
        //    var FIX: boolean[] = new Array();
        //    var RF: string[] = new Array();
        //    var AvailableArray: number[][] = new Array();
        //    //var referenceFrameTemp = "";
        //    for (var hb = 0; hb < hBig; hb++)
        //        for (var wb = 1; wb <= wBig; wb++)
        //            for (var hs = 0; hs < hSmall; hs++)
        //                for (var ws = 1; ws <= wSmall; ws++)
        //                {
        //                    var row = wb + hb * wBig;
        //                    var col = hs * wSmall + ws;
        //                    var block = hs + 1 + hb * wBig
        //                    //console.log(row, col, block);
        //                    var referenceNode: Models.IReferenceNode = new Models.ReferenceNode(row, col, block);
        //                    //console.log(referenceNode);
        //                    if (data[row - 1][col - 1] > 0)
        //                    {
        //                        C.push(data[row - 1][col - 1]);
        //                        FIX.push(true);
        //                    }
        //                    else
        //                    {
        //                        C.push(0);
        //                        FIX.push(false);
        //                    }
        //                    RF.push(referenceNode.row.toString() + referenceNode.block.toString() + referenceNode.column.toString());
        //                }
        //    console.warn("RF", RF);
        //    var resultX;
        //    var RunCounter = 0;
        //    var RealIndex = new Array;
        //    for (var index = 0; index < 81; index++)
        //    {
        //        resultX = 0;
        //        if (C[index] === 0)
        //        {
        //            if (RealIndex[index] === null || RealIndex[index] === undefined)
        //            {
        //                RealIndex[index] = 0;
        //            }
        //            resultX = this.getAvailableForCell(index, RF, C, AvailableArray, RealIndex, FIX);
        //        }
        //        if (resultX > 0)
        //        {
        //            index = index - (1 + resultX);
        //            RealIndex[index + 1]++;
        //        }
        //        RunCounter++;
        //        if (RunCounter > 10000)
        //        {
        //            console.error("loop!!!");
        //            break;
        //        }
        //    }
        //    //console.log("C", C)
        //    var sudokuResult: number[][] = [];
        //    for (var i = 0; i < 9; i++)
        //    {
        //        sudokuResult[i] = [];
        //        for (var j = 0; j < 9; j++)
        //        {
        //            //console.log("C at ", C[i * 9 + j])
        //            sudokuResult[i][j] = C[i * 9 + j];
        //        }
        //    }
        //    return sudokuResult;
        //}
        //private getAvailableForCell = (index: number, RF: string[], C: number[], AvailableArray: number[][], RealIndex: number[], FIX: boolean[]) =>
        //{
        //    console.log("Reference", RF[index]);
        //    var result = 0;
        //    var TempListR: number[] = new Array(); //TempListR = [];
        //    var TempListB: number[] = new Array(); //TempListB = [];
        //    var TempListC: number[] = new Array(); //TempListC = [];
        //    var Row = RF[index].toString().charAt(0);
        //    var Block = RF[index].toString().charAt(1);
        //    var Colume = RF[index].toString().charAt(2);
        //    console.log("AvailableArray[index]", AvailableArray[index]);
        //    if (AvailableArray[index] == undefined)
        //        AvailableArray[index] = [];
        //    console.log("lenght", this.areaB)
        //    for (var i = 0; i < this.areaB; i++)
        //    {
        //        if (RF[i] !== RF[index])
        //        {
        //            if ((RF[i].charAt(0)) == Row) 
        //            {
        //                if (C[i] != 0)
        //                    TempListR.push(C[i]);
        //            }
        //            if ((RF[i].charAt(1)) == Block)
        //            {
        //                if (C[i] != 0)
        //                    TempListB.push(C[i]);
        //            }
        //            if ((RF[i].charAt(2)) == Colume)
        //            {
        //                if (C[i] != 0)
        //                    TempListC.push(C[i]);
        //            }
        //        }
        //    }
        //    console.log("TempListC", TempListC);
        //    console.log("TempListB", TempListB);
        //    console.log("TempListR", TempListR);
        //    for (var i = 1; i < (this.areaS + 1); i++)
        //    {
        //        if ((TempListC.indexOf(i) === -1) &&
        //            (TempListB.indexOf(i) === -1) &&
        //            (TempListR.indexOf(i) === -1))
        //        {
        //            AvailableArray[index].push(i);
        //        }
        //    }
        //    console.log("AvailableArray", AvailableArray[index]);
        //    if (AvailableArray[index].length === 0)
        //    {
        //        //reset backward
        //        for (var i = index - 1; i >= 0; i--)
        //        {
        //            if (!FIX[i])
        //            {
        //                C[i] = 0;
        //                if (AvailableArray[i].length > 1 &&
        //                    (AvailableArray[i][RealIndex[i] + 1] !== null || AvailableArray[i][RealIndex[i] + 1] !== undefined))
        //                {
        //                    result = index - i;
        //                    break;
        //                }
        //                else
        //                {
        //                    RealIndex[i] = 0;
        //                }
        //            }
        //        }
        //    }
        //    else
        //    {
        //        console.log("get ", RealIndex, index, RealIndex[index]);
        //        C[index] = AvailableArray[index][RealIndex[index]];
        //    }
        //    console.log("getAvailableForCell", result);
        //    return result;
        //}
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
    SudokuService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], SudokuService);
    return SudokuService;
}());
exports.SudokuService = SudokuService;
//# sourceMappingURL=SudokuService.js.map