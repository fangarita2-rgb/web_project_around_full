import React from 'react';

interface InfoTooltipProps {
  isOpen: boolean;
  isSuccess: boolean;
  message: string;
  onClose: () => void;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  isOpen,
  isSuccess,
  message,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
          aria-label="Cerrar modal"
        />
        <div
          className={`popup__status-icon ${
            isSuccess ? 'popup__status-icon_type_success' : 'popup__status-icon_type_error'
          }`}
        />
        <h3 className="popup__status-title">{message}</h3>
      </div>
    </div>
  );
};

export default InfoTooltip;