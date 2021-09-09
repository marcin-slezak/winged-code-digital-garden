import React, {FunctionComponent} from 'react';
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
      <div className={styles.hero}>
        <div>
          <h1>
            Hi there 👋, I’m Marcin
            <br />
            <br />
            A <AnimatedText text={['Software developer🤘', 'Delivery Manager👮‍♀️']} />
          </h1>
        </div>
        <div className={styles.heroRight}>
          <AnimatedSvg />
        </div>
      </div>
      <p className={styles.mainText}>
        I fell in love with software development many years ago. After a few dozens of projects made for someone over that time, I finally created my own disorganised and chaotic piece of the Internet. So I drop here notes, articles, news and some of my thoughts about programming and software development management.
      </p>
      <Link href="/garden">
        <Button text="Digital garden"/>
      </Link>
      
     
    </Layout>
  )
}




export default Home