import {hoursToView, createHoursEditModel} from "../src/models/company/locationHoursManager";
import assert from "assert";

describe("hours create view", ()=> {
    it("hours with undefined input", ()=> {
        const resultEmptyArray = hoursToView();
        assert.strictEqual(resultEmptyArray.length, 1);
        assert.strictEqual(resultEmptyArray[0], "Please call for hours");
    });

    it("hours with empty array input", ()=> {
        const resultEmptyArray = hoursToView([]);
        assert.strictEqual(resultEmptyArray.length, 1);
        assert.strictEqual(resultEmptyArray[0], "Please call for hours");
    });
});

describe("hours for simple one", ()=> {
    const mockHours = [{"day":0,"hours":"8AM to 5PM"}];
    const result = hoursToView(mockHours);
    it("length of simple should be one", ()=> {
        assert.strictEqual(result.length, 1);
    });
    it("first element of hour is sunday", ()=> {
        assert.strictEqual(result[0], "Sun 8AM to 5PM","Sunday result zero");
    });
});

describe("hours with two same entries", ()=> {
    const mockHours = [{"day":0,"hours":"8AM to 5PM"}, {"day":5,"hours":"8AM to 5PM"}];
    it("hours count of 1", ()=> {
        const resultEmptyArray = hoursToView(mockHours);
        assert.strictEqual(resultEmptyArray.length, 1);
        assert.strictEqual(resultEmptyArray[0], "Sun to Fri 8AM to 5PM");
    });
});

describe("hours with two different entries", ()=> {
    const mockHours = [{"day":0,"hours":"8AM to 5PM"}, {"day":5,"hours":"9AM to 5PM"}];
    it("hours count of 2", ()=> {
        const resultEmptyArray = hoursToView(mockHours);
        assert.strictEqual(resultEmptyArray.length, 2);
        assert.strictEqual(resultEmptyArray[0], "Sun 8AM to 5PM");
        assert.strictEqual(resultEmptyArray[1], "Fri 9AM to 5PM");
    });
});

describe("hours two same one different", ()=> {
    const mockHours = [{"day":0,"hours":"8AM to 5PM"}, {"day":5,"hours":"9AM to 5PM"}, {"day":6,"hours":"9AM to 5PM"}];
    it("hours count of 3", ()=> {
        const resultEmptyArray = hoursToView(mockHours);
        assert.strictEqual(resultEmptyArray.length, 2);
        assert.strictEqual(resultEmptyArray[0], "Sun 8AM to 5PM");
        assert.strictEqual(resultEmptyArray[1], "Fri to Sat 9AM to 5PM");
    });
});

describe("hours to edit model", ()=> {
    const mockHours = [{"day":0,"hours":"8AM to 5PM"}, {"day":5,"hours":"9AM to 5PM"}, {"day":6,"hours":"9AM to 5PM"}];
    const result = createHoursEditModel(mockHours);
    it("should have 7 days", ()=> {
        assert.strictEqual(result.length, 7);
    });

    it("day 1", ()=> {
        const expected = {
            "id": 0,
            "name": "Sunday",
            "short": "Sun",
            "hours" : "8AM to 5PM",
            "selected" : true
        };
        assert.deepStrictEqual(result[0], expected);
    });

    it("day 2", ()=> {
        const expected = {
            "id": 1,
            "name": "Monday",
            "short": "Mon",
            "hours" : "",
            "selected" : false
        };
        assert.deepStrictEqual(result[1], expected);
    });
});