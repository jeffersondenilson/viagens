import { Link } from "react-router-dom";

export default function CitiesLinks({ destination }) {
  return (
    <div className="mb-3">
      <h3 className="is-size-4">{destination.state}</h3>
      <ul>
        {destination.cities.map((city) => {
          // const cityParam = `${city},${destination.state}`; //encodeURI(`${city},${destination.state}`);

          return (
            <li className="py-1" key={`${city}-${destination.state}`}>
              <Link
                to={{
                  pathname: `/viagem?city=${city},${destination.state}`,
                  state: { city: `${city}, ${destination.state}` },
                }}
              >
                {city}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
