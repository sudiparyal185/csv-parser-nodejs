const { parse } = require("csv-parse");
const fs = require("fs"); //builtin Node function to read files as Stream

const results = [];

// This determines if the planed is habitable or not based on provided data.
const isHabitablePlanet = (planet = []) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 && // Determining if the planet has less light or more light
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6 //Comparing size of planets with Earth
  );
};
fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  ) //pipe connects Readable stream source with Writable stream destination
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      results.push(data);
    }
  })
  .on("erro", (err) => {
    console.log(`Error occured while reading ${err}`);
  })
  .on("end", () => {
    console.log(`${results?.length} habitable planets found!!`);
  });

//parse();
