import { ErrorContent } from '@booster-ts/error-module';

/**
 * IError
 * @description Error Model
 */
export interface IError extends ErrorContent {
    /** HTTP Response Code */
    httpResponse?: number;
}