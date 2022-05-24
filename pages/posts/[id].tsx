import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { buildOgImageUrl } from '../../lib/imgix'

export default function Post({
  postData,
  ogImageUrl
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  },
  ogImageUrl: string,
}) {
  return (
    <Layout ogImageUrl={ogImageUrl}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  const ogImageUrl = buildOgImageUrl(postData.title)
  return {
    props: {
      postData,
      ogImageUrl,
    }
  }
}
