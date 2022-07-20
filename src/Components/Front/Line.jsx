import { useContext } from "react";
import FrontContext from "./FrontContext";

function Line({ line }) {

  const { doFilter } = useContext(FrontContext);

  return (

    <li className="list-group-item">
      <div className="item">
        <div className="content">
          <div className='mr-4'>
            {
              line.photo ? <div className="photo-bin"><img src={line.photo} alt={line.title} /></div> : null
            }
          </div>
          <b>{line.title}</b>
          <div className="cat" onClick={() => doFilter(line.cid)}>{line.cat}</div>
          <b className="ml-4">
            {
              line.rate_sum ? 'rate: ' + (line.rate_sum / line.rates).toFixed(2) : 'No rates yet'
            }
          </b>
          <i>{line.price.toFixed(2)} Eur</i>

          {/* <span>{['Documentary', 'Family', 'Animation', 'Drama', 'Horror']}</span> */}

        </div>
      </div>
    </li>
  );
}

export default Line;