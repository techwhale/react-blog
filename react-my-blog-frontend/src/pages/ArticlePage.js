import React, {useState, useEffect} from 'react';
import ArticlesList from "../components/ArticlesList";
import CommentsList from "../components/CommentsList";
import UpvotesSection from "../components/UpvoteSection";
import NotFoundPage from "./NotFoundPage";
import articleContent from './article-content'
import AddCommentForm from "../components/AddCommentsForm";

const ArticlePage = ({match}) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);

    const [articleInfo, setArticleInfo] = useState({
        upvotes: 0, comments: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`)
            const body = await result.json();
            console.log(body);
            setArticleInfo(body);
        }
        fetchData();
    }, [name]);

    if (!article) return <NotFoundPage/>

    const otherArticles = articleContent.filter(article => article.name !== name);
    return (
        <>
            <h1>{article.title}</h1>
            <UpvotesSection articleName={name} setArticleInfo={setArticleInfo} upvotes={articleInfo.upvotes}/>
            {article.content.map((paragraph, key) => (
                <p key={key}>{paragraph}</p>
            ))}
            <CommentsList comments={articleInfo.comments}/>
            <AddCommentForm setArticleInfo={setArticleInfo} articleName={name}/>
            <h3>Other Articles</h3>
            <ArticlesList articles={otherArticles}/>
        </>
    );
}

export default ArticlePage;