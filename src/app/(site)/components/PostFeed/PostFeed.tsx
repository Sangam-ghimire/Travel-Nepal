'use client'
import ViewPost from "../viewPost/viewPost";
import { useRef, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../LoadingPost/LoadingPost";

//this is the interface for the post
interface Post {
    _id: string;
    address: string;
    description: string;
    imageURL: string;
    likes: number;
    location: any;
    pictureURL: string;
    owner: any;
    rating: {
      overallScore: number;
    }
  }

//this is the number of posts per scroll
const POSTS_PER_SCROLL = 7;

//this is the function for fetching the location posts
async function fetchLocationPosts(
    email: string,
    page: number,
    searchTime: Date
  ) {
    const encodedEmail: any = encodeURI(email);
    const encodedPage: string = encodeURI(page.toString());
    const encodedSearchTime: any = encodeURI(searchTime.toISOString());
    //here we are fetching the posts from the database
    const res: Response = await fetch(
      `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/getPostFeed?email=${ encodedEmail }&page=${ encodedPage }&searchTime=${ encodedSearchTime }`,
      { cache: "no-store" }
    ); //this is a sample link to the database, this doesn't work now, limit reachedgit
    
    //here we are checking if the response is ok or not
    if (!res.ok) return undefined;
    
    //here we are returning the response in json format
    return res.json();
  }

//this is the function for rendering the post feed
export default function PostFeed({ email }:{ email: string }) {
    const [posts, fetchPosts, hasMore, didMount] = useFetchPosts(email);

    //here we are rendering the post feed
    return(
        <div className="PostBody">
            {didMount && <>
                    {(posts.length) &&
                        <InfiniteScroll
                            dataLength={ posts.length } //This is important field to render the next data
                            next={ fetchPosts as any }
                            hasMore={ hasMore }
                            loader={<Loading/>}
                            endMessage={
                              <p style={{ textAlign: 'center' }}>
                              <b>Yay! You have seen it all</b>
                              </p>
                            }
                        >
                            {
                                //here we are mapping the posts
                                posts.map((post) => (
                                    <ViewPost
                                        key={ post._id }
                                        id={ post._id }
                                        location={ post.location }
                                        description={ post.description }
                                        likes = {post.likes}
                                        imageURL = {post.pictureURL}
                                        owner = {post.owner}
                                        rating = { post.rating?.overallScore || 0 }
                                    />
                                ))
                            }
                        </InfiniteScroll> //this is the infinite scroll component
                    }
                    //here we are checking if the posts are empty or not
                    {!(posts.length) && <h1>No posts found. Follow locations to view here.</h1>}
                </>
            }
            {!didMount} 
        </div>
    )
    
}

//this is the function for fetching the posts
function useFetchPosts( email: string ):[
    posts: Array<Post>,
    fetchPost: Function,
    hasMore: boolean,
    didMount: boolean
  ] {
    const page = useRef<number>(0);
    const searchTime = useRef<Date>(new Date());
    const [posts, setPosts] = useState<Array<Post>>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [didMount, setDidMount] = useState<boolean>(false);
    
    //this is the function for fetching the posts
    const fetchPosts = async () => {
      console.log("Fetch called");
      try {
        /* fetch more posts */
        const fetchedPosts: Array<any> = await fetchLocationPosts(
          email as string,
          page.current,
          searchTime.current
        );

        /* add the locations to the existing locations */
        setPosts((posts) => [...posts, ...fetchedPosts]);
  
        /* update page and has more */
        page.current = page.current + 1;
        setHasMore(!(fetchedPosts.length < POSTS_PER_SCROLL))
      } catch (error) {
        console.error(error); 
        alert(error);
      }
    }

      /* fetch data on the render */
      useEffect(() => {
        if (!didMount) {
            try{
                const fetchPost = async() => {
                  /* fetch more posts */
                  const fetchedPosts: Array<any> = await fetchLocationPosts(email as string, page.current, searchTime.current)

                  /* add the locations to the existing locations */
                  setPosts(fetchedPosts);
      
                  /* update page and has more */
                  page.current = 1
                  setHasMore(!(fetchedPosts.length < POSTS_PER_SCROLL))
                  setDidMount(true) //didmount is set to true and used for conditional rendering
                }
                fetchPost(); //this is the function for fetching the posts
            }catch(error){
                alert(error);
                console.error(error);
            }
          }
        }, [])
    return  [posts, fetchPosts, hasMore, didMount]; //returning the posts, fetchPosts, hasMore and didMount
    }; 
  
  