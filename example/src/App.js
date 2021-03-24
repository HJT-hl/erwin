import {observe,config} from './utils';
config.private = false;
config.funReg = /^set/;

const countState = observe({
  count : 0,
  addCount(){
    setTimeout(()=>  this.count += 1,0)
  }
},{
  funReg : /^add/,
  lazy : true,
})

function App() {
  const c = countState('App')
  return (
    <div className="App">
      {c.count}
      <AddBtn/>
      {c.count %2 ?<Show/>:null  }
    </div>
  );
}

const AddBtn = ()=>{
  const c = countState('AddBtn');
  return <button onClick={()=>c.addCount()}> add </button>
} 
const Show = ()=>{ 
  const c = countState('Show');
  return <h1>{c.count}</h1>
}

export default App;
