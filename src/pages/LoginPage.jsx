import React, { useState } from "react";
import logo from "../assets/images/logoAlexBiru.png";
import axios from "axios";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space, message } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    axios({
      method: "POST",
      url: "http://localhost:3000/user/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        message.loading("Loading...", 1, () => {
          localStorage.setItem(
            "authorization",
            response.data.data.authorization
          );
          localStorage.setItem("username", response.data.data.username);
          localStorage.setItem("email", response.data.data.email);
          message.success(response.data.message);
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("Gagal:", error);
        message.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full h-screen flex p-5 ">
      {/* Kanan */}
      <div className="w-[55%] bg-slate-100 h-full rounded-lg">
        <div className="flex justify-center items-center w-full"></div>
      </div>

      {/* Kiri */}
      <div className="w-[45%] flex flex-col px-10 ">
        <div className="flex justify-end items-center mb-20">
          <img src={logo} alt="logo" className="w-16 h-16" />
          <p className="text-xl font-black">DAILY MAGIC</p>
        </div>

        <div>
          <p className="text-2xl font-black mt-5 ">Masuk</p>
          <p className="font-light text-gray-500">
            Silahkan masukkan e-mail dan password anda.
          </p>

          <div className="w-full rounded-xl mt-10 ">
            {/* Email */}
            <label htmlFor="email" className="font-semibold">
              E-mail
            </label>
            <Input
              className="mb-6"
              autoComplete="off"
              placeholder="Masukkan E-mail Anda"
              id="email"
              size="large"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            {/* Password */}
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <Input.Password
              className=""
              id="password"
              size="large"
              placeholder="Masukkan Password Anda"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />

            <Button
              size="large"
              type="primary"
              block
              className="mt-5 bg-sky-600"
              onClick={() => handleSubmit()}
            >
              Login
            </Button>
          </div>

          <p className="font-light text-sm mt-5">
            Belum Punya Akun?{" "}
            <span
              className="text-sky-900 font-normal cursor-pointer font-semibold"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
