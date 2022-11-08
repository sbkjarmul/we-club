import { WeMember } from "@/models/we-member.model";
import httpClient from "@/network/httpClient"

function logIn(user: WeMember) {
  return httpClient.post('/auth/signin', {
    email: user.email,
    password: user.password
  });
}

function getUserInfo() {
  return httpClient.get('/users/me')
}

export default {
  logIn,
  getUserInfo
}
