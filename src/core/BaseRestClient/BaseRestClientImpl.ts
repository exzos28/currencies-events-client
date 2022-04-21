import {Either, success, error} from '../fp';
import {Url} from '../units';
import {Json, JsonSerializable} from '../Json';
import {
    RestClientCallError,
    RestMethod,
    SPECIALIZED_REST_CLIENT_ERROR,
    SpecializedRestClientError,
} from './RestClient';
import {ErrorRepository} from '../ErrorRepository';
import {
    TIMEOUT_ERROR,
    TimeoutError,
} from '../Error';
import {Millisecond} from '../Time';
import {delayResolve} from '../util';
import {Http} from "../Http";

export default abstract class BaseRestClientImpl {

    protected constructor(
        protected readonly _root: {
            readonly errorRepository: ErrorRepository;
            readonly json: Json;
            readonly http: Http
        },
    ) {
    }

    protected abstract get _base(): Url;

    protected abstract get _timeout(): Millisecond;

    protected async _call<P extends JsonSerializable = JsonSerializable,
        R extends JsonSerializable | void = JsonSerializable | void,
        E extends JsonSerializable = JsonSerializable,
        >(
        method: RestMethod,
        endpoint: Url,
        params?: P,
    ): Promise<Either<R, RestClientCallError<E>>> {
        let body;
        if (params) {
            const body_ = await this._root.json.stringify(params);
            if (!body_.success) {
                return body_;
            }
            body = body_.right;
        }
        const fetchPromise = this._root.http.fetch(`${this._base}${endpoint}`, {
            method,
            body,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        const response_ =
            this._timeout === undefined || !isFinite(this._timeout)
                ? await fetchPromise
                : await Promise.race([
                    fetchPromise,
                    delayResolve(this._timeout, () =>
                        error(
                            this._root.errorRepository.create<TimeoutError>({
                                kind: TIMEOUT_ERROR,
                                description: `REST ${method} ${endpoint} failed with timeout`,
                            }),
                        ),
                    ),
                ]);
        if (!response_.success) {
            return response_;
        }
        const response = response_.right;
        let responseBody;
        try {
            responseBody = await response.json();
        } catch (ignore) {
        }
        if (response.ok) {
            return success(responseBody as R);
        }
        return error(
            this._root.errorRepository.create<SpecializedRestClientError<E>>({
                kind: SPECIALIZED_REST_CLIENT_ERROR,
                description: `The REST method ${endpoint} failed with the code ${response.status}`,
                statusCode: response.status,
                body: responseBody,
            }),
        );
    }
}
