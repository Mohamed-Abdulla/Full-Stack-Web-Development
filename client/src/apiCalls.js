import axios from "axios";

export const login = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};

export const update = async (id, newDP, dispatch) => {
  try {
    const res = await axios.patch(`/users/${id}`, newDP);
    dispatch({ type: "UPDATE_USER", payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
