import { useEffect } from 'react';
import * as api from '../../shared/services/authService';
import { useNavigate } from 'react-router-dom';

function KakaoCallback() {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    if (!code) return;

    api
      .getKaKaoToken(code)
      .then(async (token: string) => {
        if (!token) return;

        const userInfo = await api.getKakaoInfo(token);
        const result = await api.saveUser(userInfo);

        const queryParams = new URLSearchParams({ success: String(result) });
        navigate(`/auth?${queryParams.toString()}`);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, [code]);

  return <></>;
}

export default KakaoCallback;
