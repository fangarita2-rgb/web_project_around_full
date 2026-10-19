import { useState, useContext, type FormEvent, type ChangeEvent } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext';

export default function EditAvatar(): React.JSX.Element {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  function validate(value: string): string {
    if (!value.trim()) return 'Este campo es obligatorio';
    try {
      new URL(value);
      return '';
    } catch {
      return 'Introduce una URL válida';
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    setAvatar(value);
    if (touched) {
      setError(validate(value));
    }
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement>): void {
    setTouched(true);
    setError(validate(e.target.value));
  }

  const isFormValid = !validate(avatar);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setTouched(true);
    const err = validate(avatar);
    setError(err);
    if (!err) {
      handleUpdateAvatar({ avatar });
    }
  }

  return (
    <form
      className="popup__form"
      id="edit-avatar-form"
      name="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="avatar-url"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Enlace de la foto de perfil"
          required
          type="url"
          value={avatar}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span
          className={`popup__error${error && touched ? ' popup__error_visible' : ''}`}
          id="avatar-url-error"
        >
          {error}
        </span>
      </label>
      <button
        className={`button popup__button${!isFormValid ? ' popup__button_disabled' : ''}`}
        type="submit"
        disabled={!isFormValid}
      >
        Guardar
      </button>
    </form>
  );
}