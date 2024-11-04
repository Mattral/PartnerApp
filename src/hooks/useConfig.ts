import { useContext } from 'react';
import { ConfigContext } from 'contexts/ConfigContext';

// ==============================|| HOOKS - CONFIG  ||============================== //

const useConfig = () => useContext(ConfigContext);

export default useConfig;
