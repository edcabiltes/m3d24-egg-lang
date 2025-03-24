import { specialForms } from "./specialForms.js";

export function evaluate(expr, scope) {
  if (expr.type === "value") {
    return expr.value;
  } else if (expr.type === "word") {
    if (expr.name in scope) return scope[expr.name];
    throw new ReferenceError(`Undefined binding: ${expr.name}`);
  } else if (expr.type === "apply") {
    let { operator, args } = expr;
    if (operator.type === "word" && operator.name in specialForms) {
      return specialForms[operator.name](args, scope);
    }

    let op = evaluate(operator, scope);
    if (typeof op === "function") {
      return op(...args.map(arg => evaluate(arg, scope)));
    }
    throw new TypeError("Applying a non-function.");
  }
}
