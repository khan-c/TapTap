export const saveScores = (scores) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/scores');
  xhr.setRequestHeader('Content-Type', 'application/JSON;charset=utf-8');

  xhr.onreadystatechange = () => {
    const DONE = 4;
    const OK = 200;
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        console.log("post check");
        return xhr.responseText;
      } else {
        console.log(xhr.status);
      }
    }
  };

  xhr.send(JSON.stringify(scores));
};

export const fetchScores = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/scores');

  xhr.onreadystatechange = function() {
    const DONE = 4;
    const OK = 200;
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        return xhr.responseText;
      } else {
        console.log(xhr.status);
      }
    }
  };

  xhr.send(null);
  return xhr;
};
