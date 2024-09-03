export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_APP_KAKAO_CLIENT_ID
}&redirect_uri=${import.meta.env.VITE_APP_KAKAO_REDIRECT_URI}&response_type=code`;

export const NAVER_AUTH_STATE = encodeURI(import.meta.env.VITE_APP_NAVER_REDIRECT_URI);

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
  import.meta.env.VITE_APP_NAVER_CLIENT_ID
}&redirect_uri=${import.meta.env.VITE_APP_NAVER_REDIRECT_URI}&state=${NAVER_AUTH_STATE}`;

export const INIT_AUTH_CONTEXT = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};
