import React, { useState, FormEvent } from 'react';

const LogIn = ({ handleSubmit }: { handleSubmit: (event: FormEvent<HTMLFormElement>) => void }) => {
  return (
    <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-input"
        placeholder="Email"
        name="email"
      />
      <input
        type="password"
        className="form-input"
        placeholder="Password"
        name="password"
      />
    <button type="submit" className="button">
     LOGIN
    </button>
    </form>
  );
};

export default LogIn;
