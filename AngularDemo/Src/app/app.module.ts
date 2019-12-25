import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SudokuController } from '../Controllers/SudokuController';
import { SudokuBoard } from "../Directives/BoardDrawDirective"
import { SudokuService } from "../Services/SudokuService"
import { SudokuWasmService } from "../Services/SudokuWasmService"

@NgModule
    ({
        imports: [BrowserModule, FormsModule],
        declarations: [SudokuController, SudokuBoard],
        providers: [SudokuService, SudokuWasmService],
        bootstrap: [SudokuController]
    })
export class AppModule { }
