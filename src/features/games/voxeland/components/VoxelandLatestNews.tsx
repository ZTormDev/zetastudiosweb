import React from "react";
import { Button } from "../../../../shared/components";
import { VoxelandBlogPost } from "./VoxelandBlogPost";
import { BlogPost } from "../../../../core/types";

interface VoxelandLatestNewsProps {
  posts: BlogPost[];
}

export const VoxelandLatestNews: React.FC<VoxelandLatestNewsProps> = ({
  posts,
}) => {
  if (!posts?.length) return null;
  return (
    <section className="voxeland-news">
      <div className="container">
        <div className="voxeland-news__header">
          <h2 className="voxeland-news__title">Latest News</h2>
        </div>
        <div className="voxeland-news__posts">
          {posts.map((blog) => (
            <VoxelandBlogPost key={blog.id} post={blog} />
          ))}
        </div>
        <div className="voxeland-news__footer">
          <Button to="/voxeland/news" variant="outline">
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
};
