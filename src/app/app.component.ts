import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Post } from './post.interface';
// import { catchError } from 'rxjs/operators';

// Like a React or Svelte component, we want to break up pieces of our web application into smaller, reusable parts.
// This improves readability and maintainability in the long run.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  posts: Post[] = [];
  title = 'Edgar Allan';

 
  constructor(private dataService: DataService) {}


  ngOnInit(): void {
    this.dataService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
