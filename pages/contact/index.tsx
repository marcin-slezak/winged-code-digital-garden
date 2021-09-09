import React, {FunctionComponent} from 'react';
import { Layout } from '../../components/layout'
import { Pane } from '../../components/pane'
import { Button } from '../../components/button'
import styles from './index.module.css'
import Link from 'next/link'

export type ContactProps = {

}

const Contact: FunctionComponent<ContactProps> = () => {
  return (
    <Layout fullWidth={true}>
      <div className={styles.map}>
       <Pane>
        <h2>Want's to work with me?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi blandit diam vel ultrices blandit. Etiam quis nibh mattis, faucibus leo non, interdum ligula. Duis aliquet tincidunt risus nec auctor. Duis ac sapien porttitor, hendrerit mauris lacinia, blandit ante. Praesent luctus neque diam, ut elementum eros mattis sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed gravida ut orci et malesuada. Nam sapien ligula, cursus in risus nec, ullamcorper varius libero. Sed eu neque leo. Sed scelerisque cursus felis non imperdiet. Cras urna turpis, auctor vitae mattis nec, dictum nec erat. Nullam ultrices risus tellus, sed fringilla enim mollis quis. Donec tincidunt nec quam nec auctor.</p>
        <a href="/garden">
          <Button text="Get in touch on LinkedIn"/>
        </a>
      </Pane>
      </div>
    </Layout>
  )
}




export default Contact