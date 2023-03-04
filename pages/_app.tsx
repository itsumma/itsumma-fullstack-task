import "@/styles/globals.css";
import "@/styles/form.css";
import "@/styles/start-screen.css";
import "@/styles/family-tree.css";
import "@/styles/family-member.css";
import type { AppProps } from "next/app";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Roboto } from "next/font/google";
import Head from "next/head";
const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});
import { ToastContainer} from "react-toastify";


export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={roboto.className}>
			<Head>
				<title>Family Tree</title>
			</Head>
			<ToastContainer/>
			<Component {...pageProps} />
		</main>
	);
}



