const input = document.querySelector("input");
const qrimg = document.querySelector("img");
const generate = document.querySelector("#generate");
const download = document.querySelector("#download");

generate.addEventListener("click", () => {
  let count = 0;
  const qrdata = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`;
  qrimg.src = qrdata;
  qrimg.style = `display:block`;
  download.style = `display:block`;
});

download.addEventListener("click", async () => {
  const respone = await fetch(qrimg.src);
  const data = await respone.blob();
  const downloadlink = document.createElement("a");
  downloadlink.href = window.URL.createObjectURL(data);
  downloadlink.download = `${input.value}.jpg`;
  downloadlink.click();
});