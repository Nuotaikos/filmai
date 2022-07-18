function Line({ line }) {

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
          <div className="cat">{line.cat}</div>
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