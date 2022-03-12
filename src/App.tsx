import "./styles.css";

export default function App() {

  function processlInput(arr: string[]): string {
    if (arr.length > 0){
      let viewed: string[] = [],
          notViewed: string[] = [],
          leastViewIndex = 1,
          mostViewIndex = 0,
          leastViewed = `No movies viewed!`,
          mostViewed = `No movies viewed!`;
      
      for (let i = 0;  i<arr.length; i++){
        const movie = arr[i];

        if (movie.indexOf("min") !== -1) {
          const stream = movie.split(" ");
          const length1 = stream[stream.length - 1]?.replace("min", "");
          const length2 = stream[stream.length - 2]?.replace("min", "");

          let streamedLength = "";
          let fullLength = "";
          let movieName = "";
          
          if (Number(length1) && Number(length2)){
            streamedLength = length1;
            fullLength = length2;

            movieName = movie.substr(0, movie.indexOf(fullLength) - 1);
            viewed.push(movieName);

            const viewIndex = Number(streamedLength)/Number(fullLength);

            if (viewIndex < leastViewIndex) { 
              leastViewIndex = viewIndex;
              leastViewed = `Least viewed: ${movieName}`; 
            }
            if (viewIndex > mostViewIndex) { 
              mostViewIndex = viewIndex;
              mostViewed = `Most viewed: ${movieName}`; 
            }
          } 
          else if (Number(length2) && Number(length1) === 0) {
            fullLength = length2;
            movieName = movie.substr(0, movie.indexOf(fullLength) - 1);
            notViewed.push(movieName);
          }
          else {
            fullLength = length1;
            movieName = movie.substr(0, movie.indexOf(fullLength) - 1);
            notViewed.push(movieName);
          }
        } 
        else if (movie) 
          notViewed.push(movie);
      }

      const viewedMovies = viewed.length > 0 ? `\n - ${viewed.join("\n - ")}\n` : "";
      const notViewedMovies = notViewed.length > 0 ? `\n - ${notViewed.join("\n - ")}\n` : "";

      return(`${mostViewed}\n${leastViewed}
              \nViewed:${viewedMovies}\nNot viewed:${notViewedMovies}`);

    } 
    else 
      return `No movies found!`;
  }

  const movies: string[] = [
    "",
    "4",
    "Mutabaruku 96min",
    "Selma 128min 116min",
    "Sunrise 101min 23min",
    "A Star ls Born 136min 120min",
    "Middle of Nowhere 110min 0min",

  ];

  console.log(processlInput(movies));

  
  return (
    <div className="App">
      <h1>Get most and least viewed movie</h1>
      <h5>Each log contains the name of the movie,
          length of the movie (in minutes) and 
          number of minutes of the movie watched by the user.
      </h5>
      
      <div style={{textAlign: 'left', marginLeft: 100}}>
        <h3>Movie List Array:</h3>
        [{movies.map((movie, index) => (
          <h4 key={index} style={{marginLeft: 20}}>"{movie}",</h4>
        ))}]
      </div>
      <hr/>
      <div style={{textAlign: 'left', marginLeft: 200}}>
        {processlInput(movies).split("\n").map((str, index) => (
          str.indexOf("-") !== -1 ? 
            <div key={index} style={{ marginLeft: 20}}>
              <h4>{str}</h4>
            </div>
          : 
            <h3 key={index}>{str}</h3>
        ))}
      </div>
    </div>
  );
}
