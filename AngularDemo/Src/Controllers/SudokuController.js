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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var SudokuService_1 = require("../Services/SudokuService");
var SudokuController = (function () {
    function SudokuController(sudokuService) {
        var _this = this;
        this.sudokuService = sudokuService;
        this.sudokuResult = [[]];
        this.isStop = false;
        this.runTime = 0;
        this.runSolve = function () {
            console.warn("Data", _this.sudokuResult, _this.scope.sudokuData);
            var C = _this.sudokuService.setInitData(_this.scope.sudokuData, 3, 3, 3, 3);
            var width = 3;
            var height = 3;
            _this.currentIndex = 0;
            var resultX;
            _this.runTime = 0;
            var RealIndex = new Array;
            for (_this.currentIndex = 0; _this.currentIndex < 81; _this.currentIndex++) {
                if (_this.isStop)
                    break;
                var i = Math.floor((_this.currentIndex) / (width * height));
                var j = (_this.currentIndex + 1) % (width * height);
                console.log("index", _this.currentIndex, i, j);
                resultX = 0;
                if (C[_this.currentIndex] === 0) {
                    if (RealIndex[_this.currentIndex] === null || RealIndex[_this.currentIndex] === undefined)
                        RealIndex[_this.currentIndex] = 0;
                    resultX = _this.sudokuService.getResultForCell(_this.currentIndex, RealIndex);
                    _this.sudokuResult[i][j] = C[_this.currentIndex];
                }
                if (resultX > 0) {
                    _this.currentIndex = _this.currentIndex - (1 + resultX);
                    RealIndex[_this.currentIndex + 1]++;
                }
                _this.runTime++;
                if (_this.runTime > 10000) {
                    console.error("loop!!!");
                    break;
                }
            }
        };
        console.warn("SudokuController constructor");
        this.scope = { sudokuData: undefined, sudokuResult: undefined, sudokuData12: undefined };
        var sudoku12 = [
            [7, 0, 0, 0, 0, 0, 6, 0, 4, 12, 9, 0],
            [0, 0, 4, 0, 1, 12, 4, 0, 0, 11, 0, 0],
            [0, 0, 0, 5, 0, 0, 8, 4, 0, 0, 3, 0],
            [4, 0, 0, 0, 0, 0, 12, 0, 7, 0, 10, 0],
            [8, 11, 12, 2, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 6, 7, 10, 5, 0, 3, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 1, 12, 4, 0, 0],
            [0, 0, 0, 0, 0, 7, 0, 0, 8, 3, 1, 5],
            [0, 8, 0, 11, 0, 5, 0, 0, 0, 0, 0, 2],
            [0, 4, 0, 0, 3, 11, 0, 0, 5, 0, 0, 0],
            [0, 0, 8, 0, 0, 0, 10, 12, 0, 2, 0, 0],
            [0, 2, 3, 7, 0, 9, 0, 0, 0, 0, 0, 6],
        ];
        var sudoku9 = [
            [0, 0, 6, 0, 3, 0, 0, 0, 0],
            [4, 0, 7, 1, 0, 0, 0, 2, 6],
            [0, 8, 0, 2, 5, 0, 7, 4, 1],
            [2, 6, 3, 7, 0, 8, 5, 0, 4],
            [0, 4, 0, 0, 0, 0, 0, 0, 0],
            [5, 0, 1, 6, 0, 3, 2, 7, 8],
            [9, 7, 4, 0, 6, 5, 0, 3, 0],
            [8, 3, 0, 0, 0, 1, 4, 0, 7],
            [0, 0, 0, 0, 7, 0, 9, 0, 0]
        ];
        this.scope.sudokuData = sudoku9;
        this.scope.sudokuData12 = sudoku12;
        Object.assign(this.sudokuResult, this.scope.sudokuData);
        //var result = this.sudokuService.solveSudoku(this.scope.sudokuData, 4, 3, 4, 3);
        //var result = this.sudokuService.solveSudoku(this.scope.sudokuData, 3, 3, 3, 3); 
    }
    SudokuController.prototype.cellClass = function (fix, index) {
        var classStr = "";
        if (this.currentIndex === index)
            classStr = "current-cell";
        if (fix)
            classStr = "fixed-cell";
        //console.log(fix, index, classStr);
        return classStr;
    };
    return SudokuController;
}());
SudokuController = __decorate([
    core_1.Component({
        selector: 'sudoku-app',
        templateUrl: 'SudokuController.html',
        moduleId: module.id
    }),
    __param(0, core_1.Inject(SudokuService_1.SudokuService)),
    __metadata("design:paramtypes", [SudokuService_1.SudokuService])
], SudokuController);
exports.SudokuController = SudokuController;
//# sourceMappingURL=SudokuController.js.map