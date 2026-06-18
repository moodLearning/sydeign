import {useEffect, useState} from 'react';
import {getPing} from '~/lib/api';

export default function Test() {
  const [msg, setMsg] = useState('loading...');

  useEffect(() => {
    getPing()
      .then((data) => setMsg(data.message))
      .catch((err) => setMsg(err.message));
  }, []);

  return <div>{msg}</div>;
}
