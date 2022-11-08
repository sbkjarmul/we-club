import httpClient from "@/network/httpClient"

function draw() {
  return httpClient.get('/lotery/draw');
}

function getDrawnUser() {
  return httpClient.get(`/lotery/whom`)
}

export default {
  draw,
  getDrawnUser
}
