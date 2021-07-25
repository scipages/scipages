import { IRequestResult } from './interfaces/IRequestResult'

export interface GetRequestResult extends IRequestResult{
  status: boolean,
  message: string,
  data: any,
  validationErrors?: Record<string, Array<string>>
}
