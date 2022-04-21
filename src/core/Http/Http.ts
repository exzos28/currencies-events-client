import {Either} from '../fp';
import {GlobalError} from '../Error';

export interface Http {
  fetch(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<Either<Response, GlobalError>>;
}
