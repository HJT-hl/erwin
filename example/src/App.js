import {observe,config} from './utils';
config.private = true;
config.funReg = /^set/;
const countState = observe({
  count : 0,
  addCount(value){
    console.log(value);
    setTimeout(()=>  this.count += value,0)
    
  }
},{
  funReg : /^add/
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
  return <button onClick={()=>c.addCount(1000)}> add </button>
} 

export default App;
