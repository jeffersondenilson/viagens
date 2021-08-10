import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Travel() {
  const location = useLocation();
  const city = location.state ? location.state.city : null;

  useEffect(() => {
    if (city) {
      // console.log(city);
    }
  }, [city]);

  // console.log(location);
  return <div>{city || "no city"}</div>;
}
