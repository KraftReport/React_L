import * as deepEqual from "deep-equal";
console.log(deepEqual({a:123},{a:123}));
var foo : number = 122

console.log()
interface zero {
    x : number;
}

interface one {
      x : number ;
      y : number ;
 }   

 interface two {
    x : number;
    y : number;
    z : number;
 
 }


var objZero : zero = {x :9}
 var objOne : one = {x  :0,y : 9}
 var objTwo : two = {x : 2,y: 7,z: 8}



function wow(one : one){

}

wow(objOne)
wow(objTwo)
// wow(objZero)