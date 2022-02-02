import React, { FunctionComponent } from 'react';
import { Layout } from '../components/layout'
import { AnimatedText } from '../components/animatedText'
import { AnimatedSvg } from '../components/animatedSvg'
import { Button } from '../components/button'
import styles from './index.module.css'
import Link from 'next/link'

export type HomeProps = {

}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <Layout>
      <div className={styles.homePage}>
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <h1>
              Hi there 👋, I’m Marcin.
              <br />
            </h1>
          <h2>
              A <AnimatedText text={['Software developer 🤘', 'Delivery Manager 🤹']} />
          </h2>
          </div>
          <div className={styles.heroRight}>
            <AnimatedSvg />
          </div>
        </div>
        <div>

        <p className={styles.mainText}>
          It's just my unofficial, tiny part of the <strike>garden</strike> internet where I collect knowledge that may be useful for me in the future.
        </p>
        <Link href="/garden">
          <Button text="Digital garden" />
        </Link>
        </div>
      </div>
    </Layout>
  )
}




export default Home