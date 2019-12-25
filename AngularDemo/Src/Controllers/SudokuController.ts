import { Component, Inject, ViewContainerRef, ChangeDetectorRef, NgModule, OnInit, OnDestroy, AfterViewInit, NgZone } from '@angular/core';

import { SudokuService } from "../Services/SudokuService";
import { Utils } from "../Utils/Utils"
import * as Models from "../Models/index";
import { SudokuWasmService } from '../Services/SudokuWasmService';


@Component
    ({
        selector: 'sudoku-app',
        templateUrl: 'SudokuController.html',
        moduleId: module.id
    })
export class SudokuController
{
    public scope:
        {
            sudokuData: number[][],
            sudokuResult: number[][],
            sudokuData12: number[][]
        }
    public sudokuResult: number[][] = new Array();
    private currentIndex: number;
    private broadWidth: number;
    private broadHeight: number;

    public isStop: boolean = false;
    public isPause: boolean = false;
    public runTime: number = 0;


    constructor(@Inject(SudokuService) private sudokuService: SudokuService,
        @Inject(SudokuWasmService) private sudokuWasmService: SudokuWasmService)
    {
        this.broadWidth = 3;
        this.broadHeight = 3;
        console.warn("SudokuController constructor");
        this.scope = { sudokuData: new Array(), sudokuResult: new Array(), sudokuData12: new Array() };
        var sudoku12 =
            [
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

        var sudoku9 =
            [
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

        this.sudokuResult = Utils.deepCopy(sudoku9);
        this.scope.sudokuData = Utils.deepCopy(sudoku9);
        this.broadWidth = 3;
        this.broadHeight = 3;
        //this.scope.sudokuData = Object.create(sudoku9);

        //var result = this.sudokuService.solveSudoku(this.scope.sudokuData, 4, 3, 4, 3);
        //var result = this.sudokuService.solveSudoku(this.scope.sudokuData, 3, 3, 3, 3); 
    }

    public cellClass(fix: boolean, index: number)
    {
        var classStr: string = "";

        if (this.currentIndex === index)
            classStr = "current-cell";

        if (fix)
            classStr = "fixed-cell";

        //console.log(fix, index, classStr);
        return classStr;
    }

    public runSolveWasm = () =>
    {
        let sudokuDataArray =
            [
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
        this.sudokuResult = this.sudokuWasmService.sudokuSolve(sudokuDataArray);
    }

    public runSolve = () =>
    {
        console.error("__________________________________________________________________");
        console.warn("Data", this.sudokuResult, this.scope.sudokuData);

        var sudokuTable: Models.ISudokuTable = new Models.SudokuTable(this.scope.sudokuData, this.broadWidth, this.broadHeight);
        console.log("sudokuTable", sudokuTable);

        this.sudokuService.setInitData(this.sudokuResult, this.broadWidth, this.broadHeight, this.broadWidth, this.broadHeight);
        this.currentIndex = 0;
        this.runTime = 0;

        var loop = setInterval(() =>
        {

            var setTableResult = (index: number, value:number) =>
            {
                let i: number = Math.floor((index) / (this.broadWidth * this.broadHeight));
                let j: number = (index) % (this.broadWidth * this.broadHeight);
                this.sudokuResult[i][j] = value;
            }

            if (!this.isPause)
            {
                if (this.currentIndex > (this.broadWidth * this.broadWidth * this.broadHeight * this.broadHeight) - 1 ||
                    this.isStop ||
                    this.runTime > 10000)
                {
                    clearInterval(loop);
                }
                else
                {
                    if (!this.sudokuService.fixeds[this.currentIndex])
                    {
                        let cellResult = this.sudokuService.getCellValue(this.currentIndex);

                        if (cellResult <= 0)
                        {
                            let newIndex = this.sudokuService.handleResetBackward(this.currentIndex, setTableResult);

                            this.clearBroad(newIndex, this.currentIndex - newIndex);
                            this.currentIndex = newIndex;
                        }
                        else
                        {
                            setTableResult(this.currentIndex, cellResult)

                            this.currentIndex++;
                        }
                    }
                    else
                    {
                        this.currentIndex++;
                    }

                    this.runTime++;
                }
            }

        }, 0);

        if (this.runTime > 10000)
            console.error("loop!!!");

        this.isStop = false;
    }

    public stopRunning = () =>
    {
        console.warn("stopRunning");
        this.isStop = true;
        this.isPause = false;
        this.clearBroad(0);
    }

    public clearBroad = (index: number, number?: number) =>
    {
        var limit: number = 81;
        if (number !== undefined && number !== null)
            limit = index + number;

        for (index; index < limit; index++)
        {
            var i = Math.floor((index) / (this.broadWidth * this.broadHeight));
            var j = (index) % (this.broadWidth * this.broadHeight);

            if (this.scope.sudokuData[i][j] === 0)
                this.sudokuResult[i][j] = 0;
        }
    }

}
