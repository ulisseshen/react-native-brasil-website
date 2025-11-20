/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ia-translated: true

import React from 'react';

import ThemedImage from '@theme/ThemedImage';

import Section from '../Section';
import SectionTitle from '../SectionTitle';

import styles from './styles.module.css';

function Native() {
  return (
    <Section>
      <SectionTitle
        title="Desenvolvimento nativo para todos"
        description={
          <>
            React Native permite que você crie aplicativos verdadeiramente
            nativos e não compromete a experiência dos seus usuários. Ele fornece um conjunto
            central de componentes nativos agnósticos de plataforma como <code>View</code>,{' '}
            <code>Text</code> e <code>Image</code> que mapeiam diretamente para os
            blocos de construção de UI nativos da plataforma.
          </>
        }
      />
      <ThemedImage
        sources={{
          light: '/img/homepage/dissection.png',
          dark: '/img/homepage/dissection-dark.png',
        }}
        className={styles.flyoutIllustration}
        alt="Uma UI React Native apontando elementos nativos como Views, ScrollViews e mais"
      />
    </Section>
  );
}

export default Native;
