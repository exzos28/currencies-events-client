import {Either} from "../fp"
import {RestClientCallError} from "../BaseRestClient"

export interface RestClient {
    getCurrencies: () => Promise<CurrencyResponse>
    getEvents: () => Promise<GetEventsResponse>
    getChartData: (params: GetChartDataByCurrencyParams) => Promise<GetChartDataByCurrencyResponse>
}

export type Currency = string
export type Event = {
    title: string
    id: number
}
export type Annotation = {
    position: [string, number]
    event_id: number
}
export type ChartDataItem = {
    date: string
    value: number
}

export type CurrencySuccessResponse = {
    currencies: Currency[]
}
export type CurrencyResponse = Either<CurrencySuccessResponse, RestClientCallError>


export type GetEventsSuccessResponse = {
    events: Event[]
}
export type GetEventsResponse = Either<GetEventsSuccessResponse, RestClientCallError>


export type GetChartDataByCurrencyParams = {
    currency: Currency
}

export type ChartData = {
    annotations: Annotation[]
    chart: ChartDataItem[]
}

export type GetChartDataByCurrencySuccessResponse = ChartData
export type GetChartDataByCurrencyResponse = Either<GetChartDataByCurrencySuccessResponse, RestClientCallError>

