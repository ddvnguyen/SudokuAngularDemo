import * as Models from "./index"
import { Utils } from "../Utils/Utils"

export interface ISudokuTable
{
    Nodes: number[][];
    References: Models.IReferenceNode[][];
}

export class SudokuTable implements ISudokuTable
{
    Nodes: number[][];
    References: Models.IReferenceNode[][];
    NodeDictionary: Models.IDictionary<Array<Models.IReferenceNode>>;
    width: number;
    height: number;
    ArrayNode: number[];

    constructor(Nodes: number[][], width: number, height: number)
    {
        this.Nodes = Utils.deepCopy(Nodes);
        this.width = width;
        this.height = height;
        this.buildReferences();
    }

    private buildReferences = () =>
    {
        this.ArrayNode = [];
        this.References = [];
        this.NodeDictionary = new Models.Dictionary<Array<Models.IReferenceNode>>([]);
        var index = 0;
        for (var hb = 0; hb < this.height; hb++)
            for (var wb = 1; wb <= this.width; wb++)
                for (var hs = 0; hs < this.height; hs++)
                    for (var ws = 1; ws <= this.width; ws++)
                    {
                        console.warn("block", block);
                        var row = wb + hb * this.width;
                        var col = hs * this.width + ws;
                        var block = hs + 1 + hb * this.width;

                        var referenceNode: Models.IReferenceNode = new Models.ReferenceNode(row, col, block);

                        if (this.Nodes[row - 1][col - 1] > 0)
                        {
                            this.ArrayNode.push(this.Nodes[row - 1][col - 1]);
                            referenceNode.fix = true;
                        }
                        else
                        {
                            this.ArrayNode.push(0);
                            referenceNode.fix = false;
                        }

                        referenceNode.value = this.Nodes[row - 1][col - 1];

                        //if (this.NodeDictionary[block] === undefined)
                        //    this.NodeDictionary[block] = [];

                        if (this.References[row - 1] === undefined || this.References[row - 1] === null)
                            this.References[row - 1] = [];
                        if (this.NodeDictionary[block.toString()] === undefined)
                            this.NodeDictionary.add(block.toString(), []);

                        this.NodeDictionary.getValue(block.toString()).push(referenceNode);

                        this.References[row - 1][col - 1] = referenceNode;
                        index++;
                    }

        console.log(this.NodeDictionary.getValue("1"));
    }
}