import { Injectable } from "@angular/core";
import * as Module from '../Wasm/sudokuModule.js';
//import '!!file-loader?name=wasm/sudokuModule.wasm!../../Src/Services/sudokuModule.wasm';
//declare var Module: any;

@Injectable()
export class SudokuWasmService
{
    private sudokuWasmModule: any;

    constructor()
    {
        console.log("constructor SudokuWasmService");
        this.instantiateWasm();
    }

    public sudokuSolve = (input: number[]) =>
    {
        if (input.length == 81)
        {
            var result = this.ptrToArray(this.sudokuWasmModule._sudokuSolve(this.arrayToPtr(input)), 81, 4);
            return this.convert2wayArray(result);
        }
    }

    private instantiateWasm()
    {
        fetch("./Src/Wasm/sudokuModule.wasm").then((wasmFile) =>
        {
            wasmFile.arrayBuffer().then((binary) =>
            {
                const moduleArgs = {
                    wasmBinary: binary,
                    onRuntimeInitialized: () =>
                    {
                        // TODO
                    }
                };
                this.sudokuWasmModule = Module(moduleArgs);
            })
        });
    }

    private convert2wayArray = (data: number[]) =>
    {
        let result: number[][] = [];
        if (data.length == 81)
        {
            for (let i = 0; i < 9; i++)
            {
                result[i] = data.splice(0, 9);
            }
        }

        return result;
    }

    private arrayToPtr(array: number[])
    {
        let nByte = 4
        let ptr = this.sudokuWasmModule._malloc(array.length * nByte)
        this.sudokuWasmModule.HEAP32.set(array, ptr / nByte)
        return ptr;
    }

    private ptrToArray = (ptr: any, length: number, nByte: number): number[] =>
    {
        let pos = ptr / nByte;
        let array = new Int32Array(length)
        array.set(this.sudokuWasmModule.HEAP32.subarray(pos, pos + 81));
        return Array.prototype.slice.call(array);
    }
}