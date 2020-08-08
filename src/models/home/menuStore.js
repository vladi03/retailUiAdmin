import {AssignmentInd, Group, Home, MusicNote, VpnKeyRounded,
    Message as MessageIcon, AttachMoney} from "@material-ui/icons";

const mainLinksAll = [
    {label : "Home", icon: Home, selected:!(window.location.href.includes('cashMovements') || window.location.href.includes('keyLogs') ), link:"#/", route:"/", isMobile: true },
    {label : "Cash Move", icon: AttachMoney, selected:window.location.href.includes('cashMovements'),  link:"#/cashMovements", route:"/cashMovements", featureId: 1, isMobile: true },
    {label : "Key Logs", icon: VpnKeyRounded, selected:window.location.href.includes('keyLogs'), link:"#/keyLogs", route:"/keyLogs", featureId: 1, isMobile: true },
];

export const getMenus = (mobileOnly)=> {
    if(mobileOnly)
        return mainLinksAll.filter(link => link.isMobile);
    else
        return mainLinksAll;
};
