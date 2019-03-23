export function apiGetCall(url, successCallback, errorCallback) {
  var status = null;
  const BASE_URL = "http://localhost:8000/api";
  fetch(BASE_URL + url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(response => {
      if (status === 200 || status === 201) 
				successCallback(response);
      else 
				errorCallback(response);
    })
    .catch(error => errorCallback(error));
};
export function apiPostCall(url, data, successCallback, errorCallback) {
  var status = null;
  const BASE_URL = "http://localhost:8000/api";
  fetch(BASE_URL + url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
		headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(response => {
      if (status === 200 || status === 201) successCallback(response);
      else errorCallback(response);
    })
    .catch(error => errorCallback(error));
};