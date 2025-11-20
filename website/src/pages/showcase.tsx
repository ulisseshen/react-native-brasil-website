/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ia-translated: true

import React, {useEffect, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import type users from '../../showcase.json';
import IconExternalLink from '../theme/Icon/ExternalLink';
import ThemedImage from '@theme/ThemedImage';

type UserAppType = (typeof users)[keyof typeof users][number];

const renderApp = (app: UserAppType, i: number) => (
  <AppBox app={app} key={`app-${app.name}-${i}`} />
);

function Section({
  children,
  background = 'light',
}: React.PropsWithChildren<{background?: 'light' | 'dark'}>) {
  return <section className={`Section ${background}`}>{children}</section>;
}

const AppBox = ({app}: {app: UserAppType}) => {
  const imgSource = useBaseUrl(
    app.icon.startsWith('http') ? app.icon : 'img/showcase/' + app.icon
  );

  return (
    <div className="showcase">
      <div className="iconBox">
        <img src={imgSource} alt={app.name} className="iconBackground" />
        <img src={imgSource} alt={app.name} className="icon" />
      </div>
      <div className="showcaseContent">
        <div>
          <h3>{app.name}</h3>
          {renderLinks(app)}
        </div>
        {'infoTitle' in app && app.infoLink && (
          <a
            className="articleButton"
            href={app.infoLink}
            target="_blank"
            title={app.infoTitle}>
            Saiba mais{' '}
            <IconExternalLink width={12} height={12} style={{opacity: 0.5}} />
          </a>
        )}
      </div>
    </div>
  );
};

const renderLinks = (app: UserAppType) => {
  const links = [
    app.linkAppStore ? (
      <a key="ios" href={app.linkAppStore} target="_blank">
        iOS
      </a>
    ) : null,
    app.linkPlayStore ? (
      <a key="android" href={app.linkPlayStore} target="_blank">
        Android
      </a>
    ) : null,
    'linkDesktop' in app && app.linkDesktop ? (
      <a key="desktop" href={app.linkDesktop} target="_blank">
        Desktop
      </a>
    ) : null,
    'linkMetaQuest' in app && app.linkMetaQuest ? (
      <a key="quest" href={app.linkMetaQuest} target="_blank">
        Meta&nbsp;Quest
      </a>
    ) : null,
  ]
    .filter(Boolean)
    .flatMap((link, i) =>
      i === 0 ? [link] : [<span key={i}> • </span>, link]
    );

  if (links.length === 0) {
    return <p />;
  }

  return <p className="showcaseLinks">{links}</p>;
};

const randomizeApps = apps =>
  [...apps].filter(app => !app.group).sort(() => 0.5 - Math.random());

const Showcase = () => {
  const {siteConfig} = useDocusaurusContext();
  const {meta, microsoft, shopify, wix, amazon, others} = siteConfig
    .customFields.users as typeof users;
  const [pinnedRandomizedApps, setPinnedRandomizedApps] = useState([]);
  const [randomizedApps, setRandomizedApps] = useState([]);

  useEffect(() => {
    setRandomizedApps(randomizeApps(others.filter(app => !app.pinned)));
    setPinnedRandomizedApps(randomizeApps(others.filter(app => app.pinned)));
  }, []);

  return (
    <Layout
      title="Showcase"
      description="Milhares de apps estão usando React Native, confira esses apps!">
      <Section background="dark">
        <div className="sectionContainer headerContainer">
          <h1>
            Quem está usando <span>React Native</span>?
          </h1>
          <p>
            Milhares de apps estão usando React Native, desde empresas estabelecidas da Fortune
            500 até startups promissoras. Se você está curioso para ver o que
            pode ser realizado com React Native, confira esses apps!
          </p>
        </div>
      </Section>
      <Section>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Logo da Meta"
              width={140}
              sources={{
                light: useBaseUrl('/img/showcase/meta_positive_primary.svg'),
                dark: useBaseUrl('/img/showcase/meta_negative_primary.svg'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            React Native está moldando experiências mobile, web e desktop dentro
            do ecossistema de produtos da Meta, do Facebook Marketplace, Messenger
            Desktop, Ads Manager ao app Meta Quest e muitos outros.
          </p>
          <div className="logos">{meta.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Logo da Microsoft"
              width={180}
              sources={{
                light: useBaseUrl('/img/showcase/microsoft-logo-gray.png'),
                dark: useBaseUrl('/img/showcase/microsoft-logo-white.png'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            A Microsoft aproveita o poder do React Native para entregar excelentes
            experiências ao cliente em alguns de seus apps mais conhecidos.
            <br />
            A Microsoft não para apenas nas plataformas mobile -- a Microsoft
            aproveita React Native para atingir desktop também! Saiba mais no{' '}
            <a
              href="https://microsoft.github.io/react-native-windows/resources-showcase"
              target="_blank">
              showcase dedicado
            </a>{' '}
            para React Native Windows e macOS.
          </p>
          <div className="logos">{microsoft.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Logo da Amazon"
              width={140}
              sources={{
                light: useBaseUrl('/img/showcase/amazon_logo_lightbg.png'),
                dark: useBaseUrl('/img/showcase/amazon_logo_darkbg.png'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            A Amazon usou React Native para entregar rapidamente novos recursos voltados ao cliente
            em alguns de seus aplicativos mobile mais populares desde
            2016. A Amazon também usa React Native para dar suporte a dispositivos favoritos dos clientes
            como os leitores digitais Kindle.
          </p>
          <div className="logos">{amazon.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Logo da Shopify"
              width={160}
              sources={{
                light: useBaseUrl('/img/showcase/shopify_logo_whitebg.svg'),
                dark: useBaseUrl('/img/showcase/shopify_logo_darkbg.svg'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            Todos os aplicativos mobile na Shopify são construídos usando React Native. Você pode
            ler mais sobre o desenvolvimento em React Native na Shopify em nosso{' '}
            <a href="https://shopify.engineering/topics/mobile" target="_blank">
              blog
            </a>
            .
          </p>
          <div className="logos">{shopify.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Logo da Wix"
              width={80}
              sources={{
                light: useBaseUrl('/img/showcase/wix_logo_lightbg.svg'),
                dark: useBaseUrl('/img/showcase/wix_logo_darkbg.svg'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            Com uma das maiores bases de código React Native do mundo, a Wix
            tem um longo histórico com a comunidade de desenvolvimento e mantém uma
            variedade de projetos de código aberto. A Wix é uma das primeiras a adotar React
            Native e o usa para todo seu conjunto de aplicações.
          </p>
          <div className="logos">{wix.map(renderApp)}</div>
        </div>
        <div className="showcaseSection showcaseCustomers">
          <h2>Showcase de Usuários</h2>
          <div className="logos">
            {pinnedRandomizedApps.map(renderApp)}
            {randomizedApps.map(renderApp)}
          </div>
        </div>
      </Section>
      <Section background="dark">
        <div className="sectionContainer footerContainer">
          <a
            className="formButton"
            href="https://forms.gle/BdNf3v5hemV9D5c86"
            target="_blank">
            Candidate-se ao Showcase preenchendo este formulário
          </a>
          <p>
            Para uma lista curada de apps React Native de código aberto, confira{' '}
            <a
              key="demo-apps"
              href="https://github.com/ReactNativeNews/React-Native-Apps">
              esta lista
            </a>{' '}
            mantida pela <a href="https://infinite.red">Infinite Red</a>.
          </p>
        </div>
      </Section>
    </Layout>
  );
};

export default Showcase;
