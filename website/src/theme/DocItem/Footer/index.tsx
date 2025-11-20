import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Translate from '@docusaurus/Translate';
import IconEdit from '@theme/Icon/Edit';
import LastUpdated from '@theme/LastUpdated';
import Link from '@docusaurus/Link';
import TagsListInline, {
  Props as TagsListInlineProps,
} from '@theme/TagsListInline';

import type {EditUrlButton} from '../../../../docusaurus.config';
import styles from './styles.module.css';
import DocsRating from '../../../../core/DocsRating';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';

function TagsRow(props: TagsListInlineProps) {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterTagsRow,
        'row margin-bottom--sm'
      )}>
      <div className="col">
        <TagsListInline {...props} />
      </div>
    </div>
  );
}
function EditPage({label, href}: {label: string; href: string}) {
  return (
    <Link to={href} className={ThemeClassNames.common.editThisPage}>
      <IconEdit />
      <Translate
        id="theme.common.editThisPage"
        description="The link label to edit the page">
        {label}
      </Translate>
    </Link>
  );
}
function EditMetaRow({editUrl, lastUpdatedAt, lastUpdatedBy}) {
  const buttons = React.useMemo((): EditUrlButton[] => {
    try {
      return JSON.parse(editUrl);
    } catch (e) {
      console.error(e);
      return [{href: editUrl, label: 'Edit this page'}];
    }
  }, [editUrl]);
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, 'row')}>
      <div className={clsx(styles.editButtons)}>
        {buttons.map(({label, href}, index) => (
          <EditPage key={index} label={label} href={href} />
        ))}
      </div>
      <div className={clsx(styles.lastUpdated)}>
        {(lastUpdatedAt || lastUpdatedBy) && (
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </div>
    </div>
  );
}

function TranslationIssueMessage() {
  const isBrowser = useIsBrowser();
  const {siteConfig} = useDocusaurusContext();

  const getIssueUrl = () => {
    if (!isBrowser) return '#';

    const repoUrl = 'https://github.com/ulisseshen/react-native-brasil-website';
    const issueTitle = encodeURIComponent('[Tradução] Problema encontrado na página');
    const issueBody = encodeURIComponent(`## URL da Página

${window.location.href}

## Tipo de Problema

Marque todas as opções que se aplicam:

- [ ] Erro de tradução (tradução incorreta ou confusa)
- [ ] Conteúdo não traduzido (ainda em inglês)
- [ ] Conteúdo desatualizado (tradução antiga que precisa atualização)
- [ ] Outro (descreva abaixo)

## Descrição

<!-- Por favor, descreva o problema encontrado. Se possível, inclua:
- O texto atual (em português ou inglês)
- A tradução sugerida ou correção
- Screenshots se ajudar a explicar o problema
-->


## Informações Adicionais

<!-- Qualquer contexto adicional que possa ajudar a resolver o problema -->
`);
    const labels = encodeURIComponent('tradução');

    return `${repoUrl}/issues/new?title=${issueTitle}&body=${issueBody}&labels=${labels}`;
  };

  return (
    <div className={clsx(styles.translationIssue, 'margin-top--md')}>
      <p className={styles.translationIssueText}>
        Encontrou erro de tradução ou conteúdo não traduzido?{' '}
        <Link to={getIssueUrl()} className={styles.translationIssueLink}>
          Abra uma issue no GitHub
        </Link>{' '}
        para nos alertar e ajudar a corrigir. Ajude pessoas como você! 🇧🇷
      </p>
    </div>
  );
}
export default function DocItemFooter() {
  const {metadata} = useDoc();
  const {editUrl, lastUpdatedAt, lastUpdatedBy, tags} = metadata;
  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;

  return (
    <>
      <DocsRating label={metadata.id} />
      {canDisplayFooter && (
        <footer
          className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}>
          {canDisplayTagsRow && <TagsRow tags={tags} />}
          {canDisplayEditMetaRow && (
            <EditMetaRow
              editUrl={editUrl}
              lastUpdatedAt={lastUpdatedAt}
              lastUpdatedBy={lastUpdatedBy}
            />
          )}
        </footer>
      )}
      <TranslationIssueMessage />
    </>
  );
}
