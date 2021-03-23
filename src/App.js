import {observe} from './utils';

const countState = observe({
  count : 0,
  addCount(){
    setTimeout(()=>this.count++,0)
    
  }
},{
  funReg: /^add/,
  private : true,
})

function App() {
  const c = countState()
  return (
    <div className="App">
      {c.count}
      <AddBtn/>
    </div>
  );
}

const AddBtn = ()=>{
  const c = countState();
  return <button onClick={()=>c.addCount()}> add </button>
} 

export default App;
