import {ChartData, Currency, Event} from "../RestClient";

export interface AppChartState {
    readonly isLoading: boolean;
    readonly currencies: Currency[];
    readonly events: ReadonlyMap<number, Event> | undefined;
    readonly selectedCurrency: string | undefined;
    readonly chartData: ChartData | undefined;
    fetchChartData: (currency: Currency) => Promise<void>;

    fetch(): Promise<void>;
}
