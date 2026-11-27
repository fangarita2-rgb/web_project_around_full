import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import * as auth from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';
import type {
  UserData,
  CardData,
  PopupConfig,
  UserFormData,
  AvatarFormData,
  CardFormData,
} from '../types/types';

import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Login from './Login/Login';
import Register from './Register/Register';
import InfoTooltip from './InfoTooltip/InfoTooltip';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';

function App(): React.JSX.Element {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [popup, setPopup] = useState<PopupConfig | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isCheckingToken, setIsCheckingToken] = useState<boolean>(true);

  // Estados para autenticación
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isCheckingToken, setIsCheckingToken] = useState<boolean>(true);

  // Estado para InfoTooltip
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState<boolean>(false);
  const [isAuthSuccess, setIsAuthSuccess] = useState<boolean>(false);
  const [tooltipMessage, setTooltipMessage] = useState<string>('');

  const navigate = useNavigate();

  // Comprobar token guardado al iniciar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res.data) {
            setIsLoggedIn(true);
            setUserEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.error('Error al verificar el token:', err);
          localStorage.removeItem('jwt');
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, []);

  // Cargar tarjetas cuando el usuario esté autenticado
  useEffect(() => {
    if (!isLoggedIn) return;

    api
      .getInitialCards()
      .then((initialCards) => setCards(initialCards))
      .catch((err) => console.error('Error al obtener tarjetas:', err));
  }, [isLoggedIn]);

  // Cargar perfil e imágenes de la API local cuando el usuario esté autenticado
  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      try {
        const [userData, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards(),
        ]);
        setCurrentUser(userData);
        setCards(initialCards);
      } catch (error) {
        console.error('Error al obtener datos iniciales de la API local:', error);
      }
    })();
  }, [isLoggedIn]);

  // Manejo del registro
  const handleRegister = async (email: string, password: string): Promise<void> => {
    try {
      await auth.register(email, password);
      setIsAuthSuccess(true);
      setTooltipMessage('¡Correcto! Ya estás registrado.');
      setIsInfoTooltipOpen(true);
      navigate('/signin');
    } catch (error) {
      console.error('Error en el registro:', error);
      setIsAuthSuccess(false);
      setTooltipMessage('Uy, algo salió mal. Por favor, inténtalo de nuevo.');
      setIsInfoTooltipOpen(true);
    }
  };

  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      const data = await auth.authorize(email, password);
      localStorage.setItem('jwt', data.token);
      const userData = await api.getUserInfo();
      setCurrentUser(userData);
      setIsLoggedIn(true);
      navigate('/');
  // Manejo del inicio de sesión
  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      const data = await auth.authorize(email, password);
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true);
        setUserEmail(email);
        navigate('/');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setIsAuthSuccess(false);
      setTooltipMessage('Uy, algo salió mal. Por favor, inténtalo de nuevo.');
      setIsInfoTooltipOpen(true);
    }
  };

  const handleSignOut = (): void => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser(null);
  // Cerrar sesión
  const handleSignOut = (): void => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/signin');
  };

  const closeAllPopups = (): void => {
    setPopup(null);
    setIsInfoTooltipOpen(false);
  };

  function handleOpenPopup(popupConfig: PopupConfig): void {
    setPopup(popupConfig);
  }

  async function handleCardLike(card: CardData): Promise<void> {
    const isLiked = card.isLiked;
    try {
      const apiCall = isLiked ? api.unlikeCard(card._id) : api.likeCard(card._id);
      const newCard = await apiCall;
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCardDelete(card: CardData): Promise<void> {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateUser(data: UserFormData): Promise<void> {
    try {
      const updatedUser = await api.updateUserInfo(data);
      setCurrentUser(updatedUser);
      closeAllPopups();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateAvatar(data: AvatarFormData): Promise<void> {
    try {
      const updatedUser = await api.updateAvatar(data);
      setCurrentUser(updatedUser);
      closeAllPopups();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddPlaceSubmit(data: CardFormData): Promise<void> {
    try {
      const newCard = await api.addCard(data);
      setCards((state) => [newCard, ...state]);
      closeAllPopups();
    } catch (error) {
      console.error(error);
    }
  }

  // Evita redirecciones indebidas mientras se verifica el token
  if (isCheckingToken) {
    return <div className="page__loader">Cargando...</div>;
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar, handleAddPlaceSubmit }}
    >
      <div className="page__content">
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={currentUser?.email ?? ''}
          onSignOut={handleSignOut}
        />
        <Header isLoggedIn={isLoggedIn} userEmail={userEmail} onSignOut={handleSignOut} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  cards={cards}
                  popup={popup}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={closeAllPopups}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signin"
<<<<<<< HEAD
            element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
=======
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
          />

          <Route
            path="/signup"
            element={
              isLoggedIn ? <Navigate to="/" replace /> : <Register onRegister={handleRegister} />
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Register onRegister={handleRegister} />
              )
            }
          />

          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? '/' : '/signin'} replace />}
          />
        </Routes>

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isAuthSuccess}
          message={tooltipMessage}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;