
export const sortCatalog = (catalogList, categoryId)=> {
    const calc = [...catalogList];
    calc.sort((a, b) => {
        const aHasCategory = a.categories && a.categories.length > 0;
        const bHasCategory = b.categories && b.categories.length > 0;
        const filterA = aHasCategory ? a.categories.filter((aItem) =>
            aItem._id === categoryId ) : [];

        const filterB = bHasCategory ? b.categories.filter((bItem) =>
            bItem._id === categoryId ) : [];


        if(filterA.length > 0 && filterB.length > 0) {
            return filterA[0].sort - filterB[0].sort;
        }
        else if (filterA.length > 0)
            return -1;
        else
            return 1;
    });
    //console.log('catalogList sort', calc);
    return calc;
};
export const filterCatalog = (catalogListSorted, categoryId)=> {
    const calc = [...catalogListSorted];
    const filterCatalogIn =[];
    const filterCatalogOut=[];
    calc.forEach((a) => {
        
        const filterA = catalogListSorted ? a.categories.filter((aItem) =>
            aItem._id === categoryId ) : [];

        if (filterA.length > 0)
            filterCatalogIn.push(a);
        else
           filterCatalogOut.push(a);
    });
    return {filterCatalogIn,filterCatalogOut} ;
};
export const getCatalogTotals = (catalogListSorted, arrayCategory)=> {
    const calc = [...catalogListSorted];

    const totalCategory = []
    arrayCategory.forEach((category)=> {
        let activeTotal=0;
        let disabledTotal=0;
        calc.forEach((a, index) => {

            const filterA = catalogListSorted ? a.categories.filter((aItem) =>
                aItem._id === category._id) : [];

            if (filterA.length > 0)
                (a.status==='active'?activeTotal++:disabledTotal++)
            if(index === catalogListSorted.length-1) {
                const stats = {activeTotal, disabledTotal, _id:category._id}
                totalCategory.push(stats)
            }

        });
    })
    return totalCategory;
};


export const filterCatalogNoCategory = (catalogListSorted)=> {
    const calc = [...catalogListSorted];
    const filterNoCatalog =[];
    calc.forEach((a) => {
        const filterA = a.categories.length ===0;
        if (filterA)
            filterNoCatalog.push(a);
    });

    return filterNoCatalog;
};


export const swapOrder = (catalog, category, swapCatalog) => {
    const target = {...catalog};
    const swap = {...swapCatalog};
    const targetCategory = target.categories.filter(
        (cate)=> cate._id === category._id);
    const swapCategory = swap.categories.filter(
        (cate)=> cate._id === category._id);

    if(targetCategory.length > 0 && swapCategory.length > 0) {
        const newTarget = swapCategory[0].sort;
        swapCategory[0].sort = targetCategory[0].sort;
        targetCategory[0].sort = newTarget;
    }
    return {target, swap};
};

export const getNextSortInCategory = (categoryId, catalogList) => {
    let maxSort = 0;
    catalogList.forEach((catalog) => {
        catalog.categories.forEach((inCategory)=> {
            if(inCategory._id === categoryId && inCategory.sort > maxSort)
                maxSort = inCategory.sort;
        });
    });
    return maxSort + 1;
};