export default function SigsIndex() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/sigs/ai",
      permanent: false,
    },
  };
}
