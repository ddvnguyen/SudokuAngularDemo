import { Injectable, Inject } from '@angular/core';
import * as Models from "../Models/index";

export class CellResult
{
    value: number;
    availableValues: number[];
}


@Injectable()
export class SudokuService
{
    constructor()
    {
        console.log("constructor SudokuService");
    }

    private cellAvailableValues: number[][] = new Array();
    private RF: string[] = new Array();
    private width: number;
    private height: number;
    private areaS: number;
    private maxValue: number;
    private broadCellNumber: number;

    public cells: number[] = new Array();
    public fixeds: boolean[] = new Array();


    public setInitData = (data: number[][], wSmall: number, hSmall: number, wBig: number, hBig: number) =>
    {
        this.width = wSmall;
        this.height = hSmall;
        this.areaS = this.height * this.width;
        this.maxValue = this.areaS + 1;
        this.broadCellNumber = this.areaS * this.areaS;
        this.cells = new Array();

        for (var hb = 0; hb < hBig; hb++)
            for (var wb = 1; wb <= wBig; wb++)
                for (var hs = 0; hs < hSmall; hs++)
                    for (var ws = 1; ws <= wSmall; ws++)
                    {
                        var row = wb + hb * wBig;
                        var col = hs * wSmall + ws;
                        var block = hs + 1 + hb * wBig

                        var referenceNode: Models.IReferenceNode = new Models.ReferenceNode(row, col, block);

                        if (data[row - 1][col - 1] > 0)
                        {
                            this.cells.push(data[row - 1][col - 1]);
                            this.fixeds.push(true);
                        }
                        else
                        {
                            this.cells.push(0);
                            this.fixeds.push(false);
                        }

                        this.RF.push(referenceNode.row.toString() + referenceNode.block.toString() + referenceNode.column.toString());
                    }
        console.warn("setInitData", this.cells);
        return this.cells;
    }

    public getReference = (index: number) =>
    {
        let reference: string = this.RF[index];

        let result: Models.IReferenceNode =
        {
            row: parseInt(reference[0]),
            block: parseInt(reference[1]),
            column: parseInt(reference[2]),
            value: this.cells[index],
            fix: this.fixeds[index]
        }
        return result;
    }


    public getResultForCell = (index: number) =>
    {
        console.log("getResultForCell", index);
        this.getCellAvailableValues(index);
        return
    }

    public getCellValue = (index: number): number =>
    {
        let result: number = 0;

        let availableValues = this.getCellAvailableValues(index);
        if (availableValues.length > 0)
        {
            result = availableValues.pop();

            this.cells[index] = result;
            this.cellAvailableValues[index] = availableValues;
        }

        return result;
    }

    public handleResetBackward = (index: number, setTableResult: (index: number, value: number) => void) =>
    {
        let result
        for (let j = index - 1; j >= 0; j--)
        {
            if (!this.fixeds[j])
            {
                this.cells[j] = 0;
                if (this.cellAvailableValues[j].length > 0)
                {
                    console.log("cellAvailableValues", this.cellAvailableValues[j]);
                    this.cells[j] = this.cellAvailableValues[j].pop();
                    setTableResult(j, this.cells[j]);
                    result = j + 1;
                    break;
                }
            }
        }

        console.log("handleResetBackward", result);

        return result;
    }


    private getCellAvailableValues = (index: number) =>
    {
        console.log("getAvailableForCell", index, this.RF[index], this.cells);
        let result: number[] = [];

        let reference: string = this.RF[index];
        var listRow: number[] = new Array(); //TempListR = [];
        var listBlock: number[] = new Array(); //TempListB = [];
        var listColumn: number[] = new Array(); //TempListC = [];
        var Row = reference[0];
        var Block = reference[1];
        var Colume = reference[2];

        for (var i = 0; i < this.broadCellNumber; i++)
        {
            if (this.RF[i] !== reference)
            {
                if (this.RF[i][0] == Row) 
                {
                    if (this.cells[i] != 0)
                        listRow.push(this.cells[i]);
                }

                if (this.RF[i][1] == Block)
                {
                    if (this.cells[i] != 0)
                        listBlock.push(this.cells[i]);
                }

                if (this.RF[i][2] == Colume)
                {
                    if (this.cells[i] != 0)
                        listColumn.push(this.cells[i]);
                }
            }
        }

        console.log("TempListC", listColumn);
        console.log("TempListB", listBlock);
        console.log("TempListR", listRow);

        for (let i = 1; i < this.maxValue; i++)
        {
            if ((listColumn.indexOf(i) === -1) &&
                (listBlock.indexOf(i) === -1) &&
                (listRow.indexOf(i) === -1))
            {
                result.push(i);
            }
        }

        console.log("getAvailableForCell", result);
        return result;
    }

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

    public referenceTable = (wSmall: number, hSmall: number, wBig: number, hBig: number) =>
    {
        var result: Models.ReferenceNode[] = new Array<Models.ReferenceNode>();
        for (var hb = 0; hb < hBig; hb++)
            for (var wb = 1; wb <= wBig; wb++)
                for (var hs = 0; hs < hSmall; hs++)
                    for (var ws = 1; ws <= wSmall; ws++)
                    {
                        //row,col,block
                        var row = wb + hb * wBig;
                        var col = hs * wSmall + ws;
                        var block = hs + 1 + hb * wBig
                        console.log(row, col, block);
                    }

        console.log("result", result);
        return result;
    }
}