import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface RegisterProps {
  onRegister: (email: string, password: string) => Promise<void>;
}

export const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister(formData.email, formData.password);
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form__title">Regístrate</h2>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="auth-form__input"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="auth-form__input"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth-form__button">
          Regístrate
        </button>
      </form>
      <p className="auth-form__text">
        ¿Ya eres miembro?{' '}
        <Link to="/signin" className="auth-form__link">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
};

export default Register;