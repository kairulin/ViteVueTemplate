export interface TreeNodeData {
    id: number;
    name: string;
    children?: TreeNodeData[];
    checked?:boolean;
}