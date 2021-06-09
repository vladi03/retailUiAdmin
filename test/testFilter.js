import {createFilterOptions} from "../src/utility/helpers";
import assert from "assert";
import {catalogSelectOptions} from "../src/models/home/catalogXlExport";
import {mockCatalogs} from "./mockCatalog";

describe("create filter options happy", ()=>{
    const result = createFilterOptions(catalogSelectOptions, mockCatalogs);

    it("options fieldList length",()=>{
        assert.deepStrictEqual(result.fieldList,catalogSelectOptions);
    });

    it("first option list",()=>{
        const expected = [
            {option: "AMC Inc", selected: false},
            {option: "Solo", selected: false},
            {option: "Trident", selected: false},
            {option: "True US", selected: false}
        ];
        assert.deepStrictEqual(result["mfrName"],expected);
    });

    it("second option list",()=>{
        const expected = [{option: "active", selected: false}];
        assert.deepStrictEqual(result["status"],expected);
    });
});