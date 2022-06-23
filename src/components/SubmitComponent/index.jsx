import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./submit.module.css";

export default function SubmitComponent() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchTravelDetails = (id) => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/api/getTravel/${id}`)
      .then((response) => {
        console.log(response);
        let data = response["data"]["result"];
        const fetchedData = {
          name: data["name"],
          address: data["address"],
          destination: data["destination"],
          travelerCount: data["numberOfTraveler"],
        };
        setFormData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        throw new Error("Api error occured");
      });
  };
  useEffect(() => {
    const { id } = router.query;
    fetchTravelDetails(id);
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Name: </h2>
        {formData["name"]}
        <h2>Address:</h2> {formData["address"]}
        <h2>Destination:</h2> {formData["destination"]}
        <h2>No. of Traveler: </h2>
        {formData["travelerCount"]}
      </div>
    </div>
  );
}
