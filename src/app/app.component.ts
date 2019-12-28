import { Component, OnInit } from '@angular/core';
import { WakandaService } from './shared/wakanda.service';
import { Collection } from 'wakanda-client';
import { NavigableFilesService } from './shared/navigable-files.service';
import { IFileStorage } from './shared/file-storage.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  list: Collection<IFileStorage>;
  current: IFileStorage;
  ds;

  constructor(
    private wakanda: WakandaService,
    public navigable: NavigableFilesService,
  ) {}

  async ngOnInit() {
    this.ds = await this.wakanda.catalog;
    this.refresh();
  }

  private async refresh() {
    this.list = await this.ds.FileStorage.query({
      pageSize: 5,
    });
    this.navigable.list$.next(this.list);
    this.onFirst();
  }

  async onPrevious() {
    this.current = await this.navigable.navigation.previous();
  }

  async onFirst() {
    this.current = await this.navigable.navigation.first();
  }

  async onNext() {
    this.current = await this.navigable.navigation.next();
  }

  async onLast() {
    this.current = await this.navigable.navigation.last();
  }
}
