import Top10Movies from "../../components/topTen/TopTen";
import RandomMovie from '../../components/main/main';

const HeadPage = () => {
  return (
    <div className='content'>
      <RandomMovie />
      <Top10Movies />
    </div>
  );
}

export default HeadPage;