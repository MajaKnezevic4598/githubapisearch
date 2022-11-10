import { useState } from "react";
import "./SearchUsers.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/users/usersActions";
import { Link } from "react-router-dom";

function SearchUsers() {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const error = useSelector((state) => state.users.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(fetchUsers(input));
  };
 
  return (
    <div>
      <section>
        <form className="user-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="enter the user"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />

          <button>Search</button>
        </form>
      </section>
      <section className="users">
        {users.map((user) => {
          return (
            <Link
              to={`/users/${user.login}`}
              style={{
                textDecoration: "none",
                color: "black",
              }}
              key={user.id}
            >
              <div className="user-card">
                <div className="user-card__img-conteiner">
                  <img src={user.avatar_url} alt="" className="user-img" />
                </div>
                <div className="info-conteiner">
                  <div>Name: {user.name}</div>

                  <div>User Public</div>
                  <div>description:</div>
                  <div>{user.description}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export default SearchUsers;
