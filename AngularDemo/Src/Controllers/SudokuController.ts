import { Component, Inject, ViewContainerRef, ChangeDetectorRef, NgModule, OnInit, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { SudokuService } from "../Services/SudokuService";
import { Observable } from "rxjs/Rx";

import { Utils } from "../Utils/Utils"
import * as Models from "../Models/index";


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


    constructor( @Inject(SudokuService) private sudokuService: SudokuService)
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

        //this.scope.sudokuData = sudoku9;
        //this.scope.sudokuData12 = sudoku12;
        //this.sudokuResult = sudoku9;
        this.sudokuResult = Utils.deepCopy(sudoku12);
        this.scope.sudokuData = Utils.deepCopy(sudoku12);
        this.broadWidth = 4;
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

    public runSolve = () =>
    {
        console.error("__________________________________________________________________");
        console.warn("Data", this.sudokuResult, this.scope.sudokuData);

        var sudokuTable: Models.ISudokuTable = new Models.SudokuTable(this.scope.sudokuData, this.broadWidth, this.broadHeight);
        console.log("sudokuTable", sudokuTable);

        var C = this.sudokuService.setInitData(this.sudokuResult, this.broadWidth, this.broadHeight, this.broadWidth, this.broadHeight);
        this.currentIndex = 0;
        var resultX: number;
        this.runTime = 0;
        var RealIndex: number[] = new Array;

        var loop = setInterval(() =>
        {
            if (!confirm("Go Next?"))
                clearInterval(loop);

            if (!this.isPause)
                if (this.currentIndex > 80 || this.isStop || this.runTime > 10000)
                    clearInterval(loop);
                else
                {

                    var i = Math.floor((this.currentIndex) / (this.broadWidth * this.broadHeight));
                    var j = (this.currentIndex) % (this.broadWidth * this.broadHeight);
                    //console.log("index", this.currentIndex, i, j);

                    resultX = 0;

                    console.log("C", this.currentIndex, C[this.currentIndex]);
                    if (C[this.currentIndex] === 0)
                    {
                        if (RealIndex[this.currentIndex] === null || RealIndex[this.currentIndex] === undefined)
                            RealIndex[this.currentIndex] = 0;

                        resultX = this.sudokuService.getResultForCell(this.currentIndex, RealIndex)
                        this.sudokuResult[i][j] = C[this.currentIndex];
                    }

                    if (resultX > 0)
                    {
                        this.currentIndex = this.currentIndex - (1 + resultX);
                        this.clearBroad(this.currentIndex + 1, 1 + resultX);
                        RealIndex[this.currentIndex + 1]++;
                    }

                    this.runTime++;
                    this.currentIndex++;
                    //console.log("Question Data:", this.scope.sudokuData);
                    //console.log("Answer Data:", this.sudokuResult);
                }

        }, 200);

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
