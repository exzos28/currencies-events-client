import {BaseErrorOptions, ErrorRepository} from './ErrorRepository';
import {
  JSON_PARSE_ERROR,
  JSON_STRINGIFY_ERROR,
  NETWORK_ERROR,
  UNKNOWN_ERROR,
  UnknownError,
  GENERAL_REST_CLIENT_ERROR,
  BaseError,
  TIMEOUT_ERROR,
} from '../Error';

export default class ErrorRepositoryImpl implements ErrorRepository {
  private static readonly _KIND_DESCRIPTION_DICTIONARY = {
    [JSON_PARSE_ERROR]: 'Cannot parse JSON from a string',
    [JSON_STRINGIFY_ERROR]: 'Cannot stringify a value to the JSON string',
    [NETWORK_ERROR]: 'The network is unreachable',
    [GENERAL_REST_CLIENT_ERROR]: 'The REST client has received an error',
    [UNKNOWN_ERROR]: 'Unknown error occurred',
    [TIMEOUT_ERROR]: 'Timeout has been reached',
  } as const;

  private static _createMap() {
    const dict = ErrorRepositoryImpl._KIND_DESCRIPTION_DICTIONARY;
    const keys = Reflect.ownKeys(dict);
    return new Map<symbol | string, string>(
      keys.map(key => [key, dict[key as keyof typeof dict]]),
    );
  }

  private static readonly _KIND_DESCRIPTION_MAP =
    ErrorRepositoryImpl._createMap();

  create<E extends BaseError>(error?: BaseErrorOptions<E>): E | UnknownError {
    if (!error) {
      const description =
        ErrorRepositoryImpl._KIND_DESCRIPTION_DICTIONARY[UNKNOWN_ERROR];
      return {
        kind: UNKNOWN_ERROR,
        description,
        raw: new Error(description),
      };
    }
    const description =
      error.description ??
      ErrorRepositoryImpl._KIND_DESCRIPTION_MAP.get(error.kind) ??
      ErrorRepositoryImpl._KIND_DESCRIPTION_DICTIONARY[UNKNOWN_ERROR];
    const raw = error.raw ?? new Error(description);
    return {
      description,
      raw,
      ...error,
    } as E;
  }
}
