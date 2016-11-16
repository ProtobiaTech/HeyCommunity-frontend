import { Injectable } from '@angular/core';


@Injectable()
export class AppService {
  menuTitle: string = 'Menu'
  currentPageId: number;
  menuPages;

  //
  // constructor
  constructor(
  ) {
  }
}
