declare module "erwin"  {
    export function observe<T>(observer:T):()=>T
    export namespace config {
        var funReg : RegExp;
        var private : boolean;
        var lazy : boolean;
    }
} 