import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

interface FormErrors {
  email: string;
  password: string;
}

export default function Login({ onLogin }: LoginProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });

  function validate(field: string, value: string): string {
    if (field === 'email') {
      if (!value) return 'Este campo es obligatorio';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'El correo electrónico no es válido';
    }
    if (field === 'password') {
      if (!value) return 'Este campo es obligatorio';
      if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    }
    return '';
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (touched[name as keyof typeof touched]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  }

  const isFormValid = !validate('email', email) && !validate('password', password);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setTouched({ email: true, password: true });
    const emailError = validate('email', email);
    const passwordError = validate('password', password);
    setErrors({ email: emailError, password: passwordError });
    if (!emailError && !passwordError) {
      onLogin(email, password);
    }
  }

  return (
    <div className="auth-form">
      <h2 className="auth-form__title">Iniciar sesión</h2>
      <form className="auth-form__form" noValidate onSubmit={handleSubmit}>
        <label className="auth-form__field">
          <input
            className={`auth-form__input${errors.email && touched.email ? ' auth-form__input_error' : ''}`}
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <span className={`auth-form__error${errors.email && touched.email ? ' auth-form__error_visible' : ''}`}>
            {errors.email}
          </span>
        </label>
        <label className="auth-form__field">
          <input
            className={`auth-form__input${errors.password && touched.password ? ' auth-form__input_error' : ''}`}
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <span className={`auth-form__error${errors.password && touched.password ? ' auth-form__error_visible' : ''}`}>
            {errors.password}
          </span>
        </label>
        <button
          className={`auth-form__button${!isFormValid ? ' auth-form__button_disabled' : ''}`}
          type="submit"
          disabled={!isFormValid}
        >
          Iniciar sesión
        </button>
      </form>
      <p className="auth-form__footer">
        ¿Aún no eres miembro?{' '}
        <Link className="auth-form__link" to="/signup">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}