import logo from './logo.svg';
import './App.css';
import axios from 'axios'

axios.get('http://ec2-3-139-108-38.us-east-2.compute.amazonaws.com/')
.then((res)=>{
  console.log(res.data.msg)
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HI WE'RE THE-TOOPYOç
        </p>
        
      </header>
    </div>
  );
}

export default App;
