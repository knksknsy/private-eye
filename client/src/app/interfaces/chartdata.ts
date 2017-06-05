export interface ChartData {
    labels: Array<any>,
    datasets: Array<DatasetsData>
}

export interface DatasetsData {
    label?: string,
    title?: string,
    fillColor?: string,
    strokeColor?: string,
    pointColor?: string,
    pointHighlightStroke?: string,
    fill?: boolean,
    data: Array<any>
}