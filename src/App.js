import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<DefaultLayout Children={<Home />} />} />
                    <Route path="/Following" element={<DefaultLayout Children={<Folowing />} />} />
                    <Route path="/Discover" element={<DefaultLayout Children={<Discover />} />} />
                    <Route path="/Upload" element={<ANotSlidebarLayout children={<Upload />} />} />
                    <Route path="/:profile" element={<DefaultLayout Children={<Profile />} />} />
                    <Route path="/NotFound" element={<NotFound />} />
                    <Route path="/:profile/video/:id" element={<Video />} />
                    <Route path="/search" element={<DefaultLayout Children={<Search />} />} />
                    <Route path="/search/video" element={<DefaultLayout Children={<Search />} />} />
                    <Route path="/search/user" element={<DefaultLayout Children={<Search />} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
