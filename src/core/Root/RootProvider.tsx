import React, {useState} from 'react';
import RootContext from './RootContext';
import {observer} from 'mobx-react-lite';
import {Root} from './Root';
import RootService from "./RootService";

export type RootProviderProps = {
  children?: React.ReactNode;
};

export default observer((props: RootProviderProps) => {
  const {children} = props;
  const [root] = useState<Root>(() => new RootService());
  return (
    <RootContext.Provider value={root}>
      {children}
    </RootContext.Provider>
  );
});
