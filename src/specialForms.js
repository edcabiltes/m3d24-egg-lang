import { evaluate } from "./evaluator.js";

export const specialForms = Object.create(null);

specialForms.if = (args, scope) => {
  if (args.length !== 3) throw new SyntaxError("Wrong number of args to if");
  return evaluate(args[0], scope) !== false ? evaluate(args[1], scope) : evaluate(args[2], scope);
};

specialForms.while = (args, scope) => {
  if (args.length !== 2) throw new SyntaxError("Wrong number of args to while");
  while (evaluate(args[0], scope) !== false) evaluate(args[1], scope);
  return false;
};

specialForms.do = (args, scope) => {
  let value = false;
  for (let arg of args) value = evaluate(arg, scope);
  return value;
};

specialForms.define = (args, scope) => {
  if (args.length !== 2 || args[0].type !== "word") throw new SyntaxError("Incorrect use of define");
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

// Function definition: `fun`
specialForms.fun = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError("Functions need a body");
  }

  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map(expr => {
    if (expr.type !== "word") {
      throw new SyntaxError("Parameter names must be words");
    }
    return expr.name;
  });

  return function (...argValues) {
    if (argValues.length !== params.length) {
      throw new TypeError("Wrong number of arguments");
    }

    let localScope = Object.create(scope);
    for (let i = 0; i < params.length; i++) {
      localScope[params[i]] = argValues[i];
    }

    return evaluate(body, localScope);
  };
};
