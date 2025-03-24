// import { evaluate } from "./evaluator.js";
// import { parse } from "./parser.js";

export const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
  topScope[op] = Function("a, b", `return a ${op} b;`);
}

topScope.print = value => {
  console.log(value);
  return value;
};

// let prog = parse(`if(true, false, true)`);
// console.log(evaluate(prog, topScope));

// function run(program) {
//     return evaluate(parse(program), Object.create(topScope));
// }

// run(`
//     do(define(total, 0),
//         define(count, 1),
//         while(<(count, 11),
//                 do(define(total, +(total, count)),
//                 define(count, +(count, 1)))),
//         print(total))
// `);