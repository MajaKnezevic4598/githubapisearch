import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import {
  fetchSingleUser,
  fetchSingleUserRepos,
} from "../redux/user/singleUserActions";
import { useDispatch, useSelector } from "react-redux";
import "./SingleUser.scss";
import { TiArrowLeft } from "react-icons/ti";
import { Link } from "react-router-dom";

function SingleUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.user;
  });
  const repos = useSelector((state) => state.user.repos);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(fetchSingleUser(res.data));
      })
      .then(() => {
        axios.get(`https://api.github.com/users/${id}/repos`).then((res) => {
          dispatch(fetchSingleUserRepos(res.data));
        });
      })
      .catch((err) => console.log(err.message));
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  function formatDate(date) {
    console.log(date);
    console.log("from date function");
    const arrayOfMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let startingDate = new Date(date);
    let day = startingDate.getDate();
    let month = startingDate.getMonth();
    let year = startingDate.getFullYear();
    return ` ${day} ${arrayOfMonths[month]} ${year}`;
  }
  return (
    <div className="wraper">
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <div class="back">
          <TiArrowLeft className="icon" />
          Back to home page
        </div>
      </Link>
      <div className="single-user-card">
        <div>
          {" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            Name:{" "}
          </span>
          {user.name}
        </div>
        <div className="repos">
          <div>
            {" "}
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Number of respos:
            </span>{" "}
            {user.public_repos}
          </div>
          <div className="repo-card">
            {repos.map((repo) => {
              return (
                <div key={repo.id} className="single-repo">
                  <div>
                    <span>Repo name:</span>
                    {repo.name}
                  </div>
                  <div>
                    <span>Description:</span>
                    {repo.description}
                  </div>
                  <div>
                    <span>Date created:</span>
                    {formatDate(repo.created_at)}
                  </div>
                  <div>
                    <span>stargazers:</span> {repo.stargazers_count}
                  </div>
                  <div>
                    <span>watchers:</span> {repo.watchers_count}
                  </div>
                  <div>
                    <span>forks:</span> {repo.forks_count}
                  </div>
                  <div>
                    <span>licence:</span> {repo.licence}
                  </div>
                  <button
                    className="repo-btn"
                    onClick={() => openInNewTab(repo.html_url)}
                  >
                    open in a new tab
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
