import { useEffect } from 'react';
import * as api from '../../shared/services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function KakaoCallback() {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();
  const { login } = useAuth();

  const goToBack = (success: boolean = true) => {
    if (!success) {
      const queryParams = new URLSearchParams({ success: String(success) });
      navigate(`/auth?${queryParams.toString()}`);
      return;
    }

    navigate('/', { replace: true });
    return;
  };

  useEffect(() => {
    if (!code) return;

    api
      .getKakaoToken(code)
      .then(async (token: string) => {
        if (!token) throw new Error('토큰 발급 실패');

        const userInfo = await api.getKakaoUserInfo(token);
        const result = await api.saveUser(userInfo);
        login(userInfo);

        goToBack(result);
      })
      .catch((e) => {
        goToBack(false);
        throw e;
      });
  }, [code]);

  return <></>;
}

export default KakaoCallback;
