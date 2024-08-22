import axios from 'axios';
import { User } from '../interfaces/user.interface';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export function getKaKaoToken(code: string) {
  return axios({
    method: 'post',
    url: '/kakao/token',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: {
      grant_type: 'authorization_code',
      client_id: import.meta.env.VITE_APP_KAKAO_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_APP_KAKO_REDIRECT_URI,
      code: code,
    },
  })
    .then((res) => {
      console.log('getKaKaoToken', res);
      return res.data.access_token;
    })
    .catch((e) => {
      console.log(e);
    });
}

export function getKakaoInfo(token: string): Promise<User> {
  return axios({
    method: 'get',
    url: '/kakao/get-user',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      const {
        data: { id, properties },
      } = res;

      return {
        id: String(id),
        nickname: String(properties.nickname),
        profile_img: String(properties.profile_image),
      };
    })
    .catch((e) => {
      throw new Error(e);
    });
}

export function saveUser(user: User): Promise<boolean> {
  try {
    return setDoc(doc(db, 'users', user.id), user)
      .then(() => true)
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    console.log(e);
    throw new Error();
  }
}
