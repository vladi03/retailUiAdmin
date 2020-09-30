import {Home, Category} from "@material-ui/icons";
//category
const mainLinksAll = [
    {label : "Home", icon: Home, selected:!(window.location.href.includes('category') || window.location.href.includes('keyLogs') ), link:"#/", route:"/", isMobile: true },
    {label : "Category", icon: Category, selected:window.location.href.includes('category'),  link:"#/category", route:"/category", featureId: 1, isMobile: true }
];

export const getMenus = (mobileOnly)=> {
    if(mobileOnly)
        return mainLinksAll.filter(link => link.isMobile);
    else
        return mainLinksAll;
};
