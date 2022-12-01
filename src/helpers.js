import Handlebars from 'handlebars/dist/handlebars.runtime';

console.log('from helpers');

Handlebars.registerHelper('if_eq', function (a, b, opts) {
  if (a == b) {
    console.log({ a, b });
    // eslint-disable-next-line no-invalid-this
    return opts.fn(this);
  } else {
    // eslint-disable-next-line no-invalid-this
    return opts.inverse(this);
  }
});
