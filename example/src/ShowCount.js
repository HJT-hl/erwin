import countState from "./countState"
export default function (){ 
    const c = countState('ShowCount')
    return <div style={{color : "#0000"+Math.random() * 99}}>
      {c.count}
    </div>
}