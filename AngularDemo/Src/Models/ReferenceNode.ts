export interface IReferenceNode
{
    row: number;
    block: number;
    column: number;
    fix: boolean;
    value: number;
}

export class ReferenceNode implements IReferenceNode 
{
    row: number;
    block: number;
    column: number;
    fix: boolean;
    value: number;

    constructor(row?: number, column?: number, block?: number, value?:number, fix?:boolean)
    {
        this.row = row;
        this.block = block;
        this.column = column;
        this.value = value;
        this.fix = fix;
    }
}