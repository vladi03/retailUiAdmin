

export const salesXlMap = (xlSheet) => {
    return Array.isArray(xlSheet) ?
     xlSheet.map(salesXlMapItem) :
     []
}

export const salesXlMapItem = (cells) => {
    console.log(cells);
    if(Array.isArray(cells) && cells.length > 5)
    return {
        ticketNum: cells[3],
        day : cells[0].substr(5),
        month: `${cells[1].substr(10).replace(/%20/g," ").replace(".xlsx","")}`,
        name: cells[4],
        price: cells[5]
    }
    else
    return {

    }
}