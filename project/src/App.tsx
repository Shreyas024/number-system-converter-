import React from 'react';
import { ThemeProvider } from './components/ThemeContext';
import Header from './components/Header';
import Converter from './components/Converter';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Converter />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;