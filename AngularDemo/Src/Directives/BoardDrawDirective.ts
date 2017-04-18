import { Component, Input, OnInit, OnChanges, AfterViewInit, ViewContainerRef } from '@angular/core';

@Component({ selector: "board-draw", templateUrl: "./BoardDrawDirective.html" })
export class SudokuBoard implements OnInit, AfterViewInit, OnChanges
{
    @Input() sudokuData: number[][];
    @Input() sudokuResult: number[][];

    constructor()
    {
        console.warn("BoardDrawDirective constructor", this.sudokuData, this.sudokuResult);
    }

    ngOnInit()
    {
        console.log("SudokuBoard ngOnInit",this.sudokuData, this.sudokuResult); 
    }

    ngAfterViewInit()
    {
        console.log("SudokuBoard ngAfterViewInit", this.sudokuData, this.sudokuResult);
    }

    ngOnChanges()
    {
        console.log("SudokuBoard ngOnChanges");
    }
}