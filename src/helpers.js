export function getFlagCode (flags, value) {
  
    const flag = flags.filter(item => ((item.nationality === value) || (item.en_short_name === value)));
    if (flag.length) {
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
        } 
    }
}

export function getAllYears () {
    let yearsList = [];
    for (let i=2013; i<2024; i++ ) {
        yearsList.push(i); 
    };
    return yearsList;
};

