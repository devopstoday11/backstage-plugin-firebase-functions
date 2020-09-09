/*
 * Copyright 2020 RoadieHQ
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { firebaseFunctionsApiRef } from '../api';
import { useLocalStorage } from 'react-use';

export type Settings = {
  projects: string[];
};

export const StateContext = React.createContext<
  [Settings, React.Dispatch<React.SetStateAction<Settings | undefined>>]
>([] as any);
const STORAGE_KEY = `${firebaseFunctionsApiRef.id}.settings`;

const initialState: Settings = {
  projects: [],
};

export const ContextProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useLocalStorage(STORAGE_KEY, initialState);
  if (settings === undefined) {
    throw new Error('Firebase functions plugin settings is undefined');
  }

  return (
    <StateContext.Provider value={[settings, setSettings]}>
      <>{children}</>
    </StateContext.Provider>
  );
};
