import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountSettings.scss"

const SettingsAccount = () => {
    const [userData, setUserData] = useState<{ name?: string; surname?: string; email?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Проверка на авторизацию
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("https://cinemaguide.skillbox.cc/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Статус ответа:", response.status);
        if (!response.ok) {
          throw new Error(`Ошибка запроса: ${response.status}`);
        }

        const data = await response.json();
        console.log("Ответ сервера:", data);
        setUserData(data);
      } catch (err: any) {
        console.error("Ошибка:", err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Обработчик выхода
  const handleLogout = async () => {
    try {
      const response = await fetch("https://cinemaguide.skillbox.cc/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Ошибка выхода: ${response.status}`);
      }

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");

      navigate("/login");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      setError("Не удалось выйти из аккаунта. Попробуйте ещё раз.");
    }
  };
  const getInitials = () => {
    const first = userData.name?.[0]?.toUpperCase() || "";
    const last = userData.surname?.[0]?.toUpperCase() || "";
    return `${first}${last}` || "—";
  };


    return(
        <div className="container">
            <div className="setings__group">
                <div className="setings__group-card">
                    <div className="setings__group-card-img">{getInitials()}</div>
                    <div className="setings__group-card-description">
                        <div className="setings__group-card-description-sub">Имя Фамилия</div>
                        <div className="setings__group-card-description-username"> {userData.name || "—"} {userData.surname || "—"}</div>
                    </div>
                </div>
                <div className="setings__group-card">
                    <div className="setings__group-card-img setings__group-card-img-email"></div>
                    <div className="setings__group-card-description">
                        <div className="setings__group-card-description-sub">Электронная почта</div>
                        <div className="setings__group-card-description-email"> {userData.email || "—"}</div>
                    </div>
                </div>
                {error && <p className="error">Ошибка: {error}</p>}
            </div>
            <button className="setings__group-logout-btn" onClick={handleLogout}>Выйти из аккаунта</button>
        </div>
    );
}
export default SettingsAccount;
 