import {
    CurrencyResponse,
    GetChartDataByCurrencyParams,
    GetChartDataByCurrencyResponse,
    GetEventsResponse,
    RestClient
} from "./RestClient";
import {BaseRestClientImpl} from "../BaseRestClient";
import {Url} from "../units";
import {Millisecond} from "../Time";
import {Http} from "../Http";
import {ErrorRepository} from "../ErrorRepository";
import {Json} from "../Json";
import {success} from "../fp";
import {CURRENCIES_RESPONSE, CHART_RESPONSE1, EVENTS_RESPONSE, CHART_RESPONSE2} from "./mock";

export default class RestClientImpl extends BaseRestClientImpl implements RestClient {
    constructor(protected readonly _root: {
        readonly http: Http,
        readonly errorRepository: ErrorRepository,
        readonly json: Json
    }) {
        super(_root);
    }

    get _base(): Url {
        return 'https://api.example.com' as Url;
    }

    protected get _timeout(): Millisecond {
        return 15000 as Millisecond;
    }

    async getChartData(params: GetChartDataByCurrencyParams): Promise<GetChartDataByCurrencyResponse> {
        // return this._call('GET', 'some-api-url' as Url)
        if (params.currency === 'USD') {
            // TODO Call real api
            return success(CHART_RESPONSE1)
        } else {
            return success(CHART_RESPONSE2)
        }
    }

    async getCurrencies(): Promise<CurrencyResponse> {
        // return this._call('GET', 'some-api-url' as Url)
        // TODO Call real api
        return success(CURRENCIES_RESPONSE)
    }

    async getEvents(): Promise<GetEventsResponse> {
        // return this._call('GET', 'some-api-url' as Url)
        // TODO Call real api
        return success(EVENTS_RESPONSE)
    }

}
