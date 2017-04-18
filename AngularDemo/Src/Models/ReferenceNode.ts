export class ReferenceNode 
{
    row: number;
    block: number;
    column: number;

    constructor(row?: number, column?: number, block?: number)
    {
        this.row = row;
        this.block = block;
        this.column = column;
    }
}