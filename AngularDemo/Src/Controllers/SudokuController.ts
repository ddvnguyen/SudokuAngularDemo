import { Component, Inject, ViewContainerRef, ChangeDetectorRef, NgModule, OnInit, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { SudokuService } from "../Services/SudokuService"

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
    public sudokuResult: number[][] = [[]];
    private currentIndex: number;
    public isStop: boolean = false;
    public runTime: number = 0;
    constructor( @Inject(SudokuService) private sudokuService: SudokuService)
    {
        console.warn("SudokuController constructor");
        this.scope = { sudokuData: undefined, sudokuResult: undefined, sudokuData12: undefined };
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

        this.scope.sudokuData = sudoku9;
        this.scope.sudokuData12 = sudoku12;

        Object.assign(this.sudokuResult, this.scope.sudokuData);

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

    public runSolve = () =>
    {
        console.warn("Data", this.sudokuResult, this.scope.sudokuData);
        var C = this.sudokuService.setInitData(this.scope.sudokuData, 3, 3, 3, 3);
        var width: number = 3;
        var height: number = 3;
        this.currentIndex = 0;
        var resultX: number;
        this.runTime = 0;
        var RealIndex: number[] = new Array;


        for (this.currentIndex = 0; this.currentIndex < 81; this.currentIndex++)
        {

            if (this.isStop)
                break;

            var i = Math.floor((this.currentIndex) / (width * height));
            var j = (this.currentIndex + 1) % (width * height);
            console.log("index", this.currentIndex, i, j);

            resultX = 0;

            if (C[this.currentIndex] === 0)
            {
                if (RealIndex[this.currentIndex] === null || RealIndex[this.currentIndex] === undefined)
                    RealIndex[this.currentIndex] = 0;

                resultX = this.sudokuService.getResultForCell(this.currentIndex, RealIndex);
                this.sudokuResult[i][j] = C[this.currentIndex];
            }

            if (resultX > 0)
            {
                this.currentIndex = this.currentIndex - (1 + resultX);
                RealIndex[this.currentIndex + 1]++;
            }
            this.runTime++;

            if (this.runTime > 10000)
            {
                console.error("loop!!!");
                break;
            }
        }

    }
}
