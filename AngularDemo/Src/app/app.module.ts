import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SudokuController } from '../Controllers/SudokuController';
import { SudokuBoard } from "../Directives/BoardDrawDirective"
import { SudokuService } from "../Services/SudokuService"

@NgModule
    ({
        imports: [BrowserModule, FormsModule],
        declarations: [SudokuController, SudokuBoard],
        providers: [SudokuService],
        bootstrap: [SudokuController]
    })
export class AppModule { }
