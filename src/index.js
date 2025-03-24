import { parse } from "./parser.js";
import { evaluate } from "./evaluator.js";
import { topScope } from "./environment.js";

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

// Test 1: Simple Function
run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
`);
// Expected Output: 11

// Test 2: Recursive Function (Power Function)
run(`
do(define(pow, fun(base, exp,
     if(==(exp, 0),
        1,
        *(base, pow(base, -(exp, 1)))))),
   print(pow(2, 10)))
`);
// Expected Output: 1024
