import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://be-nc-games-workplace.onrender.com/api",
});

export const getCategories = () => {
  return gamesApi
    .get("/categories")
    .then((res) => {
      return res.data.categories;
    })
    .catch((err) => {
      window.location = "/opps";
    });
};

export const getReviews = (order, sort_by) => {
  let url = "/reviews/";

  return gamesApi
    .get(url, { params: { order, sort_by } })
    .then((res) => {
      return res.data.reviews;
    })
    .catch((err) => {
      console.log(err);
      window.location = "/oops";
    });
};

export const getReviewsByCategory = (category, order, sort_by) => {
  let url = "/reviews/";

  return gamesApi
    .get(url, { params: { category, order, sort_by } })
    .then((res) => {
      return res.data.reviews;
    })
    .catch((err) => {
      window.location = "/oops";
    });
};

export const getReviewsByIdy = (review_id) => {
  return gamesApi
    .get(`reviews/${review_id}`)
    .then((res) => {
      return res.data.review;
    })
    .catch(() => {
      window.location = "/oops";
    });
};

export const patchVotesById = (inc_votes, review_id) => {
  return gamesApi.patch(`reviews/${review_id}`, { inc_votes }).then((res) => {
    return res;
  });
};

export const getAllCommentsById = (review_id) => {
  return gamesApi
    .get(`reviews/${review_id}/comments`)
    .then((res) => {
      return res.data.comments;
    })
    .catch(() => {
      window.location = "/oops";
    });
};

export const postComment = (body, review_id, username) => {
  return gamesApi.post(`reviews/${review_id}/comments`, {
    username: username,
    body: body,
  });
};

export const deleteCommentsById = (comment_id) => {
  return gamesApi.delete(`comments/${comment_id}`);
};

export const userSignup = (username, password, avatar, email) => {
  return gamesApi
    .post("/signup", {
      username: username,
      password: password,
      avatar_url: avatar,
      email: email,
    })
    .then((res) => {
      if (res.data === "Email already exists. Try logging in.") {
        alert("Email already exists. Try logging in.");
      } else if (res.data === "Username already exists. Try logging in.") {
        alert(
          "Username already exists. Try logging in with your corresponding email or register with another username please."
        );
      } else {
        console.log(res);
        return res.data.rows[0];
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Something went wrong. Please try again later");
    });
};

export const userLogin = (email, password) => {
  return gamesApi
    .post("/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.data === "Incorrect Password") {
        alert("Incorrect password. Please try again.");
      } else if (res.data === "User not found") {
        alert("User not found. Please fill in the correct email or sign up.");
      } else {
        return res;
      }
    })
    .catch((err) => {
      return err;
    });
};
