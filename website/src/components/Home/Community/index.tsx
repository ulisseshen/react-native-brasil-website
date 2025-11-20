/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ia-translated: true

import React from 'react';

import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Section from '../Section';
import SectionTitle from '../SectionTitle';

import styles from './styles.module.css';

function Community() {
  const {siteConfig} = useDocusaurusContext();
  const apps = Object.values(siteConfig.customFields.users)
    .flat()
    .filter(app => app.pinned);

  return (
    <Section>
      <SectionTitle title="Apoiado pela Meta. Impulsionado pela comunidade." />
      <div className={styles.featureContainer}>
        <div>
          <p>
            A Meta lançou o React Native em 2015 e tem mantido desde então.
          </p>
          <p>
            Em 2018, React Native teve o{' '}
            <a href="https://octoverse.github.com/2018/projects#repositories">
              2º maior
            </a>{' '}
            número de contribuidores para qualquer repositório no GitHub. Hoje, React
            Native é apoiado por contribuições de indivíduos e empresas
            ao redor do mundo incluindo{' '}
            <span>
              <a href="https://callstack.com/">Callstack</a>
            </span>
            ,{' '}
            <span>
              <a href="https://expo.io/">Expo</a>
            </span>
            , <a href="https://infinite.red/">Infinite Red</a>,{' '}
            <a href="https://www.microsoft.com/">Microsoft</a> e{' '}
            <a href="https://swmansion.com/">Software Mansion</a>.
          </p>
          <p>
            Nossa comunidade está sempre lançando novos projetos empolgantes e explorando
            plataformas além de Android e iOS com repositórios como{' '}
            <span>
              <a href="https://github.com/microsoft/react-native-windows#readme">
                React Native Windows
              </a>
            </span>
            ,{' '}
            <a href="https://github.com/microsoft/react-native-macos#readme">
              React Native macOS
            </a>{' '}
            e{' '}
            <a href="https://github.com/necolas/react-native-web#readme">
              React Native Web
            </a>
            .
          </p>
        </div>
        <div>
          <p>
            React Native está sendo usado em milhares de aplicativos, mas é provável
            que você já tenha usado em um desses aplicativos:
          </p>
          <ul className="AppList">
            {apps.map((app, i) => {
              const imgSource = !app.icon.startsWith('http')
                ? useBaseUrl('img/showcase/' + app.icon)
                : app.icon;
              return (
                <li key={i} className="item">
                  {app.infoLink ? (
                    <a href={app.infoLink}>
                      <img src={imgSource} alt={app.name} />
                    </a>
                  ) : (
                    <img src={imgSource} alt={app.name} />
                  )}
                </li>
              );
            })}
          </ul>
          <p>
            e <a href={useBaseUrl(`showcase`)}>muito mais</a>.
          </p>
        </div>
      </div>
    </Section>
  );
}

export default Community;
