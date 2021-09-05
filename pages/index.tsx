import React from 'react';
import { Layout } from '../components/layout'
import { AnimatedText } from '../components/animatedText'
import { AnimatedSvg } from '../components/animatedSvg'
import { Button } from '../components/button'
import styles from './index.module.css'

export default function Home() {
  return (
    <Layout>
      <div className={styles.hero}>
        <div>
          <h1>
            Hi there 👋, I’m Marcin.
            <br />
            <br />
            A <AnimatedText text={['Software developer', 'Delivery Manager']} />
          </h1>
        </div>
        <div className={styles.heroRight}>
          <AnimatedSvg />
        </div>
      </div>
      <p>
        I fell in love with software development many years ago. After a few dozens of projects made for someone over that time, I finally created my own disorganised and chaotic piece of the Internet. So I drop here notes, articles, news and some of my thoughts about programming and software development management.
      </p>
      <Button text="Digital garden"/>
    </Layout>


  )
}
