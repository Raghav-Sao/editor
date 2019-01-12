import { throwError } from 'rxjs'
import { request } from 'universal-rxjs-ajax'
import { catchError, map } from 'rxjs/operators'

// const baseURI = process.env.REACT_APP_BASE_URI

const headers = { 'Content-Type': 'application/json' }

const errorHandler = catchError(data => throwError(new Error(data.error || data)))

export default ({ body, method, url }, internal) =>
  request({
    body,
    crossDomain: true,
    headers,
    method,
    url,
  }).pipe(
    map(({ response }) => response),
    errorHandler
  )
