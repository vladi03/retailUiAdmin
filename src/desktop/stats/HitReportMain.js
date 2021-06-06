import React, {useEffect} from "react";
import {AppBarTitleAddSearch} from "../../utility/components/AppBarTitle";
import {connectArray} from "../../utility/helpers";
import {statsModel} from "../../models/stats/statsModel";
import {Timeline} from "@material-ui/icons";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
} from 'recharts';

const HitReportMainComponent = ({hitChartData, hitReportInitDone, onHitReportInit})=> {
    useEffect(()=> {

        if(!hitReportInitDone)
            onHitReportInit();
    });

    return (
        <div>
            <AppBarTitleAddSearch
                title="Hits"
                LeftIcon={Timeline}
            />

                <BarChart
                    width={800}
                    height={300}
                    data={hitChartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip  />
                    <Legend wrapperStyle={{position: "initial"}} />

                    <Bar dataKey="hits" fill="#82ca9d" minPointSize={10} >
                        <LabelList dataKey="hits"  />
                    </Bar>

                </BarChart>

        </div>
    )
};

export const HitReportMain = connectArray(HitReportMainComponent, [statsModel]);

