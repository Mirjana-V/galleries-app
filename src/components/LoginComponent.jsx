import React from "react";

export default function LoginComponent({ handleOnLogin, newUser, setNewUser }) {
  return (
    <div>
      <form onSubmit={handleOnLogin}>
        <label>Email: </label>
        <input
          required
          type="email"
          value={newUser.email}
          onChange={({ target }) => setNewUser({ ...newUser, email: target.value })}
        />
        <br />
        <br />
        <label>Password: </label>
        <input
          required
          type="password"
          value={newUser.password}
          onChange={({ target }) =>
            setNewUser({ ...newUser, password: target.value })
          }
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}