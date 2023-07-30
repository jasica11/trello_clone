
import AuthorizationPage from './components/AuthorizationPage';
import DashboardPage from './components/Dashboardpage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ViewBoardPage from './components/ViewBoardPage';
import ViewListsPage from './components/ViewListsPage';
import CardDetails from './components/CardDetails';
 import './index.css';
 


function App() {


 return (

  
  <Router>

<Routes>
  <Route exact path="/" element={<AuthorizationPage  />} />
  <Route exact path="/dashboard" element={<DashboardPage/>}/>
  <Route exact path="/view-board/:boardId" element={<ViewBoardPage/>}/>
  <Route exact path="/view-list/:boardId/:listId" element={<ViewListsPage/>}/>
  <Route exact path="/card-details/:listId/:cardId" element={<CardDetails />}/>
  </Routes>
 

  </Router>
  

 )}  

export default App;
