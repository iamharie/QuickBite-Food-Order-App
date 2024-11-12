import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";

const requestConfig = {};

export default function Meals() {
  const {
    data: data,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  // const [isFetching, setIsFetching] = useState(false);
  // const [error, setError] = useState(null);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   async function fetchMeals() {
  //     setIsFetching(true);
  //     try {
  //       const response = await fetch("http://localhost:3000/meals");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data (Meals)");
  //       }
  //       const meals = await response.json();
  //       setData(meals);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsFetching(false);
  //     }
  //   }
  //   fetchMeals();
  // }, []);
  // console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul id="meals">
      {data.map((meals) => (
        <MealItem key={meals.id} meal={meals} />
      ))}
    </ul>
  );
}
