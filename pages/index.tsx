import styles from '../styles/Home.module.css'
import Card from '../component/card'
import fs from 'fs'
import matter from 'gray-matter'
import { ArticleMeta } from '../interfaces/article'
import { FunctionComponent } from 'react'

interface IProps {
    articles: ArticleMeta[];
}

const Home: FunctionComponent<IProps> = ({ articles }) => {
    return (
        <div className={styles.container}>
        {
            articles.map((article, i) => (
                <Card key={i} article={article} />
            ))
        }
        </div>
    )
}

export async function getStaticProps() {
    const files = fs.readdirSync("uploads");
    
    let articles = files.map(file => {
        const data = fs
            .readFileSync(`uploads/${file}`)
            .toString();

        return {
            ...matter(data).data,
            slug: file.split('.')[0]
        };
    });

    return {
        props: {
            articles: articles
        }
    };
}

export default Home;