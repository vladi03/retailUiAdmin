import {convertToSheetArray} from "../src/utility/helpers";
import {mockCatalogs} from "./mockCatalog";
import {catalogExportFields} from "../src/models/home/catalogXlExport";
import assert from  "assert"
describe("Sheet Array success", () => {
    const result = convertToSheetArray(mockCatalogs,catalogExportFields);
    it("export array size",()=> {
        assert.strictEqual(result.length, 5,"export length");
    });

    it("export sheet header",()=> {
        assert.strictEqual(result[0], catalogExportFields,"export length");
    });

    it("item 1 export",()=> {
        const expected = ["LR00051","Solo","Magenta Sofa & Loveseat ",900.13,"active", "LR00051L.jpg"];
        assert.deepStrictEqual(result[1], expected,"export item 1");
    });

    it("item 4 export",()=> {
        const expected = ["LR00164","True US","Grey Living Room Group",515.95,"active", "LR00164L.jpg"];
        assert.deepStrictEqual(result[4], expected,"export item 4");
    });
});