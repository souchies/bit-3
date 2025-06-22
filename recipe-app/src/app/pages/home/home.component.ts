import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { RecipeService, Recipe, Category } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RecipeCardComponent],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">
            Discover Delicious Recipes
            <span class="hero-emoji">🍳✨</span>
          </h1>
          <p class="hero-subtitle">
            Find the perfect recipe for any occasion. From quick meals to gourmet dishes, 
            we have thousands of recipes waiting for you!
          </p>
          
          <div class="search-section">
            <div class="search-box">
              <input 
                type="text" 
                placeholder="What would you like to cook today?"
                [(ngModel)]="searchQuery"
                (input)="onSearchInput()"
                (keyup.enter)="onSearch()"
                class="search-input"
                [class.searching]="isSearching"
              >
              <button (click)="onSearch()" class="search-btn" [disabled]="loading">
                {{ loading ? '⏳' : '🔍' }} Search
              </button>
            </div>
            <div class="search-status" *ngIf="isSearching">
              <span class="search-indicator">Searching...</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="categories-section" *ngIf="categories.length > 0">
        <h2 class="section-title">Browse by Category</h2>
        <div class="categories-grid">
          <div 
            class="category-card" 
            *ngFor="let category of categories"
            (click)="selectCategory(category.strCategory)"
            [class.active]="selectedCategory === category.strCategory"
          >
            <div class="category-icon">🍽️</div>
            <span class="category-name">{{ category.strCategory }}</span>
          </div>
        </div>
      </section>

      <!-- Recipes Section -->
      <section class="recipes-section">
        <div class="section-header">
          <h2 class="section-title">
            {{ getSectionTitle() }}
          </h2>
          <button 
            *ngIf="!isSearching" 
            (click)="loadRandomRecipes()" 
            class="btn btn-secondary"
            [disabled]="loading"
          >
            {{ loading ? '⏳ Loading...' : '🎲 Get Random Recipes' }}
          </button>
        </div>

        <!-- Loading State -->
        <div class="loading" *ngIf="loading">
          <div class="spinner"></div>
          <p>Finding delicious recipes for you...</p>
        </div>

        <!-- Error State -->
        <div class="error" *ngIf="error">
          <div class="error-icon">😔</div>
          <div class="error-message">{{ error }}</div>
          <button (click)="loadRandomRecipes()" class="btn btn-primary">
            Try Again
          </button>
        </div>

        <!-- Recipes Grid -->
        <div class="recipes-grid" *ngIf="!loading && !error && recipes.length > 0">
          <app-recipe-card 
            *ngFor="let recipe of recipes; trackBy: trackByRecipeId" 
            [recipe]="recipe"
          ></app-recipe-card>
        </div>

        <!-- No Results -->
        <div class="no-results" *ngIf="!loading && !error && recipes.length === 0">
          <div class="no-results-icon">🔍</div>
          <h3>No recipes found</h3>
          <p>Try searching for something else or browse our categories</p>
          <button (click)="clearSearch()" class="btn btn-primary">
            Browse All Recipes
          </button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .hero {
      text-align: center;
      padding: 60px 0;
      margin-bottom: 40px;
    }

    .hero-title {
      font-size: 48px;
      font-weight: 800;
      color: white;
      margin-bottom: 16px;
      line-height: 1.2;
    }

    .hero-emoji {
      display: block;
      font-size: 56px;
      margin-top: 8px;
    }

    .hero-subtitle {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 40px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.5;
    }

    .search-section {
      max-width: 500px;
      margin: 0 auto;
    }

    .search-box {
      display: flex;
      gap: 12px;
      background: white;
      border-radius: 25px;
      padding: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .search-input {
      flex: 1;
      border: none;
      padding: 12px 20px;
      font-size: 16px;
      outline: none;
      border-radius: 20px;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .search-input.searching {
      background: #f8f9fa;
    }

    .search-btn {
      background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 20px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .search-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
    }

    .search-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .search-status {
      margin-top: 8px;
      text-align: center;
    }

    .search-indicator {
      color: white;
      font-size: 14px;
      opacity: 0.8;
    }

    .categories-section {
      margin-bottom: 40px;
    }

    .section-title {
      font-size: 32px;
      font-weight: 700;
      color: white;
      margin-bottom: 24px;
      text-align: center;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      margin-bottom: 40px;
    }

    .category-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .category-card:hover,
    .category-card.active {
      transform: translateY(-4px);
      border-color: #ff6b6b;
      box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
    }

    .category-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }

    .category-name {
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }

    .recipes-section {
      margin-bottom: 40px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .recipes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }

    .no-results {
      text-align: center;
      padding: 60px 20px;
      color: white;
    }

    .no-results-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .no-results h3 {
      font-size: 24px;
      margin-bottom: 8px;
    }

    .no-results p {
      font-size: 16px;
      margin-bottom: 24px;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 36px;
      }

      .hero-emoji {
        font-size: 48px;
      }

      .hero-subtitle {
        font-size: 18px;
      }

      .search-box {
        flex-direction: column;
        gap: 8px;
      }

      .search-btn {
        width: 100%;
      }

      .categories-grid {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 12px;
      }

      .recipes-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .section-header {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  categories: Category[] = [];
  loading = false;
  error = '';
  searchQuery = '';
  selectedCategory = '';
  isSearching = false;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Setup debounced search
    this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after user stops typing
      distinctUntilChanged(), // Only search if query changed
      takeUntil(this.destroy$)
    ).subscribe(query => {
      if (query.trim()) {
        this.performSearch(query);
      } else {
        this.loadRandomRecipes();
      }
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.loadRandomRecipes();

    // Listen for route query params
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchQuery = params['search'];
        this.performSearch(params['search']);
      } else if (params['category']) {
        this.selectedCategory = params['category'];
        if (params['category'] === 'popular') {
          this.loadPopularRecipes();
        } else {
          this.loadRecipesByCategory(params['category']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput() {
    this.searchSubject.next(this.searchQuery);
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/home'], { 
        queryParams: { search: this.searchQuery.trim() } 
      });
    }
  }

  performSearch(query: string) {
    this.loading = true;
    this.error = '';
    this.isSearching = true;
    this.selectedCategory = '';

    this.recipeService.searchRecipes(query).subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.loading = false;
        this.isSearching = false;
      },
      error: (error) => {
        this.error = 'Failed to search recipes. Please try again.';
        this.loading = false;
        this.isSearching = false;
        console.error('Error searching recipes:', error);
      }
    });
  }

  loadCategories() {
    this.recipeService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadRandomRecipes() {
    this.loading = true;
    this.error = '';
    this.isSearching = false;
    this.selectedCategory = '';

    this.recipeService.getRandomRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load recipes. Please try again.';
        this.loading = false;
        console.error('Error loading random recipes:', error);
      }
    });
  }

  loadPopularRecipes() {
    this.loading = true;
    this.error = '';
    this.isSearching = false;
    this.selectedCategory = 'popular';

    this.recipeService.getPopularRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load popular recipes. Please try again.';
        this.loading = false;
        console.error('Error loading popular recipes:', error);
      }
    });
  }

  loadRecipesByCategory(category: string) {
    this.loading = true;
    this.error = '';
    this.isSearching = false;
    this.selectedCategory = category;

    this.recipeService.getRecipesByCategory(category).subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load recipes for this category. Please try again.';
        this.loading = false;
        console.error('Error loading recipes by category:', error);
      }
    });
  }

  selectCategory(category: string) {
    this.router.navigate(['/home'], { 
      queryParams: { category: category } 
    });
  }

  clearSearch() {
    this.searchQuery = '';
    this.router.navigate(['/home']);
  }

  trackByRecipeId(index: number, recipe: Recipe): string {
    return recipe.idMeal;
  }

  getSectionTitle(): string {
    if (this.isSearching) {
      return `Search Results for "${this.searchQuery}"`;
    } else if (this.selectedCategory === 'popular') {
      return 'Popular Recipes';
    } else if (this.selectedCategory) {
      return `${this.selectedCategory} Recipes`;
    } else {
      return 'Discover Recipes';
    }
  }
} 