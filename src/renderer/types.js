/**
 * 脉冲软件
 * http://maichong.it
 * @Created by Rong on 2017/12/14.
 * @author Rong <chaorong@maichong.it>
 */

export type ObjectModel = {
  id: string;
  project: string;
  library: string;
  version: string;
  title: string;
  desc: string;
  share: boolean;
}

export type Field = {
  id: string;
  library: string;
  version: string;
  ref: string;
  refId: string;
  title: string;
  sort: number;
  type: string;
  default: string;
  mock: string;
  mockResult: string;
  desc: string;
}

export type Tuple = {
  id: string;
  project: string;
  library: string;
  version: string;
  title: string;
  desc: string;
  share: boolean;
}

export type Scope = {
  id: string;
  library: string;
  version: string;
  object: string;
  title: string;
  fields: ApiField[];
}

export type Route = {
  library: string;
  version: string;
  title: string;
  desc: string;
  stability: string;
  since: string;
  group: string;
  method: string;
  path: string;
  bodyType: string;
  sort: number;
}

export type Group = {
  id: string;
  library: string;
  version: string;
  title: string;
  desc: string;
  sort: number;
}

export type MapGroup = Group & {
  route: Array<Route>
}

export type Response = {
  id: string;
  library: string;
  version: string;
  route: string;
  code: number;
  desc: string;
  type: {} | void;
}

export type Description = {
  id: string;
  library: string;
  version: string;
  title: string;
  desc: number;
  sort: number;
}

export type Code = {
  id: string;
  library: string;
  version: string;
  desc: number;
  code: string;
}
