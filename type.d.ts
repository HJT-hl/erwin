declare module "erwin"  {
    export function observe<T>(observer:Record<string,unknown>):(tag:unknown)=>T
    export namespace config {
        var funReg : RegExp;
        var private : boolean;
        var lazy : boolean;
    }
} 