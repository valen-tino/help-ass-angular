import { Component } from '@angular/core';

interface Product {
  id: number;
  image: string;
  title: string;
  category: string;
  excerpt: string;
  description: string;
  available: boolean;
  purchaseLink: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Mock data, replace this with your actual product data
  featuredProducts: Product[] = [
    {
      id: 1,
      image: 'path/to/shopping-tour-image.jpg',
      title: 'Shopping Extravaganza',
      category: 'Shopping Tour',
      excerpt: 'Indulge in a unique shopping experience with our curated tour.',
      description: 'Explore the vibrant markets and shopping districts, and shop for the finest local and international products.',
      available: true,
      purchaseLink: 'https://example.com/shopping-tour'
    },
    {
      id: 2,
      image: 'path/to/birding-tour-image.jpg',
      title: 'Birdwatcher’s Paradise',
      category: 'Birding Tour',
      excerpt: 'Discover a world of exotic birds and their natural habitats.',
      description: 'Embark on an unforgettable birding journey, guided by experienced ornithologists, and witness the beauty of diverse bird species.',
      available: true,
      purchaseLink: 'https://example.com/birding-tour'
    },
    {
      id: 3,
      image: 'path/to/golfing-experience-image.jpg',
      title: 'Luxury Golf Retreat',
      category: 'Golfing',
      excerpt: 'Tee off in style at world-class golf courses with breathtaking views.',
      description: 'Enjoy an exclusive golfing experience, combining luxurious accommodations and top-notch golf facilities.',
      available: true,
      purchaseLink: 'https://example.com/golfing-experience'
    },
    {
      id: 4,
      image: 'path/to/diving-adventure-image.jpg',
      title: 'Deep Blue Expedition',
      category: 'Diving',
      excerpt: 'Plunge into the mesmerizing underwater world and explore vibrant coral reefs.',
      description: 'Join a thrilling diving adventure, led by certified instructors, and witness marine life like never before.',
      available: true,
      purchaseLink: 'https://example.com/diving-adventure'
    }
  ];

  // Unique categories for filtering
  uniqueCategories: string[] = [];

  // Currently selected category for filtering
  selectedCategory: string | null = null;

  constructor() {
    this.initData();
  }

  initData() {
    // Initialize unique categories
    this.uniqueCategories = this.getUniqueCategories();
  }

  getUniqueCategories(): string[] {
    // Get unique categories from the product data
    return Array.from(new Set(this.featuredProducts.map(product => product.category)));
  }

  filterProductsByCategory(category: string): void {
    // Set the selected category for filtering
    this.selectedCategory = category;
  }

  clearCategoryFilter(): void {
    // Clear the selected category to show all products
    this.selectedCategory = null;
  }

  getFilteredProducts(): Product[] {
    // Filter products based on the selected category
    if (this.selectedCategory) {
      return this.featuredProducts.filter(product => product.category === this.selectedCategory);
    }
    return this.featuredProducts;
  }
}