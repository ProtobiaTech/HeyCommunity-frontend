import { Injectable } from '@angular/core';


@Injectable()
export class MenuService {
  menuTitle: string = 'Menu'
  currentPageId: number;
  menuPages;

  //
  // constructor
  constructor(
  ) {
  }
}
