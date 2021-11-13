const input = document.getElementById("input");
const btn = document.getElementById("btn");
const shortLink = document.querySelector(".generated-link");

btn.addEventListener("click", shorten);
console.log(input.getAttributeNames());
console.log(input.getAttribute("type"));
// console.log(input.getAttribute())
checkQueries();
function checkQueries() {
  // console.log(window.location);
  if (!window.location.search) return;
  const shortCode = window.location.search.slice(-7);
  console.log(window.location);

  axios
    .get(`http://localhost:4000/${shortCode}`)
    .then((response) => {
      console.log(response.data);
      window.location.href = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function shorten() {
  var config = {
    method: "post",
    url: "http://localhost:4000/shorten",
    data: { bigLink: input.value },
  };
  axios(config)
    .then((response) => {
      const chhutkaLink = `${window.location.origin}${window.location.pathname}?l=${response.data}`;
      console.log(chhutkaLink);
      shortLink.innerHTML = chhutkaLink;
      shortLink.href = chhutkaLink;
      // console.log(chhutkaLink);
      // shortLink.setAttribute("href", `${window.location.href}?l=${shortLink}`);
    })
    .catch(function (error) {
      console.log(error);
    });
}
