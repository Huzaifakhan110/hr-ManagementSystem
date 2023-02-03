import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Welcome from './components/Welcome';
function App() {
  return (
   <>
<BrowserRouter>
       <Routes>
      <Route path="/" element={<SignIn/>} />

      <Route path="/SignUp" element={<SignUp/>} />
     <Route path='/Welcome' element={<Welcome/>}/>
      </Routes>
     </BrowserRouter>
   </>
  );
}



export default App;