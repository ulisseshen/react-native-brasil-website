/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ia-translated: true

import React from 'react';

import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

import Home from '../components/Home';

const Index = () => {
  return (
    <Layout
      description="Um framework para construir apps nativos para Android, iOS e mais usando React"
      wrapperClassName="homepage">
      <Head>
        <title>React Native · Aprenda uma vez, escreva em qualquer lugar</title>
        <meta
          property="og:title"
          content="React Native · Aprenda uma vez, escreva em qualquer lugar"
        />
        <meta
          property="twitter:title"
          content="React Native · Aprenda uma vez, escreva em qualquer lugar"
        />
      </Head>
      <Home />
    </Layout>
  );
};

export default Index;
