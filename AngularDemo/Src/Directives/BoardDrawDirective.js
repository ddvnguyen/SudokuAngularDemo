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
var SudokuBoard = /** @class */ (function () {
    function SudokuBoard() {
        console.warn("BoardDrawDirective constructor", this.sudokuData, this.sudokuResult);
    }
    SudokuBoard.prototype.ngOnInit = function () {
        console.log("SudokuBoard ngOnInit", this.sudokuData, this.sudokuResult);
    };
    SudokuBoard.prototype.ngAfterViewInit = function () {
        console.log("SudokuBoard ngAfterViewInit", this.sudokuData, this.sudokuResult);
    };
    SudokuBoard.prototype.ngOnChanges = function () {
        console.log("SudokuBoard ngOnChanges");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], SudokuBoard.prototype, "sudokuData", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], SudokuBoard.prototype, "sudokuResult", void 0);
    SudokuBoard = __decorate([
        core_1.Component({ selector: "board-draw", templateUrl: "./BoardDrawDirective.html" }),
        __metadata("design:paramtypes", [])
    ], SudokuBoard);
    return SudokuBoard;
}());
exports.SudokuBoard = SudokuBoard;
//# sourceMappingURL=BoardDrawDirective.js.map