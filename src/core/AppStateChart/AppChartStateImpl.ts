import {action, makeAutoObservable, observable, runInAction} from "mobx";
import {ChartData, Currency, Event, RestClient} from "../RestClient";
import {first} from "lodash";
import {AppChartState} from "./AppChartState";

export default class AppChartStateImpl implements AppChartState {
    @observable private _isLoading = false;
    @observable.ref private _currencies: Currency[] = []
    @observable.ref private _events?: ReadonlyMap<number, Event>
    @observable private _selectedCurrency?: Currency;
    @observable.ref private _chartData?: ChartData;


    constructor(private readonly _root: {
        restClient: RestClient
    }) {
        makeAutoObservable(this)
    }

    get isLoading() {
        return this._isLoading;
    }

    get currencies() {
        return this._currencies;
    }

    get events() {
        return this._events;
    }

    get selectedCurrency() {
        return this._selectedCurrency;
    }

    get chartData() {
        return this._chartData;
    }

    private _startLoading = action(() => {
        this._isLoading = true;
    })

    private _stopLoading = action(() => {
        this._isLoading = false;
    })

    private async _fetchChartData(currency: Currency) {
        this._selectedCurrency = currency
        const response = await this._root.restClient.getChartData({currency})
        if (response.success) {
            runInAction(() => this._chartData = response.right)
        }
    }

    fetchChartData = (currency: Currency) => this._fetchChartData(currency)


    async fetch() {
        this._startLoading();
        const currenciesResponse = await this._root.restClient.getCurrencies();
        if (currenciesResponse.success) {
            runInAction(() => this._currencies = currenciesResponse.right.currencies)
        }

        const selectedCurrency = first(this._currencies);
        if (selectedCurrency) {
            // noinspection ES6MissingAwait
            this.fetchChartData(selectedCurrency)
        }

        const eventsResponse = await this._root.restClient.getEvents();
        if (eventsResponse.success) {
            runInAction(() => {
                this._events = new Map(eventsResponse.right.events.map(_ => ([_.id, _])))
            })
        }
        this._stopLoading();
    }
}
