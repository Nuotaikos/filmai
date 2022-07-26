import { useContext } from "react";
import FrontContext from "./FrontContext";

function Line({ line }) {

  const { doFilter } = useContext(FrontContext);

  return (
    <div class="container text-center">
      <div class="table-wrapper">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th className="w-25 p-3 fs-5" scope="col">Photo</th>
              <th className="fs-5" scope="col">Title</th>
              <th className="fs-5" scope="col">Category</th>
              <th className="fs-5" scope="col">Rate</th>
              <th className="fs-5" scope="col">Price</th>
            </tr>
          </thead>
          <tbody className="body-text">
            <tr>
              <td>
                {
                  line.photo ? <div className="photo-bin"><img src={line.photo} alt={line.title} /></div> : null
                }
              </td>
              <td>{line.title}</td>
              <td className="cat text-info" onClick={() => doFilter(line.cid)}>{line.cat}</td>
              <td>
                {
                  line.rate_sum ? 'rate: ' + (line.rate_sum / line.rates).toFixed(2) : 'No rates yet'
                }
              </td>
              <td>{line.price.toFixed(2)} Eur</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>



    // <li className="list-group-item">
    //   <div className="item">
    //     <div className="content">
    //       <div className=''>
    //         {
    //           line.photo ? <div className="photo-bin"><img src={line.photo} alt={line.title} /></div> : null
    //         }
    //       </div>
    //       <b>{line.title}</b>
    //       <div className="cat" onClick={() => doFilter(line.cid)}>{line.cat}</div>
    //       <b className="">
    //         {
    //           line.rate_sum ? 'rate: ' + (line.rate_sum / line.rates).toFixed(2) : 'No rates yet'
    //         }
    //       </b>
    //       <i>{line.price.toFixed(2)} Eur</i>
    //     </div>
    //   </div>
    // </li>
  );
}

export default Line;