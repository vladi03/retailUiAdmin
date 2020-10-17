import assert from "assert";
import {sortCatalog, swapOrder} from "../src/models/home/catalogHelper";
import {mockCatalogs, mockSwap} from "./mockCatalog";

describe("sort catalog list", ()=> {
    const result = sortCatalog(mockCatalogs, "5f6bf0493fc7d73540be029b");
    it("same length as original", ()=>{
        assert.strictEqual(result.length, mockCatalogs.length);
    });

    it("first item", ()=>{
        assert.strictEqual(result[0]._id, "5f334cc159996f347c4cffe5");
    });

    it("second item", ()=>{
        assert.strictEqual(result[1]._id, "5f18e71e78db931374886cab");
    });
});

describe("swap catalog order", ()=> {
    const {target, swap} = swapOrder(mockSwap.catalog, mockSwap.catalog.categories[0],
        mockSwap.swapCatalog);
    it("target swap",()=>{
        const expected = {
            "_id": "5f1666f3b1f2db166ca6bc00",
            "shortDesc": "Magenta Sofa & Loveseat ",
            "modelNumber": "LR00051",
            "categories": [{
                "_id": "5f72aebb35d2b81b6497f4bb",
                "category": "Sofa & Loveseat",
                "sort": 4
            }
            ]
        };
        assert.deepStrictEqual(target, expected);
    });

    it("swap catalog",()=>{
        const expected = {
            "_id": "5f18e71e78db931374886cab",
            "shortDesc": "Cherry Bedroom Group",
            "modelNumber": "BR00007",
            "categories": [{
                "_id": "5f72af5735d2b81b6497f4bd",
                "category": "Bedroom Suites",
                "sort": 2
            }, {
                "_id": "5f6bf0493fc7d73540be029b",
                "category": "Carousel",
                "sort": 5
            }, {
                "_id": "5f72aebb35d2b81b6497f4bb",
                "category": "Sofa & Loveseat",
                "sort": 3
            }
            ]
        };
        assert.deepStrictEqual(swap, expected);
    });
});