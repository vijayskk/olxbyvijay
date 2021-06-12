import './App.css';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Viewproduct from './components/Viewproduct';
import Home from './components/Home';
import Sellpage from './components/Sellpage';
import Signup from './components/Signup';
import Login from './components/Login';
import { AuthProvoider } from './contexts/AuthContext';


function App() {

  return (
    <AuthProvoider>
    <Router>
    <div className="App">
        
        
       
      <main className="max-w-7xl mx-auto">

        
          <Switch>
            <Route path="/product" component={Viewproduct} />
            <Route path="/sell" component={Sellpage} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Home}>
            

            </Route>
          </Switch>
        

       
      </main>
    </div>
    </Router>
    </AuthProvoider>
  ); 
}

export default App;
