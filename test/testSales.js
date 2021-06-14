// noinspection NodeCoreCodingAssistance
import assert from "assert";
import {salesXlMap, salesXlMapItem} from "../src/models/sales/salesXlMap";

const xlSalesString = '[["Sheet11","./xlfiles/April%202015.xlsx","P",160071,"Martinez",1160.78,800,null,null,360.78,1160.78],["Sheet6","./xlfiles/April%202016.xlsx","B",75529,"Martinez",109699,199.55,null,null,399.55,199.55],["Sheet8","./xlfiles/April%202016.xlsx","B",209743,"Martinez",323.95,null,null,100,"Layaway",100],["Sheet13","./xlfiles/April%202016.xlsx","M",75566,"Martinez",209743,223.95,null,null,323.95,223.95]]';
const xlSales = JSON.parse(xlSalesString);
describe("map from XL", ()=>{
    it("one item parse", ()=> {
        const oneRow = salesXlMapItem(xlSales[0]);
        const expected = {
            day: "11",
            month: "April 2015",
            name: "Martinez",
            price: 1160.78
        }
        assert.deepStrictEqual(oneRow,expected);
    });
    it("parse list xl", ()=>{
        const  results = salesXlMap(xlSales);
        assert.strictEqual(results.length, 4);
    })
})