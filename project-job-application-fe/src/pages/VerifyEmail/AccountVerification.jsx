import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import PageLoadingSpinner from "../../components/Loading/PageLoadingSpinner";
import { verifyAcountAction } from "../../redux/actions/AuthAction/AuthAction";
import { useDispatch } from "react-redux";
function AccountVerification() {
  const [searchParams] = useSearchParams();
  const { email, token } = Object.fromEntries([...searchParams]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!email || !token) {
      setError(true);
      setVerifying(false);
      return;
    }

    const verify = async () => {
      try {
        await dispatch(verifyAcountAction({ email, token }, navigate));
      } catch (err) {
        // đã xử lý lỗi ở action
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [email, token, dispatch, navigate]);

  // ❌ Nếu thiếu param hoặc lỗi xác thực thì chuyển 404
  if (!email || !token || error) {
    return <Navigate to="/404" />;
  }

  // ⏳ Hiển thị khi đang xác thực
  if (verifying) {
    return <PageLoadingSpinner caption="Đang xác thực tài khoản..." />;
  }

  // Trường hợp fallback nếu không khớp điều kiện nào
  return null;
}

export default AccountVerification;
