import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Category from './pages/Category';
import MovieDetails from './pages/MovieDetails';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>

                <footer className="app-footer">
                    <p>&copy; {new Date().getFullYear()} MovieFlix. Made with ❤️ by Hichem.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
