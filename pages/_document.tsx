import * as React from "react";
import  {
	Html,
	Head,
	Main,
	NextScript,
	DocumentProps,
} from "next/document";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";


interface MyDocumentProps extends DocumentProps {
	emotionStyleTags: EmotionJSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
	return (
		<Html lang="en">
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="emotion-insertion-point" content="" />
				{emotionStyleTags}
			</Head>
			<body >
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
