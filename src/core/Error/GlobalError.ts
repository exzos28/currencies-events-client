import {JsonStringifyError, JsonParseError} from './JsonError';
import {
  KeyValueStoreDeleteError,
  KeyValueStoreGetError,
  KeyValueStoreSetError,
} from './KeyValueStoreError';
import {UnknownError} from './UnknownError';
import {NetworkError} from './NetworkError';
import {GeneralRestClientError} from './RestClientError';
import {DecodeError, EncodeError} from './EncodingError';
import {TimeoutError} from './TimeoutError';

export type GlobalError =
  | EncodeError
  | DecodeError
  | JsonStringifyError
  | JsonParseError
  | KeyValueStoreDeleteError
  | KeyValueStoreGetError
  | KeyValueStoreSetError
  | NetworkError
  | GeneralRestClientError
  | UnknownError
  | TimeoutError;
