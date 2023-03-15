const index = () => {
  return <div>Application</div>;
};

export default index;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
