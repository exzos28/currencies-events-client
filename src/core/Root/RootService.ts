import {Root} from './Root';
import {RestClientImpl} from "../RestClient";
import {JsonImpl} from "../Json";
import HttpImpl from "../Http/HttpImpl";
import {ErrorRepositoryImpl} from "../ErrorRepository";

export default class RootService implements Root {
    readonly errorRepository = new ErrorRepositoryImpl();
    readonly json = new JsonImpl(this)
    readonly http = new HttpImpl(this)
    readonly restClient = new RestClientImpl(this)
}
