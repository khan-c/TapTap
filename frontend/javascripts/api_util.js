export const saveScores = (scores) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/scores');
  xhr.setRequestHeader('Content-Type', 'application/JSON;charset=utf-8');

  xhr.onreadystatechange = () => {
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

  xhr.send(JSON.stringify(scores));
};

export const fetchScores = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/scores');
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
};
