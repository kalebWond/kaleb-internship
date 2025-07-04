import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import NftSkeleton from "../components/NftSkeleton";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id: authorId } = useParams();
  const [followers, setFollowers] = useState(0);

  const { data: author = {}, isLoading } = useSWR(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=" +
      authorId
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setFollowers(author.followers);
  }, [author]);

  function onToggleFollow() {
    const newValue =
      followers === author.followers ? followers + 1 : author.followers;
    setFollowers(newValue);
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    {isLoading && (
                      <div className="profile_avatar">
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <div>
                            <Skeleton width="170px" height="20px" /> <br />
                            <Skeleton width="100px" /> <br />
                            <Skeleton width="170px" />
                          </div>
                        </div>
                      </div>
                    )}
                    {!isLoading && (
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="profile_follow de-flex">
                    {isLoading && <Skeleton width="200px" height="30px" marginTop="30px" />}
                    {!isLoading && (
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followers} followers
                        </div>
                        <button onClick={onToggleFollow} className="btn-main">
                          {author.followers === followers
                            ? "Follow"
                            : "Unfollow"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {isLoading && (
                    <div className="row">
                      {Array(8)
                        .fill()
                        .map((_, i) => (
                          <NftSkeleton
                            key={i}
                            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          />
                        ))}
                    </div>
                  )}
                  {!isLoading && (
                    <AuthorItems
                      items={author.nftCollection}
                      authorImage={author.authorImage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
