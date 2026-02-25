# Quimica Demo Project

This is a web application designed for selling chemical products, featuring both a public view for customers and a private view for company management. The project is built using React with Vite, styled with Tailwind CSS, and utilizes React Router for navigation.

## Project Structure

```
quimica-demo
├── src
│   ├── main.tsx                # Entry point of the application
│   ├── App.tsx                 # Main application component with routing
│   ├── components               # Contains reusable components
│   │   ├── common               # Common components (Header, Footer, Navbar)
│   │   ├── public               # Components for public view (ProductCard, ProductList, etc.)
│   │   └── private              # Components for private view (Dashboard, ProductManagement, etc.)
│   ├── pages                    # Contains page components for routing
│   │   ├── public               # Public pages (Home, Products, About, etc.)
│   │   └── private              # Private pages (AdminDashboard, ManageProducts, etc.)
│   ├── routes                   # Routing configuration
│   ├── data                     # Simulated data (products, orders, categories)
│   ├── types                    # TypeScript types and interfaces
│   ├── utils                    # Utility functions
│   └── styles                   # Global styles and Tailwind CSS imports
├── public                       # Public assets
│   └── vite.svg                 # Logo or illustration
├── index.html                   # Main HTML file
├── package.json                 # npm configuration
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd quimica-demo
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the development server:**
   ```
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Features

- **Public View:**
  - Browse and search for chemical products.
  - View detailed product information.
  - Contact the company through a contact form.

- **Private View:**
  - Admin dashboard for managing products and orders.
  - User authentication for secure access to management features.

## Technologies Used

- React
- Vite
- Tailwind CSS
- TypeScript
- React Router

## License

This project is licensed under the MIT License. See the LICENSE file for more details.