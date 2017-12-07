export const saveScores = (scores) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.jsonbin.io/b');
  xhr.setRequestHeader('contentType', 'json');
  xhr.send(scores);
};

export const fetchScores = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jsonbin.io/b');
  xhr.send(null);

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
};
