/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ia-translated: true

import React from 'react';

import Section from '../Section';
import SectionTitle from '../SectionTitle';

import styles from './styles.module.css';

function Watch() {
  return (
    <Section>
      <SectionTitle
        title="Assista e aprenda"
        description={
          <>
            Assista palestras da equipe React e aprenda como aproveitar ao máximo o
            React Native.
            <br />
            Encontre as últimas novidades no{' '}
            <a href="https://bsky.app/profile/reactnative.dev">
              Bluesky
            </a> e no{' '}
            <a href="https://twitter.com/intent/follow?screen_name=reactnative&region=follow_link">
              X
            </a>
            .
          </>
        }
      />
      <div className={styles.videos}>
        <div className={styles.videoContainer}>
          <iframe
            src="https://www.youtube.com/embed/NCAY0HIfrwc"
            title="Inovação Mobile com React Native, ComponentKit e Litho"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.video}
          />
          <div className={styles.videoInfo}>
            <h4>FB 2019: Inovação mobile com React Native</h4>
            <p>45:29</p>
          </div>
        </div>
        <div className={styles.videoContainer}>
          <iframe
            src="https://www.youtube.com/embed/wUDeLT6WXnQ"
            title="Explique Como Se Eu Tivesse 5 Anos: React Native"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.video}
          />
          <div className={styles.videoInfo}>
            <h4>Por que React Native?</h4>
            <p>1:42</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Watch;
