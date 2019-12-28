import { Collection } from 'wakanda-client';
import { IFileStorage } from './file-storage.model';

export class NavigableDS {
  index = 0;
  hasNext = false;
  hasPrevious = false;

  constructor(
    private collection: Collection<IFileStorage>,
    initialIndex = 0,
  ) {
    this.index = initialIndex;
    this.refresh();
  }

  async next(): Promise<any> {
    const { _pageSize: pSize } = this.collection;
    const index = this.index + 1;
    if (!this.isInCurrentPage(index)) {
      await this.collection.fetch({
        start: pSize * Math.floor(index / pSize),
      });
    }

    const { entities } = this.collection;
    this.index = index;
    this.refresh();
    return entities[index % pSize];
  }

  async previous(): Promise<any> {
    const { _pageSize: pSize } = this.collection;
    const index = this.index - 1;
    if (!this.isInCurrentPage(index)) {
      await this.collection.fetch({
        start: pSize * Math.floor(index / pSize),
      });
    }

    const { entities } = this.collection;
    this.index = index;
    this.refresh();
    return entities[index % pSize];
  }

  async last(): Promise<any> {
    const { _count: count, _pageSize: pSize } = this.collection;
    const index = count - 1;

    if (!this.isInCurrentPage(index)) {
      await this.collection.fetch({
        start: pSize * Math.floor(count / pSize),
      });
    }

    const { entities } = this.collection;
    this.index = count - 1;
    this.refresh();
    return entities[entities.length - 1];
  }

  async first(): Promise<any> {
    const index = 0;

    if (!this.isInCurrentPage(index)) {
      await this.collection.fetch({
        start: 0,
      });
    }

    const { entities } = this.collection;
    this.index = 0;
    this.refresh();
    return entities[0];
  }

  private isInCurrentPage(index) {
    const { _first: first, _pageSize: pSize } = this.collection;
    return index >= first && index < first + pSize;
  }

  private refresh() {
    this.hasPrevious = this.index > 0;
    this.hasNext = this.index < this.collection._count - 1;
  }
}
