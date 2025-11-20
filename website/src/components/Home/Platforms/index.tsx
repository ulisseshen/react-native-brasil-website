/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ia-translated: true

import React from 'react';

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

import Section from '../Section';
import SectionTitle from '../SectionTitle';
import FoxFact from './FoxFact';

import styles from './styles.module.css';

function Platforms() {
  return (
    <Section>
      <SectionTitle
        title="Crie aplicativos nativos para Android, iOS e muito mais usando React"
        description={
          <>
            React Native traz as melhores partes do desenvolvimento com React
            para o desenvolvimento nativo.
            <br />
            É uma biblioteca JavaScript de primeira classe para construir
            interfaces de usuário.
          </>
        }
      />
      <div className={styles.platformsContainer}>
        <div className={styles.featureContainer}>
          <div className={styles.codeEditor}>
            <div className={styles.codeEditorTitleContainer}>index.js</div>
            <div className={styles.codeEditorContentContainer}>
              <pre>
                <span style={{color: 'var(--home-code-red)'}}>function</span>{' '}
                <span style={{color: 'var(--home-code-purple'}}>
                  HomeScreen
                </span>
                {`()`}
                {` {`} <br />
                <span
                  style={{color: 'var(--home-code-red)'}}>{`  return `}</span>
                {`(`} <br />
                {`    <`}
                <span style={{color: 'var(--home-code-green)'}}>View</span>
                {`>`} <br />
                {`      <`}
                <span style={{color: 'var(--home-code-green)'}}>{`Text`}</span>
                {`>`} Hello World 👋 🌍!{`</`}
                <span style={{color: 'var(--home-code-green)'}}>{`Text`}</span>
                {`>`}
                <br />
                {`    </`}
                <span style={{color: 'var(--home-code-green)'}}>View</span>
                {`>`} <br />
                {`  );`} <br />
                {`}`}
              </pre>
            </div>
          </div>
          <div className={styles.deviceContainer}>
            <ThemedImage
              sources={{
                light: useBaseUrl('/img/homepage/devices.png'),
                dark: useBaseUrl('/img/homepage/devices-dark.png'),
              }}
              className={styles.devices}
              alt="Dispositivo Android e dispositivo iOS"
            />
          </div>
        </div>
      </div>
      <div className={styles.foxFactContainer}>
        <FoxFact className={styles.fox} />
        <p>
          <strong>Escrito em JavaScript, renderizado com código nativo.</strong>{' '}
          Os primitivos React renderizam para a UI nativa da plataforma, o que significa que seu aplicativo usa
          as mesmas APIs nativas da plataforma que outros aplicativos usam.
        </p>
      </div>
    </Section>
  );
}

export default Platforms;
