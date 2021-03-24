import {useState,useEffect} from 'react';
export const config = {
    funReg : /^set/,
    private: false,
    lazy : true,
}
export const observe = (state,options = config ) =>{
    if(options.funReg === undefined) options.funReg = config.funReg;
    if(options.private === undefined) options.private = config.private;
    if(options.lazy === undefined) options.lazy = config.lazy;
    const reRenderMap = new Map();
    const renderNode = ()=>{
        for (var reRenderFun of reRenderMap.values()) {
            reRenderFun();
        }
    }
    const stateProxy = new Proxy(state,{
        get(target,key){
            if(key.match(options.funReg) && options.private) {
                const privateFun = (...arg)=>{
                    target[key].apply(new Proxy(state,{
                        set(target,key,value){
                            if(options.lazy && target[key] === value) return true;
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
            if(options.lazy && target[key] === value) return true;
            target[key] = value;
            renderNode()
            return true;
        }
    })
    return (key)=>{
        const [r,reflash] = useState(0)
        reRenderMap.set(key,()=>reflash(r+1))
        useEffect(()=>{
            return ()=>{
                reRenderMap.set(key,()=>{});
            }
        },[])
        return stateProxy
    }
}
