import {observe,config} from './utils';
config.private = true;
config.funReg = /^set/;
const countState = observe({
  count : 0,
  addCount(){
    setTimeout(()=>  this.count += 1,0)
    
  }
},{
  funReg : /^add/
})

function App() {
  console.log(111111111)
  const c = countState()
  return (
    <div className="App">
      {c.count}
      <AddBtn/>
      {c.count %2 ?<Show/>:null  }
    </div>
  );
}

const AddBtn = ()=>{
  console.log(9999999999);
  const c = countState();
  return <button onClick={()=>c.addCount()}> add </button>
} 
const Show = ()=>{ 
  const c = countState();
  return <h1>{c.count}</h1>
}

export default App;
