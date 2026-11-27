import { useState, useContext, type FormEvent, type ChangeEvent } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext';

interface FormErrors {
  name: string;
  about: string;
}

export default function EditProfile(): React.JSX.Element {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || '');
  const [about, setAbout] = useState(currentUser?.about || '');
  const [errors, setErrors] = useState<FormErrors>({ name: '', about: '' });
  const [touched, setTouched] = useState({ name: false, about: false });

  function validate(field: string, value: string): string {
    if (!value.trim()) return 'Este campo es obligatorio';
    if (field === 'name') {
      if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
      if (value.length > 40) return 'El nombre no puede superar los 40 caracteres';
    }
    if (field === 'about') {
      if (value.length < 2) return 'La descripción debe tener al menos 2 caracteres';
      if (value.length > 200) return 'La descripción no puede superar los 200 caracteres';
    }
    return '';
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name: field, value } = e.target;
    if (field === 'name') setName(value);
    if (field === 'about') setAbout(value);
    if (touched[field as keyof typeof touched]) {
      setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
    }
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement>): void {
    const { name: field, value } = e.target;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  }

  const isFormValid = !validate('name', name) && !validate('about', about);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setTouched({ name: true, about: true });
    const nameError = validate('name', name);
    const aboutError = validate('about', about);
    setErrors({ name: nameError, about: aboutError });
    if (!nameError && !aboutError) {
      handleUpdateUser({ name, about });
    }
  }

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      name="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="profile-name"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Nombre"
          minLength={2}
          maxLength={40}
          required
          type="text"
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span
          className={`popup__error${errors.name && touched.name ? ' popup__error_visible' : ''}`}
          id="profile-name-error"
        >
          {errors.name}
        </span>
      </label>
      <label className="popup__field">
        <input
          id="profile-about"
          className="popup__input popup__input_type_about"
          name="about"
          placeholder="Acerca de mí"
          minLength={2}
          maxLength={200}
          required
          type="text"
          value={about}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span
          className={`popup__error${errors.about && touched.about ? ' popup__error_visible' : ''}`}
          id="profile-about-error"
        >
          {errors.about}
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