import React, { FunctionComponent } from 'react';
import { Layout } from '../components/layout'

import styles from './index.module.css'


export type HomeProps = {
}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <Layout>
      <div className={styles.container404}>
        <h1>
          Uuups - 404 - Page not found 😱
        </h1>
        <p>
          You know, sometimes things get complicated, let's start our relationship  <a href="/">from the beginning</a>
        </p>
      </div>
    </Layout>
  )
}




export default Home