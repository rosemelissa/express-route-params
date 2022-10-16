import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get("/eat/apple", (req, res) => {
  res.json({
    message: "Yum yum - you ate an apple!",
  });
});

app.get("/eat/banana", (req, res) => {
  res.json({
    message: "Yum yum - you ate a banana!",
  });
});

app.get("/eat/carrot", (req, res) => {
  res.json({
    message: "Yum yum - you ate a carrot!",
  });
});

app.get<{ exampleRouteParameter: string}>("/echo/:exampleRouteParameter", (req, res) => {
  const echoContent = req.params.exampleRouteParameter;
  res.json({
    echo: echoContent,
    message: `I am echoing back to you: ${echoContent}`,
  });
});

app.get<{ numOne: string, numTwo: string}>("/multiply/:numOne/:numTwo", (req, res) => {
  /**
   * Note that `numOne` and `numTwo` are both typed as string.
   * (Hover over with your mouse to see!)
   *
   * Route params are, by default, typed as strings when they
   * are parsed by Express.
   */
  const { numOne, numTwo } = req.params;
  const multiplication = parseInt(numOne) * parseInt(numTwo);
  res.json({
    original: `${numOne} x ${numTwo}`,
    result: multiplication,
  });
});

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

app.get<{message: string}>("/shout/:message", (req, res) => {
  res.json({
    "shout": req.params.message.toUpperCase(),
    "result": `I am shouting back to you: ${req.params.message.toUpperCase()}`,
  })
});

app.get<{a: string, b: string, c: string}>("/addition/:a/:b/:c", (req, res) => {
  const sum: number = parseInt(req.params.a) + parseInt(req.params.b) + parseInt(req.params.c);
  res.json({
    "original": `${req.params.a} + ${req.params.b} + ${req.params.c}`,
    "result": sum,
  });
});

app.get<{a: string, b: string}>("/addition/:a/:b", (req, res) => {
  const sum: number = parseInt(req.params.a) + parseInt(req.params.b);
  res.json({
    "original": `${req.params.a} + ${req.params.b}`,
    "result": sum,
  });
});

app.get<{food: string}>("/eat/:food", (req, res) => {
  const vowels: string[] = ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u'];
  let an: string = 'a';
  if (vowels.includes(req.params.food.charAt(0))) {
    an = 'an';
  };
  res.json({
    message: `Yum yum - you ate ${an} ${req.params.food}!`,
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
