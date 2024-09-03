import { useState } from 'react';
import { login } from '../services/login';
import '../styles/form.css';

export const Form = () => {
  const [error, setError] = useState(null);
  const [successLoged, setSuccessLogin] = useState(false);

  const sendRequest = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const response = await login(data);
    console.log(response);
    if (response.error) {
      setError(response.message);
      setSuccessLogin(false);
    } else {
      setError(null);
      setSuccessLogin(true);
    }
  };

  return (
    <div className="login-container">
      <form className="form-card" onSubmit={sendRequest}>
        <h1>login</h1>
        <div className="input-group">
          <span className="input-icon user-icon"></span>
          <input name="user" type="text" placeholder="Usuario" />
        </div>
        <div className="input-group">
          <span className="input-icon lock-icon"></span>
          <input name="password" type="password" placeholder="contraseña" />
        </div>
        <input className="submit-button" type="submit" value="ACEPTAR" />
        {successLoged && <span id="correct">inicio de sesión exitoso</span>}
        {error && <span id="spanError">{error}</span>}
      </form>
    </div>
  );
};