export interface RouteConfig {
    path?: string;
    name: string;
    children: RouteConfig[];
}