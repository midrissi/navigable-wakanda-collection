import { Injectable } from '@angular/core';
import { WakandaClient } from 'wakanda-client/browser/no-promise';

const _client = new WakandaClient({});

export interface ICurrentUser {
  email: string;
  fullName: string;
  ID: string;
}

@Injectable({
  providedIn: 'root'
})
export class WakandaService {
  private ds: Promise<any>;
  private currentUser: Promise<ICurrentUser>;

  constructor() {  }

  get catalog(): Promise<any> {
    if (!this.ds) {
      this.ds = _client.getCatalog();
    }
    return this.ds;
  }

  get directory() {
    return _client.directory;
  }

  get user(): Promise<ICurrentUser> {
    if (!this.currentUser) {
     return this.refreshUser();
    }
    return this.currentUser;
  }

  refreshUser() {
   return this.currentUser = _client.directory
      .getCurrentUser()
      .catch(() => { });
  }

  async checkCredentials() {
    this.currentUser = await _client.directory.getCurrentUser();
    return this.currentUser;
  }

}
