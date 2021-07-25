import { IRequestResult } from './interfaces/IRequestResult'

export interface PostRequestResult extends IRequestResult{
  status: boolean,
  message: string,
  affectedId?: string,
  validationErrors?: Record<string, Array<string>>
}
