import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Surah from './components/Surah/Surah';
import SearchResult from './components/SearchResult/SearchResult';

function App() {
  return (
    <div>
       <Router>
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/surah/:surahNumber">
            <Surah />
          </Route>
          <Route path="/search/:searchValue">
            <SearchResult />
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
          {/* <Route path="*">
            <NotFound/>
          </Route> */}
        </Switch>
      </Router>


    </div>
  );
}

export default App;
