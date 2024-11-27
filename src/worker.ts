self.onmessage = function (event) {
    const functionString = event.data;
    console.log('#x', functionString);
    const helloFunction = new Function(`return (${functionString})`)();
    const result = helloFunction();
    self.postMessage(result);
  };