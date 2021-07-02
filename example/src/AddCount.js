import countState from "./countState"
export default   ()=>{
    const c = countState('AddBtn');
    return <button onClick={()=>c.addCount()}> add </button>
} 