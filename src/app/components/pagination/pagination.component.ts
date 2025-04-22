import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges, OnInit{
  @Input() totalItems = 151;
  @Input() itemsPerPage = 10;
  @Input() currentPage = 1;

  @Output() pageChange = new EventEmitter<number>();

  totalPages = 0;
  pages: (number | string)[] = [];

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = this.generatePages(this.currentPage, this.totalPages);
  }

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = this.generatePages(this.currentPage, this.totalPages);
  }

  setCurrentPage(page: number | string) {
    if (typeof page === 'number') {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
      this.pages = this.generatePages(this.currentPage, this.totalPages);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.setCurrentPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setCurrentPage(this.currentPage + 1);
    }
  }

  get from(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }
  
  get to(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }  

  private generatePages(current: number, total: number): (number | string)[] {
    const pages: (number | string)[] = [];
  
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
      return pages;
    }
  
    pages.push(1);
  
    if (current <= 3) {
      for (let i = 2; i <= 4; i++) {
        pages.push(i);
      }
      pages.push('...');
    } else if (current >= total - 2) {
      pages.push('...');
      for (let i = total - 3; i <= total - 1; i++) {
        pages.push(i);
      }
    } else {
      pages.push('...');
      pages.push(current - 1);
      pages.push(current);
      pages.push(current + 1);
      pages.push('...');
    }
  
    pages.push(total);
  
    return pages;
  }
  
}
