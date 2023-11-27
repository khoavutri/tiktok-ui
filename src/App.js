import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Folowing from './Pages/Folowing';
import Upload from './Pages/Upload';
import Profile from './Pages/Profile';
import DefaultLayout from './Layout/DefaultLayout';
import ANotSlidebarLayout from './Layout/ANotSlidebarLayout';
import Discover from './Pages/Discover';
import Video from './Pages/Video';
import NotFound from './Pages/NotFound';
import Search from './Pages/Search';
import Admin from './Pages/Admin';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<DefaultLayout Children={<Home />} />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/Following" element={<DefaultLayout Children={<Folowing />} />} />
                    <Route path="/Discover" element={<DefaultLayout Children={<Discover />} />} />
                    <Route path="/Upload" element={<ANotSlidebarLayout children={<Upload />} />} />
                    <Route path="/:profile" element={<DefaultLayout Children={<Profile />} />} />
                    <Route path="/NotFound" element={<ANotSlidebarLayout children={<NotFound />} />} />
                    <Route path="/search" element={<DefaultLayout Children={<Search />} />} />
                    <Route path="/search/video" element={<DefaultLayout Children={<Search />} />} />
                    <Route path="/search/user" element={<DefaultLayout Children={<Search />} />} />
                    <Route path="/:profile/video/:id" element={<Video />} />
                    <Route path="*" element={<Navigate to="/NotFound" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
