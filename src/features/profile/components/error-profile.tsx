import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorProfile = (): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return <></>;
};

export { ErrorProfile };
