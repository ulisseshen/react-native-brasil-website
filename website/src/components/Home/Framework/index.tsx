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

import styles from './styles.module.css';

function Framework() {
  return (
    <Section>
      <SectionTitle
        title="Comece com vantagem com um framework"
        description={
          <>
            React Native traz o paradigma de programação React para plataformas como
            Android e iOS. Ele não prescreve como fazer roteamento, ou como
            acessar cada uma das inúmeras APIs de plataforma. Para construir um novo aplicativo com
            React Native, recomendamos um framework como{' '}
            <a href="https://expo.dev">Expo</a>.
          </>
        }
      />
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <ThemedImage
            sources={{
              light: '/img/homepage/file-based-routing.png',
              dark: '/img/homepage/file-based-routing-dark.png',
            }}
            className={styles.cardImage}
            alt="Sistema de arquivos com pastas e arquivos representando telas e navegação"
          />
          <div className={styles.cardContent}>
            <h4 className={styles.cardTitle}>Roteamento baseado em arquivos</h4>
            <p className={styles.cardDescription}>
              Crie telas em pilha, modal, gaveta e abas com o mínimo
              de código boilerplate usando seu sistema de arquivos.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <ThemedImage
            sources={{
              light: useBaseUrl('/img/homepage/libraries.png'),
              dark: useBaseUrl('/img/homepage/libraries-dark.png'),
            }}
            alt="Grade de ícones representando bibliotecas, SDKs e código nativo"
            className={styles.cardImage}
          />
          <div className={styles.cardContent}>
            <h4 className={styles.cardTitle}>
              Use qualquer biblioteca, SDK ou código nativo
            </h4>
            <p className={styles.cardDescription}>
              Gere alterações nativas ou escreva seu próprio código nativo. Use mais de 50
              módulos para criar seu aplicativo.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <ThemedImage
            sources={{
              light: useBaseUrl('/img/homepage/tools.png'),
              dark: useBaseUrl('/img/homepage/tools-dark.png'),
            }}
            className={styles.cardImage}
            alt="Lista de alternâncias de ferramentas de desenvolvedor para depuração, desempenho e mais"
          />
          <div className={styles.cardContent}>
            <h4 className={styles.cardTitle}>Ferramentas de desenvolvedor</h4>
            <p className={styles.cardDescription}>
              Comece rapidamente com Expo Go, depois continue com
              expo-dev-client: um módulo que adiciona as ferramentas do Expo a aplicativos que
              requerem alterações nativas.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Framework;
