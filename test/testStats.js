// noinspection NodeCoreCodingAssistance
import assert from "assert";
import {statToChart, hitConfigToChart} from "../src/models/stats/statsToChart";

const hitsData = [{"_id":"60ac6d162d7ca8438c23d164","hitCollection":"sites","hitId":"60a1734e08d51c1bbc35b93e","hitStart":"2021-05-24T04:00:00.000Z","hitDuration":7,"durationInterval":"days","siteDomain":"darbyfurnitureoutlet.com","hitCount":705},{"_id":"60b4282362e08604a9f96cd9","hitCollection":"sites","hitId":"60a1734e08d51c1bbc35b93e","hitStart":"2021-05-31T04:00:00.000Z","hitDuration":7,"durationInterval":"days","siteDomain":"darbyfurnitureoutlet.com","hitCount":672}];

describe("stat convert good", ()=> {
    const result = statToChart(hitsData, hitConfigToChart);
    it("hit convert base type", ()=>{
        assert.ok(Array.isArray(result), "chart type array");
    })

    it("hit convert length", ()=> {
        assert.strictEqual(result.length, 2, "hit chart length");
    })

    it("return object match", ()=> {
        const expected = [
            { name:"2021-05-24T04:00:00.000Z", "hits" : 705 },
            { name:"2021-05-31T04:00:00.000Z", "hits" : 672 }
        ];
        assert.deepStrictEqual(result, expected);
    })
})