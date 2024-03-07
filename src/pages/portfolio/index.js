import { useRouter } from 'next/router';

const Portfolio = () => {
  const router = useRouter();
  const { share_id } = router.query;
  return <div>Coming soon...</div>;
};
export default Portfolio;
