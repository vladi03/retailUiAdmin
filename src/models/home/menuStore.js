import {Home, Category, LocationCity, SearchTwoTone, Timeline} from "@material-ui/icons";
//category , , featureId: 1
const mainLinksAll = [
    {label : "Home", icon: Home, selected:!(window.location.href.includes('location') || window.location.href.includes('category') || window.location.href.includes('keyLogs') || window.location.href.includes('catalogSearch') || window.location.href.includes('hits') ), link:"#/", route:"/", isMobile: true },
    {label : "Category", icon: Category, selected:window.location.href.includes('category'),  link:"#/category", route:"/category", isMobile: true },
    {label : "Locations", icon: LocationCity, selected:window.location.href.includes('location'),  link:"#/location", route:"/location", isMobile: true },
    {label : "Filter", icon: SearchTwoTone, selected:window.location.href.includes('catalogSearch'),  link:"#/catalogSearch", route:"/catalogSearch", isMobile: true },
    {label : "Hits", icon: Timeline, selected:window.location.href.includes('hits'),  link:"#/hits", route:"/hits", isMobile: true }
];//#//hits

export const getMenus = (mobileOnly)=> {
    if(mobileOnly)
        return mainLinksAll.filter(link => link.isMobile);
    else
        return mainLinksAll;
};
