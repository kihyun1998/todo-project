const Importance = () => {

  const inputStyle = {
    display: "none",
  }

  const labelStyle = {
    fontFamily: "'Sunflower', sans-serif",
    fontWeight: 1000,
    fontSize: "1.2rem",
    cursor: "pointer"
  }

  const starStyle = {
    fontSize: "2rem",
    cursor: "pointer"
  }

  const fullStar = {
    fontVariationSettings: `'FILL' 1`,
  }
  
  return (
    <div>
      <input 
        type="radio" 
        id="emptyStar" 
        name="importance" 
        value="emptyStar" 
        style={inputStyle}/>
      <label 
        htmlFor="emptyStar" 
        className="material-symbols-outlined" 
        style={starStyle}>
        Star
      </label>
      <label 
        htmlFor="emptyStar" 
        style={labelStyle}>
        안해도 괜찮음
      </label> <br />

      <input 
        type="radio" 
        id="halfStar" 
        name="importance" 
        value="halfStar" 
        style={inputStyle}/>
      <label 
        htmlFor="halfStar" 
        className="material-symbols-outlined" 
        style={starStyle}>
        Star_Half
      </label>
      <label 
        htmlFor="halfStar" 
        style={labelStyle}>
        안하면 곤란함
      </label> <br />

      <input 
        type="radio" 
        id="fullStar" 
        name="importance" 
        value="fullStar" 
        style={inputStyle}/>
      <label 
        htmlFor="fullStar" 
        className="material-symbols-outlined" 
        style={Object.assign(fullStar, starStyle)}>
        Star
      </label>
      <label 
        htmlFor="fullStar" 
        style={labelStyle}>
        안하면 죽음 뿐
      </label> <br />
    </div>
  );
}

export default Importance;