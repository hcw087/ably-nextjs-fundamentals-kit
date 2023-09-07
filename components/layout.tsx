import styles from '../styles/Layout.module.css'

type LayoutProps = {
  children: React.ReactNode,
  pageTitle?: string,
  metaDescription: string,
  showHomeLink?: boolean,
}

export default function Layout({ children}: LayoutProps) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
