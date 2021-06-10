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
    LabelList
} from 'recharts';

const HitReportMainComponent = ({hitChartData, hitReportInitDone, onHitReportInit,weekEndDate,weekStartDate,setWeekDays})=> {
    useEffect(()=> {

        if(!hitReportInitDone)
            onHitReportInit();
    });

    return (
        <div>
            <AppBarTitleAddSearch
                title={`Weekly Hits ${weekStartDate} - ${weekEndDate}`}
                LeftIcon={Timeline}
            />


                <BarChart
                    width={800}
                    height={300}
                    data={hitChartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 50,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis   dy={25} dx={-5} dataKey="name" angle={-90} label={{ angle:-90,value: 'Month-Day', position: 'insideBottomRight', offset: 28 }} />

                    <YAxis  />
                    <Tooltip  />
                    <Legend  wrapperStyle={{position: "initial"}} />

                    <Bar dataKey="hits" fill="#82ca9d" minPointSize={10} >
                        <LabelList  angle={-90} dataKey="hits"  />
                    </Bar>

                </BarChart>

        </div>
    )
};

export const HitReportMain = connectArray(HitReportMainComponent, [statsModel]);

