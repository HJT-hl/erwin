import {observe} from "./utils"
export default    observe({
    count : 0,
    addCount(){
      setTimeout(()=>  this.count += 1,0)
    }
})
  