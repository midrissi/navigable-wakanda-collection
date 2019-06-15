import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { NavigableDS } from './navigable-ds';
import Collection from 'wakanda-client/dist/ts-build/presentation/collection';

@Injectable({
  providedIn: 'root'
})
export class NavigableFilesService {
  list$: Subject<Collection> = new Subject();
  navigation: NavigableDS;

  constructor() {
    this.list$.subscribe((collection) => {
      this.navigation = new NavigableDS(collection);
    });
  }
}
