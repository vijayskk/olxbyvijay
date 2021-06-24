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
import {UserLocationProvider} from './contexts/UserLocation'
import {SellerLocationProvider,SellerCoordsProvider} from './contexts/SellerLocation'
import {ProductViewProvider , CommentrefreshProvider} from './contexts/ProductViewContext'
import Myads from './components/Myads';
import ResultPage from './components/ResultPage';
import Mymails from './components/Mymails';
import MessengerCustomerChat from 'react-messenger-customer-chat';



function App() {

  return (
    <CommentrefreshProvider>
    <ProductViewProvider>
    <UserLocationProvider>
    <SellerLocationProvider>
    <SellerCoordsProvider>
    <Router>
    <div className="App">
        
        
       
      <main className="max-w-7xl mx-auto">


            <Switch>
              <Route path="/product" component={Viewproduct} />
              <Route path="/search" component={ResultPage} />
              <Route path="/sell" component={Sellpage} />
              <Route path="/mymails" component={Mymails} />
              <Route path="/myads" component={Myads} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route exact path="/" component={Home}>


              </Route>
            </Switch>



      </main>
      <MessengerCustomerChat
        pageId="105032348501540"
        appId="390344595753306"
      />,
    </div>
    </Router>
    </SellerCoordsProvider>
    </SellerLocationProvider>
    </UserLocationProvider>
    </ProductViewProvider>
    </CommentrefreshProvider>
  ); 
}

export default App;
