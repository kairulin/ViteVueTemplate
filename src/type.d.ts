export interface RouteConfig {
    path?: string;
    name: string;
    children: RouteConfig[];
}

export interface Item {
    text: string;
}