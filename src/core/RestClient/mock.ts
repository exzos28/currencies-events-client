import {Annotation, ChartDataItem} from "./RestClient";

export const CHART_DATA1: ChartDataItem[] = [
    {
        date: '1',
        value: 1078,
    },
    {
        date: '2',
        value: 1216,
    },
    {
        date: '3',
        value: 758,
    },
    {
        date: '4',
        value: 623,
    },
    {
        date: '5',
        value: 319,
    },
    {
        date: '6',
        value: 422,
    },
    {
        date: '7',
        value: -4,
    },
    {
        date: '8',
        value: -217,
    },
    {
        date: '9',
        value: -358,
    },
    {
        date: '10',
        value: 1513,
    },
    {
        date: '11',
        value: 1388,
    },
    {
        date: '12',
        value: 597,
    },
]
export const CHART_DATA2: ChartDataItem[] = [
    {
        date: '1',
        value: 1000,
    },
    {
        date: '2',
        value: 500,
    },
    {
        date: '3',
        value: 758,
    },
    {
        date: '4',
        value: 1000,
    },
    {
        date: '5',
        value: 319,
    },
    {
        date: '6',
        value: 300,
    },
    {
        date: '7',
        value: -4,
    },
    {
        date: '8',
        value: -217,
    },
    {
        date: '9',
        value: -358,
    },
    {
        date: '10',
        value: 1000,
    },
    {
        date: '11',
        value: 1388,
    },
    {
        date: '12',
        value: 800,
    },
]

export const ANNOTATIONS1: Annotation[] = [
    {
        position: ['1', 1078],
        event_id: 1,
    },
    {
        position: ['2', 1216],
        event_id: 2,
    },
    {
        position: ['3', 758],
        event_id: 3,
    },
    {
        position: ['7', -4],
        event_id: 4,
    },
    {
        position: ['12', 597],
        event_id: 5,
    },
]
export const ANNOTATIONS2: Annotation[] = [
    {
        position: ['2', 500],
        event_id: 1,
    },
    {
        position: ['4', 1000],
        event_id: 2,
    },
    {
        position: ['7', -4],
        event_id: 3,
    },
]

// GET: /chart?currency=BTC
export const CHART_RESPONSE1 = {
    annotations: ANNOTATIONS1,
    chart: CHART_DATA1,
}
// GET: /chart?currency=USD
export const CHART_RESPONSE2 = {
    annotations: ANNOTATIONS2,
    chart: CHART_DATA2,
}

export const EVENTS = [
    {
        id: 1,
        title: "Event 1",
    },
    {
        id: 2,
        title: "Event 2",
    },
    {
        id: 3,
        title: "Event 3",
    },
    {
        id: 4,
        title: "Event 4",
    },
    {
        id: 5,
        title: "Event 5",
    },
]
// GET: /events
export const EVENTS_RESPONSE = {
    events: EVENTS
}


export const CURRENCIES = ["BTC", "USD"]
// GET: /currencies
export const CURRENCIES_RESPONSE = {
    currencies: CURRENCIES
}
