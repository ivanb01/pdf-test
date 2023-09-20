const index = () => {
  return <div>Deals</div>;
};

export default index;

export async function getServerSideProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
