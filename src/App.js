import './App.css';
import {Routes, Route} from "react-router-dom"
import FormList from './views/FormList';
import Details from './views/Details';
import Update from './views/Update';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FormList/>} />
        <Route path="/products/:id" element={<Details/>} />
        <Route path="/products/:id/edit" element={<Update/>} />
      </Routes>
    </div>
  );
}

export default App;