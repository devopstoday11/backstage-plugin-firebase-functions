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
import { InfoCard } from '@backstage/core';

import { ContextProvider } from './ContextProvider';
import { Entity } from '@backstage/catalog-model';
import { Card, LinearProgress, TableContainer } from '@material-ui/core';
import { FirebaseFunctionDetailsCard } from './FirebaseFunctionDetailsCard';
import { useFunctionIds } from '../hooks/useFunctionIds';
import { useSingleFirebaseFunction } from '../hooks/useSingleFirebaseFunction';

type Props = { entity: Entity };
const FirebaseFunctionWidgetPage: React.FC = () => {
  const { functions: whitelistedFunctions } = useFunctionIds();
  const { loading, functionData } = useSingleFirebaseFunction(
    whitelistedFunctions[0],
  );

  return (
    <TableContainer component={Card}>
      {loading || !functionData ? (
        <LinearProgress />
      ) : (
        <InfoCard title="Firebase Function Details">
          <FirebaseFunctionDetailsCard firebaseFunction={functionData} />
        </InfoCard>
      )}
    </TableContainer>
  );
};

export const FirebaseFunctionWidget: React.FC<Props> = ({ entity }: Props) => (
  <ContextProvider entity={entity}>
    <FirebaseFunctionWidgetPage />
  </ContextProvider>
);