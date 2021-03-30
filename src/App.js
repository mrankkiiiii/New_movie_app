import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import BottomNavigation from "./components/BottomNavigation";
import { Container } from "@material-ui/core";
import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='App'>
        <Container>
          <Switch>
            <Route exact path='/' component={Trending} />
            <Route path='/movies' component={Movies} />
            <Route path='/series' component={Series} />
            <Route path='/search' component={Search} />
          </Switch>
        </Container>
      </div>
      <BottomNavigation />
    </BrowserRouter>
  );
}

export default App;
