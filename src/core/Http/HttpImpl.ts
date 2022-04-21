import {Http} from './Http';
import {Either, error, success} from '../fp';
import {ErrorRepository} from '../ErrorRepository';
import {NETWORK_ERROR, NetworkError} from '../Error';

export default class HttpImpl implements Http {
    constructor(
        private readonly _root: { readonly errorRepository: ErrorRepository },
    ) {
    }

    async fetch(
        input: RequestInfo,
        init?: RequestInit,
    ): Promise<Either<Response, NetworkError>> {
        let response: Response;
        try {
            response = await fetch(input, init);
        } catch (raw) {
            return error(
                this._root.errorRepository.create({kind: NETWORK_ERROR, raw}),
            );
        }
        const boundResponse = response.clone();
        // fixme mock other methods of the response body
        boundResponse.json = async () => {
            return response.json();
        };
        boundResponse.text = async () => {
            return response.text();
        };
        return success(boundResponse);
    }
}
