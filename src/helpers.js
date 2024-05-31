export function getFlagCode (flags, value) {
  
    const flag = flags.filter(item => ((item.nationality === value) || (item.en_short_name === value)));
    if (value === "Azerbaijan")  {
        return "LY" 
     } else if (flag.length) {
        return flag[0].alpha_2_code;
    } else {
        if ((value === "British")  || (value === "UK"))  {
            return "GB";
        } else if (value === "Korea") {
            return "KR";
        } else if (value === "UAE") {
            return "AE";
        } else if (value === "Dutch") {
            return "NL";
        } else if (value === "Russia") {
            return "RU";
        } else if (value === "New Zealander") {
            return "NZ";
        } else if (value === "Monegasque") {
            return "MC";
        } else if (value === "American") {
            return "US";
        } else return "RS";
    };
}

export function getAllYears () {
    let yearsList = [];
    for (let i=2013; i<2024; i++ ) {
        yearsList.push(i); 
    };
    return yearsList;
};

 

