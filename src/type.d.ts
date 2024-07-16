declare interface RouteConfig {
    path: string;
    name: string;
    children: RouteConfig[];
    nickname?: string;
    component?: any
}

declare interface Item {   
        text: string;
}
// 繼承Item並擴充number屬性
declare interface ItemWithNumber extends Item {
    number: number;
}