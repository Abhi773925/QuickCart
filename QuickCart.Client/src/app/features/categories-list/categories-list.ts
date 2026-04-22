import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  imports: [],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.css',
})
export class CategoriesList {
  // Component.ts mein update karein
  categories = [
    { categoryId: 1, categoryName: 'Laptop', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 2, categoryName: 'Mobile', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 3, categoryName: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 4, categoryName: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 5, categoryName: 'Grocery', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 6, categoryName: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 7, categoryName: 'Home', imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 8, categoryName: 'Footwear', imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 9, categoryName: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 10, categoryName: 'Toys', imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 11, categoryName: 'Books', imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 12, categoryName: 'Fitness', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400' }
  ];

  constructor(public router: Router) { }
  handleClick(categoryId: number) {
    console.log('Category clicked:', categoryId);
    this.router.navigate(['/products', categoryId]);
  }
}
