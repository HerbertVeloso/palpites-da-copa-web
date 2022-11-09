import Head from "next/head";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { api } from "../lib/api";

import appImage from "../assets/app-nlw-copa-preview.png";
import logoImage from "../assets/logo.svg";
import usersImage from "../assets/users-avatar.png";
import checkIcon from "../assets/icon-check.svg";
import { NewPoolForm } from "../components/NewPoolForm";

interface HomeProps {
  poolCount: number;
  userCount: number;
  guessCount: number;
}

export default function Home({ poolCount, userCount, guessCount }: HomeProps) {
  return (
    <>
      <Head>
        <title>Palpites da Copa</title>
      </Head>
      <ToastContainer />
      <div className="max-w-[1124px] h-screen mx-auto mb-16 sm:mb-0 px-6 py-12 md:py-6 grid grid-cols-1 lg:grid-cols-2 gap-28 items-center justify-between">
        <div className="flex flex-col gap-10">
          <Image
            src={logoImage}
            alt="Palpites da Copa"
            className="w-[320px] max-w-full"
            draggable={false}
          />

          <h1 className="mt-2 md:mt-4 text-white text-3xl md:text-5xl font-bold leading-tight">
            Crie seu próprio bolão da copa e compartilhe com seus amigos!
          </h1>

          <div className="flex items-center gap-2">
            <Image
              src={usersImage}
              alt="Quatro fotos de perfil de usuários da aplicação"
              draggable={false}
              className="max-w-[35%]"
            />
            <strong className="text-gray-200 font-bold text-md sm:text-xl">
              <span className="text-green-500 mr-1">+{userCount}</span>
              pessoas já estão usando
            </strong>
          </div>

          <NewPoolForm />

          <div className="border-t border-gray-600 pt-10 flex justify-between gap-2 sm:gap-4 text-gray-100 ">
            <div className="flex items-center justify-center lg:justify-start gap-1 sm:gap-2 flex-1">
              <Image src={checkIcon} alt="" draggable={false} />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">+{poolCount}</span>
                <span className="text-sm sm:text-base">Bolões criados</span>
              </div>
            </div>

            <div className="w-px h-16 bg-gray-600" />

            <div className="flex items-center justify-center lg:justify-start gap-1 sm:gap-2 flex-1">
              <Image src={checkIcon} alt="" draggable={false} />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">+{guessCount}</span>
                <span className="text-sm sm:text-base">Palpites enviados</span>
              </div>
            </div>
          </div>
        </div>

        <Image
          src={appImage}
          alt="Dois celulares exibindo uma prévia da aplicação móvel do Palpites da Copa"
          className="hidden lg:block"
          quality={100}
          draggable={false}
        />
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const [poolCountResponse, userCountResponse, guessCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("users/count"),
      api.get("guesses/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      userCount: userCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
    },
  };
};
