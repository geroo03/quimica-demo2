import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '../../data/products';
import { categories } from '../../data/categories';

const ProductList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat') || '';

  const allCategories = ['Todos', ...categories.map(c => c.name)];
  const [activeCategory, setActiveCategory] = useState(
    catParam ? categories.find(c => c.slug === catParam)?.name || 'Todos' : 'Todos'
  );
  const [sortBy, setSortBy] = useState('relevancia');

  let filteredProducts = activeCategory === 'Todos'
    ? products
    : products.filter(p => p.category === activeCategory);

  if (sortBy === 'menor') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'mayor') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'nombre') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-4">
          Inicio &gt; <span className="text-gray-700 font-medium">Productos</span>
          {activeCategory !== 'Todos' && (
            <> &gt; <span className="text-gray-700 font-medium">{activeCategory}</span></>
          )}
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters - horizontal scroll en mobile, sidebar en desktop */}
          <aside className="lg:w-60 shrink-0">
            {/* Mobile: horizontal scrollable */}
            <div className="lg:hidden overflow-x-auto pb-2 -mx-4 px-4">
              <div className="flex gap-2 w-max">
                {allCategories.map(cat => {
                  const catIcon = categories.find(c => c.name === cat)?.icon || '📋';
                  const count = cat === 'Todos' ? products.length : products.filter(p => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all shadow-sm border ${
                        activeCategory === cat
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                      }`}
                    >
                      <span className="text-base">{cat === 'Todos' ? '📋' : catIcon}</span>
                      <span>{cat}</span>
                      <span className={`text-xs ${activeCategory === cat ? 'text-blue-200' : 'text-gray-400'}`}>({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop: sidebar vertical */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 text-sm">Categorías</h3>
              </div>
              <ul className="p-2 space-y-1">
                {allCategories.map(cat => {
                  const catIcon = categories.find(c => c.name === cat)?.icon || '📋';
                  const count = cat === 'Todos' ? products.length : products.filter(p => p.category === cat).length;
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between transition-all border ${
                          activeCategory === cat
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 font-medium'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{cat === 'Todos' ? '📋' : catIcon}</span>
                          <span>{cat}</span>
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          activeCategory === cat
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Products grid */}
          <main className="flex-1">
            {/* Sort bar */}
            <div className="bg-white rounded-lg shadow-sm p-3 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-800">{filteredProducts.length}</span> resultados
                {activeCategory !== 'Todos' && <> en <span className="font-semibold">{activeCategory}</span></>}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Ordenar:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="relevancia">Más relevantes</option>
                  <option value="menor">Menor precio</option>
                  <option value="mayor">Mayor precio</option>
                  <option value="nombre">A - Z</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-gray-500 text-lg">No se encontraron productos en esta categoría</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductList;