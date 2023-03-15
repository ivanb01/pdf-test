const index = () => {
  return <div>Deals</div>;
};

export default index;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
