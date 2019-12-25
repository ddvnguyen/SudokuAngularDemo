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
var Module = require("../Wasm/sudokuModule.js");
//import '!!file-loader?name=wasm/sudokuModule.wasm!../../Src/Services/sudokuModule.wasm';
//declare var Module: any;
var SudokuWasmService = /** @class */ (function () {
    function SudokuWasmService() {
        var _this = this;
        this.sudokuSolve = function (input) {
            if (input.length == 81) {
                var result = _this.ptrToArray(_this.sudokuWasmModule._sudokuSolve(_this.arrayToPtr(input)), 81, 4);
                return _this.convert2wayArray(result);
            }
        };
        this.convert2wayArray = function (data) {
            var result = [];
            if (data.length == 81) {
                for (var i = 0; i < 9; i++) {
                    result[i] = data.splice(0, 9);
                }
            }
            return result;
        };
        this.ptrToArray = function (ptr, length, nByte) {
            var pos = ptr / nByte;
            var array = new Int32Array(length);
            array.set(_this.sudokuWasmModule.HEAP32.subarray(pos, pos + 81));
            return Array.prototype.slice.call(array);
        };
        console.log("constructor SudokuWasmService");
        this.instantiateWasm();
    }
    SudokuWasmService.prototype.instantiateWasm = function () {
        var _this = this;
        fetch("./Src/Wasm/sudokuModule.wasm").then(function (wasmFile) {
            wasmFile.arrayBuffer().then(function (binary) {
                var moduleArgs = {
                    wasmBinary: binary,
                    onRuntimeInitialized: function () {
                        // TODO
                    }
                };
                _this.sudokuWasmModule = Module(moduleArgs);
            });
        });
    };
    SudokuWasmService.prototype.arrayToPtr = function (array) {
        var nByte = 4;
        var ptr = this.sudokuWasmModule._malloc(array.length * nByte);
        this.sudokuWasmModule.HEAP32.set(array, ptr / nByte);
        return ptr;
    };
    SudokuWasmService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], SudokuWasmService);
    return SudokuWasmService;
}());
exports.SudokuWasmService = SudokuWasmService;
//# sourceMappingURL=SudokuWasmService.js.map