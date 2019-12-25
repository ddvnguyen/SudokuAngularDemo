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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SudokuService_1 = require("../Services/SudokuService");
var Utils_1 = require("../Utils/Utils");
var Models = require("../Models/index");
var SudokuWasmService_1 = require("../Services/SudokuWasmService");
var SudokuController = /** @class */ (function () {
    function SudokuController(sudokuService, sudokuWasmService) {
        var _this = this;
        this.sudokuService = sudokuService;
        this.sudokuWasmService = sudokuWasmService;
        this.sudokuResult = new Array();
        this.isStop = false;
        this.isPause = false;
        this.runTime = 0;
        this.runSolveWasm = function () {
            var sudokuDataArray = [
                0, 0, 6, 0, 3, 0, 0, 0, 0,
                4, 0, 7, 1, 0, 0, 0, 2, 6,
                0, 8, 0, 2, 5, 0, 7, 4, 1,
                2, 6, 3, 7, 0, 8, 5, 0, 4,
                0, 4, 0, 0, 0, 0, 0, 0, 0,
                5, 0, 1, 6, 0, 3, 2, 7, 8,
                9, 7, 4, 0, 6, 5, 0, 3, 0,
                8, 3, 0, 0, 0, 1, 4, 0, 7,
                0, 0, 0, 0, 7, 0, 9, 0, 0
            ];
            _this.sudokuResult = _this.sudokuWasmService.sudokuSolve(sudokuDataArray);
        };
        this.runSolve = function () {
            console.error("__________________________________________________________________");
            console.warn("Data", _this.sudokuResult, _this.scope.sudokuData);
            var sudokuTable = new Models.SudokuTable(_this.scope.sudokuData, _this.broadWidth, _this.broadHeight);
            console.log("sudokuTable", sudokuTable);
            _this.sudokuService.setInitData(_this.sudokuResult, _this.broadWidth, _this.broadHeight, _this.broadWidth, _this.broadHeight);
            _this.currentIndex = 0;
            _this.runTime = 0;
            var loop = setInterval(function () {
                var setTableResult = function (index, value) {
                    var i = Math.floor((index) / (_this.broadWidth * _this.broadHeight));
                    var j = (index) % (_this.broadWidth * _this.broadHeight);
                    _this.sudokuResult[i][j] = value;
                };
                if (!_this.isPause) {
                    if (_this.currentIndex > (_this.broadWidth * _this.broadWidth * _this.broadHeight * _this.broadHeight) - 1 ||
                        _this.isStop ||
                        _this.runTime > 10000) {
                        clearInterval(loop);
                    }
                    else {
                        if (!_this.sudokuService.fixeds[_this.currentIndex]) {
                            var cellResult = _this.sudokuService.getCellValue(_this.currentIndex);
                            if (cellResult <= 0) {
                                var newIndex = _this.sudokuService.handleResetBackward(_this.currentIndex, setTableResult);
                                _this.clearBroad(newIndex, _this.currentIndex - newIndex);
                                _this.currentIndex = newIndex;
                            }
                            else {
                                setTableResult(_this.currentIndex, cellResult);
                                _this.currentIndex++;
                            }
                        }
                        else {
                            _this.currentIndex++;
                        }
                        _this.runTime++;
                    }
                }
            }, 0);
            if (_this.runTime > 10000)
                console.error("loop!!!");
            _this.isStop = false;
        };
        this.stopRunning = function () {
            console.warn("stopRunning");
            _this.isStop = true;
            _this.isPause = false;
            _this.clearBroad(0);
        };
        this.clearBroad = function (index, number) {
            var limit = 81;
            if (number !== undefined && number !== null)
                limit = index + number;
            for (index; index < limit; index++) {
                var i = Math.floor((index) / (_this.broadWidth * _this.broadHeight));
                var j = (index) % (_this.broadWidth * _this.broadHeight);
                if (_this.scope.sudokuData[i][j] === 0)
                    _this.sudokuResult[i][j] = 0;
            }
        };
        this.broadWidth = 3;
        this.broadHeight = 3;
        console.warn("SudokuController constructor");
        this.scope = { sudokuData: new Array(), sudokuResult: new Array(), sudokuData12: new Array() };
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
        this.sudokuResult = Utils_1.Utils.deepCopy(sudoku9);
        this.scope.sudokuData = Utils_1.Utils.deepCopy(sudoku9);
        this.broadWidth = 3;
        this.broadHeight = 3;
        //this.scope.sudokuData = Object.create(sudoku9);
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
    SudokuController = __decorate([
        core_1.Component({
            selector: 'sudoku-app',
            templateUrl: 'SudokuController.html',
            moduleId: module.id
        }),
        __param(0, core_1.Inject(SudokuService_1.SudokuService)),
        __param(1, core_1.Inject(SudokuWasmService_1.SudokuWasmService)),
        __metadata("design:paramtypes", [SudokuService_1.SudokuService,
            SudokuWasmService_1.SudokuWasmService])
    ], SudokuController);
    return SudokuController;
}());
exports.SudokuController = SudokuController;
//# sourceMappingURL=SudokuController.js.map