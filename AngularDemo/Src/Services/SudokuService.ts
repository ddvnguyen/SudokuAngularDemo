import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as Models from "../Models/index";

@Injectable()
export class SudokuService
{
    constructor()
    {
        console.log("constructor SudokuService");
    }

    private AvailableArray: number[][] = new Array();
    private FIX: boolean[] = new Array();
    private RF: string[] = new Array();
    private C: number[] = new Array();
    private width: number;
    private height: number;
    private areaS:number;
    private areaB:number;


    public setInitData = (data: number[][], wSmall: number, hSmall: number, wBig: number, hBig: number) =>
    {
        this.width = wSmall;
        this.height = hSmall;
        this.areaS = this.height * this.width;
        this.areaB = this.areaS * this.areaS;
        this.C = new Array();
        console.warn("setInitData");
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
                            this.C.push(data[row - 1][col - 1]);
                            this.FIX.push(true);
                        }
                        else
                        {
                            this.C.push(0);
                            this.FIX.push(false);
                        }

                        this.RF.push(referenceNode.row.toString() + referenceNode.block.toString() + referenceNode.column.toString());
                    }

        return this.C;
    }

    public getResultForCell = (index: number, RealIndex: number[]) =>
    {
        console.log("getResultForCell", index, RealIndex);
        return this.getAvailableForCell(index, this.RF, this.C, this.AvailableArray, RealIndex, this.FIX);
    }

    public solveSudoku = (data: number[][], wSmall: number, hSmall: number, wBig: number, hBig: number) =>
    {
        console.log("solveSudoku", data);
        var C: number[] = new Array();
        var FIX: boolean[] = new Array();
        var RF: string[] = new Array();
        var AvailableArray: number[][] = new Array();

        //var referenceFrameTemp = "";

        for (var hb = 0; hb < hBig; hb++)
            for (var wb = 1; wb <= wBig; wb++)
                for (var hs = 0; hs < hSmall; hs++)
                    for (var ws = 1; ws <= wSmall; ws++)
                    {
                        var row = wb + hb * wBig;
                        var col = hs * wSmall + ws;
                        var block = hs + 1 + hb * wBig
                        //console.log(row, col, block);

                        var referenceNode: Models.IReferenceNode = new Models.ReferenceNode(row, col, block);
                        //console.log(referenceNode);

                        if (data[row - 1][col - 1] > 0)
                        {
                            C.push(data[row - 1][col - 1]);
                            FIX.push(true);
                        }
                        else
                        {
                            C.push(0);
                            FIX.push(false);
                        }

                        RF.push(referenceNode.row.toString() + referenceNode.block.toString() + referenceNode.column.toString());
                    }

        console.warn("RF", RF);

        var resultX;
        var RunCounter = 0;
        var RealIndex = new Array;

        for (var index = 0; index < 81; index++)
        {
            resultX = 0;

            if (C[index] === 0)
            {
                if (RealIndex[index] === null || RealIndex[index] === undefined)
                {
                    RealIndex[index] = 0;
                }
                resultX = this.getAvailableForCell(index, RF, C, AvailableArray, RealIndex, FIX);
            }

            if (resultX > 0)
            {
                index = index - (1 + resultX);
                RealIndex[index + 1]++;
            }
            RunCounter++;

            if (RunCounter > 10000)
            {
                console.error("loop!!!");
                break;
            }
        }

        //console.log("C", C)
        var sudokuResult: number[][] = [];
        for (var i = 0; i < 9; i++)
        {
            sudokuResult[i] = [];
            for (var j = 0; j < 9; j++)
            {
                //console.log("C at ", C[i * 9 + j])
                sudokuResult[i][j] = C[i * 9 + j];
            }
        }
        return sudokuResult;
    }

    private getAvailableForCell = (index: number, RF: string[], C: number[], AvailableArray: number[][], RealIndex: number[], FIX: boolean[]) =>
    {
        console.log("Reference", RF[index]);
        var result = 0;
        var TempListR: number[] = new Array(); //TempListR = [];
        var TempListB: number[] = new Array(); //TempListB = [];
        var TempListC: number[] = new Array(); //TempListC = [];
        var Row = RF[index].toString().charAt(0);
        var Block = RF[index].toString().charAt(1);
        var Colume = RF[index].toString().charAt(2);
        console.log("AvailableArray[index]", AvailableArray[index]);
        if (AvailableArray[index] == undefined)
            AvailableArray[index] = [];
        console.log("lenght", this.areaB)

        for (var i = 0; i < this.areaB; i++)
        {
            if (RF[i] !== RF[index])
            {
                if ((RF[i].charAt(0)) == Row) 
                {
                    if (C[i] != 0)
                        TempListR.push(C[i]);
                }

                if ((RF[i].charAt(1)) == Block)
                {
                    if (C[i] != 0)
                        TempListB.push(C[i]);
                }

                if ((RF[i].charAt(2)) == Colume)
                {
                    if (C[i] != 0)
                        TempListC.push(C[i]);
                }
            }
        }

        console.log("TempListC", TempListC);
        console.log("TempListB", TempListB);
        console.log("TempListR", TempListR);

        for (var i = 1; i < (this.areaS + 1); i++)
        {
            if ((TempListC.indexOf(i) === -1) &&
                (TempListB.indexOf(i) === -1) &&
                (TempListR.indexOf(i) === -1))
            {
                AvailableArray[index].push(i);
            }
        }

        console.log("AvailableArray", AvailableArray[index]);

        if (AvailableArray[index].length === 0)
        {
            //reset backward
            for (var i = index - 1; i >= 0; i--)
            {
                if (!FIX[i])
                {
                    C[i] = 0;
                    if (AvailableArray[i].length > 1 &&
                        (AvailableArray[i][RealIndex[i] + 1] !== null || AvailableArray[i][RealIndex[i] + 1] !== undefined))
                    {
                        result = index - i;
                        break;
                    }
                    else
                    {
                        RealIndex[i] = 0;
                    }
                }
            }
        }
        else
        {
            console.log("get ", RealIndex, index, RealIndex[index]);
            C[index] = AvailableArray[index][RealIndex[index]];
        }

        console.log("getAvailableForCell", result);
        return result;
    }



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