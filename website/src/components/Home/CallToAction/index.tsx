/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ia-translated: true

import React from 'react';

import Logo from '../Logo';

import styles from './styles.module.css';

function CallToAction() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.background} />
      <div className={styles.container}>
        <Logo />
        <h1 className={styles.title}>Bem-vindo à comunidade React Native</h1>
        <a href="/docs/environment-setup" className={styles.primaryButton}>
          Começar
        </a>
      </div>
    </div>
  );
}

export default CallToAction;
