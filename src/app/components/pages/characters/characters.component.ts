import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {DataService} from '@shared/services/data.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  characters$ = this.dataService.characters$;
  showButton = false;
  private scrollHeight = 500;
  private pageNum = 1;

  constructor(@Inject(DOCUMENT) private document: Document,
              private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown(): void {
    this.pageNum++;
    this.dataService.getCharactersByPage(this.pageNum);
  }

}
