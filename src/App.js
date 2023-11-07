import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Folowing from './Pages/Folowing';
import Upload from './Pages/Upload';
import Profile from './Pages/Profile';
import DefaultLayout from './Layout/DefaultLayout';
import ANotSlidebarLayout from './Layout/ANotSlidebarLayout';
import Discover from './Pages/Discover';
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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
