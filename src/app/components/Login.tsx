import React, { FormEvent } from 'react';
import Button from './Button';

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
      <Button type="submit" className="button">
          LOGIN
      </Button>
    </form>
  );
};

export default LogIn;
