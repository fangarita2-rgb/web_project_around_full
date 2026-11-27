import { useState, useContext, type FormEvent, type ChangeEvent } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext';

interface FormErrors {
  name: string;
  link: string;
}

export default function NewCard(): React.JSX.Element {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [errors, setErrors] = useState<FormErrors>({ name: '', link: '' });
  const [touched, setTouched] = useState({ name: false, link: false });

  function validate(field: string, value: string): string {
    if (field === 'name') {
      if (!value.trim()) return 'Este campo es obligatorio';
      if (value.length < 2) return 'El título debe tener al menos 2 caracteres';
      if (value.length > 30) return 'El título no puede superar los 30 caracteres';
    }
    if (field === 'link') {
      if (!value.trim()) return 'Este campo es obligatorio';
      try {
        new URL(value);
        return '';
      } catch {
        return 'Introduce una URL válida';
      }
    }
    return '';
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name: field, value } = e.target;
    if (field === 'name') setName(value);
    if (field === 'link') setLink(value);
    if (touched[field as keyof typeof touched]) {
      setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
    }
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement>): void {
    const { name: field, value } = e.target;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  }

  const isFormValid = !validate('name', name) && !validate('link', link);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setTouched({ name: true, link: true });
    const nameError = validate('name', name);
    const linkError = validate('link', link);
    setErrors({ name: nameError, link: linkError });
    if (!nameError && !linkError) {
      handleAddPlaceSubmit({ name, link });
    }
  }

  return (
    <form
      className="popup__form"
      id="new-card-form"
      name="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="card-name"
          className="popup__input popup__input_type_card-name"
          name="name"
          placeholder="Título"
          minLength={2}
          maxLength={30}
          required
          type="text"
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span
          className={`popup__error${errors.name && touched.name ? ' popup__error_visible' : ''}`}
          id="card-name-error"
        >
          {errors.name}
        </span>
      </label>
      <label className="popup__field">
        <input
          id="card-url"
          className="popup__input popup__input_type_url"
          name="link"
          placeholder="Enlace de la imagen"
          required
          type="url"
          value={link}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span
          className={`popup__error${errors.link && touched.link ? ' popup__error_visible' : ''}`}
          id="card-url-error"
        >
          {errors.link}
        </span>
      </label>
      <button
        className={`button popup__button${!isFormValid ? ' popup__button_disabled' : ''}`}
        type="submit"
        disabled={!isFormValid}
      >
        Crear
      </button>
    </form>
  );
}