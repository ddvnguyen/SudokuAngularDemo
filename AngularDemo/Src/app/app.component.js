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
var AppComponent = (function () {
    function AppComponent(sudokuService) {
        this.sudokuService = sudokuService;
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
        this.scope.sudokuData = sudoku12;
        this.scope.sudokuData12 = sudoku12;
        var result = this.sudokuService.solveSudoku(this.scope.sudokuData, 4, 3, 4, 3);
        this.scope.sudokuResult = result;
        console.warn("Question", this.scope.sudokuData);
        console.warn("Anwser", this.scope.sudokuResult);
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app.component.html',
        styleUrls: ['app.component.css'],
        moduleId: module.id
    }),
    __param(0, core_1.Inject(SudokuService_1.SudokuService)),
    __metadata("design:paramtypes", [SudokuService_1.SudokuService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map