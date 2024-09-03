import axios from 'axios';
import { User } from '../interfaces/user.interface';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { NAVER_AUTH_STATE } from '../constants/auth';

export function getKakaoToken(code: string) {
  return axios({
    method: 'post',
    url: '/kakao/token',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: {
      grant_type: 'authorization_code',
      client_id: import.meta.env.VITE_APP_KAKAO_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_APP_KAKAO_REDIRECT_URI,
      code: code,
    },
  })
    .then((res) => {
      return res.data.access_token;
    })
    .catch((e) => {
      console.log(e);
    });
}

export function getKakaoUserInfo(token: string): Promise<User> {
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

export function getNaverToken(code: string) {
  return axios({
    method: 'post',
    url: '/naver/token',
    headers: {
      'X-Naver-Client-Id': import.meta.env.VITE_APP_NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': import.meta.env.VITE_APP_NAVER_CLIENT_SECRET,
    },
    params: {
      grant_type: 'authorization_code',
      client_id: import.meta.env.VITE_APP_NAVER_CLIENT_ID,
      client_secret: import.meta.env.VITE_APP_NAVER_CLIENT_SECRET,
      code: code,
      state: NAVER_AUTH_STATE,
    },
  })
    .then((res) => {
      return res.data.access_token;
    })
    .catch((e) => {
      throw new Error(e);
    });
}

export function getNaverUserInfo(token: string): Promise<User> {
  return axios({
    method: 'get',
    url: '/naver/get-user',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Naver-Client-Id': import.meta.env.VITE_APP_NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': import.meta.env.VITE_APP_NAVER_CLIENT_SECRET,
    },
  })
    .then((res) => {
      const {
        data: {
          response: { id, nickname, profile_image },
        },
      } = res;

      return {
        id: String(id),
        nickname: String(nickname),
        profile_img: String(profile_image),
      };
    })
    .catch((e) => {
      throw new Error(e);
    });
}
