

export const hoursToView = (hoursFull) => {
    const result = [];
    if(hoursFull && Array.isArray(hoursFull) && hoursFull.length > 0) {
        let prevHour = {hours: ""};
        let prevResult = "";
        hoursFull.forEach((hourIn, index)=> {
            if(index > 0 && prevHour.hours !== hourIn.hours)
                result.push(prevResult);

            prevResult = calcHour(hourIn.day, hourIn.hours, prevHour);

            if(prevHour.hours !== hourIn.hours)
                prevHour = hourIn;
        });
        result.push(prevResult);
    }
    return result.length > 0 ? result : ["Please call for hours"];
};

const calcHour = (day, hours, prevDay) => {
    const dayRef = dayOptions.filter((dayOption) => dayOption.id === day);
    const dayRefPrev = prevDay ? dayOptions.filter((dayOption) => dayOption.id === prevDay.day)
        : null;

    if(dayRef.length > 0) {
        if (dayRefPrev && dayRefPrev.length > 0 && prevDay.hours === hours)
            return `${dayRefPrev[0].short} to ${dayRef[0].short} ${hours}`;
        else
            return `${dayRef[0].short} ${hours}`;
    }
    else
        return "";
};

export const createHoursEditModel = (startingHours) => {
    return dayOptions.map((dayOption) => {
        const findHour = startingHours.filter((stHour) => stHour.day === dayOption.id);
        if(findHour.length > 0)
            return {...dayOption, hours: findHour[0].hours, selected: true};
        else
            return {...dayOption, hours: "", selected: false};
    });
};

export const dayOptions = [
    {
        "id": 0,
        "name": "Sunday",
        "short": "Sun"
    }, {
        "id": 1,
        "name": "Monday",
        "short": "Mon"
    }, {
        "id": 2,
        "name": "Tuesday",
        "short": "Tues"
    }, {
        "id": 3,
        "name": "Wednesday",
        "short": "Wed"
    }, {
        "id": 4,
        "name": "Thursday",
        "short": "Thurs"
    }, {
        "id": 5,
        "name": "Friday",
        "short": "Fri"
    }, {
        "id": 6,
        "name": "Saturday",
        "short": "Sat"
    }
];