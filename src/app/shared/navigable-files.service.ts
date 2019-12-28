import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { NavigableDS } from './navigable-ds';
import { Collection } from 'wakanda-client';
import { IFileStorage } from './file-storage.model';

@Injectable({
  providedIn: 'root'
})
export class NavigableFilesService {
  list$: Subject<Collection<IFileStorage>> = new Subject();
  navigation: NavigableDS;

  constructor() {
    this.list$.subscribe((collection) => {
      this.navigation = new NavigableDS(collection);
    });
  }
}
