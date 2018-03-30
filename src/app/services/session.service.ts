import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  private _session: any;

  constructor() { }

  setSession(value): void {
    this._session = value;
  }

  getSession() {
    return this._session;
  }
}
