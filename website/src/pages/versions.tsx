/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ia-translated: true

import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import versions from '../../versions.json';
// The versionsArchived mapping is a custom feature, NOT a Docusaurus feature
import versionsArchived from '../../versionsArchived.json';

const VersionItem = ({
  version,
  archivedDocumentationUrl,
  currentVersion,
}: {
  version: string;
  currentVersion: string;
  archivedDocumentationUrl?: string;
}) => {
  const versionName = version === 'next' ? 'main' : version;

  const isCurrentVersion = currentVersion === version;
  const isNext = version === 'next';
  const isRC = version.toUpperCase().indexOf('-RC') !== -1;

  const latestMajorVersion = versions[0].toUpperCase().replace('-RC', '');

  const documentationUrl = useBaseUrl(
    archivedDocumentationUrl ??
      `/docs/${isCurrentVersion ? '' : version + '/'}getting-started`
  );
  const documentationLink = <a href={documentationUrl}>Documentação</a>;

  let releaseNotesURL = 'https://github.com/facebook/react-native/releases';
  let releaseNotesTitle = 'Changelog';
  if (isNext) {
    releaseNotesURL = `https://github.com/facebook/react-native/compare/${latestMajorVersion}-stable...main`;
    releaseNotesTitle = 'Commits desde ' + latestMajorVersion;
  } else if (!isRC) {
    releaseNotesURL = `https://github.com/facebook/react-native/releases/tag/v${version}.0`;
  }

  const releaseNotesLink = <a href={releaseNotesURL}>{releaseNotesTitle}</a>;

  return (
    <tr>
      <th>{versionName}</th>
      <td>{documentationLink}</td>
      <td>{releaseNotesLink}</td>
    </tr>
  );
};

const Versions = () => {
  const currentVersion = versions.length > 0 ? versions[0] : null;
  const latestVersions = ['next'].concat(
    versions.filter(version => version.indexOf('-RC') !== -1)
  );
  const stableVersions = versions.filter(
    version => version.indexOf('-RC') === -1 && version !== currentVersion
  );

  return (
    <Layout title="Versões" wrapperClassName="versions-page">
      <h1>Versões do React Native</h1>
      <p>
        As versões de código aberto do React Native seguem um processo de release coordenado
        no GitHub através do repositório{' '}
        <a
          href={'https://github.com/reactwg/react-native-releases/discussions'}>
          <code>react-native-releases</code>
        </a>{' '}
        . Novas versões são criadas a partir da branch <code>main</code> de{' '}
        <a href={'https://github.com/facebook/react-native'}>
          <code>facebook/react-native</code>
        </a>
        . Elas seguirão um processo de Release Candidate para permitir que contribuidores
        como você{' '}
        <a href={useBaseUrl('docs/upgrading')}>verifiquem as mudanças</a> e
        identifiquem quaisquer problemas{' '}
        <a href="https://github.com/facebook/react-native/issues">
          escrevendo relatórios de bugs claros e acionáveis
        </a>
        . Eventualmente, o release candidate será promovido a estável.
      </p>
      <h2>Próxima versão (Não lançada)</h2>
      <p>
        Para ver quais mudanças estão chegando e fornecer melhor feedback aos
        contribuidores do React Native, use o último release candidate quando possível.
        As mudanças introduzidas em um release candidate terão sido enviadas para
        apps da Facebook em produção por mais de duas semanas no momento em que o release
        candidate é criado.
      </p>
      <table className="versions">
        <tbody>
          {latestVersions.map(version => (
            <VersionItem
              key={'version_' + version}
              version={version}
              currentVersion={currentVersion}
            />
          ))}
        </tbody>
      </table>
      <h2>Última versão</h2>
      <p>
        A versão estável mais recente será usada automaticamente sempre que um novo
        projeto for criado usando o comando <code>npx react-native init</code>.
      </p>
      <table className="versions">
        <tbody>
          <VersionItem
            key={'version_' + currentVersion}
            version={currentVersion}
            currentVersion={currentVersion}
          />
        </tbody>
      </table>
      <h2>Versões anteriores</h2>
      <table className="versions">
        <tbody>
          {stableVersions.map(version => (
            <VersionItem
              key={'version_' + version}
              version={version}
              currentVersion={currentVersion}
            />
          ))}
        </tbody>
      </table>
      <h2>Versões arquivadas</h2>
      <p>
        A documentação para versões não mantidas pode ser encontrada em snapshots de arquivo do website,
        hospedados como sites separados.
      </p>
      <table className="versions">
        <tbody>
          {Object.entries(versionsArchived).map(
            ([version, archivedDocumentationUrl]) => (
              <VersionItem
                key={'version_' + version}
                version={version}
                archivedDocumentationUrl={archivedDocumentationUrl}
                currentVersion={currentVersion}
              />
            )
          )}
        </tbody>
      </table>
      <p>
        A documentação para versões abaixo de <code>0.60</code> pode ser encontrada no
        site separado chamado{' '}
        <a href="https://archive.reactnative.dev/versions">
          React Native Archive
        </a>
        .
      </p>
    </Layout>
  );
};

export default Versions;
