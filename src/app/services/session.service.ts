import { Injectable } from '@angular/core';

export interface ISession {
  session: Object;
}

@Injectable()
export class SessionService implements ISession {
  private _session: session;

  constructor() { }

  setSession(value): void {
    this._session = value;
  }

  getSession(): session {
    return this._session;
  }
}
