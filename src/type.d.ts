export interface RouteConfig {
    path?: string;
    name: string;
    children: RouteConfig[];
}

export interface Item {
    text: string;
}
// 繼承Item並擴充number屬性
export interface ItemWithNumber extends Item {
    number: number;
}