# RecipeHub - Angular Recipe Website

A beautiful, modern recipe website built with Angular that uses TheMealDB API to provide users with thousands of delicious recipes from around the world.

# 📚 Recetario App - by Eileen Sofia Jeronimo Camargo 
  _(https://github.com/souchies)_



## 🌟 Features

- **Recipe Search**: Search for recipes by name
- **Category Browsing**: Browse recipes by categories (Italian, Mexican, Asian, etc.)
- **Recipe Details**: View complete recipe information including ingredients and instructions
- **Ingredient Sourcing**: Find where to buy ingredients with mock restaurant data
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Loading States**: Smooth loading animations and error handling
- **Random Recipes**: Discover new recipes with the random recipe feature

## 🛠️ Technology Stack

- **Angular 17** - Latest version with standalone components
- **TypeScript** - Type-safe development
- **SCSS** - Advanced styling with variables and mixins
- **TheMealDB API** - Free recipe database
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
src/app/
├── components/
│   ├── header/           # Navigation and search header
│   └── recipe-card/      # Recipe preview cards
├── pages/
│   ├── home/            # Main page with recipe grid
│   └── recipe-detail/   # Detailed recipe view
├── services/
│   └── recipe.service.ts # API service for TheMealDB
└── shared/              # Shared utilities and interfaces
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recipe-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200` to see the application.

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🎨 Design Features

- **Modern UI**: Clean, minimalist design with beautiful gradients
- **Smooth Animations**: Hover effects and transitions throughout
- **Emoji Icons**: Fun and engaging visual elements
- **Card-based Layout**: Easy-to-scan recipe cards
- **Color Scheme**: Purple and coral gradient theme
- **Typography**: Inter font family for excellent readability

## 🔧 API Integration

The application uses TheMealDB API (https://www.themealdb.com/api.php) which provides:

- Recipe search functionality
- Random recipe generation
- Category-based filtering
- Detailed recipe information
- Ingredient lists and measurements

### API Endpoints Used

- `search.php` - Search recipes by name
- `random.php` - Get random recipes
- `lookup.php` - Get recipe by ID
- `filter.php` - Filter by category
- `categories.php` - Get all categories

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured experience with grid layouts
- **Tablet**: Adapted layouts with touch-friendly interactions
- **Mobile**: Single-column layouts with optimized navigation

## 🛒 Mock Restaurant Data

The recipe detail page includes mock restaurant data showing where users can buy ingredients, including:

- Restaurant names and addresses
- Ratings and reviews
- Distance information
- Price ranges
- Specialty categories

## 🎯 Key Components

### Header Component
- Navigation menu
- Search functionality
- Responsive design
- Logo and branding

### Recipe Card Component
- Recipe preview with image
- Category and area information
- Hover effects and animations
- Click to view details

### Home Page
- Hero section with search
- Category browsing
- Recipe grid with filtering
- Loading and error states

### Recipe Detail Page
- Complete recipe information
- Ingredients list with measurements
- Step-by-step instructions
- Restaurant recommendations
- YouTube video links (when available)

## 🔍 Search Functionality

- Real-time search with TheMealDB API
- Search by recipe name
- Category-based filtering
- URL-based search state management
- Clear search functionality

## 🎨 Styling

The application uses SCSS with:

- CSS Grid and Flexbox for layouts
- CSS Variables for consistent theming
- Smooth transitions and animations
- Mobile-first responsive design
- Modern CSS features like backdrop-filter

## 🚀 Performance Features

- Lazy loading of components
- Optimized images and assets
- Efficient API calls with error handling
- Smooth animations and transitions
- Responsive image loading

## 📝 Development Notes

- Uses Angular standalone components for better tree-shaking
- Implements proper error handling and loading states
- Follows Angular best practices and conventions
- Includes comprehensive TypeScript interfaces
- Uses modern Angular features like signals and control flow

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request



---
