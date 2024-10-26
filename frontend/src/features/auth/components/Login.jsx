import React from "react";
import { Container, Input } from "components/ui";
import { useForm } from "react-hook-form";
// import { loginUser } from "../api/auth";
// import { useMutation } from "@tanstack/react-query";
import { errorToast, successToast } from "utils/toast";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { doLogin } from "utils/localStorageOperations";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await loginUser(data);
      successToast("Login Successfully");
      reset();
      doLogin(res, () => {
        navigate("/dashboard");
      });
    } catch (err) {
      errorToast(err);
    }
  };
  return (
    <>
      <div className="login-form">
        <Container>
          <p className="text-xl font-bold">Login Account</p>

          <div className="card-fields-container flex flex-col gap-y-3">
            <form onSubmit={handleSubmit(submitHandler)} className="mt-5">
              <Input
                label="Email"
                placeholder="Enter Email"
                className="mb-1"
                {...register("email", {
                  // // required: "mobile is required",
                })}
                error={errors.email?.message}
              />
              <Input
                label="Password"
                placeholder="Enter Password"
                className="mb-1"
                {...register("password", {
                  // // required: "password is required",
                })}
                error={errors.password?.message}
              />
              <button type="submit" className="px-4 py-2 bg-yellow-500 rounded-lg text-white w-full mt-4">
                Login
              </button>
            </form>
            <div className="mt-2">
              <span>You haven't an account?</span>
              <Link className="mx-2" to="/register">
                Register
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
