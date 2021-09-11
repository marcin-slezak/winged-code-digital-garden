import React, {FunctionComponent} from 'react';
import { Layout } from '../../components/layout'
import { Pane } from '../../components/pane'
import { Button } from '../../components/button'
import styles from './index.module.css'

export type ContactProps = {

}

const Contact: FunctionComponent<ContactProps> = () => {
  return (
    <Layout fullWidth={true}>
      <div className={styles.map}>
       <Pane>
        <h2>Let's talk 💬</h2>
        <p className={styles.contactMessage}>I love meeting new people, even more, listen to their stories, wins, and the challenges they are facing. Each new story teaches me something new, and sometimes I can help in exchange 😇. If you have questions, even the stupidest ones, just write. Work and family take almost all my time, so please note that it can take a while to reply. ⏳</p>
        <a href="https://pl.linkedin.com/in/marcin-%C5%9Bl%C4%99zak-29223a55">
          <Button text="Get in touch on LinkedIn"/>
        </a>
      </Pane>
      </div>
    </Layout>
  )
}




export default Contact