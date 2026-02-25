import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import ProductCard from '../../components/public/ProductCard';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('relevancia');
  const [filterCategory, setFilterCategory] = useState('Todos');

  let results = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase())
  );

  if (filterCategory !== 'Todos') {
    results = results.filter(p => p.category === filterCategory);
  }

  if (sortBy === 'menor') {
    results = [...results].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'mayor') {
    results = [...results].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'nombre') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name));
  }

  const resultCategories = Array.from(new Set(
    products
      .filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      )
      .map(p => p.category)
  ));

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-blue-600">Inicio</Link> &gt;{' '}
          <span className="text-gray-700 font-medium">Resultados para "{query}"</span>
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
          <aside className="lg:w-56 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-bold text-gray-800 mb-3 text-sm">Filtrar por categoría</h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setFilterCategory('Todos')}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                      filterCategory === 'Todos'
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Todos ({products.filter(p =>
                      p.name.toLowerCase().includes(query.toLowerCase()) ||
                      p.description.toLowerCase().includes(query.toLowerCase()) ||
                      p.category.toLowerCase().includes(query.toLowerCase()) ||
                      p.brand.toLowerCase().includes(query.toLowerCase())
                    ).length})
                  </button>
                </li>
                {resultCategories.map(cat => {
                  const icon = categories.find(c => c.name === cat)?.icon || '';
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setFilterCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 transition ${
                          filterCategory === cat
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{icon}</span> {cat}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            {/* Sort bar */}
            <div className="bg-white rounded-lg shadow-sm p-3 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-800">{results.length}</span> resultados para{' '}
                <span className="font-semibold text-gray-800">"{query}"</span>
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

            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {results.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-lg text-gray-600 mb-2">No encontramos resultados para "{query}"</p>
                <p className="text-sm text-gray-400 mb-6">Revisá la ortografía o buscá con otros términos</p>
                <Link to="/products" className="text-blue-600 hover:text-blue-800 font-semibold">
                  Ver todos los productos →
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
