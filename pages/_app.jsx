import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/SIGContinuous.css";
import "../styles/SigSpaceExploration.css";
import "./SIGpage.css";

export default function App({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>;
}
