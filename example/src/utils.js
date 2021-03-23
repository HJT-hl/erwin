import {useState} from 'react';
export const config = {
    funReg : /^set/,
    private: false
}
export const observe = (state,options = config ) =>{
    if(options.funReg === undefined) options.funReg = config.funReg;
    if(options.private === undefined) options.private = config.private;
    const reflashQueue = [];
    const renderNode = ()=>{
        const length = reflashQueue.length;
        for(let i=0;i<length;i++){
            const [r,reflash] = reflashQueue.shift();
            reflash(r+1 >= Number.MAX_SAFE_INTEGER - 9999 ? 0 : r + 1);
        }
    }
    const stateProxy = new Proxy(state,{
        get(target,key){
            if(key.match(options.funReg) && options.private) {
                const privateFun = (...arg)=>{
                    
                    target[key].apply(new Proxy(state,{
                        set(target,key,value){
                            target[key] = value;
                            renderNode();
                            return true;
                        }
                    }),arg)
                }
               
                return privateFun;
            }
            return target[key]
        },
        set(target,key,value){
            if(options.private) return false;
            if(key.match(options.funReg)) return false;
            target[key] = value;
            renderNode()
            return true;
        }
    })
    return ()=>{
        reflashQueue.push(useState(0))
        return stateProxy
    }
}
