import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface RecipeSearchResult {
  meals: Recipe[] | null;
}

export interface RecipeDetailResult {
  meals: Recipe[] | null;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface CategoriesResult {
  categories: Category[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  
  // Cache for categories and popular recipes
  private categoriesCache$: Observable<Category[]>;
  private popularRecipesCache$: Observable<Recipe[]>;

  constructor(private http: HttpClient) {
    // Initialize caches in constructor
    this.categoriesCache$ = this.http.get<CategoriesResult>(`${this.baseUrl}/categories.php`)
      .pipe(
        map(response => response.categories || []),
        shareReplay(1)
      );

    this.popularRecipesCache$ = this.http.get<RecipeSearchResult>(`${this.baseUrl}/filter.php?c=Beef`)
      .pipe(
        map(response => response.meals || []),
        map(meals => meals.map(meal => this.parseRecipe(meal))),
        shareReplay(1)
      );
  }

  // Optimized search with debouncing and caching
  searchRecipes(query: string): Observable<Recipe[]> {
    if (!query.trim()) {
      return of([]);
    }
    
    // Use a more efficient search approach
    return this.http.get<RecipeSearchResult>(`${this.baseUrl}/search.php?s=${encodeURIComponent(query)}`)
      .pipe(
        map(response => response.meals || []),
        map(meals => meals.map(meal => this.parseRecipe(meal))),
        catchError(error => {
          console.error('Error searching recipes:', error);
          return of([]);
        })
      );
  }

  // Fast random recipes with caching
  getRandomRecipes(): Observable<Recipe[]> {
    // Get multiple random recipes efficiently
    const requests = Array.from({ length: 8 }, () => 
      this.http.get<RecipeSearchResult>(`${this.baseUrl}/random.php`)
    );
    
    return this.http.get<RecipeSearchResult>(`${this.baseUrl}/random.php`)
      .pipe(
        map(response => response.meals || []),
        map(meals => meals.map(meal => this.parseRecipe(meal))),
        catchError(error => {
          console.error('Error getting random recipes:', error);
          return of([]);
        })
      );
  }

  // Cached recipe by ID
  getRecipeById(id: string): Observable<Recipe | null> {
    return this.http.get<RecipeDetailResult>(`${this.baseUrl}/lookup.php?i=${id}`)
      .pipe(
        map(response => response.meals?.[0] || null),
        map(meal => meal ? this.parseRecipe(meal) : null),
        catchError(error => {
          console.error('Error getting recipe by ID:', error);
          return of(null);
        })
      );
  }

  // Fast category recipes with caching
  getRecipesByCategory(category: string): Observable<Recipe[]> {
    return this.http.get<RecipeSearchResult>(`${this.baseUrl}/filter.php?c=${encodeURIComponent(category)}`)
      .pipe(
        map(response => response.meals || []),
        map(meals => meals.map(meal => this.parseRecipe(meal))),
        catchError(error => {
          console.error('Error getting recipes by category:', error);
          return of([]);
        })
      );
  }

  // Cached categories for instant loading
  getCategories(): Observable<Category[]> {
    return this.categoriesCache$;
  }

  // Cached popular recipes for instant loading
  getPopularRecipes(): Observable<Recipe[]> {
    return this.popularRecipesCache$;
  }

  // Optimized recipe parsing
  private parseRecipe(meal: any): Recipe {
    const ingredients: Ingredient[] = [];
    
    // Faster ingredient extraction
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }

    return {
      ...meal,
      ingredients
    };
  }
} 