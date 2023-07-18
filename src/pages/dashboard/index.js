export default function Dashboard() {
  return <div>Dashboard</div>;
}

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
