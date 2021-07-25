import { Component, OnInit } from '@angular/core';
import { HttpServicesService } from 'src/app/services/http-services.service';


@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {

  pageEvent: any;
  pageIndex: number = 0;
  show: boolean = false;
  totalComicsCount: number = 0;
  pageSize: number = 20;
  offset: number = 0;
  comicsArray: any = [];
  constructor(private httpService: HttpServicesService) { }

  ngOnInit(): void {
    this.marvelComics();
  }

  /**
   * @description this method used for getting marvel comics
   * @param no params were used
   * @returns a promise
   */

  async marvelComics(pageSize?: any) {
    try {
      const response: any = await this.httpService.getComics(this.offset, this.pageSize);
      console.log(response);
      this.totalComicsCount = response.data.total;
      this.comicsArray = [...response.data.results];
      this.show = true;
    }
    catch (error: any) {
      console.log(error);
    }
  }

  /**
   * @description this method used for getting selected marvel comic
   * @param we need to pass the comic id
   * @returns a promise
   */

  async singleComic(id: any) {
    try {
      const response = await this.httpService.getSingleComic(id);
      console.log(response);
    }
    catch (error: any) {
      console.log(error);
    }
  }

  pagination(event: any) 
  {
    // event consists of {previousPageIndex: 0, pageIndex: 1, pageSize: 20, length: 49359}
    console.log(event);
    if (event.pageSize != this.pageSize) {
      this.pageSize = event.pageSize;
    }
    else if (event.previousPageIndex > event.pageIndex) {
      this.offset -= this.pageSize-1;
      this.pageIndex--;
    }
    else {
      this.offset += this.pageSize+1;
      this.pageIndex++;
    }
    this.marvelComics(this.pageSize);
    this.show = false;
  }
}
